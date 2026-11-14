// NØISE BAR 공유 데이터 — Taste(내 잔·플리)와 Ocean(공유된 잔)이 같이 씀
// 아직 서버 없음: 샘플 + 이 기기 localStorage. 나중에 서버 붙이면 이 파일만 바꾸면 됨.
(()=>{
const COL={brown:'#C95F19',pink:'#EC4290',white:'#F4F1EC',blue:'#5584F6'};
const TH={breath:['숨','#6F8FF0'],flow:['흐름','#8FC7E8'],beat:['박자','#C7B7F2'],scatter:['흩뿌림','#F0A070']};
const SAMPLE=[
 {lk:'waves',id:'s1',t:'Midnight',m:'James adam',pk:'brown,blue',s:'.6,.4',ln:'파도',lv:60,lq:'breath:60',g:'blossom-5',gl:'martini'},
 {lk:'rain',id:'s2',t:'Pink Rain',m:'Yuna',pk:'pink,white',s:'.55,.45',ln:'빗소리',lv:55,lq:'scatter:55',g:'fizz-3',gl:'flute'},
 {lk:'clock',id:'s3',t:'Morning Desk',m:'Hoon',pk:'white,blue',s:'.5,.5',ln:'키보드',lv:50,lq:'beat:50',g:'spark-4',gl:'rocks'},
 {lk:'fire',id:'s4',t:'Warm Stove',m:'Mina',pk:'brown,pink',s:'.7,.3',ln:'모닥불',lv:65,lq:'flow:65',g:'melt-2',gl:'rocks'},
 {lk:'forest',id:'s5',t:'Cricket Night',m:'Seo',pk:'blue,brown,white',s:'.4,.35,.25',ln:'귀뚜라미',lv:45,lq:'scatter:45',g:'spark-6',gl:'martini'},
 {lk:'clock',id:'s6',t:'집중력이 빡',m:'듀듀',pk:'pink,blue',s:'.55,.45',ln:'시계',lv:50,lq:'beat:50',g:'spark-5',gl:'martini'},
 {lk:'rain',id:'s7',t:'자고싶다',m:'빙빙',pk:'brown,white',s:'.65,.35',ln:'빗소리',lv:40,lq:'breath:40',g:'melt-3',gl:'rocks'},
 {lk:'forest',id:'s8',t:'산책 가는 길',m:'Jiwoo',pk:'white,pink',s:'.6,.4',ln:'새소리',lv:45,lq:'flow:45',g:'blossom-4',gl:'flute'},
 {lk:'wind',id:'s9',t:'새벽 세시',m:'Rin',pk:'brown,blue',s:'.5,.5',ln:'바람',lv:55,lq:'breath:55',g:'fizz-5',gl:'martini'}
];
const get=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v;}catch(_){return d;}};
const put=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(_){}};
const me=()=>{try{return localStorage.getItem('nb-nick')||'guest';}catch(_){return 'guest';}};
const mine=()=>get('nb-mine',[]);
const sharedIds=()=>get('nb-ocean',[]);
function all(){const M=mine().map(c=>Object.assign({mine:true},c));return M.concat(SAMPLE.map(c=>Object.assign({},c)));}
function byId(id){return all().find(c=>c.id===id)||null;}
function isShared(c){return !c.mine||sharedIds().includes(c.id);}
// 플리: 처음엔 샘플 하나
function plists(){let P=get('nb-plist',null);if(!P){P=[{id:'p1',name:'집중력이 빡',owner:'듀듀',items:['s6','s7','s3','s1','s9','s5']}];put('nb-plist',P);}return P;}
const NB={COL,TH,me,
 all,byId,
 list(f){const A=all();return f==='my'?A.filter(c=>c.mine):f==='shared'?A.filter(isShared):A;},
 ocean(){const ids=sharedIds();return mine().filter(c=>ids.includes(c.id)).map(c=>Object.assign({mine:true},c)).reverse().concat(SAMPLE.map(c=>Object.assign({},c)));},
 // 소리의 바다(ocean/)로 띄움 — play.html과 같은 ntfy 채널·형식. PC 전시와 폰 Ocean에 실시간으로 도착
 SEA_TOPIC:'noisebar-sea-k7q2x9m4vz',
 share(id){const s=sharedIds();if(!s.includes(id)){s.push(id);put('nb-ocean',s);}const c=byId(id);if(!c)return Promise.resolve(false);
  const d={v:1,id:'tb'+String(c.id).replace(/[^a-z0-9]/gi,'')+Date.now().toString(36),t:Date.now(),pk:c.pk,s:c.s,lk:c.lk||'',lq:c.lq,lt:c.lt||'',g:c.g,name:c.t,who:c.m};
  try{sessionStorage.setItem('nb-sea-me',d.id);}catch(_){}
  return fetch('https://ntfy.sh/'+NB.SEA_TOPIC,{method:'POST',body:JSON.stringify(d)}).then(r=>r.ok).catch(()=>false);},
 isShared(id){const c=byId(id);return c?isShared(c):false;},
 // 완성한 잔 저장 (서브 화면에서 부를 예정)
 saveMine(c){const M=mine();c.id=c.id||('m'+Date.now().toString(36));c.m=c.m||me();M.unshift(c);put('nb-mine',M);return c.id;},
 plists,
 plist(id){return plists().find(p=>p.id===id)||null;},
 addTo(pid,cid){const P=plists(),p=P.find(x=>x.id===pid);if(p&&!p.items.includes(cid)){p.items.push(cid);put('nb-plist',P);}},
 newPlist(name){const P=plists(),p={id:'p'+Date.now().toString(36),name:name||'새 플레이리스트',owner:me(),mine:true,items:[]};P.push(p);put('nb-plist',P);return p.id;},
 playURL(c){return 'play.html?'+new URLSearchParams({pk:c.pk,s:c.s,lk:c.lk||'',ln:c.ln,lv:c.lv,lq:c.lq,g:c.g,gl:c.gl||'martini',t:c.t,nm:c.t,mk:c.m}).toString();},
 // 썸네일: 베이스 비율 + 리큐르 테마 색으로 번진 그러데이션 (흰색은 살짝 회색 끼게)
 thumb(c){const pk=(c.pk||'').split(','),s=(c.s||'').split(',').map(Number);const th=(c.lq||'').split(':')[0];
  const cols=pk.map((k,i)=>({c:k==='white'?'#E9E4F4':COL[k]||'#999',w:s[i]||0})).sort((a,b)=>b.w-a.w).map(x=>x.c);
  const t=(TH[th]||['','#9B7BF0'])[1];const a=cols[0]||'#EC4290',b=cols[1]||t,d=cols[2]||a;
  const h=[...String(c.id||c.t)].reduce((x,ch)=>(x*31+ch.charCodeAt(0))%997,7),px=20+h%60,py=h%40;
  return `radial-gradient(90% 60% at ${px}% ${py}%,${t} 0%,transparent 70%),radial-gradient(120% 70% at ${100-px}% 55%,${a} 0%,transparent 72%),radial-gradient(90% 60% at 30% 100%,${d} 0%,transparent 70%),linear-gradient(165deg,${b},${a})`;}
};
window.NB=NB;
})();
