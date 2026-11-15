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
// 블라썸 빈칸: 꽃잎 원들을 하나로 합친 바깥선 (겹친 안쪽 선이 점선으로 보이지 않게)
function lobesOutline(cx,cy,n,R){const pr=R*(n<=4?.5:n<=5?.45:n<=6?.4:.33),cr=R-pr,off=(n===4?Math.PI/4:0),h=Math.PI/n;
  const t=cr*Math.cos(h)+Math.sqrt(Math.max(0,pr*pr-cr*cr*Math.sin(h)*Math.sin(h)));
  const V=i=>{const m=-Math.PI/2+off+i*2*Math.PI/n+h;return[cx+t*Math.cos(m),cy+t*Math.sin(m)];};
  let s='';for(let i=0;i<n;i++){const a=V(i-1),b=V(i),ang=-Math.PI/2+off+i*2*Math.PI/n,c=[cx+cr*Math.cos(ang),cy+cr*Math.sin(ang)];
    let sp=Math.atan2(b[1]-c[1],b[0]-c[0])-Math.atan2(a[1]-c[1],a[0]-c[0]);while(sp<0)sp+=2*Math.PI;
    s+=(i?'':`M${a[0].toFixed(2)} ${a[1].toFixed(2)}`)+`A${pr} ${pr} 0 ${sp>Math.PI?1:0} 1 ${b[0].toFixed(2)} ${b[1].toFixed(2)}`;}return s+'Z';}
const blankOf=(k,n,seed,S)=>{const f=FAM[k],P=k==='blossom'?lobesOutline(36-f.off[0]/2,36-f.off[1]/2,n,23.5):shapePath(k,n,36-f.off[0]/2,36-f.off[1]/2,seed);return `<svg viewBox="0 0 72 72" width="${S}" height="${S}" fill="none"><path d="${P}" stroke="#7A7A7A" stroke-width="${72/S*.71}" stroke-linecap="round" stroke-dasharray="${72/S*2} ${72/S*2.4}"/></svg>`;};
// 빈칸이 채워질 땐 두 겹(화면 위 가니쉬) 대신 피그마 단색 fill
const fillOf=d=>`<div class="sm fl1">${flatMarkup(d.k,d.n,d.seed)}</div>`;
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
sh.innerHTML='<button type="button" class="grab" id="g2sg" aria-label="닫기"><img src="assets/l2-grab.svg" width="33.5" height="1.5" alt=""></button><div class="g2tabs" id="g2tabs" role="tablist"></div><div class="g2fl"><span>빈도</span><b id="g2fv"></b></div><div class="g2freq" id="g2freq" role="group" aria-label="빈도"></div><div class="g2line"></div><div class="g2vol"><div class="g2pill" id="g2pill" role="slider" tabindex="0" aria-label="볼륨" aria-valuemin="0" aria-valuemax="100"><i class="g2fill"></i><span id="g2pn">볼륨</span><img class="g2tick" id="g2tk" src="assets/l2-tick.svg" width="1.5" height="13.5" alt=""></div><b id="g2vp"></b></div><button type="button" class="g2serve" id="g2serve"><span>서빙하기</span><img src="assets/l2-chevw.svg" width="24" height="24" alt=""></button>';
[bar,nx,sh].forEach(e=>{e.dataset.band='bot';ph.appendChild(e);});sh.dataset.band='bot';
let act=null;
// 새로 넣은 가니쉬: 빈도나 볼륨을 한 번도 안 누르고 시트를 닫거나 다른 데로 가면 취소(잔에서 빠짐)
const need=()=>ITEMS().find(d=>d._nf&&d._nv)||null;
const confirmD=d=>{if(d){d._nf=0;d._nv=0;}};
function cancelPending(){const d=need();if(!d)return false;const w=[...LOOP].find(x=>x._loop&&x._loop.d===d);if(w){LOOP.delete(w);w.animate([{opacity:getComputedStyle(w).opacity},{opacity:0,transform:w.style.transform+' scale(.6)'}],{duration:240}).onfinish=()=>{w.remove();render();};}if(act===d)act=null;return true;}
const note=t=>{try{nbNotice(t);}catch(_){}};
function open(){if(!ITEMS().length){note(['가니쉬를 잔에 올려요','탭하거나 끌어서 넣어요']);return;}ph.classList.add('g2open');render();}
function close(){cancelPending();ph.classList.remove('g2open');}
bar.onclick=open;bar.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}};
$('g2sg').onclick=close;
{let y=null;bar.addEventListener('pointerdown',e=>{y=e.clientY;});$('g2sg').addEventListener('pointerdown',e=>{y=-e.clientY;});addEventListener('pointermove',e=>{if(y===null)return;if(y>0&&y-e.clientY>28){y=null;open();}else if(y<0&&e.clientY+y>28){y=null;close();}});addEventListener('pointerup',()=>{y=null;});}
// 밖(잔·빈 곳)을 누르면 시트 닫기
ph.addEventListener('pointerdown',e=>{if(ph.classList.contains('g2open')&&!sh.contains(e.target))close();},true);
let serving=false;
function serve(){ITEMS().forEach(confirmD);const L=ITEMS();if(!L.length){note(['가니쉬를 하나 이상 올려요']);return;}if(serving)return;serving=true;const q=new URLSearchParams(location.search);
  q.set('g',L.map(d=>`${d.k}-${d.n}-${d.sz}-f${d.f||3}-v${Math.round((d.vol==null?.6:d.vol)*100)}`).join(','));const go=()=>{location.href='name.html?'+q;};
  // 잔 모션 없이 바로 서브로 (살짝 페이드만)
  ph.classList.add('g2out');setTimeout(go,240);}
