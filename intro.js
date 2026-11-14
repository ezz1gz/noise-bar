// 단계 안내 문구(자막) → 끝나면 큰 타이틀이 작아져 상단 가운데(gnb)로 올라가고, 그때부터 조작 가능
// nbIntro({key, lines:[...], host, title, onDone})
//  - host: 문구를 깔 요소 (기본 #ph)
//  - title: 작아질 타이틀 (HTML 요소 · SVG <g> · 'auto' = 상단 SVG에서 타이틀 패스를 찾아 묶음 · null = 없음)
//  - 같은 세션에서 이미 본 단계는 문구 없이 바로 작은 타이틀 상태로
(function(){
const css=`.nbIntro{position:absolute;inset:0;z-index:60;pointer-events:auto;touch-action:none;cursor:pointer}
.nbIntro .cp{position:absolute;left:0;right:0;top:46.4%;display:flex;flex-direction:column;align-items:center;transform:translateY(-50%);
 font-family:'Pretendard Variable','Pretendard',-apple-system,'Apple SD Gothic Neo','Noto Sans KR',sans-serif;font-size:13px;font-weight:400;letter-spacing:-.02em;line-height:21px;color:#fff}
.nbIntro .cp span{display:block;height:21px;padding:0 8px;background:rgba(0,0,0,.4);text-shadow:0 0 10px rgba(0,0,0,.25);white-space:nowrap;
 opacity:0;transform:translateY(6px);transition:opacity .45s ease,transform .6s cubic-bezier(.32,.72,0,1)}
.nbIntro .cp span.on{opacity:1;transform:none}
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
window.nbIntro=function(o){
  addCss();const host=o.host||document.getElementById('ph')||document.body;
  let title=o.title==='auto'?autoTitle(host):o.title||null;
  const key='nbIntro:'+(o.key||location.pathname);let seen=false;try{seen=sessionStorage.getItem(key)==='1';}catch(e){}
  if(new URLSearchParams(location.search).has('intro'))seen=false;
  const finish=()=>{try{sessionStorage.setItem(key,'1');}catch(e){}host.classList&&host.classList.add('nbIntroDone');o.onDone&&o.onDone();try{dispatchEvent(new CustomEvent('nbintro:done',{detail:o.key}));}catch(e){}};
  if(seen||!o.lines||!o.lines.length){shrink(title,host,true,finish);return{skip(){}};}
  const ov=document.createElement('div');ov.className='nbIntro';ov.setAttribute('role','status');ov.setAttribute('aria-label',o.lines.join(' '));
  ov.innerHTML='<div class="cp">'+o.lines.map(l=>`<span>${l}</span>`).join('')+'</div>';host.appendChild(ov);
  const sp=[...ov.querySelectorAll('span')];const T=[];let gone=false;
  sp.forEach((s,i)=>T.push(setTimeout(()=>s.classList.add('on'),350+i*380)));
  const hold=350+sp.length*380+Math.max(1600,o.lines.join('').length*55);
  const end=()=>{if(gone)return;gone=true;T.forEach(clearTimeout);ov.classList.add('out');
    setTimeout(()=>{ov.remove();shrink(title,host,false,finish);},380);};
  T.push(setTimeout(end,hold));
  ov.addEventListener('pointerdown',e=>{e.preventDefault();try{window.wake&&window.wake();}catch(_){}
    // 첫 탭은 남은 줄을 바로 보여주고, 다 보이면 다음 탭에 넘김
    if(sp.some(s=>!s.classList.contains('on'))){sp.forEach(s=>s.classList.add('on'));T.forEach(clearTimeout);T.push(setTimeout(end,1400));}else end();});
  return{skip:end};
};
})();
