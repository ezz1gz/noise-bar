// ── NOISE BAR 플레이 그래프 — 실제 음악 파형이 보이는 원리 그대로
//   시간이 가로축: 재생헤드 왼쪽 = 이미 들린 소리, 오른쪽 = 곧 들릴 소리 (실제 재생 중인 버퍼의 위치를 따라 읽음)
//   막대 하나 = 그 순간 베이스 노이즈들의 실제 크기(RMS) · 리큐르 선 = 그 리큐르의 실제 크기 · 가니쉬 = 실제로 울리는 시점과 세기
//   조절 패널은 '디자인 스타일'만 바꿈 (굵기·대시·크기·투명도·보이는 시간). 움직임 자체는 소리 값에서 나옴
(function(){
const KEY='nb-graph-cfg';
const DEF={
 base:{count:64,width:2.2,height:1,min:2,future:.55,window:10,head:.45,round:0,contrast:.85},
 liq:{range:1,themes:{breath:{width:1.9,dash:0,gap:0,smooth:.7,alpha:.9},flow:{width:1.9,dash:10,gap:7,smooth:.6,alpha:.85},
                      beat:{width:1.9,dash:0,gap:0,step:.25,alpha:.9},scatter:{width:2.2,dash:0,gap:0,dot:1,alpha:.9}}},
 gar:{size:1,ring:.6,spread:.8,alpha:.95}};
const clone=o=>JSON.parse(JSON.stringify(o));
function merge(d,s){if(!s||typeof s!=='object')return d;for(const k in d){if(s[k]===undefined)continue;if(typeof d[k]==='object'&&d[k])merge(d[k],s[k]);else if(typeof s[k]===typeof d[k])d[k]=s[k];}return d;}
function load(){let s=null;try{s=JSON.parse(localStorage.getItem(KEY)||'null');}catch(_){}return merge(clone(DEF),s);}
const NBG={DEF,KEY,cfg:load(),
 save(){try{localStorage.setItem(KEY,JSON.stringify(this.cfg));return true;}catch(_){return false;}},
 reload(){this.cfg=load();},reset(){this.cfg=clone(DEF);},saved(){try{return localStorage.getItem(KEY);}catch(_){return null;}},
 gar:()=>[]};   // play.html이 채움: 가니쉬 울림 목록 [{i,k,n,sz,t,lv}]
window.NBG=NBG;

// ── 버퍼 → 20ms 단위 실제 크기(RMS) 표
const ENV=new WeakMap(),PKE=new WeakMap(),HOP=.02;
function envOf(buf){let e=ENV.get(buf);if(e)return e;const d=buf.getChannelData(0),sr=buf.sampleRate,h=Math.round(HOP*sr),n=Math.floor(d.length/h);e=new Float32Array(n);
 for(let i=0;i<n;i++){let s=0;for(let j=i*h,k=j+h;j<k;j++)s+=d[j]*d[j];e[i]=Math.sqrt(s/h);}ENV.set(buf,e);return e;}
// 막대용: 실제 파형 그림처럼 구간의 최고 진폭(peak)
function pkOf(buf){let e=PKE.get(buf);if(e)return e;const d=buf.getChannelData(0),sr=buf.sampleRate,h=Math.round(HOP*sr),n=Math.floor(d.length/h);e=new Float32Array(n);
 for(let i=0;i<n;i++){let m=0;for(let j=i*h,k=j+h;j<k;j++){const a=d[j]<0?-d[j]:d[j];if(a>m)m=a;}e[i]=m;}PKE.set(buf,e);return e;}
function pmax(e,dur,p0,p1){const n=Math.max(1,Math.ceil((p1-p0)/HOP));let m=0;for(let k=0;k<n;k++){const v=at(e,dur,p0+(k+.5)*(p1-p0)/n);if(v>m)m=v;}return m;}
function at(e,dur,p){p=((p%dur)+dur)%dur;const x=p/HOP,i=Math.floor(x)%e.length,f=x-Math.floor(x);return e[i]*(1-f)+e[(i+1)%e.length]*f;}
function slice(e,dur,p0,p1){const n=Math.max(1,Math.ceil((p1-p0)/HOP));let s=0;for(let k=0;k<n;k++){const v=at(e,dur,p0+(k+.5)*(p1-p0)/n);s+=v*v;}return Math.sqrt(s/n);}

// ── 실제 소리 연결 (부모 프로토타입의 오디오 엔진)
function audio(){try{return parent!==window&&parent.__nbAudio?parent.__nbAudio():null;}catch(_){return null;}}
function srcOf(g,AC){if(!g||!g.buf)return null;const rate=g.src&&g.src.playbackRate?g.src.playbackRate.value:1;
 return{e:envOf(g.buf),pk:pkOf(g.buf),dur:g.buf.duration,gain:g.gain.value,pos:t=>g.off+(t-g.t0)*rate};}

// 소리가 없을 때(단독으로 열었을 때) 쓰는 대체 값
const hs=n=>{const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s);};
const n1=x=>{const i=Math.floor(x),f=x-i,u=f*f*(3-2*f);return hs(i)*(1-u)+hs(i+1)*u;};

// 가니쉬 모양 (garnish.html 공식)
function star(n,R,ratio){const p=new Path2D();for(let i=0;i<n*2;i++){const a=-Math.PI/2+i*Math.PI/n,r=i%2?R*ratio:R;i?p.lineTo(r*Math.cos(a),r*Math.sin(a)):p.moveTo(r*Math.cos(a),r*Math.sin(a));}p.closePath();return p;}
function lobes(n,R){const p=new Path2D(),pr=R*(n<=4?.5:n<=5?.45:n<=6?.4:.33),cr=R-pr;for(let i=0;i<n;i++){const a=-Math.PI/2+i*2*Math.PI/n+(n==4?Math.PI/4:0);p.moveTo(cr*Math.cos(a)+pr,cr*Math.sin(a));p.arc(cr*Math.cos(a),cr*Math.sin(a),pr,0,Math.PI*2);}p.moveTo(cr*1.05,0);p.arc(0,0,cr*1.05,0,Math.PI*2);return p;}
function blob(n,R,seed){let r0=Math.floor(seed*1e5)+7;const amp=[];for(let j=0;j<n;j++){r0=(r0*16807)%2147483647;amp.push(.12+(r0%1000)/1000*.12);}const p=new Path2D(),M=n*16;
 for(let i=0;i<=M;i++){const t=i/M*2*Math.PI,j=Math.floor(i/16)%n,u=(i%16)/16,am=amp[j]*(1-u)+amp[(j+1)%n]*u,r=R*(.84+am*.55*Math.cos(n*t+seed*3));i?p.lineTo(r*Math.cos(t),r*Math.sin(t)):p.moveTo(r*Math.cos(t),r*Math.sin(t));}p.closePath();return p;}
const SC={};const shape=(k,n)=>SC[k+n]||(SC[k+n]=k==='spark'?star(n,28,.4):k==='fizz'?star(n,26.6,.69):k==='blossom'?lobes(n,23.5):blob(n,25,.37));
const FAMC={fizz:[8,10,12,14],spark:[4,5,6,8],blossom:[4,5,6,8],melt:[3,4,5,6]};

const PEAK={base:.05,liq:.05};
function draw(ctx,R,now,clock){const c=NBG.cfg,B=c.base,A=audio(),AC=A&&A.AC;const live=!!(AC&&A.NG&&A.NG.length&&A.NG[0].buf);
 const W=R.x1-R.x0,phx=R.x0+W*B.head,pps=W/B.window,N=Math.round(B.count),dt=B.window/N,tA=live?AC.currentTime:clock;
 const tOf=x=>tA+(x-phx)/pps;
 // ── 베이스: 섞인 노이즈들의 실제 크기 합 (독립 소리 → 제곱합의 제곱근)
 const base=live?A.NG.map(g=>srcOf(g,AC)).filter(Boolean):null;
 const lv=new Float32Array(N);let mx=0,mn=1e9;
 for(let i=0;i<N;i++){const t0=tOf(R.x0+i*W/N),t1=t0+dt;let s=0;
  if(live)base.forEach(S=>{if(S.gain<1e-4)return;const v=S.gain*pmax(S.pk,S.dur,S.pos(t0),S.pos(t1));s+=v*v;});
  else{const v=.35+.65*Math.pow(n1(t0*3.1),1.6)*(.6+.4*n1(t0*.4+9));s=v*v;}
  lv[i]=Math.sqrt(s);if(lv[i]>mx)mx=lv[i];if(lv[i]<mn)mn=lv[i];}
 PEAK.base+=(Math.max(mx,1e-4)-PEAK.base)*(mx>PEAK.base?.2:.01);PEAK.lo=(PEAK.lo===undefined?mn:PEAK.lo+(mn-PEAK.lo)*.05);const lo=Math.min(PEAK.lo,PEAK.base*.98)*B.contrast;
 for(let i=0;i<N;i++){const x=R.x0+(i+.5)*W/N,h=Math.max(B.min,Math.max(0,lv[i]-lo)/(PEAK.base-lo)*R.bh*2*B.height);ctx.globalAlpha=x<=phx?1:B.future;ctx.fillStyle='#fff';
  if(B.round>0){ctx.beginPath();ctx.roundRect(x-B.width/2,R.cy-h/2,B.width,h,Math.min(B.width/2,h/2));ctx.fill();}else ctx.fillRect(x-B.width/2,R.cy-h/2,B.width,h);}
 ctx.globalAlpha=.6;ctx.fillRect(phx-1.3,R.cy-R.bh*1.9,2.6,R.bh*3.8);ctx.globalAlpha=1;
 // ── 리큐르: 각자 실제 크기 → 테마 모양
 let lqs=[];
 if(live){lqs=A.lives.map(d=>({th:d.th,S:srcOf(A.LG[d.k],AC)})).filter(o=>o.S);if(A.preview&&!A.lives.some(d=>d.k===A.preview)){const S=srcOf(A.LG[A.preview],AC);if(S)lqs.push({th:NBG.previewTheme||'flow',S});}}
 else lqs=[{th:'flow',S:null},{th:'beat',S:null},{th:'breath',S:null}];
 const X0=R.x0-14,X1=R.x1+14,STEP=3,M=Math.ceil((X1-X0)/STEP)+1;let lmx=0;
 const rows=lqs.map((L,j)=>{const P=c.liq.themes[L.th]||c.liq.themes.flow,win=L.th==='beat'?P.step:L.th==='scatter'?.06:Math.max(.04,.04+.5*P.smooth*(L.th==='breath'?1.4:1));
  const v=new Float32Array(M);for(let m=0;m<M;m++){const x=X0+m*STEP;let t=tOf(x);if(L.th==='beat')t=Math.floor(t/win)*win;
   v[m]=L.S?L.S.gain*slice(L.S.e,L.S.dur,L.S.pos(t),L.S.pos(t+win)):(.3+.7*n1(t*(L.th==='beat'?4:1.3)+j*7))*.05*(1-j*.2);if(v[m]>lmx)lmx=v[m];}return{L,P,v,win};});
 PEAK.liq+=(Math.max(lmx,1e-4)-PEAK.liq)*(lmx>PEAK.liq?.2:.01);
 const rng=R.lr*c.liq.range,taper=x=>{const u=(x-X0)/(X1-X0);return .35+.65*Math.pow(Math.sin(Math.PI*u),.5);};
 rows.forEach(({L,P,v,win},j)=>{let mean=0;for(const a of v)mean+=a;mean/=v.length;
  ctx.strokeStyle='#fff';ctx.fillStyle='#fff';ctx.lineWidth=P.width;ctx.lineCap='round';ctx.lineJoin='round';ctx.globalAlpha=P.alpha;
  if(L.th==='scatter'){for(let m=0;m<M;m+=2){const x=X0+m*STEP,a=v[m]/PEAK.liq,up=v[m]>mean*1.08;if(!up&&m%6)continue;const y=R.cy-(v[m]-mean)/PEAK.liq*rng*1.6*taper(x)*(hs(m*3.3+j)>.5?1:-1);
    ctx.globalAlpha=P.alpha*(x<=phx?1:.7)*(up?1:.45);ctx.beginPath();ctx.arc(x,y,P.width*P.dot*(.5+a*1.1),0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;return;}
  ctx.beginPath();
  if(L.th==='beat'){let prev=null;for(let m=0;m<M;m++){const x=X0+m*STEP,t=tOf(x),k=Math.floor(t/win),sg=k%2?1:-1,y=R.cy-sg*(v[m]/PEAK.liq)*rng*taper(x);
    if(m===0)ctx.moveTo(x,y);else{if(prev!==null&&Math.abs(prev-y)>.5)ctx.lineTo(x,prev);ctx.lineTo(x,y);}prev=y;}}
  else for(let m=0;m<M;m++){const x=X0+m*STEP,y=R.cy-(v[m]-mean)/PEAK.liq*rng*1.8*taper(x);m?ctx.lineTo(x,y):ctx.moveTo(x,y);}
  ctx.setLineDash(P.dash>0?[P.dash,P.gap||P.dash*.7]:[]);ctx.lineDashOffset=0;ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1;});
 // ── 가니쉬: 실제로 울리는(울릴) 시점에 그 세기로 — 위 = 높은 소리
 const tP=clock;NBG.gar().forEach(ev=>{const x=phx+(ev.t-tP)*pps;if(x<R.x0-30||x>R.x1+30)return;
  const rank=Math.max(0,(FAMC[ev.k]||[]).indexOf(ev.n))/3,side=ev.i%2?1:-1,y=R.cy-R.lr*c.gar.spread*(.25+.75*rank)*(rank>=.5?1:side)*.85;
  const age=tP-ev.t,pop=age>=0?Math.exp(-age*6):0,s=(.16+.26*ev.lv)*c.gar.size*(1+.35*pop);
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.globalAlpha=c.gar.alpha*(age>=0?1:.6);ctx.fillStyle='#fff';ctx.fill(shape(ev.k,ev.n));ctx.restore();
  if(pop>.03&&c.gar.ring>0){ctx.globalAlpha=c.gar.ring*pop;ctx.strokeStyle='#fff';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(x,y,30*s*(1+1.2*(1-pop)),0,Math.PI*2);ctx.stroke();}ctx.globalAlpha=1;});
}
NBG.mount=(cv,R,active)=>{const ctx=cv.getContext('2d');const d=Math.min(2,devicePixelRatio||1);cv.width=402*d;cv.height=874*d;let clock=0,last=performance.now();
 (function fr(now){const dt=Math.min(.05,(now-last)/1000);last=now;const on=active();if(!on.paused)clock+=dt;NBG.clock=clock;
   if(on.show){ctx.setTransform(d,0,0,d,0,0);ctx.clearRect(0,0,402,874);try{draw(ctx,R,now,clock);}catch(e){console.error(e);}}requestAnimationFrame(fr);})(last);};
})();