// 서빙: 위에서 본 원 → 앞에서 본 잔 (글라스 고를 때의 역순) — 원이 림 타원으로 눕고, 납작했던 잔 몸통이 펴지며 나타남
// 믹스 그림이 없을 때: 고른 베이스·리큐르 색으로 번진 덩어리
function blobs(bx,by,cid){let cols=[];try{const tot=SH.reduce((a,b)=>a+b,0)||1;cols=PK.map((k,i)=>({c:(window.COCK&&COCK[k])||PC[i],w:SH[i]/tot,k})).filter(x=>x.k!=='white'&&x.w>.02).sort((a,b)=>b.w-a.w).map(x=>x.c);}catch(_){}
  try{cols=cols.concat(LT||[]);}catch(_){}if(!cols.length)cols=['#ff2294','#4583ff'];const f='gb'+cid;
  return `<defs><filter id="${f}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter></defs><g clip-path="url(#${cid})"><rect x="${bx}" y="${by}" width="336" height="336" fill="#fff"/><g filter="url(#${f})" opacity=".85">${cols.slice(0,5).map((c,i)=>`<circle cx="${bx+90+((i*97)%170)}" cy="${by+50+((i*61)%150)}" r="${70-i*7}" fill="${c}"/>`).join('')}</g></g>`;}
async function toFront(){const k=Q.get('gl')||'martini';
  const [G,F]=await Promise.all([fetch('assets/glass/glasses.json').then(r=>r.json()),fetch('assets/glass/glass-all.svgfrag').then(r=>r.text())]);
  const g=G.find(x=>x.k===k)||G[0],GXL=28.5,GXT=302,CC=[196.5,422],CR=159,[bx,by]=g.box,sx=GXL-bx,sy=GXT-by,Lp=g.rim[0],Rp=g.rim[1],rx=(Lp[0]+Rp[0])/2+sx,ry=Lp[1]+sy,rw=Rp[0]-Lp[0];
  ph.classList.remove('g2open');ph.classList.add('g2serving');
  const lay=document.getElementById('lay'),gl=document.getElementById('gl');let shot=null;try{shot=getMixShot();}catch(_){}
  const w=document.createElement('div');w.className='g2front';w.style.cssText=`position:absolute;left:${GXL}px;top:${GXT}px;width:336px;height:336px;pointer-events:none;z-index:6;opacity:0`;
  const cid='g2fc'+Date.now();
  w.innerHTML=`<svg viewBox="${bx} ${by} 336 336" width="336" height="336" fill="none" style="overflow:hidden" aria-hidden="true"><defs><clipPath id="${cid}"><path d="${g.sil}"/></clipPath></defs>${shot?`<image href="${shot}" x="${bx-40}" y="${by-60}" width="416" height="456" preserveAspectRatio="xMidYMid slice" clip-path="url(#${cid})" opacity=".92"/>`:blobs(bx,by,cid)}${uq(F)}</svg>`;
  lay.appendChild(w);
  const D=1150,ez='cubic-bezier(.65,0,.35,1)';
  gl.style.transformOrigin='50% 50%';
  const a1=gl.animate([{transform:'none',opacity:1},{opacity:1,offset:.7},{transform:`translate(${rx-CC[0]}px,${ry-CC[1]}px) scale(${rw/(2*CR)},${rw*.12/(2*CR)})`,opacity:0}],{duration:D,delay:250,easing:ez,fill:'forwards'});
  w.style.transformOrigin=`${rx-GXL}px ${ry-GXT}px`;
  w.animate([{transform:`translate(${CC[0]-rx}px,${CC[1]-ry}px) scale(${2*CR/rw},.12)`,opacity:0},{opacity:.6,offset:.4},{transform:'none',opacity:1}],{duration:D,delay:250+D*.15,easing:ez,fill:'forwards'});
  await new Promise(r=>setTimeout(r,250+D*1.15+600));}
