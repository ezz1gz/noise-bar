// 리큐르 단계 v2 — Figma mo-노이즈바 65:12978 ~ 65:13351
// index.html 메인 스크립트의 상태(drops, focus, step, LIQ …)와 소리 엔진을 그대로 쓰고, 화면만 새로 그림.
(()=>{
const S=document.getElementById('stage');
const root=document.createElement('div');root.id='lq2';
root.innerHTML=`
<div class="l2field" id="l2f" aria-label="리큐르를 담은 잔. 방울을 누르면 고르고, 두 손가락으로 벌리거나 오므리면 크기가 바뀌어요."></div>
<p class="l2ph" id="l2ph"></p>
<section class="l2bar l2glass" id="l2bar" role="button" tabindex="0" aria-label="리큐르 고르기 열기"><img class="l2grab" src="assets/l2-grab.svg" width="33.5" height="1.5" alt=""><div class="l2row" id="l2row"></div></section>
<button class="l2next l2glass" id="l2next" type="button" aria-label="흔들어 섞기"><img src="assets/l2-chev.svg" width="24" height="24" alt=""></button>
<section class="l2sheet l2glass" id="l2sheet" aria-label="리큐르 고르기">
  <button class="l2grab" id="l2sg" type="button" aria-label="닫기"><img src="assets/l2-grab.svg" width="33.5" height="1.5" alt=""></button>
  <div class="l2mid">
    <div class="l2scroll" id="l2sc"><div class="l2tabs" id="l2tabs" role="group" aria-label="리큐르 테마"></div><div class="l2grid" id="l2grid" role="group" aria-label="리큐르 소리"></div></div>
    <img class="l2line" src="assets/l2-line.svg" width="329.75" height="0.75" alt="">
    <div class="l2size" id="l2size" hidden><div class="l2pill" id="l2pill" role="slider" aria-valuemin="0" aria-valuemax="100" tabindex="0"><i class="l2fill" id="l2fl"></i><span id="l2sn"></span><img class="l2tick" id="l2tk" src="assets/l2-tick.svg" width="1.5" height="13.5" alt=""></div><b id="l2sp"></b></div>
  </div>
  <button class="l2mix" id="l2mix" type="button"><span>흔들어 섞기</span><img src="assets/l2-chevw.svg" width="24" height="24" alt=""></button>
</section>`;
S.appendChild(root);
const $$=id=>document.getElementById(id);

// 색: 리큐르 색을 피그마처럼 맑고 진한 방울색으로 (색상은 유지)
function vivid(h){let r=parseInt(h.slice(1,3),16)/255,g=parseInt(h.slice(3,5),16)/255,b=parseInt(h.slice(5,7),16)/255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let hh=0,s=0,l=(mx+mn)/2;
  if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);hh=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;hh/=6;}
  s=Math.max(s,.82);l=Math.min(.74,Math.max(.6,l));const q=l<.5?l*(1+s):l+s-l*s,p=2*l-q,f=t=>{t=(t+1)%1;return t<1/6?p+(q-p)*6*t:t<.5?q:t<2/3?p+(q-p)*(2/3-t)*6:p;};
  return[f(hh+1/3),f(hh),f(hh-1/3)].map(v=>Math.round(v*255));}
function paint(el,h){const[r,g,b]=vivid(h);el.style.setProperty('--c',`rgb(${r},${g},${b})`);el.style.setProperty('--c51',`rgba(${r},${g},${b},.513)`);el.style.setProperty('--c0',`rgba(${r},${g},${b},0)`);}

const L2={open:false,sel:null,cat:'breath',introT:0,blobs:new Map()};window.__L2=L2;
const ld=()=>lives();
const isSel=d=>d&&!d.dying&&L2.sel===d;
function select(d){L2.sel=d||null;if(d){focus=d;noSel=false;}else{noSel=true;}render();}

// ── 머리
function head(){$$('l2ph').textContent=character()[0]+' 소리';}
// 안내 문구·타이틀 이동은 intro.js(nbIntro)가 함 → 끝나면 문장을 띄움
function enter(){head();L2.open=false;S.classList.remove('l2open');S.classList.add('l2intro');clearTimeout(L2.introT);
  L2.introT=setTimeout(()=>{if(!S.querySelector('.nbIntro'))S.classList.remove('l2intro');},120);render();}
