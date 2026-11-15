// 잔 속 액체 (Choose Glass 아티팩트와 같은 방식): SPH 입자(Clavet 2005 이중 밀도 완화) → 흐리게 겹쳐 그린 밀도장 → 임계값으로 잘라 메타볼 액체 면
// NBLiquid(canvas, {A,B,C,D,F, box:[x,y,w,h], tex:url|null, cols:[...], fill:.55, tilt:()=>rad, auto:true})
//  A·C = 잔 윗면 왼쪽·오른쪽 안쪽 점, B·D = 그릇 아래 왼쪽·오른쪽, F = 바닥 y (모두 box와 같은 좌표계)
function NBLiquid(cv,o){const gl=cv.getContext('webgl',{premultipliedAlpha:true,alpha:true,antialias:false});if(!gl)return null;
 const [OX,OY,SW,SH]=o.box,W=cv.width,Hh=cv.height,FW=W>>1,FH=Hh>>1;
 const A=o.A,B=o.B,C=o.C,D=o.D,F=o.F;
 const nrm=(p,q,s)=>{const dx=q[0]-p[0],dy=q[1]-p[1],l=Math.hypot(dx,dy);return s>0?[dy/l,-dx/l]:[-dy/l,dx/l];};
 const nl=nrm(A,B,1),nr=nrm(C,D,-1);
 // ── 입자
 const P=[],sp=4.6,top=F-(F-A[1])*(o.fill||.55);
 const inL=p=>(p.x-A[0])*nl[0]+(p.y-A[1])*nl[1],inR=p=>(p.x-C[0])*nr[0]+(p.y-C[1])*nr[1];
 for(let y=F-2;y>top;y-=sp)for(let x=Math.min(A[0],B[0]);x<Math.max(C[0],D[0]);x+=sp){const q={x,y};if(inL(q)>4&&inR(q)>4&&P.length<620)P.push({x:x+Math.random()*.5,y,px:x,py:y,vx:0,vy:0});}
 const H=11,R0=4.2,K=.06,KN=.5,SIG=.12,BET=.1,S={gx:0,gy:.07},grid=new Map();
 const build=()=>{grid.clear();P.forEach((p,i)=>{const k=((p.x/H)|0)*1000+((p.y/H)|0);let c=grid.get(k);if(!c)grid.set(k,c=[]);c.push(i);});};
 const nb=(a,f,ii)=>{const cx=(a.x/H)|0,cy=(a.y/H)|0;for(let dx=-1;dx<=1;dx++)for(let dy=-1;dy<=1;dy++){const c=grid.get((cx+dx)*1000+cy+dy);if(c)for(const j of c){if(ii!==undefined&&j<=ii)continue;if(P[j]!==a)f(P[j]);}}};
 function step(dt){const N=P.length;for(const p of P){p.vx+=S.gx*dt;p.vy+=S.gy*dt;}
  build();for(let i=0;i<N;i++){const a=P[i];nb(a,b=>{const dx=b.x-a.x,dy=b.y-a.y,r=Math.hypot(dx,dy);if(r<1e-4||r>=H)return;const q=r/H,ux=dx/r,uy=dy/r,u=(a.vx-b.vx)*ux+(a.vy-b.vy)*uy;if(u>0){const I=dt*(1-q)*(SIG*u+BET*u*u)*.5;a.vx-=I*ux;a.vy-=I*uy;b.vx+=I*ux;b.vy+=I*uy;}},i);}
  for(const p of P){p.px=p.x;p.py=p.y;p.x+=p.vx*dt;p.y+=p.vy*dt;}
  build();for(let i=0;i<N;i++){const a=P[i];let rho=0,rn=0;const L=[];nb(a,b=>{const dx=b.x-a.x,dy=b.y-a.y,r=Math.hypot(dx,dy);if(r<1e-4||r>=H)return;const q=1-r/H;rho+=q*q;rn+=q*q*q;L.push([b,dx/r,dy/r,q]);});
   const pr=K*(rho-R0),pn=KN*rn;let ax=0,ay=0;for(const[b,ux,uy,q] of L){const Dd=dt*dt*(pr*q+pn*q*q)*.5*H*.25;b.x+=Dd*ux;b.y+=Dd*uy;ax-=Dd*ux;ay-=Dd*uy;}a.x+=ax;a.y+=ay;}
  for(const p of P){let d=inL(p);if(d<1.5){p.x+=(1.5-d)*nl[0];p.y+=(1.5-d)*nl[1];}d=inR(p);if(d<1.5){p.x+=(1.5-d)*nr[0];p.y+=(1.5-d)*nr[1];}
   if(p.y>F)p.y=F;if(p.y<OY+2)p.y=OY+2;p.vx=(p.x-p.px)/dt;p.vy=(p.y-p.py)/dt;const v=Math.hypot(p.vx,p.vy);if(v>6){p.vx*=6/v;p.vy*=6/v;}}}
 // ── 그리기
 const sh=(t,s)=>{const x=gl.createShader(t);gl.shaderSource(x,s);gl.compileShader(x);if(!gl.getShaderParameter(x,gl.COMPILE_STATUS))console.log(gl.getShaderInfoLog(x));return x;};
 const prog=(v,f)=>{const p=gl.createProgram();gl.attachShader(p,sh(gl.VERTEX_SHADER,v));gl.attachShader(p,sh(gl.FRAGMENT_SHADER,f));gl.linkProgram(p);return p;};
 const f2=v=>(+v).toFixed(3);
 const P1=prog(`attribute vec2 a;attribute float s;uniform float uPS;varying float vs;void main(){vec2 q=(a-vec2(${f2(OX)},${f2(OY)}))/vec2(${f2(SW)},${f2(SH)});gl_Position=vec4(q.x*2.-1.,1.-q.y*2.,0.,1.);gl_PointSize=uPS;vs=s;}`,
  `precision mediump float;varying float vs;void main(){vec2 d=gl_PointCoord-.5;float r=dot(d,d)*4.;float v=exp(-r*3.2)*step(r,1.);gl_FragColor=vec4(v*.32,vs*v*.32,0.,1.);}`);
 const P2=prog(`attribute vec2 a;varying vec2 u;void main(){u=a*.5+.5;gl_Position=vec4(a,0.,1.);}`,
 `precision highp float;varying vec2 u;uniform sampler2D uF,uTex;uniform float uT;uniform vec2 uTx;
 float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 w=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),w.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),w.x),w.y);}
 float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p=mat2(.8,.6,-.6,.8)*p*2.1;a*=.5;}return v;}
 float smin(float a,float b,float k){float hh=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,hh)-k*hh*(1.-hh);}
 void main(){vec2 p=vec2(${f2(OX)}+u.x*${f2(SW)},${f2(OY)}+(1.-u.y)*${f2(SH)});
  float cone=smin(dot(p-vec2(${f2(A[0])},${f2(A[1])}),vec2(${f2(nl[0])},${f2(nl[1])})),dot(p-vec2(${f2(C[0])},${f2(C[1])}),vec2(${f2(nr[0])},${f2(nr[1])})),${o.round||14}.);
  vec4 fd=texture2D(uF,u);float f=fd.r;
  float a=smoothstep(.42,.52,f)*smoothstep(-.5,1.2,cone)*(1.-smoothstep(${f2(F+1)},${f2(F+4)},p.y));if(a<.003){gl_FragColor=vec4(0.);return;}
  vec2 e=vec2(1./${FW}.,0.);float gx=texture2D(uF,u+e).r-texture2D(uF,u-e).r,gy=texture2D(uF,u+e.yx).r-texture2D(uF,u-e.yx).r;
  vec2 q=p*.011;vec2 w=vec2(fbm(q+vec2(uT*.12,0.)),fbm(q+vec2(5.2,1.3)-uT*.1));
  vec2 uv=(p-vec2(${f2(OX)},${f2(OY)}))/vec2(${f2(SW)},${f2(SH)})+(w-.5)*.22+vec2(gx,-gy)*.6+uTx;
  vec3 col=texture2D(uTex,clamp(uv,.01,.99)).rgb;float L=dot(col,vec3(.299,.587,.114));col=clamp(mix(vec3(L),col,1.6),0.,1.);col=pow(col,vec3(1.08));col=mix(col,col*vec3(1.05,.92,1.12),.35);
  float rim=1.-smoothstep(.52,.75,f);col=mix(col,vec3(1.),rim*.16);
  gl_FragColor=vec4(col*a,a);}`);
 const mkTex=()=>{const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);[gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T].forEach(k=>gl.texParameteri(gl.TEXTURE_2D,k,gl.CLAMP_TO_EDGE));gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);return t;};
 const fb=gl.createFramebuffer(),ft=mkTex();gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,FW,FH,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
 gl.bindFramebuffer(gl.FRAMEBUFFER,fb);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,ft,0);gl.bindFramebuffer(gl.FRAMEBUFFER,null);
 // 색: 믹스 그림, 없으면 고른 색으로 번진 그림을 만들어 씀
 const tx=mkTex();const cols=(o.cols&&o.cols.length?o.cols:['#ff2294','#4583ff','#ff7a3d']);
 {const c=document.createElement('canvas');c.width=256;c.height=160;const x=c.getContext('2d');x.fillStyle=cols[0];x.fillRect(0,0,256,160);x.filter='blur(22px)';
  cols.concat(cols).forEach((k,i)=>{x.fillStyle=k;x.beginPath();x.arc(30+((i*97)%200),25+((i*53)%110),48+(i%3)*12,0,7);x.fill();});
  gl.bindTexture(gl.TEXTURE_2D,tx);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,c);}
 if(o.tex){const im=new Image();im.onload=()=>{gl.bindTexture(gl.TEXTURE_2D,tx);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,im);};im.src=o.tex;}
 const N=P.length,buf=new Float32Array(N*3),pb=gl.createBuffer(),qb=gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER,qb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
 const a1=gl.getAttribLocation(P1,'a'),s1=gl.getAttribLocation(P1,'s'),a2=gl.getAttribLocation(P2,'a');
 const red=matchMedia('(prefers-reduced-motion: reduce)').matches;const t0=performance.now();let last=t0,acc=0,kick=0,dir=1,ks;
 for(let k=0;k<240;k++)step(1);
 const api={P,stop:false};
 function fr(now){if(api.stop)return;const t=(now-t0)/1000;acc+=Math.min(.05,(now-last)/1000);last=now;
  let th=0;
  if(o.tilt)th=o.tilt();
  if(o.auto!==false&&!red){ // 평소엔 잔잔, 몇 초에 한 번 크게 술렁
   if(t>kick){kick=t+3.4+Math.random()*1.8;dir=-dir;ks=t;}const ku=ks!==undefined?(t-ks)/.75:9;const pulse=ku<1?Math.sin(Math.PI*ku)*Math.pow(1-ku,.35):0;
   th+=.02*Math.sin(.6*t)+dir*.42*pulse*(o.auto===true||o.auto==null?1:o.auto);}
  S.gx=.07*Math.sin(th);S.gy=.07*Math.cos(th);
  while(acc>1/120){step(1);acc-=1/120;}
  if(!o.active||o.active()){
  for(let i=0;i<N;i++){const p=P[i];buf[i*3]=p.x;buf[i*3+1]=p.y;buf[i*3+2]=Math.min(1,Math.hypot(p.vx,p.vy)/3);}
  gl.bindFramebuffer(gl.FRAMEBUFFER,fb);gl.viewport(0,0,FW,FH);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(P1);gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE);gl.uniform1f(gl.getUniformLocation(P1,'uPS'),FW/SW*20);
  gl.bindBuffer(gl.ARRAY_BUFFER,pb);gl.bufferData(gl.ARRAY_BUFFER,buf,gl.DYNAMIC_DRAW);gl.enableVertexAttribArray(a1);gl.vertexAttribPointer(a1,2,gl.FLOAT,false,12,0);gl.enableVertexAttribArray(s1);gl.vertexAttribPointer(s1,1,gl.FLOAT,false,12,8);
  gl.drawArrays(gl.POINTS,0,N);gl.disableVertexAttribArray(s1);
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,W,Hh);gl.disable(gl.BLEND);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(P2);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,ft);gl.uniform1i(gl.getUniformLocation(P2,'uF'),0);
  gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,tx);gl.uniform1i(gl.getUniformLocation(P2,'uTex'),1);
  gl.uniform1f(gl.getUniformLocation(P2,'uT'),t);gl.uniform2f(gl.getUniformLocation(P2,'uTx'),th*.3,0);
  gl.bindBuffer(gl.ARRAY_BUFFER,qb);gl.enableVertexAttribArray(a2);gl.vertexAttribPointer(a2,2,gl.FLOAT,false,0,0);gl.drawArrays(gl.TRIANGLES,0,3);}
  requestAnimationFrame(fr);}
 requestAnimationFrame(fr);return api;}