nx.onclick=serve;$('g2serve').onclick=serve;
function render(){const L=ITEMS();
  // 바: 계열 아이콘(넣은 계열은 채움) · n/3
  $('g2ics').innerHTML=ORDER.map(k=>{const d=L.find(x=>x.k===k);return `<span class="g2ic" title="${FAM[k].n}">${d?fillOf(d):BLANK[k]}</span>`;}).join('');
  $('g2lab').textContent=L.length?`${L.length}/3`:'Garnish';bar.setAttribute('aria-label',`가니쉬 ${L.length}/3 · 설정 열기`);
  if(!L.includes(act))act=L[L.length-1]||null;
  // 탭: 담은 가니쉬 이름 + 소리 번호
  $('g2tabs').innerHTML='';L.forEach(d=>{const b=document.createElement('button');b.type='button';b.className='g2tab';b.setAttribute('role','tab');b.setAttribute('aria-pressed',String(d===act));b.classList.toggle('need',!!(d._nf&&d._nv));b.innerHTML=`<span>${FAM[d.k].n} ${numOf(d)}</span><i></i>`;b.onclick=()=>{if(need()&&need()!==d)cancelPending();act=d;render();};$('g2tabs').appendChild(b);});
  if(!act)return;
  // 빈도 칸 5개: 채운 만큼 자주 울림
  const f=act.f||3;$('g2freq').innerHTML='';for(let i=0;i<5;i++){const b=document.createElement('button');b.type='button';b.className='g2f';b.setAttribute('aria-label',`빈도 ${i+1}/5`);b.setAttribute('aria-pressed',String(i<f));b.innerHTML=i<f?fillOf(act):blankOf(act.k,act.n,act.seed,68);
    b.onclick=()=>{act.f=i+1;confirmD(act);render();};$('g2freq').appendChild(b);}
  // 빈도 안내: 실제로 울리는 간격(가니쉬마다 기본 간격 × 3/빈도)을 '10초에 N번'으로
  {const w=[...LOOP].find(x=>x._loop&&x._loop.d===act),per=w?w._loop.per:({spark:1.6,fizz:2.2,blossom:2.8,melt:2})[act.k],iv=per*3/f,n=Math.round(10/iv);
   $('g2fv').textContent=n>=1?`10초에 ${n}번`:`${Math.round(iv)}초에 1번`;$('g2freq').setAttribute('aria-label',`빈도 ${f}/5 · ${$('g2fv').textContent}`);}
  const v=act.vol==null?.6:act.vol,P=$('g2pill');P.style.setProperty('--s',v.toFixed(3));P.style.setProperty('--c',`linear-gradient(90deg,${FAM[act.k].c[0]},${FAM[act.k].c[1]})`);$('g2pn').textContent=FAM[act.k].n+' 볼륨';$('g2freq').classList.toggle('need',!!(act._nf&&act._nv));P.classList.toggle('need',!!(act._nf&&act._nv));$('g2vp').textContent=Math.round(v*100)+'%';$('g2pill').setAttribute('aria-valuenow',Math.round(v*100));head();}
{const p=$('g2pill');let on=false;const set=e=>{if(!act)return;const r=p.getBoundingClientRect();act.vol=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));render();};
  p.addEventListener('pointerdown',e=>{on=true;p.classList.add('on');p.setPointerCapture(e.pointerId);set(e);});p.addEventListener('pointermove',e=>{if(on)set(e);});const up=()=>{if(!on)return;on=false;p.classList.remove('on');if(act){confirmD(act);try{playG(act,0);}catch(_){}render();}};p.addEventListener('pointerup',up);p.addEventListener('pointercancel',up);
  p.addEventListener('keydown',e=>{if(!act)return;const d=(e.key==='ArrowRight'||e.key==='ArrowUp')?.05:(e.key==='ArrowLeft'||e.key==='ArrowDown')?-.05:0;if(d){act.vol=Math.max(0,Math.min(1,(act.vol==null?.6:act.vol)+d));confirmD(act);render();}});}
