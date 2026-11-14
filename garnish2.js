// 가니쉬 단계 v2 — 아래 바(가니쉬 4종 · n/3) · 시트(담은 가니쉬 탭 · 빈도 칸 · 볼륨 · 서빙하기) · 두 줄 머리 문장
(()=>{
const ph=document.getElementById('ph'),$=id=>document.getElementById(id);
const BLANK={spark:'<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16.2228 1.55591L20.3712 12.0742L30.8895 16.2226L20.3712 20.3709L16.2228 30.8892L12.0745 20.3709L1.55615 16.2226L12.0745 12.0742L16.2228 1.55591Z" stroke="#7A7A7A" stroke-linecap="round" stroke-dasharray="1 2"/></svg>',
 blossom:'<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 5.2C17.4 4.1 19 3.6 20.6 3.6C24.9 3.6 28.4 7.1 28.4 11.4C28.4 13.2 27.8 14.8 26.8 16.2C27.8 17.5 28.4 19.2 28.4 20.9C28.4 25.3 24.9 28.8 20.6 28.8C18.8 28.8 17.2 28.1 15.8 27.1C14.5 28.1 12.8 28.8 10.9 28.8C6.6 28.8 3.1 25.3 3.1 20.9C3.1 19.2 3.7 17.5 4.7 16.2C3.7 14.8 3.1 13.2 3.1 11.4C3.1 7.1 6.6 3.6 10.9 3.6C12.8 3.6 14.5 4.2 15.8 5.2Z" stroke="#7A7A7A" stroke-linecap="round" stroke-dasharray="1 2"/></svg>',
 fizz:'<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M15.9987 1.33215L19.1713 6.23464L24.6195 4.13324L24.3046 9.96422L29.9475 11.4666L26.2654 15.9988L29.9475 20.5311L24.3046 22.0334L24.6195 27.8644L19.1713 25.763L15.9987 30.6655L12.8261 25.763L7.37785 27.8644L7.69279 22.0334L2.04987 20.5311L5.73203 15.9988L2.04987 11.4666L7.69279 9.96422L7.37785 4.13324L12.8261 6.23464L15.9987 1.33215Z" stroke="#7A7A7A" stroke-linecap="round" stroke-dasharray="1 2"/></svg>',
 melt:'<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M12.6 3.6C15.7 3.6 18.5 5 20.3 7.2C22.2 5.9 24.7 5.7 26.8 6.9C29.6 8.5 30.6 12.2 29 15C28.2 16.4 26.8 17.4 25.3 17.8C26.1 19.9 26 22.2 24.8 24.3C22.7 27.9 18.1 29.1 14.5 27C13.1 26.2 12 25 11.4 23.6C6.4 23 2.6 18.8 2.6 13.6C2.6 8.1 7.1 3.6 12.6 3.6Z" stroke="#7A7A7A" stroke-linecap="round" stroke-dasharray="1 2"/></svg>'};
const ORDER=['spark','blossom','fizz','melt'];
const ITEMS=()=>[...LOOP].filter(w=>w.isConnected).map(w=>w._loop.d);
const numOf=d=>{if(d.num)return d.num;const f=FAM[d.k];d.num=Math.max(0,f.counts.indexOf(d.n))*12+['S','M','L'].indexOf(d.sz)*4+Math.floor((d.seed||0)*4)+1;return d.num;};
const blankOf=(k,n,seed,S)=>{const f=FAM[k],P=shapePath(k,n,36-f.off[0]/2,36-f.off[1]/2,seed);return `<svg viewBox="0 0 72 72" width="${S}" height="${S}" fill="none"><path d="${P}" stroke="#7A7A7A" stroke-width="${72/S*.71}" stroke-linecap="round" stroke-dasharray="${72/S*2} ${72/S*2.4}"/></svg>`;};
const fillOf=d=>`<div class="sm">${d.n===FAM[d.k].base?baseMarkup(d.k):variantMarkup(d.k,d.n,d.seed)}</div>`;
// ── 머리: 윗줄 = 베이스 한 단어 + 리큐르 흐름 / 아랫줄 = 가니쉬 문장 (없으면 베이스 문장)
const TOT=SH.reduce((a,b)=>a+b,0)||1,SHR={};PK.forEach((k,i)=>SHR[k]=SH[i]/TOT);
const top=Object.entries(SHR).sort((a,b)=>b[1]-a[1])[0]||['white',0];
const tt=-6*(SHR.brown||0)-3*(SHR.pink||0)+3*(SHR.blue||0);
const ADV=top[1]>=.6?({brown:'깊게',pink:'포근하게',white:'고르게',blue:'가볍게'})[top[0]]:tt<=-4.5?'묵직하게':tt<=-2.5?'따뜻하게':tt<=-1?'부드럽게':tt<1?'은은하게':tt<2?'맑게':'또렷하게';
const VERB={breath:'숨 쉬고',flow:'흐르고',beat:'박자 맞추고',scatter:'흩어지고'};
const ths=(Q.get('lq')||'').split(',').map(x=>x.split(':')[0]).filter((v,i,a)=>v&&VERB[v]&&a.indexOf(v)===i).slice(0,2);
const UP=ADV+' '+(ths.length?ths.map(t=>VERB[t]).join(' '):'깔리고');
const BASEW={white:0,pink:-3,blue:3,brown:-6};const bt=PK.reduce((a,k,i)=>a+(SH[i]/TOT)*(BASEW[k]||0),0);
const BASEP=(bt<-4?'아주 깊고 낮은':bt<-2.2?'깊고 따뜻한':bt<-.8?'부드러운 중간':bt<.8?'밝고 고른':'밝고 날카로운')+' 소리';
const GP={spark:'반짝임이 얹힌',fizz:'보글거림이 얹힌',blossom:'맑게 울리는',melt:'뚝뚝 떨어지는'};
const up=document.createElement('p');up.id='g2up';up.className='g2ph';up.textContent=UP;const big=document.createElement('p');big.id='g2big';big.className='g2ph';ph.appendChild(up);ph.appendChild(big);
function head(){const L=ITEMS();big.textContent=L.length?GP[L[L.length-1].k]+' 소리':BASEP;}
addEventListener('nbintro:done',e=>{if(e.detail==='garnish'){up.classList.add('on');big.classList.add('on');}});
// ── 아래 바 · 다음 원
const bar=document.createElement('div');bar.className='g2bar';bar.setAttribute('role','button');bar.tabIndex=0;bar.innerHTML='<img class="grab" src="assets/l2-grab.svg" width="33.5" height="1.5" alt=""><div class="row"><div class="g2ics" id="g2ics"></div><span class="g2lab" id="g2lab">Garnish</span></div>';
const nx=document.createElement('button');nx.type='button';nx.className='g2next';nx.setAttribute('aria-label','서빙하기');nx.innerHTML='<img src="assets/l2-chev.svg" width="24" height="24" alt="">';
// ── 시트
const sh=document.createElement('section');sh.className='g2sheet';sh.setAttribute('aria-label','가니쉬 설정');
sh.innerHTML='<button type="button" class="grab" id="g2sg" aria-label="닫기"><img src="assets/l2-grab.svg" width="33.5" height="1.5" alt=""></button><div class="g2tabs" id="g2tabs" role="tablist"></div><div class="g2freq" id="g2freq" role="group" aria-label="빈도"></div><div class="g2line"></div><div class="g2vol"><div class="g2pill" id="g2pill" role="slider" tabindex="0" aria-label="볼륨" aria-valuemin="0" aria-valuemax="100"><span>볼륨</span><i id="g2tk"></i></div><b id="g2vp"></b></div><button type="button" class="g2serve" id="g2serve"><span>서빙하기</span><img src="assets/l2-chevw.svg" width="24" height="24" alt=""></button>';
[bar,nx,sh].forEach(e=>{e.dataset.band='bot';ph.appendChild(e);});sh.dataset.band='bot';
let act=null;
const note=t=>{try{nbNotice(t);}catch(_){}};
function open(){if(!ITEMS().length){note(['가니쉬를 잔에 올려요','탭하거나 끌어서 넣어요']);return;}ph.classList.add('g2open');render();}
function close(){ph.classList.remove('g2open');}
bar.onclick=open;bar.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}};
$('g2sg').onclick=close;
{let y=null;bar.addEventListener('pointerdown',e=>{y=e.clientY;});$('g2sg').addEventListener('pointerdown',e=>{y=-e.clientY;});addEventListener('pointermove',e=>{if(y===null)return;if(y>0&&y-e.clientY>28){y=null;open();}else if(y<0&&e.clientY+y>28){y=null;close();}});addEventListener('pointerup',()=>{y=null;});}
// 밖(잔·빈 곳)을 누르면 시트 닫기
ph.addEventListener('pointerdown',e=>{if(ph.classList.contains('g2open')&&!sh.contains(e.target))close();},true);
function serve(){const L=ITEMS();if(!L.length){note(['가니쉬를 하나 이상 올려요']);return;}const q=new URLSearchParams(location.search);
  q.set('g',L.map(d=>`${d.k}-${d.n}-${d.sz}-f${d.f||3}-v${Math.round((d.vol==null?.6:d.vol)*100)}`).join(','));location.href='name.html?'+q;}
