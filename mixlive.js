// 살아있는 믹스: MIX에서 만든 메타볼(같은 셰이더·같은 좌표 지도·같은 휘젓기 세기·같은 색)을 다음 화면에서도 그대로 이어 움직임
// - MIX 화면이 나갈 때 saveFrom(...)으로 좌표 지도(시뮬 상태)·시간을 세션에 저장
// - 글라스·가니쉬·서브·플레이는 start()로 같은 시뮬을 이어 돌리고, 그 캔버스를 배경 액체 텍스처로 씀 (common.js bindMixTex)
// - 화면을 떠날 때마다 다시 저장 → 다음 화면이 그 자리부터 이어감 · 그림(mixshot)도 함께 갱신
(function(){
const KEY='nb-mixstate';
const sig=()=>{try{return MIXSIG();}catch(_){return '';}};
function readState(){try{const s=JSON.parse(sessionStorage.getItem(KEY)||'null');return s&&s.sig===sig()&&s.map?s:null;}catch(_){return null;}}
// ── 좌표 지도(실수) ↔ RGBA8 두 바이트씩 (손실 거의 없음)
const PACK_FS=`#version 300 es
precision highp float;uniform sampler2D uT;uniform vec2 uR;out vec4 o;
vec2 enc(float v){float x=clamp((v+.5)*.5,0.,1.)*65535.;float hi=floor(x/256.);return vec2(hi,x-hi*256.)/255.;}
void main(){vec2 v=texture(uT,gl_FragCoord.xy/uR).xy;o=vec4(enc(v.x),enc(v.y));}`;
const UNPACK_FS=`#version 300 es
precision highp float;uniform sampler2D uT;uniform vec2 uR;out vec4 o;
float dec(vec2 b){return (floor(b.x*255.+.5)*256.+floor(b.y*255.+.5))/65535.*2.-.5;}
void main(){vec4 c=texture(uT,gl_FragCoord.xy/uR);o=vec4(dec(c.xy),dec(c.zw),0.,1.);}`;
function mkProg(gl,fs,names){const VS=NBMIXSH.VS;const sh=(t,s)=>{const x=gl.createShader(t);gl.shaderSource(x,s);gl.compileShader(x);if(!gl.getShaderParameter(x,gl.COMPILE_STATUS))console.error(gl.getShaderInfoLog(x));return x;};
  const p=gl.createProgram();gl.attachShader(p,sh(gl.VERTEX_SHADER,VS));gl.attachShader(p,sh(gl.FRAGMENT_SHADER,fs));gl.bindAttribLocation(p,0,'a');gl.linkProgram(p);const u={};names.forEach(n=>u[n]=gl.getUniformLocation(p,n));return{p,u};}
function b64(u8){let s='';const C=0x8000;for(let i=0;i<u8.length;i+=C)s+=String.fromCharCode.apply(null,u8.subarray(i,i+C));return btoa(s);}
function unb64(s){const b=atob(s),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u;}
function packTex(gl,tex,w,h){if(!gl.__nbPack)gl.__nbPack=mkProg(gl,PACK_FS,['uT','uR']);const P=gl.__nbPack;
  const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,w,h,0,gl.RGBA,gl.UNSIGNED_BYTE,null);[gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER].forEach(k=>gl.texParameteri(gl.TEXTURE_2D,k,gl.NEAREST));
  const fb=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,fb);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,t,0);
  gl.useProgram(P.p);gl.viewport(0,0,w,h);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tex);gl.uniform1i(P.u.uT,0);gl.uniform2f(P.u.uR,w,h);gl.drawArrays(gl.TRIANGLES,0,3);
  const px=new Uint8Array(w*h*4);gl.readPixels(0,0,w,h,gl.RGBA,gl.UNSIGNED_BYTE,px);gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.deleteFramebuffer(fb);gl.deleteTexture(t);return b64(px);}