addEventListener('nbintro:done',e=>{if(e.detail==='liq'){setTimeout(()=>S.classList.remove('l2intro'),120);clearTimeout(L2.autoT);L2.autoT=setTimeout(()=>{if(step===2&&!L2.open&&!ld().length)openSheet();},700);}});
function leave(){clearTimeout(L2.introT);S.classList.remove('l2intro','l2open');L2.open=false;}
const _set=setStep;setStep=function(s){const was=step;_set(s);if(s===2&&was!==2)enter();else if(s!==2)leave();};

// ── 시트 열고 닫기
function openSheet(){L2.open=true;S.classList.add('l2open');S.classList.remove('l2intro');if(L2.sel)L2.cat=LBY[L2.sel.k].th;render();}
function closeSheet(){L2.open=false;S.classList.remove('l2open');stopPreview();render();}
$$('l2bar').addEventListener('click',()=>{wake();openSheet();});
$$('l2bar').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();wake();openSheet();}});
$$('l2sg').addEventListener('click',()=>closeSheet());
// 손잡이 끌기: 바는 위로 → 열기, 시트는 아래로 → 닫기
function dragOpen(el,dir,fn){let y=null;el.addEventListener('pointerdown',e=>{y=e.clientY;});addEventListener('pointermove',e=>{if(y===null)return;if((e.clientY-y)*dir>28){y=null;fn();}});addEventListener('pointerup',()=>{y=null;});}
// 바 ↔ 시트: 손가락을 따라 올라오고 내려가며(고무줄·젤리), 놓으면 쫀득하게 자리 잡기 · 탭도 OK
(()=>{const bar=$$('l2bar'),sh=$$('l2sheet');let G=null,ate=0;
  const span=()=>sh.offsetHeight+30;
  const rub=p=>p<0?-.1*(1-1/(1+(-p)*3)):p>1?1+.06*(1-1/(1+(p-1)*3)):p;
  const paintQ=(q,j)=>{const f=Math.max(0,Math.min(1,q));
    sh.style.transition='none';bar.style.transition='none';
    sh.style.transform=`translate(-50%,${(1-q)*span()}px) scale(${1-j},${1+j*.6})`;sh.style.transformOrigin='50% 100%';sh.style.opacity=String(Math.min(1,f*1.8));
    bar.style.opacity=String(Math.max(0,1-f*2.4));bar.style.transform=`translateY(${-f*30}px) scale(${1+f*.06},${1-f*.04})`;};
  const settle=open=>{const ez=open?'cubic-bezier(.34,1.45,.62,1)':'cubic-bezier(.36,0,.2,1.15)';
    sh.style.transition=`transform ${open?.62:.5}s ${ez},opacity .28s`;bar.style.transition=`transform .5s cubic-bezier(.34,1.4,.62,1),opacity .3s`;
    requestAnimationFrame(()=>{sh.style.transform='';sh.style.opacity='';bar.style.transform='';bar.style.opacity='';});
    clearTimeout(settle.t);settle.t=setTimeout(()=>{sh.style.transition='';bar.style.transition='';sh.style.transformOrigin='';},700);};
  const zone=e=>{if(!L2.open)return bar.contains(e.target);if(!sh.contains(e.target))return false;if(e.target.closest('.l2grab'))return true;
    if(e.target.closest('button,.l2it,.l2pill,.l2tab,.l2scroll'))return false;const r=sh.getBoundingClientRect();return e.clientY-r.top<56;};
  addEventListener('pointerdown',e=>{if(step!==2||!zone(e))return;wake();G={y0:e.clientY,open:L2.open,moved:false,T:[[performance.now(),e.clientY]]};try{e.target.setPointerCapture(e.pointerId);}catch(_){}},true);
  addEventListener('pointermove',e=>{if(!G)return;const dy=e.clientY-G.y0;G.T.push([performance.now(),e.clientY]);if(G.T.length>8)G.T.shift();
    if(!G.moved){if(Math.abs(dy)<6)return;G.moved=true;if(!G.open){sh.style.transition='none';S.classList.add('l2open');S.classList.remove('l2intro');render();}}
    const p=G.open?1-dy/span():-dy/span(),T=G.T,v=(T[T.length-1][1]-T[0][1])/Math.max(1,T[T.length-1][0]-T[0][0]);
    paintQ(rub(p),Math.max(-.035,Math.min(.035,Math.abs(v)*.025)));},true);
  const up=e=>{if(!G)return;const g=G;G=null;ate=performance.now();
    if(!g.moved){if(!g.open){openSheet();settle(true);}else{closeSheet();settle(false);}return;}
    const T=g.T,vy=(T[T.length-1][1]-T[0][1])/Math.max(1,T[T.length-1][0]-T[0][0]),dy=e.clientY-g.y0,p=g.open?1-dy/span():-dy/span();
    const open=e.type==='pointercancel'?g.open:(vy<-.4?true:vy>.4?false:(g.open?p>.72:p>.25));
    if(open){openSheet();settle(true);}else{closeSheet();settle(false);}};
  addEventListener('pointerup',up,true);addEventListener('pointercancel',up,true);
  addEventListener('click',e=>{if(performance.now()-ate<450&&(bar.contains(e.target)||e.target.closest('.l2grab'))){e.stopPropagation();e.preventDefault();}},true);
})();
function go(){const L=ld();if(!L.length){(window.nbNotice?nbNotice(['리큐르를 하나 이상 담아요'],stage):toast('리큐르를 하나 이상 담아요'));openSheet();return;}closeSheet();openFlow(L);}
$$('l2next').addEventListener('click',()=>{wake();ld().length?go():openSheet();});
$$('l2mix').addEventListener('click',()=>{wake();go();});

