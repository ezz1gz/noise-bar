// 공용: 주소창 값(색·리큐르) 읽기, 바 글자, 화면 맞춤
const Q=new URLSearchParams(location.search);
const COLS=(Q.get('c')||'7A2CFF,E0218A,FF6A3D,FF9A3C,FF4F9A,9B2FD0').split(',').map(h=>'#'+h.replace('#','')).slice(0,6);
while(COLS.length<6)COLS.push(COLS[COLS.length%Math.max(1,COLS.length)]);
const LQ={n:Q.get('ln')||'시계',v:Q.get('lv')||'20',c:'#'+(Q.get('lc')||'BC6940').replace('#','')};
function barText(){const b=document.getElementById('bar');if(!b)return;b.innerHTML=`<i style="background:${LQ.c}"></i><span class="n">${LQ.n}</span><span class="v"><b>${LQ.v}</b>%</span>`;}
// 화면 맞춤: 폰에서는 가로를 꽉 채우고(393 기준), 세로는 화면 높이만큼 늘이거나 줄여요.
// 위쪽(제목·뒤로)은 위에 붙고, 아래 바는 화면 바닥에 붙고, 잔·그림(art)은 남는 높이에 맞춰 비율 유지로 줄어요.
function nbFit(){const ph=document.getElementById('ph');if(!ph)return;
  if(!ph.__b){ph.__b=[ph.offsetWidth||393,ph.offsetHeight||852];}const BW=ph.__b[0],BH=ph.__b[1];
  const Wv=innerWidth,Hv=innerHeight,mob=Wv<500||window.parent!==window;
  let k,vh;if(mob){k=Wv/BW;vh=Hv/k;}else{k=Math.min(1,(Hv-24)/BH,(Wv-24)/BW);vh=BH;}
  const dy=vh-BH,s=Math.min(1,vh/BH),ax=(BW-BW*s)/2;
  [...ph.children].forEach(el=>{if(el.dataset.band||el.tagName==='SCRIPT'||el.tagName==='STYLE')return;const t=el.offsetTop!=null?el.offsetTop:parseFloat(el.getAttribute('y')||0),h=el.offsetHeight!=null?el.offsetHeight:parseFloat(el.getAttribute('height')||0);
    el.dataset.band=(el.classList.contains('layer')||h>=BH*.9)?(el.tagName==='CANVAS'?'full':'art'):(t>=BH*.81?'bot':'top');});
  ph.style.height=vh+'px';ph.style.borderRadius=mob?'0':'44px';
  if(mob){ph.style.position='fixed';ph.style.left='0';ph.style.top='0';ph.style.transformOrigin='0 0';}
  ph.style.transform=`scale(${k})`;
  [...ph.children].forEach(el=>{const b=el.dataset.band;if(!b)return;
    if(b==='bot'){el.style.translate=`0 ${dy}px`;}
    else if(b==='full'){el.style.height=vh+'px';}
    else if(b==='art'){el.style.transformOrigin=`${-(el.offsetLeft||0)}px ${-(el.offsetTop||0)}px`;el.style.scale=String(s);el.style.translate=`${ax}px 0`;}});
  window.__nbS=s;window.__nbVH=vh;}
function fit(){nbFit();}
const inFrame=window.parent!==window;
function go(page){location.href=page+location.search;}
function back(page){if(page)go(page);else if(inFrame)parent.postMessage({nb:'back'},'*');else history.back();}
const hexRGB=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255);
// ── 섞인 음료: Metaball Lab '빛 섞기' 결과와 같은 규칙
// pc = 베이스 4색(화면 위→아래), s = 비율, pk = 키, lt = 리큐르 색들(톤 한 방울), st = 휘젓기
const PK=(Q.get('pk')||'white,pink,blue,brown').split(',');
const PC=(Q.get('pc')||'ffffff,ff2294,4583ff,c95f19').split(',').map(h=>'#'+h);
const SH=(Q.get('s')||'.25,.24,.26,.25').split(',').map(Number);
const LT=(Q.get('lt')||'').split(',').filter(Boolean).map(h=>'#'+h);
const STIR=Math.max(0,Math.min(1,+(Q.get('st')||.45)));
const COCK={white:'#f8f4ef',pink:'#f2489c',blue:'#3f78ff',brown:'#f28a3a'};
function okl(h){const c=hexRGB(h).map(v=>v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4));
  const l=Math.cbrt(.4122214708*c[0]+.5363325363*c[1]+.0514459929*c[2]),m=Math.cbrt(.2119034982*c[0]+.6806995451*c[1]+.1073969566*c[2]),q=Math.cbrt(.0883024619*c[0]+.2817188376*c[1]+.6299787005*c[2]);
  return[.2104542553*l+.7936177850*m-.0040720468*q,1.9779984951*l-2.4285922050*m+.4505937099*q,.0259040371*l+.7827717662*m-.8086757660*q];}
