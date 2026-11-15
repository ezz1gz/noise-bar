// MIX 메타볼 셰이더 (mix.html과 이후 화면의 '살아있는 믹스'가 같이 씀 — 한 곳에서만 고치기)
// ① SIM: 좌표 지도를 컬 노이즈 흐름으로 밀기(휘젓기의 기억) ② DISP: 밀린 좌표로 베이스 색 띠를 읽어 섞기
window.NBMIXSH=(()=>{
const VS=`#version 300 es
in vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;
const NOISE=`
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);
  float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));
  vec2 u=f*f*(3.-2.*f);return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;}
float fbm(vec2 p){float v=0.,a=.5;mat2 r=mat2(.8,.6,-.6,.8);
  for(int i=0;i<3;i++){v+=a*noise(p);p=r*p*2.15;a*=.45;}return v;}`;

const SIM=`#version 300 es
precision highp float;
uniform sampler2D uPrev;uniform vec2 uSimRes;
uniform float uTime,uDt,uFlow,uScale,uAsp,uRelax,uPtrOn,uPtrR;
uniform vec4 uPtr;
out vec4 o;
${NOISE}
uniform vec2 uSeed;   // 칵테일마다 다른 흐름 (레시피에서 나온 값 → 같은 레시피는 같은 모양)
float psi(vec2 q){return fbm(q+uSeed+vec2(uTime*.05,-uTime*.03));}
void main(){
  vec2 p=gl_FragCoord.xy/uSimRes;
  vec2 q=p*vec2(uAsp,1.)*uScale;
  float e=.02;
  float a=psi(q+vec2(0,e)),b=psi(q-vec2(0,e)),c=psi(q+vec2(e,0)),d=psi(q-vec2(e,0));
  vec2 v=vec2(a-b,-(c-d))/(2.*e);           // curl noise: 소용돌이만 있는 흐름
  v=v/vec2(uAsp,1.)/uScale*uFlow;
  vec2 dp=(p-uPtr.xy)*vec2(uAsp,1.);
  v+=uPtr.zw*exp(-dot(dp,dp)/(uPtrR*uPtrR))*uPtrOn;  // 손가락이 끄는 힘
  vec2 src=p-v*uDt;
  vec2 px=1./uSimRes;
  vec2 uv=texture(uPrev,src).xy;
  vec2 avg=(texture(uPrev,src+vec2(px.x,0)).xy+texture(uPrev,src-vec2(px.x,0)).xy+
            texture(uPrev,src+vec2(0,px.y)).xy+texture(uPrev,src-vec2(0,px.y)).xy)*.25;
  uv=mix(uv,avg,.05);
  uv=mix(uv,p,clamp(uRelax*uDt,0.,1.));
  o=vec4(uv,0.,1.);
}`;

const DISP=`#version 300 es
precision highp float;
uniform sampler2D uMap;uniform vec2 uRes;
uniform float uTime,uMix,uScale,uSoft,uAsp,uCock,uWhite,uPaint;
uniform vec2 uSeed;uniform sampler2D uSnap;uniform float uHasSnap;uniform vec4 uMood;uniform vec3 uPal[4];uniform vec3 uPal2[4];uniform vec3 uPal3[4];uniform vec3 uCuts;uniform vec4 uShare;uniform vec4 uGa,uGb,uDrop;uniform vec2 uTa,uTb;
out vec4 o;
${NOISE}
// ── OKLab: 사람 눈 기준 색 공간 — 섞어도 탁해지지 않음
vec3 toLin(vec3 c){return mix(c/12.92,pow((c+.055)/1.055,vec3(2.4)),step(.04045,c));}
vec3 toSrgb(vec3 c){c=max(c,0.);return mix(c*12.92,1.055*pow(c,vec3(1./2.4))-.055,step(.0031308,c));}
vec3 oklab(vec3 c){c=toLin(c);
  vec3 l=vec3(.4122214708*c.r+.5363325363*c.g+.0514459929*c.b,.2119034982*c.r+.6806995451*c.g+.1073969566*c.b,.0883024619*c.r+.2817188376*c.g+.6299787005*c.b);
  l=pow(max(l,0.),vec3(1./3.));
  return vec3(.2104542553*l.x+.7936177850*l.y-.0040720468*l.z,1.9779984951*l.x-2.4285922050*l.y+.4505937099*l.z,.0259040371*l.x+.7827717662*l.y-.8086757660*l.z);}