function saveFrom(gl,tex,w,h,o){const s={sig:sig(),simW:w,simH:h,simT:o.simT,dispT:o.dispT,seed:o.seed,mk:o.mk,stir:o.stir,map:packTex(gl,tex,w,h)};try{sessionStorage.setItem(KEY,JSON.stringify(s));}catch(_){}}

let LIVE=null;
function start(){if(LIVE)return LIVE;const st=readState();if(!st||!window.NBMIXSH)return null;
  const W=393,H=852,cv=document.createElement('canvas');cv.width=W;cv.height=H;
  const gl=cv.getContext('webgl2',{antialias:false,preserveDrawingBuffer:true,alpha:false});if(!gl)return null;
  const {SIM,DISP}=NBMIXSH;
  const sim=mkProg(gl,SIM,['uPrev','uSimRes','uTime','uDt','uFlow','uScale','uAsp','uRelax','uPtrOn','uPtrR','uPtr']);
  const disp=mkProg(gl,DISP,['uSnap','uHasSnap','uMap','uRes','uTime','uMix','uScale','uSoft','uAsp','uPal','uPal2','uPal3','uCuts','uCock','uWhite','uPaint','uShare','uMood','uGa','uGb','uTa','uTb','uDrop']);
  const unp=mkProg(gl,UNPACK_FS,['uT','uR']);
  const vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
  const hasFloat=!!(gl.getExtension('EXT_color_buffer_float')||gl.getExtension('EXT_color_buffer_half_float'));let FMT=hasFloat?{i:gl.RGBA16F,t:gl.HALF_FLOAT}:{i:gl.RGBA8,t:gl.UNSIGNED_BYTE};
  const sw=st.simW,shh=st.simH;
  function tgt(){const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);gl.texImage2D(gl.TEXTURE_2D,0,FMT.i,sw,shh,0,gl.RGBA,FMT.t,null);[gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER].forEach(k=>gl.texParameteri(gl.TEXTURE_2D,k,gl.LINEAR));[gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T].forEach(k=>gl.texParameteri(gl.TEXTURE_2D,k,gl.CLAMP_TO_EDGE));
    const fb=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,fb);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,tex,0);return{tex,fb,ok:gl.checkFramebufferStatus(gl.FRAMEBUFFER)===gl.FRAMEBUFFER_COMPLETE};}
  let A=tgt(),B=tgt();if(!A.ok&&FMT.i!==gl.RGBA8){FMT={i:gl.RGBA8,t:gl.UNSIGNED_BYTE};A=tgt();B=tgt();}
  // 저장된 좌표 지도 되살리기
  {const px=unb64(st.map);const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,sw,shh,0,gl.RGBA,gl.UNSIGNED_BYTE,px);[gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER].forEach(k=>gl.texParameteri(gl.TEXTURE_2D,k,gl.NEAREST));
   gl.useProgram(unp.p);gl.bindFramebuffer(gl.FRAMEBUFFER,A.fb);gl.viewport(0,0,sw,shh);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,t);gl.uniform1i(unp.u.uT,0);gl.uniform2f(unp.u.uR,sw,shh);gl.drawArrays(gl.TRIANGLES,0,3);gl.deleteTexture(t);}
  // MIX와 같은 값 (common.js가 주소에서 다시 계산)
  const PAL=PC.map(hexRGB),PAL2=PK.map((k,i)=>hexRGB(COCK[k]||PC[i]));
  const tot=SH.reduce((a,b)=>a+b,0)||1,share=SH.map(v=>v/tot);let acc=0;const cutsT=[0,1,2].map(i=>(acc+=share[i]));const q=share.map(Math.sqrt),qt=q.reduce((a,b)=>a+b,0);acc=0;const cutsS=[0,1,2].map(i=>(acc+=q[i])/qt);
  const cuts=cutsT.map((c,i)=>c+(cutsS[i]-c)*.75);
  const [GR,TN]=liqGrade(),drop={x:+(Q.get('dx')||.5),y:+(Q.get('dy')||.45),seed:st.seed||0};
  const stir=st.stir!=null?st.stir:STIR,scale=.4,mk=st.mk||1,mood=moodVec();
  let simT=st.simT||0,dispT=st.dispT||0;
  function simStep(dt){gl.useProgram(sim.p);gl.bindFramebuffer(gl.FRAMEBUFFER,B.fb);gl.viewport(0,0,sw,shh);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,A.tex);const u=sim.u;
    gl.uniform1i(u.uPrev,0);gl.uniform2f(u.uSimRes,sw,shh);gl.uniform1f(u.uTime,simT);gl.uniform1f(u.uDt,dt);gl.uniform1f(u.uFlow,(.05+stir*.5)*mk);gl.uniform1f(u.uScale,.8+scale*2.4);gl.uniform1f(u.uAsp,W/H);gl.uniform1f(u.uRelax,.04);
    gl.uniform1f(u.uPtrOn,0);gl.uniform1f(u.uPtrR,.14);gl.uniform4f(u.uPtr,0,0,0,0);gl.drawArrays(gl.TRIANGLES,0,3);[A,B]=[B,A];}
  function draw(){gl.useProgram(disp.p);gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,W,H);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,A.tex);const u=disp.u;
    gl.uniform1i(u.uMap,0);gl.uniform1i(u.uSnap,1);gl.uniform1f(u.uHasSnap,0);gl.uniform2f(u.uRes,W,H);gl.uniform1f(u.uTime,dispT);gl.uniform1f(u.uMix,1);gl.uniform1f(u.uScale,.7+scale*2.2);
    gl.uniform1f(u.uSoft,.02+(1-.3)*.3);gl.uniform1f(u.uAsp,W/H);
    gl.uniform3fv(u.uPal,new Float32Array(PAL.flat()));gl.uniform3fv(u.uPal2,new Float32Array(PAL2.flat()));gl.uniform3fv(u.uPal3,new Float32Array(PAL.flat()));gl.uniform1f(u.uCock,1);gl.uniform1f(u.uPaint,0);
    gl.uniform4fv(u.uShare,new Float32Array(share));gl.uniform4fv(u.uMood,new Float32Array(mood));gl.uniform1f(u.uWhite,0);
    gl.uniform4f(u.uGa,0,0,1,0);gl.uniform2f(u.uTa,0,0);gl.uniform4fv(u.uGb,new Float32Array(GR));gl.uniform2fv(u.uTb,new Float32Array(TN));gl.uniform4f(u.uDrop,drop.x,1-drop.y,LT.length?3:0,drop.seed);
    gl.uniform3f(u.uCuts,cuts[0],cuts[1],cuts[2]);gl.drawArrays(gl.TRIANGLES,0,3);}
  let last=performance.now()/1000;const subs=new Set();
  function frame(){const now=performance.now()/1000,dt=Math.min(now-last,1/30);last=now;
    simT+=dt*(.25+stir*2.2);dispT+=dt*(.3+stir*2.4);simStep(dt);draw();subs.forEach(f=>{try{f(cv);}catch(_){}});requestAnimationFrame(frame);}
  function save(){try{const s={sig:sig(),simW:sw,simH:shh,simT,dispT,seed:drop.seed,mk,stir,map:packTex(gl,A.tex,sw,shh)};sessionStorage.setItem(KEY,JSON.stringify(s));}catch(_){}
    try{saveMixShot(cv.toDataURL('image/jpeg',.9));}catch(_){}}
  addEventListener('pagehide',save);document.addEventListener('visibilitychange',()=>{if(document.hidden)save();});
  // 링크로 넘어갈 때도 먼저 저장 (location.href 바꾸기 전에 pagehide가 늦게 오는 브라우저 대비)
  addEventListener('beforeunload',save);
  draw();frame();
  LIVE={canvas:cv,save,on:f=>subs.add(f),off:f=>subs.delete(f)};return LIVE;}
window.NBMixLive={start,saveFrom,has:()=>!!readState()};
})();