nx.onclick=serve;$('g2serve').onclick=serve;
function render(){const L=ITEMS();
  // 바: 계열 아이콘(넣은 계열은 채움) · n/3
  $('g2ics').innerHTML=ORDER.map(k=>{const d=L.find(x=>x.k===k);return `<span class="g2ic" title="${FAM[k].n}">${d?fillOf(d):BLANK[k]}</span>`;}).join('');
  $('g2lab').textContent=L.length?`${L.length}/3`:'Garnish';bar.setAttribute('aria-label',`가니쉬 ${L.length}/3 · 설정 열기`);
  if(!L.includes(act))act=L[L.length-1]||null;
  // 탭: 담은 가니쉬 이름 + 소리 번호
  $('g2tabs').innerHTML='';L.forEach(d=>{const b=document.createElement('button');b.type='button';b.className='g2tab';b.setAttribute('role','tab');b.setAttribute('aria-pressed',String(d===act));b.innerHTML=`<span>${FAM[d.k].n} ${numOf(d)}</span><i></i>`;b.onclick=()=>{act=d;render();};$('g2tabs').appendChild(b);});
  if(!act)return;
  // 빈도 칸 5개: 채운 만큼 자주 울림
  const f=act.f||3;$('g2freq').innerHTML='';for(let i=0;i<5;i++){const b=document.createElement('button');b.type='button';b.className='g2f';b.setAttribute('aria-label',`빈도 ${i+1}/5`);b.setAttribute('aria-pressed',String(i<f));b.innerHTML=i<f?fillOf(act):blankOf(act.k,act.n,act.seed,68);
    b.onclick=()=>{act.f=i+1;try{playG(act,0);}catch(_){}render();};$('g2freq').appendChild(b);}
  const v=act.vol==null?.6:act.vol;$('g2tk').style.left=`calc(12px + ${v} * (100% - 24px))`;$('g2vp').textContent=Math.round(v*100)+'%';$('g2pill').setAttribute('aria-valuenow',Math.round(v*100));head();}
{const p=$('g2pill');let on=false;const set=e=>{if(!act)return;const r=p.getBoundingClientRect();act.vol=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));render();};
  p.addEventListener('pointerdown',e=>{on=true;p.setPointerCapture(e.pointerId);set(e);});p.addEventListener('pointermove',e=>{if(on)set(e);});p.addEventListener('pointerup',()=>{on=false;if(act)try{playG(act,0);}catch(_){}});
  p.addEventListener('keydown',e=>{if(!act)return;const d=(e.key==='ArrowRight'||e.key==='ArrowUp')?.05:(e.key==='ArrowLeft'||e.key==='ArrowDown')?-.05:0;if(d){act.vol=Math.max(0,Math.min(1,(act.vol==null?.6:act.vol)+d));render();}});}
window.__g2={added(w,d){if(d.f==null)d.f=3;if(d.vol==null)d.vol=.6;act=d;setTimeout(render,30);},serve};
// 잔에서 빠질 때(3개 넘게 넣으면 오래된 것 빠짐)도 갱신
setInterval(()=>{const k=ITEMS().length;if(k!==render._k){render._k=k;render();}},400);
head();render();
})();