// 잔 속 가니쉬를 잡아 잔 밖으로 끌어내면 빠짐
// 잔 속 가니쉬: 탭하면 정보(하단바) · 잔 밖으로 끌어내야만 빠짐 · 끄는 동안엔 잔 원에 잘리지 않고 그대로 보임
function pullOut(w){let st=null;const k=()=>ph.getBoundingClientRect().width/393;
  w.addEventListener('pointerdown',e=>{e.stopPropagation();const m=(w.style.transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/)||[0,0,0]);
    st={id:e.pointerId,x0:e.clientX,y0:e.clientY,tx:+m[1],ty:+m[2],s:w.offsetWidth,moved:false,home:w.parentNode,next:w.nextSibling,rest:w.style.transform};
    // 끄는 중 요소를 옮기면 포인터 잡기가 풀려서 창 전체에서 따라감
    addEventListener('pointermove',mv);addEventListener('pointerup',end);addEventListener('pointercancel',end);});
  const mv=e=>{if(!st||e.pointerId!==st.id)return;const dx=(e.clientX-st.x0)/k(),dy=(e.clientY-st.y0)/k();
    if(!st.moved){if(Math.hypot(dx,dy)<8)return;st.moved=true;
      // 잔 원(.gl, 잘림)의 바깥 층으로 옮겨서 끄는 동안 계속 보이게
      const gl=st.home,L=gl.parentNode;st.gx=gl.offsetLeft;st.gy=gl.offsetTop;L.appendChild(w);w.style.zIndex=30;w.style.transition='none';}
    w.style.transform=`translate(${st.gx+st.tx+dx}px,${st.gy+st.ty+dy}px) scale(1.08)`;
    const cx=st.tx+dx+st.s/2,cy=st.ty+dy+st.s/2;w.classList.toggle('g2out',Math.hypot(cx-159,cy-159)>159+st.s*.25);};
  const end=e=>{if(!st||e.pointerId!==st.id)return;const o=st;st=null;removeEventListener('pointermove',mv);removeEventListener('pointerup',end);removeEventListener('pointercancel',end);w.classList.remove('g2out');
    if(!o.moved){act=w._loop.d;ph.classList.add('g2open');render();return;}
    const dx=(e.clientX-o.x0)/k(),dy=(e.clientY-o.y0)/k(),cx=o.tx+dx+o.s/2,cy=o.ty+dy+o.s/2;
    if(e.type!=='pointercancel'&&Math.hypot(cx-159,cy-159)>159+o.s*.25){LOOP.delete(w);
      w.animate([{opacity:1},{opacity:0,transform:w.style.transform.replace('scale(1.08)','scale(.6)')}],{duration:260}).onfinish=()=>{w.remove();render();};try{note([FAM[w._loop.d.k].n+' 가니쉬를 뺐어요']);}catch(_){} }
    else{ // 잔 안에서 놓으면 원래 자리로
      o.home.insertBefore(w,o.next&&o.next.parentNode===o.home?o.next:null);w.style.zIndex='';w.style.transform=o.rest;
      w.animate([{transform:`translate(${o.tx+dx}px,${o.ty+dy}px)`},{transform:o.rest}],{duration:280,easing:'cubic-bezier(.3,1.4,.6,1)'});}};
}
window.__g2={added(w,d){if(d.f==null)d.f=3;if(d.vol==null)d.vol=.6;d._nf=1;d._nv=1;act=d;pullOut(w);if(need()&&need()!==d)cancelPending();setTimeout(()=>{ph.classList.add('g2open');render();},380);},serve};
// 잔에서 빠질 때(3개 넘게 넣으면 오래된 것 빠짐)도 갱신
setInterval(()=>{const k=ITEMS().length;if(k!==render._k){render._k=k;render();}},400);
head();render();
})();