// 리큐르 한 방울 = 톤 그레이딩 [밝기 이동, 색상 회전, 채도 배율, 밝기 배율] + 틴트(a,b)
function liqGrade(){if(!LT.length)return[[0,0,1,0],[0,0]];let a=0,b=0,L=0;LT.forEach(h=>{const o=okl(h);a+=o[1];b+=o[2];L+=o[0];});a/=LT.length;b/=LT.length;L/=LT.length;
  const n=Math.hypot(a,b)||1,k=Math.min(.055,n*.35);return[[(L-.62)*.05,0,1.06,0],[a/n*k,b/n*k]];}
function labCuts(){const tot=SH.reduce((x,y)=>x+y,0)||1;let acc=0;const c=[0,1,2].map(i=>(acc+=SH[i])/tot);const q=SH.map(Math.sqrt),qt=q.reduce((x,y)=>x+y,0);acc=0;const cs=[0,1,2].map(i=>(acc+=q[i])/qt);return c.map((v,i)=>v+(cs[i]-v)*.75);}
function moodVec(){const tot=SH.reduce((x,y)=>x+y,0)||1,g=k=>{const i=PK.indexOf(k);return i<0?0:SH[i]/tot;};return[g('brown'),g('blue'),g('pink'),g('white')];}
const FLUID_GLSL=`uniform vec3 uP2[4];uniform vec3 uCut;uniform vec4 uMood;uniform vec4 uGr;uniform vec2 uTn;uniform vec4 uShr;
float fh_(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float fn_(vec2 p){vec2 i=floor(p),f=fract(p);float a=fh_(i),b=fh_(i+vec2(1,0)),c=fh_(i+vec2(0,1)),d=fh_(i+vec2(1,1));vec2 u=f*f*(3.-2.*f);return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;}
float ff_(vec2 p){float v=0.,a=.5;mat2 r=mat2(.8,.6,-.6,.8);for(int i=0;i<3;i++){v+=a*fn_(p);p=r*p*2.15;a*=.45;}return v;}
vec3 tl_(vec3 c){return mix(c/12.92,pow((c+.055)/1.055,vec3(2.4)),step(.04045,c));}
vec3 ts_(vec3 c){c=max(c,0.);return mix(c*12.92,1.055*pow(c,vec3(1./2.4))-.055,step(.0031308,c));}
vec3 ok_(vec3 c){c=tl_(c);vec3 l=vec3(.4122214708*c.r+.5363325363*c.g+.0514459929*c.b,.2119034982*c.r+.6806995451*c.g+.1073969566*c.b,.0883024619*c.r+.2817188376*c.g+.6299787005*c.b);l=pow(max(l,0.),vec3(1./3.));
  return vec3(.2104542553*l.x+.7936177850*l.y-.0040720468*l.z,1.9779984951*l.x-2.4285922050*l.y+.4505937099*l.z,.0259040371*l.x+.7827717662*l.y-.8086757660*l.z);}
vec3 fo_(vec3 L){vec3 l=vec3(L.x+.3963377774*L.y+.2158037573*L.z,L.x-.1055613458*L.y-.0638541728*L.z,L.x-.0894841775*L.y-1.2914855480*L.z);l=l*l*l;
  return ts_(vec3(4.0767416621*l.x-3.3077115913*l.y+.2309699292*l.z,-1.2684380046*l.x+2.6097574011*l.y-.3413193965*l.z,-.0041960863*l.x-.7034186147*l.y+1.7076147010*l.z));}
vec3 fluid(vec2 uv,float t){vec2 w=uv*.85;vec2 q=vec2(ff_(w*1.3+t*.02),ff_(w*1.5+1.));vec2 r=vec2(ff_(w*1.8+q*2.5+t*.05),ff_(w*1.4+q*1.2));float fn=ff_(w*1.1+r*1.8);
  float tt=(1.-uv.y)*.3+(fn-.45)*2.6+(r.x-.5)*1.2+.35;tt=1.-abs(1.-mod(tt+4.,2.));float e=.3;
  float s1=smoothstep(uCut.x-e,uCut.x+e,tt),s2=smoothstep(uCut.y-e,uCut.y+e,tt),s3=smoothstep(uCut.z-e,uCut.z+e,tt);
  vec4 wt=vec4(1.-s1,max(s1-s2,0.),max(s2-s3,0.),s3);vec4 w2=wt*clamp(uShr*25.,0.,1.);float sw=dot(w2,vec4(1.));if(sw>1e-4)wt=w2/sw;
  vec3 L=ok_(uP2[0])*wt.x+ok_(uP2[1])*wt.y+ok_(uP2[2])*wt.z+ok_(uP2[3])*wt.w;float C=length(ok_(uP2[0]).yz)*wt.x+length(ok_(uP2[1]).yz)*wt.y+length(ok_(uP2[2]).yz)*wt.z+length(ok_(uP2[3]).yz)*wt.w;
  float cl=length(L.yz);if(cl>1e-4)L.yz*=mix(1.,(C*1.08)/cl,.85);
  float hs=(fn-.5)*.9,cs=cos(hs),sn=sin(hs);L.yz=mat2(cs,sn,-sn,cs)*L.yz;L.x+=(r.y-.5)*.08;
  vec4 sh=uMood;L.x+=.17*sh.w-.11*sh.x-.07*sh.y;L.yz*=1.+(.28*sh.z-.5*sh.w);L.yz+=vec2(.025,.045)*sh.x+vec2(-.012,-.055)*sh.y;
  float gc=cos(uGr.y),gs=sin(uGr.y);L.yz=mat2(gc,gs,-gs,gc)*L.yz;{float c0=length(L.yz)*max(uGr.z,1.);L.yz=L.yz*uGr.z+uTn;float c1=length(L.yz);if(c1>1e-4)L.yz*=max(1.,c0/c1);}L.x=L.x*(1.+uGr.w)+uGr.x;
  vec3 col=fo_(L);float lum=dot(col,vec3(.299,.587,.114));col=mix(vec3(lum),col,1.2);col+=(fh_(uv*vec2(1920.,1080.)+fract(t*30.))-.5)*.035;return clamp(col,0.,1.);}`;