vec3 fromOklab(vec3 L){
  vec3 l=vec3(L.x+.3963377774*L.y+.2158037573*L.z,L.x-.1055613458*L.y-.0638541728*L.z,L.x-.0894841775*L.y-1.2914855480*L.z);l=l*l*l;
  return toSrgb(vec3(4.0767416621*l.x-3.3077115913*l.y+.2309699292*l.z,-1.2684380046*l.x+2.6097574011*l.y-.3413193965*l.z,-.0041960863*l.x-.7034186147*l.y+1.7076147010*l.z));}
// ── 물감 섞기: 쿠벨카-뭉크 근사 — 색을 '빛을 얼마나 흡수하는지'(K/S)로 바꿔 비율대로 섞음
vec3 toKS(vec3 c){vec3 R=clamp(toLin(c),.002,.998);return (1.-R)*(1.-R)/(2.*R);}
vec3 fromKS(vec3 ks){return toSrgb(1.+ks-sqrt(ks*ks+2.*ks));}
void main(){
  vec2 p=gl_FragCoord.xy/uRes;
  vec2 uv=texture(uMap,p).xy;
  vec2 w=uv*vec2(uAsp,1.)*uScale+uSeed;
  vec2 q=vec2(fbm(w*1.3+uTime*.02),fbm(w*1.5+1.));
  vec2 r=vec2(fbm(w*1.8+q*2.5+uTime*.05),fbm(w*1.4+q*1.2));
  float fn=fbm(w*1.1+r*1.8);
  float m=uMix*uMix*(3.-2.*uMix);
  float t=(1.-uv.y)+(fn-.45)*m*1.25+(r.x-.5)*m*.55;   // 흔들림을 줄여 비율만큼 면적이 남게
  t=1.-abs(1.-mod(t+4.,2.));                 // 거울 반복: 끊김 없이 색이 순환
  float aa=fwidth(t)*.8+1e-5;
  float e=max(aa,uSoft*smoothstep(.25,1.,uMix));
  float k=uCock*m;                                   // 빛 섞기(칵테일 색)로 바뀌는 정도
  float kp=uPaint*m;                                 // 물감 섞기로 바뀌는 정도
  e=mix(e,max(e,.30),k);   // 다 섞이면 이웃 색끼리 넓게 녹아 새 색(보라·살구…)이 생김
  e=mix(e,max(e,.22),kp);                            // 물감: 더 넓게 겹쳐 섞임                             // 칵테일 모드: 경계를 더 넓게 녹임
  float s1=smoothstep(uCuts.x-e,uCuts.x+e,t);
  float s2=smoothstep(uCuts.y-e,uCuts.y+e,t);
  float s3=smoothstep(uCuts.z-e,uCuts.z+e,t);
  vec4 wt=vec4(1.-s1,max(s1-s2,0.),max(s2-s3,0.),s3);
  vec3 col=uPal[0]*wt.x+uPal[1]*wt.y+uPal[2]*wt.z+uPal[3]*wt.w;
  if(uMix>.001){vec4 w2=wt*clamp(uShare*25.,0.,1.);float sw=dot(w2,vec4(1.));if(sw>1e-4)wt=w2/sw;}   // 0%인 색은 섞임에 끼지 않게
  if(k>.001){
    // 재료 색 → 칵테일 색, OKLab에서 섞고 채도는 재료들의 채도를 유지(+살짝 올림)
    vec3 L=vec3(0.);float C=0.;vec2 dom=vec2(0.);float wm=-1.;
    for(int i=0;i<4;i++){vec3 c=oklab(mix(uPal[i],uPal2[i],k));L+=c*wt[i];C+=length(c.yz)*wt[i];if(wt[i]>wm&&length(c.yz)>.02){wm=wt[i];dom=normalize(c.yz);}}
    // 채도 되살리기: 반대색끼리 섞여 색이 상쇄될 땐 평균 방향(대개 분홍)으로 부풀리지 않고 더 많은 쪽 색의 방향으로 — 모든 조합이 분홍으로 쏠리던 것 방지
    {float cl=length(L.yz);vec2 dir=cl>1e-4?L.yz/cl:dom;float keep=clamp(cl/max(C,1e-4),0.,1.);
     if(length(dom)>.5)dir=normalize(mix(dom,dir,smoothstep(.35,.85,keep)));
     float tgt=mix(cl,min(C*1.04,cl*2.2+.02),.85);L.yz=dir*tgt;}
    // 같은 색 안에서도 흐름 따라 색조·밝기가 살짝 출렁이게
    float hs=(fn-.5)*.9*k,cs=cos(hs),sn=sin(hs);L.yz=mat2(cs,sn,-sn,cs)*L.yz;L.x+=(r.y-.5)*.08*k;
    // ② 비율 → 분위기: 화이트=밝고 파스텔 · 브라운=어둡고 따뜻 · 블루=깊고 차갑게 · 핑크=화사하게
    vec4 sh=uMood;
    L.x+=( .17*sh.w-.11*sh.x-.07*sh.y)*k;
    L.yz*=1.+(.28*sh.z-.5*sh.w)*k;
    L.yz+=vec2(.025,.045)*sh.x*k+vec2(-.012,-.055)*sh.y*k;
    vec3 ck=fromOklab(L);
    col=mix(col,ck,k);
  }
  if(kp>.001){
    // 색상 각도는 그대로, 밝기·채도만 다듬은 물감 색으로 섞기
    vec3 ks=vec3(0.),Lo=vec3(0.);float ws=0.;
    for(int i=0;i<4;i++){vec3 c=mix(uPal[i],uPal3[i],kp);ks+=toKS(c)*wt[i];Lo+=oklab(c)*wt[i];ws+=wt[i];}
    Lo/=max(ws,1e-5);
    vec3 Lk=oklab(fromKS(ks/max(ws,1e-5)));
    // 하이브리드: 어두워짐·차분해짐은 물감 공식에서, 색상 방향은 눈 기준 혼합에서 (브라운+블루가 초록으로 가지 않게)
    vec3 L;L.x=mix(Lk.x,Lo.x,.4);
    float C=max(length(Lk.yz)*1.1,.6*length(Lo.yz));
    vec2 dir=length(Lo.yz)>1e-3?normalize(Lo.yz):normalize(Lk.yz+1e-5);
    L.yz=dir*C;
    L.x=max(L.x,.42);                                 // 너무 어두워지지 않게 밝기 바닥
    float hs=(fn-.5)*.35*kp,cs=cos(hs),sn=sin(hs);L.yz=mat2(cs,sn,-sn,cs)*L.yz;
    col=mix(col,fromOklab(L),kp);
  }
  // ③ 리큐르 한 방울: 떨어진 자리부터 잉크처럼 번지며 전체 톤을 바꿈 (컬러 그레이딩)
  {
    vec2 pd=(p-uDrop.xy)*vec2(uAsp,1.);
    float dd=length(pd)+(fbm(p*vec2(uAsp,1.)*5.+uDrop.w)-.5)*.22;      // 번지는 경계를 울퉁불퉁하게
    float rad=uDrop.z;                                                 // 번진 반경 (시간에 따라 커짐)
    float msk=1.-smoothstep(rad-.08,rad,dd);                           // 1 = 새 리큐르 톤
    float front=exp(-pow((dd-rad+.03)/.035,2.))*step(.001,rad)*step(rad,1.9);   // 번지는 앞쪽 테두리는 조금 진하게
    vec4 g=mix(uGa,uGb,msk);vec2 tn=mix(uTa,uTb,msk);
    vec3 L=oklab(col);
    float cs=cos(g.y),sn=sin(g.y);L.yz=mat2(cs,sn,-sn,cs)*L.yz;        // 색상 회전
    {float c0=length(L.yz)*max(g.z,1.);L.yz=L.yz*g.z+tn*(1.+front*1.5);float c1=length(L.yz);if(c1>1e-4)L.yz*=max(1.,c0/c1);}   // 리큐르를 넣어도 채도는 떨어지지 않게                                   // 채도 · 틴트
    L.x=L.x*(1.+g.w)+g.x-front*.04;                                    // 밝기 (배율 + 이동)
    col=fromOklab(L);
  }
  // 리큐르 화면에서 바로 이어 섞기: 찍어 둔 그 화면을 저은 좌표로 읽고(0→50: 휘감김) · 점점 번지고(→70) · 완전히 섞인 칵테일 색으로(→100)
  if(uHasSnap>.5){vec2 su=vec2(uv.x,1.-uv.y)+vec2((r.y-.5)*.5,(fn-.45)*1.1+(r.x-.5)*.45)*smoothstep(0.,.75,uMix);float bl=.003+.03*m;
    vec3 sc=(texture(uSnap,su).rgb*2.+texture(uSnap,su+vec2(bl,0)).rgb+texture(uSnap,su-vec2(bl,0)).rgb+texture(uSnap,su+vec2(0,bl)).rgb+texture(uSnap,su-vec2(0,bl)).rgb)/6.;
    col=mix(sc,col,smoothstep(.45,1.,uMix));}
  float lum=dot(col,vec3(.299,.587,.114));
  col=mix(vec3(lum),col,1.+.2*m);
  col+=(hash(gl_FragCoord.xy+fract(uTime*30.)*100.)-.5)*.035*m;
  o=vec4(clamp(col,0.,1.),1.);
}`;

return{VS,NOISE,SIM,DISP};})();