// ── 탭
CATS.forEach(([k,n])=>{const b=document.createElement('button');b.type='button';b.className='l2tab';b.dataset.k=k;b.innerHTML=`<span>${n}</span><i></i>`;
  b.addEventListener('click',()=>{wake();L2.cat=k;$$('l2sc').scrollTop=0;render();});$$('l2tabs').appendChild(b);});

// ── 담기 / 빼기
function spot(){const top=Math.max(190,(parseFloat(getComputedStyle(S).getPropertyValue('--safeT'))||54)+140),bot=H-170;
  const c=[[.38,.36],[.68,.62],[.3,.66],[.64,.34],[.5,.5]].map(([x,y])=>[W*x,top+(bot-top)*y]);
  return c.find(([x,y])=>ld().every(d=>Math.hypot(d.x-x,d.y-y)>110))||c[ld().length%c.length];}
function add(l){if(ld().length>=MAXL){(window.nbNotice?nbNotice(['리큐르는 세 가지까지 담을 수 있어요','담긴 원을 한 번 더 누르면 뺄 수 있어요'],stage):toast(`잔엔 ${MAXL}가지까지`));return;}
  gestTip=true;const[x,y]=spot();addDrop(l,x,y);const d=drops[drops.length-1];d.v=.6;d.l2drop=performance.now();select(d);}
function drop(d){if(L2.sel===d)L2.sel=null;removeDrop(d);toast(LBY[d.k].n+' 리큐르를 뺐어요');render();}
function tap(l){wake();const ex=ld().find(x=>x.k===l.k);if(ex){if(isSel(ex))drop(ex);else select(ex);return;}add(l);}
function bind(b,l){let st=null;
  b.addEventListener('pointerdown',e=>{wake();st={x:e.clientX,y:e.clientY,mode:null};st.t=setTimeout(()=>{if(st&&!st.mode){st.mode='prev';startPreview(l,b);}},320);});
  b.addEventListener('pointermove',e=>{if(st&&!st.mode&&Math.hypot(e.clientX-st.x,e.clientY-st.y)>8){clearTimeout(st.t);st.mode='scroll';}});
  const end=c=>{if(!st)return;clearTimeout(st.t);if(!st.mode&&!c)tap(l);stopPreview();st=null;};
  b.addEventListener('pointerup',()=>end(false));b.addEventListener('pointercancel',()=>end(true));b.addEventListener('pointerleave',()=>{if(st&&st.mode==='prev')end(true);});
  b.addEventListener('contextmenu',e=>e.preventDefault());b.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();tap(l);}});}
// 미리 듣기 표시는 시트 안 원에
const _sp=startPreview;startPreview=function(l,b){preview=l;lastPrev=l;b.classList.add('prev');};
const _xp=stopPreview;stopPreview=function(){if(!preview)return;preview=null;document.querySelectorAll('.l2it.prev').forEach(c=>c.classList.remove('prev'));};

// ── 크기 (= 그 리큐르의 양, 소리 크기와 방울 크기가 같이 바뀜)
{const p=$$('l2pill');let on=false;const setV=e=>{const d=L2.sel;if(!d)return;const r=p.getBoundingClientRect();d.v=Math.max(.05,Math.min(1,(e.clientX-r.left)/r.width));render();};
  p.addEventListener('pointerdown',e=>{wake();on=true;p.setPointerCapture(e.pointerId);p.classList.add('on');setV(e);});
  p.addEventListener('pointermove',e=>{if(on)setV(e);});
  const end=()=>{on=false;p.classList.remove('on');};p.addEventListener('pointerup',end);p.addEventListener('pointercancel',end);
  p.addEventListener('keydown',e=>{const d=L2.sel;if(!d)return;if(e.key==='ArrowRight'||e.key==='ArrowUp'){d.v=Math.min(1,d.v+.05);render();}if(e.key==='ArrowLeft'||e.key==='ArrowDown'){d.v=Math.max(.05,d.v-.05);render();}});}

