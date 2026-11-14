// 단계 안내 문구(자막) → 끝나면 큰 타이틀이 작아져 상단 가운데(gnb)로 올라가고, 그때부터 조작 가능
// nbIntro({key, lines:[...], host, title, onDone})
//  - host: 문구를 깔 요소 (기본 #ph)
//  - title: 작아질 타이틀 (HTML 요소 · SVG <g> · 'auto' = 상단 SVG에서 타이틀 패스를 찾아 묶음 · null = 없음)
//  - 같은 세션에서 이미 본 단계는 문구 없이 바로 작은 타이틀 상태로
(function(){
const css=`.nbIntro{position:absolute;inset:0;z-index:60;pointer-events:auto;touch-action:none;cursor:pointer}
.nbIntro .cp{position:absolute;left:0;right:0;top:46.4%;display:flex;flex-direction:column;align-items:center;transform:translateY(-50%);
 font-family:'Pretendard Variable','Pretendard',-apple-system,'Apple SD Gothic Neo','Noto Sans KR',sans-serif;font-size:14px;font-weight:400;letter-spacing:-.02em;line-height:23px;color:#fff}
.nbIntro .cp span{display:block;height:23px;padding:0 9px;background:rgba(0,0,0,.4);text-shadow:0 0 10px rgba(0,0,0,.25);white-space:nowrap;
 opacity:0;transform:translateY(6px);transition:opacity .45s ease,transform .6s cubic-bezier(.32,.72,0,1)}
.nbIntro .cp span.on{opacity:1;transform:none}
.nbIntro .cp span.nbHd{color:rgba(255,255,255,.75)}
.nbIntro .cp.gone span{opacity:0;transform:translateY(-4px);transition:opacity .3s ease,transform .35s ease}
.nbNote{position:absolute;left:0;right:0;top:46.4%;z-index:59;display:flex;flex-direction:column;align-items:center;transform:translateY(-50%);pointer-events:none;
 font-family:'Pretendard Variable','Pretendard',-apple-system,'Apple SD Gothic Neo','Noto Sans KR',sans-serif;font-size:14px;letter-spacing:-.02em;line-height:23px;color:#fff;transition:opacity .35s ease}
.nbNote span{display:block;height:23px;padding:0 9px;background:rgba(0,0,0,.4);text-shadow:0 0 10px rgba(0,0,0,.25);white-space:nowrap}
.nbNote.out{opacity:0}
.nbIntro.out .cp span,.nbIntro.out .cp span.on{opacity:0;transform:translateY(-4px);transition:opacity .35s ease,transform .4s ease}`;
function addCss(){if(document.getElementById('nbIntroCss'))return;const s=document.createElement('style');s.id='nbIntroCss';s.textContent=css;document.head.appendChild(s);}
const ease=t=>1-Math.pow(1-t,3)*(1-t*.0);           // easeOutCubic
const spring=t=>{const e=1-Math.exp(-7*t)*Math.cos(9*t);return t>=1?1:e;}; // 살짝 넘쳤다 자리 잡기
// 상단 SVG에서 타이틀(왼쪽 큰 글자) 패스 묶기
function autoTitle(root){
  const svg=[...root.querySelectorAll('svg')].find(s=>s.viewBox&&s.viewBox.baseVal&&s.viewBox.baseVal.width>=380);if(!svg)return null;
  const ps=[...svg.querySelectorAll('path')].filter(p=>{try{const b=p.getBBox();return b.y>=92&&b.y+b.height<=172&&b.x<300&&b.height>4;}catch(e){return false;}});
  if(!ps.length)return null;const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('class','nbTtl');
  ps[0].parentNode.insertBefore(g,ps[0]);ps.forEach(p=>g.appendChild(p));return g;}
// 타이틀을 gnb 가운데로 (높이 ~20px)
function shrink(el,host,instant,done){
  if(!el){done&&done();return;}
  const D=instant?0:720,t0=performance.now();
  if(el instanceof SVGGraphicsElement&&!(el instanceof SVGSVGElement)){
    const b=el.getBBox(),cx=b.x+b.width/2,cy=b.y+b.height/2;const s=Math.min(20/b.height,.6),tx=393/2,ty=78;
    const set=k=>{const x=cx+(tx-cx)*k,y=cy+(ty-cy)*k,sc=1+(s-1)*k;el.setAttribute('transform',`translate(${x} ${y}) scale(${sc}) translate(${-cx} ${-cy})`);};
    if(!D){set(1);done&&done();return;}
    const f=now=>{const t=Math.min(1,(now-t0)/D);set(t<1?spring(t):1);if(t<1)requestAnimationFrame(f);else done&&done();};requestAnimationFrame(f);return;}
  // HTML/SVG 루트: 화면 좌표 → host 좌표(축척 k 보정)
  const hr=host.getBoundingClientRect(),k=hr.width/(host.offsetWidth||hr.width)||1;
  el.style.translate='';el.style.scale='';
  const r=el.getBoundingClientRect(),cx=(r.left+r.width/2-hr.left)/k,cy=(r.top+r.height/2-hr.top)/k,h=r.height/k;
  const g=host.querySelector('.gnb'),gr=g&&g.getBoundingClientRect();
  const tx=host.offsetWidth/2||196.5,ty=gr&&gr.height?(gr.top+gr.height/2-hr.top)/k:78;
  const th=el.dataset.nbH?+el.dataset.nbH:20,s=Math.min(th/h,.6);
  el.style.transformOrigin='50% 50%';
  const set=q=>{el.style.translate=`${(tx-cx)*q}px ${(ty-cy)*q}px`;el.style.scale=String(1+(s-1)*q);};
  if(!D){set(1);done&&done();return;}
  const f=now=>{const t=Math.min(1,(now-t0)/D);set(t<1?spring(t):1);if(t<1)requestAnimationFrame(f);else done&&done();};requestAnimationFrame(f);}
// 짧은 안내(자막 모양) — 조작은 막지 않음
window.nbNotice=function(lines,host){addCss();host=host||document.getElementById('ph')||document.getElementById('stage')||document.body;
  if(typeof lines==='string')lines=[lines];let n=host.querySelector('.nbNote');if(n){clearTimeout(n._t);n.remove();}
  n=document.createElement('div');n.className='nbNote';n.setAttribute('role','status');n.innerHTML=lines.map(l=>`<span>${l}</span>`).join('');host.appendChild(n);
  n.animate([{opacity:0,transform:'translateY(calc(-50% + 6px))'},{opacity:1,transform:'translateY(-50%)'}],{duration:350,easing:'cubic-bezier(.32,.72,0,1)'});
  n._t=setTimeout(()=>{n.classList.add('out');setTimeout(()=>n.remove(),380);},2200+lines.join('').length*40);};
window.nbIntro=function(o){
  addCss();const host=o.host||document.getElementById('ph')||document.body;
  let title=o.title==='auto'?autoTitle(host):o.title||null;
  const key='nbIntro:'+(o.key||location.pathname);let seen=false;try{seen=sessionStorage.getItem(key)==='1';}catch(e){}
  if(new URLSearchParams(location.search).has('intro'))seen=false;
  const finish=()=>{try{sessionStorage.setItem(key,'1');}catch(e){}host.classList&&host.classList.add('nbIntroDone');o.onDone&&o.onDone();try{dispatchEvent(new CustomEvent('nbintro:done',{detail:o.key}));}catch(e){}};
  if(seen||!((o.pages&&o.pages.length)||(o.lines&&o.lines.length))){shrink(title,host,true,finish);return{skip(){}};}
  // pages: [[줄…],[줄…]] — 1장 = 이 단계 설명, 2장 = 조작법 (탭하면 넘김)
  const pages=o.pages||[o.lines];
  const ov=document.createElement('div');ov.className='nbIntro';ov.setAttribute('role','status');ov.setAttribute('aria-label',pages.map(p=>p.join(' ')).join(' · '));host.appendChild(ov);
  let T=[],gone=false,pi=-1,sp=[],cp=null;
  const clr=()=>{T.forEach(clearTimeout);T=[];};
  const end=()=>{if(gone)return;gone=true;clr();ov.classList.add('out');
    setTimeout(()=>{ov.remove();shrink(title,host,false,finish);},380);};
  const show=i=>{clr();pi=i;const old=cp;if(old){old.classList.add('gone');setTimeout(()=>old.remove(),360);}
    cp=document.createElement('div');cp.className='cp';cp.innerHTML=pages[i].map((l,k)=>`<span${k===0&&pages.length>1&&i>0?' class="nbHd"':''}>${l}</span>`).join('');ov.appendChild(cp);
    sp=[...cp.querySelectorAll('span')];const d0=old?380:350;
    sp.forEach((s,k)=>T.push(setTimeout(()=>s.classList.add('on'),d0+k*380)));
    const hold=d0+sp.length*380+Math.max(2800,pages[i].join('').length*75);
    T.push(setTimeout(next,hold));};
  const next=()=>{if(pi+1<pages.length)show(pi+1);else end();};
  show(0);
  // 탭해도 넘어가지 않음 (끝까지 다 보여준 뒤 몇 초 있다가 저절로 사라짐) · 탭은 소리 깨우기만
  ov.addEventListener('pointerdown',e=>{e.preventDefault();try{window.wake&&window.wake();}catch(_){}});
  return{skip:end};
};
})();
