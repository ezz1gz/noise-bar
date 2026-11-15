// 배경과 구분되는 글자색 법칙 (모든 페이지 공통)
// 흰 글자·아이콘 뒤가 밝으면(메타볼 흰 부분 등) 검게, 다시 어두워지면 흰색으로 — 베이스 화면의 nbLt와 같은 기준
// NBContrast({src:캔버스 또는 ()=>캔버스|이미지, items:'선택자' 또는 [요소...]})
//  - WebGL 캔버스는 그 페이지가 그린 직후 같은 프레임에서 읽어야 해서, 페이지 루프가 먼저 시작된 뒤에 붙음
(function(){
const css=`.nbOnLt{color:#141117!important;text-shadow:none!important;filter:none!important}
g.nbOnLt,svg.nbOnLt,svg.nbOnLt g,.nbOnLt svg[fill="#fff"],.nbOnLt svg[fill="white"]{fill:#141117!important}
.nbOnLt path[stroke="#fff"],.nbOnLt path[stroke="white"],.nbOnLt path[stroke="#EDEDED"],.nbOnLt path[stroke="#ededed"]{stroke:#141117!important}
.nbOnLt img,img.nbOnLt{filter:brightness(0) opacity(.82)!important}
.nbOnLt [stroke="#fff"],.nbOnLt [stroke="white"]{stroke:#141117!important}
.nbOnLt,.nbOnLt *{transition:color .35s,fill .35s,stroke .35s,filter .35s}`;
let added=false;const addCss=()=>{if(added)return;added=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);};
window.NBContrast=function(o){addCss();const sc=document.createElement('canvas');sc.width=48;sc.height=104;const x=sc.getContext('2d',{willReadFrequently:true});
  const items=()=>typeof o.items==='string'?[...document.querySelectorAll(o.items)]:o.items;
  const src=()=>typeof o.src==='function'?o.src():(typeof o.src==='string'?document.querySelector(o.src):o.src);
  const hi=o.hi||.6,lo=o.lo||.48;let last=0;
  function sample(){const s=src();if(!s){items().forEach(e=>e&&e.classList&&e.classList.remove('nbOnLt'));return;}let sr;
    if(s.getBoundingClientRect){sr=s.getBoundingClientRect();}else if(o.rect)sr=o.rect();else return;if(!sr.width)return;
    try{x.clearRect(0,0,48,104);x.drawImage(s,0,0,48,104);}catch(_){return;}let d;try{d=x.getImageData(0,0,48,104).data;}catch(_){return;}
    items().forEach(el=>{if(!el||!el.getBoundingClientRect)return;const r=el.getBoundingClientRect();if(!r.width||!r.height)return;
      const x0=Math.max(0,Math.floor((r.left-sr.left)/sr.width*48)),x1=Math.min(47,Math.ceil((r.right-sr.left)/sr.width*48)),
            y0=Math.max(0,Math.floor((r.top-sr.top)/sr.height*104)),y1=Math.min(103,Math.ceil((r.bottom-sr.top)/sr.height*104));
      if(x1<x0||y1<y0)return;let L=0,n=0,mx=0;for(let yy=y0;yy<=y1;yy++)for(let xx=x0;xx<=x1;xx++){const i=(yy*48+xx)*4;if(d[i+3]<8)continue;const l=(.2126*d[i]+.7152*d[i+1]+.0722*d[i+2])/255;L+=l;n++;if(l>mx)mx=l;}
      if(!n)return;L=(L/n*.7+mx*.3)*(o.k||1); // 글자 아래 가장 밝은 곳도 반영
      const on=el.classList.contains('nbOnLt');if(!on&&L>hi)el.classList.add('nbOnLt');else if(on&&L<lo)el.classList.remove('nbOnLt');});}
  const tick=now=>{if(now-last>(o.every||350)){last=now;sample();}requestAnimationFrame(tick);};
  setTimeout(()=>requestAnimationFrame(tick),o.delay||600);
  return {sample};};
})();