// ── 잔 위: 누르기 = 고르기 · 빈 곳 = 해제(시트는 닫기) · 두 손가락 = 크기
const DIA=v=>70+v*380;
{const f=$$('l2f'),P=new Map();let pin=null,tapAt=null;
  const loc=e=>{const r=S.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top];};
  const hit=(x,y)=>ld().slice().sort((a,b)=>Math.hypot(a.fx-x,a.fy-y)-Math.hypot(b.fx-x,b.fy-y)).find(d=>Math.hypot(d.fx-x,d.fy-y)<Math.max(44,DIA(d.v)/2));
  f.addEventListener('pointerdown',e=>{if(step!==2)return;wake();f.setPointerCapture(e.pointerId);P.set(e.pointerId,loc(e));
    if(P.size===1)tapAt={p:loc(e),t:performance.now()};
    if(P.size===2){const[a,b]=[...P.values()];const d=L2.sel&&!L2.sel.dying?L2.sel:hit((a[0]+b[0])/2,(a[1]+b[1])/2)||ld().slice(-1)[0];tapAt=null;if(!d)return;
      pin={d,d0:Math.hypot(a[0]-b[0],a[1]-b[1])||1,v0:d.v};if(L2.sel!==d)select(d);}});
  f.addEventListener('pointermove',e=>{if(!P.has(e.pointerId))return;P.set(e.pointerId,loc(e));
    if(pin&&P.size>=2){const[a,b]=[...P.values()];pin.d.v=Math.max(.05,Math.min(1,pin.v0*Math.hypot(a[0]-b[0],a[1]-b[1])/pin.d0));render();}
    else if(tapAt&&Math.hypot(loc(e)[0]-tapAt.p[0],loc(e)[1]-tapAt.p[1])>10)tapAt=null;});
  const up=e=>{P.delete(e.pointerId);if(P.size<2)pin=null;if(P.size===0&&tapAt){const[x,y]=tapAt.p;tapAt=null;
      if(L2.open){closeSheet();return;}const d=hit(x,y);select(d&&d!==L2.sel?d:null);}};
  f.addEventListener('pointerup',up);f.addEventListener('pointercancel',e=>{P.delete(e.pointerId);pin=null;tapAt=null;});
  // 데스크톱: 트랙패드 핀치(ctrl+휠)
  f.addEventListener('wheel',e=>{if(step!==2||!e.ctrlKey)return;e.preventDefault();const d=L2.sel||ld().slice(-1)[0];if(!d)return;if(L2.sel!==d)select(d);d.v=Math.max(.05,Math.min(1,d.v*Math.exp(-e.deltaY*.01)));render();},{passive:false});}