function setFluid(gl,pr){const U=n=>gl.getUniformLocation(pr,n);const[g,tn]=liqGrade();
  gl.uniform3fv(U('uP2'),new Float32Array(PK.flatMap((k,i)=>hexRGB(COCK[k]||PC[i]))));gl.uniform3fv(U('uCut'),new Float32Array(labCuts()));
  gl.uniform4fv(U('uMood'),new Float32Array(moodVec()));gl.uniform4fv(U('uGr'),new Float32Array(g));gl.uniform2fv(U('uTn'),new Float32Array(tn));
  const tot=SH.reduce((x,y)=>x+y,0)||1;gl.uniform4fv(U('uShr'),new Float32Array(SH.map(v=>v/tot)));}

// ── MIX 화면에서 섞인 모습을 그대로 이어 쓰기: 다 섞인 순간을 찍어 두고(세션 저장), 다음 화면들은 그 그림을 같은 자리에서 아주 천천히 일렁이며 씀
const MIXKEY='nb-mixshot';
function saveMixShot(url){try{sessionStorage.setItem(MIXKEY,url);}catch(_){}try{localStorage.setItem(MIXKEY,url);}catch(_){}if(inFrame)parent.postMessage({nb:'mixshot',url},'*');}
function getMixShot(){let u=null;try{u=sessionStorage.getItem(MIXKEY);}catch(_){}if(!u)try{u=localStorage.getItem(MIXKEY);}catch(_){}if(!u&&inFrame)try{u=parent.__mixShot||null;}catch(_){}return u;}
const MIXTEX_GLSL=`uniform sampler2D uMT;uniform float uHasMT;
vec3 drink(vec2 fuv,vec2 suv,float t){if(uHasMT<.5)return fluid(fuv,t);
  vec2 w=vec2(fn_(suv*3.2+t*.06),fn_(suv*3.2+7.3-t*.05))-.5;return texture2D(uMT,clamp(suv+w*.022,.002,.998)).rgb;}`;
function bindMixTex(gl,pr,unit){const u=gl.getUniformLocation(pr,'uMT'),h=gl.getUniformLocation(pr,'uHasMT');gl.uniform1f(h,0);const url=getMixShot();if(!url)return;
  const tx=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tx);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([200,120,220,255]));
  [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T].forEach(k=>gl.texParameteri(gl.TEXTURE_2D,k,gl.CLAMP_TO_EDGE));gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.uniform1i(u,unit);const im=new Image();im.onload=()=>{gl.useProgram(pr);gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tx);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,im);gl.uniform1f(h,1);gl.activeTexture(gl.TEXTURE0);};im.src=url;}