// ── 그리기 (상태가 바뀔 때)
function render(){if(L2.sel&&L2.sel.dying)L2.sel=null;const L=ld(),sel=L2.sel;
  // 바
  const row=$$('l2row');
  if(sel&&!L2.open){const l=LBY[sel.k];row.innerHTML=`<div class="l2selL"><i class="l2slot"></i><span></span></div><b class="l2cnt"></b>`;paint(row.querySelector('.l2slot'),l.c);row.querySelector('span').textContent=l.n;row.querySelector('b').textContent=Math.round(sel.v*100)+'%';
    $$('l2bar').setAttribute('aria-label',`${l.n} ${Math.round(sel.v*100)}% · 리큐르 고르기 열기`);}
  else{row.innerHTML=`<div class="l2slots">${[0,1,2].map(i=>`<i class="l2slot${L[i]?'':' e'}"></i>`).join('')}</div>`+(L.length?`<b class="l2cnt">${L.length}/${MAXL}</b>`:`<span class="l2lab">Liqueur</span>`);
    row.querySelectorAll('.l2slot').forEach((e,i)=>{if(L[i])paint(e,LBY[L[i].k].c);});$$('l2bar').setAttribute('aria-label',`리큐르 ${L.length}/${MAXL} · 리큐르 고르기 열기`);}
  // 탭·원
  [...$$('l2tabs').children].forEach(t=>{t.setAttribute('aria-pressed',String(t.dataset.k===L2.cat));t.classList.toggle('has',L.some(x=>LBY[x.k].th===t.dataset.k));});
  const g=$$('l2grid');if(g.dataset.cat!==L2.cat){g.dataset.cat=L2.cat;g.innerHTML='';LIQ.filter(l=>l.th===L2.cat).forEach(l=>{const b=document.createElement('button');b.type='button';b.className='l2it';b.dataset.k=l.k;b.innerHTML=`<span class="l2n">${l.n}</span>`;paint(b,l.c);bind(b,l);g.appendChild(b);});}
  g.querySelectorAll('.l2it').forEach(b=>{const x=L.find(q=>q.k===b.dataset.k);b.classList.toggle('in',!!x);b.classList.toggle('fo',!!x&&x===sel);b.setAttribute('aria-label',`${LBY[b.dataset.k].n}: `+(x?(x===sel?'한 번 더 누르면 빼기':'누르면 고르기'):'누르면 잔에 담기')+' · 길게 누르면 미리 듣기');b.setAttribute('aria-pressed',String(!!x));});
  // 크기
  const sz=$$('l2size');sz.hidden=!sel;if(sel){const v=sel.v,l=LBY[sel.k];$$('l2sn').textContent=`${l.n} 볼륨`;paint($$('l2pill'),l.c);$$('l2pill').style.setProperty('--s',v.toFixed(3));$$('l2sp').textContent=Math.round(v*100)+'%';
    $$('l2fl').style.width=(v*100)+'%';$$('l2tk').style.left=`calc(12px + ${v} * (100% - 24px))`;$$('l2pill').setAttribute('aria-valuenow',Math.round(v*100));$$('l2pill').setAttribute('aria-label',`${l.n} 볼륨`);}
  $$('l2mix').classList.toggle('on',L.length>0);
  // 방울
  const seen=new Set();L.forEach(d=>{seen.add(d);if(!L2.blobs.has(d)){const b=document.createElement('div');b.className='l2blob';paint(b,LBY[d.k].c);const n=document.createElement('div');n.className='l2bl';n.textContent=LBY[d.k].n;const r=document.createElement('div');r.className='l2ring';
      const f=$$('l2f');f.appendChild(b);f.appendChild(r);f.appendChild(n);L2.blobs.set(d,{b,n,r});}});
  L2.blobs.forEach((o,d)=>{if(!seen.has(d)){o.b.animate([{opacity:1},{opacity:0,transform:o.b.style.transform+' scale(.6)'}],{duration:350});setTimeout(()=>{o.b.remove();o.n.remove();o.r.remove();},330);L2.blobs.delete(d);}});
  if(step===2)head();}
window.__l2render=render;
// 매 프레임: 방울 위치(메인 루프가 계산한 fx·fy)·크기·떨어지는 애니메이션
(function tick(){requestAnimationFrame(tick);if(step!==2)return;const now=performance.now();
  L2.blobs.forEach((o,d)=>{if(d.fx==null)return;let D=DIA(d.v),dy=0,sx=1,sy=1,a=1;const t=d.l2drop?(now-d.l2drop)/700:1;
    if(t<1){if(t<.55){const u=t/.55;dy=-(1-u*u)*260;a=Math.min(1,u*2.5);sx=.55+.2*u;sy=.7+.35*u;}else{const u=(t-.55)/.45;const k=Math.sin(u*Math.PI)*(1-u);sx=1+.22*k;sy=1-.2*k;D*=.85+.15*u;}}
    o.b.style.width=o.b.style.height=D+'px';o.b.style.opacity=a;o.b.style.transform=`translate(${d.fx-D/2}px,${d.fy-D/2+dy}px) scale(${sx},${sy})`;
    const R=D*.89;o.r.style.width=o.r.style.height=R+'px';o.r.style.transform=`translate(${d.fx-R/2}px,${d.fy-R/2}px)`;o.r.classList.toggle('on',isSel(d)&&!L2.open&&t>=1);
    o.n.style.opacity=a;o.n.style.transform=`translate(calc(${d.fx}px - 50%),calc(${d.fy+dy}px - 50%))`;});})();
// 다른 곳(메인 코드)에서 리큐르가 바뀌면 같이 갱신
const _ul=updLiq;updLiq=function(){_ul.apply(this,arguments);if(step===2)render();};
// 글라스(WebGL 굴절)를 새 바·원·시트 위치에 — index.html frame()에서 호출
window.__l2glass=(sr,put)=>{const rect=id=>$$(id).getBoundingClientRect();
  if(L2.open){put(0,rect('l2sheet'),8,GLASS_FX.bar);}else{put(0,rect('l2bar'),10,GLASS_FX.bar);put(1,rect('l2next'),30,GLASS_FX.next);}
  return rect('l2bar').top-sr.top-8;};
render();if(step===2)enter();
})();
