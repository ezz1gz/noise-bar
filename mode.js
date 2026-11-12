// ── 소리 (아이폰 대응)
// 1) 무음 스위치를 켜도 들리게 2) 손을 뗄 때 오디오를 깨움 3) 이어폰을 꽂고/빼도 다시 나오게
//    → 모든 소리를 <audio> 요소로 내보내서(유튜브처럼 '미디어 재생'으로) iOS가 출력 경로를 알아서 바꾸게 해요.
//    그 <audio>가 멈춰 있으면 원래 출력으로 자동으로 되돌아가요(소리가 끊기지 않게).
(function () {
  var list = [];
  var iOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var AC = window.AudioContext || window.webkitAudioContext;
  function route(c) {
    if (c.__nbOut) return;
    if (!iOS || !c.createMediaStreamDestination) { try { var o = c.createGain(); o.__nbReal = true; o.connect(c.destination); c.__nbOut = o; } catch (e) {} return; }
    try {
      var out = c.createGain(), direct = c.createGain(), ms = c.createMediaStreamDestination();
      out.__nbReal = true; direct.__nbReal = true;
      out.connect(direct); direct.connect(c.destination); out.connect(ms);
      var el = document.createElement('audio'); el.setAttribute('playsinline', ''); el.autoplay = false; el.srcObject = ms.stream;
      el.style.display = 'none'; (document.body || document.documentElement).appendChild(el);
      var set = function (v) { try { direct.gain.setTargetAtTime(v, c.currentTime, .03); } catch (e) { direct.gain.value = v; } };
      el.addEventListener('playing', function () { set(0); });
      ['pause', 'ended', 'stalled', 'emptied', 'error'].forEach(function (ev) { el.addEventListener(ev, function () { set(1); }); });
      c.__nbOut = out; c.__nbEl = el;
    } catch (e) {}
  }
  if (AC && !AC.__nbPatched) {
    var Wrapped = function (o) { var c = o ? new AC(o) : new AC(); list.push(c); route(c);
      try { c.addEventListener('statechange', function () { if ((c.state === 'interrupted' || c.state === 'suspended') && !c.__nbUser) setTimeout(function () { try { c.resume(); } catch (e) {} }, 300); }); } catch (e) {}
      return c; };
    Wrapped.prototype = AC.prototype; Wrapped.__nbPatched = true;
    var sus = AC.prototype.suspend, res = AC.prototype.resume;
    AC.prototype.suspend = function () { this.__nbUser = true; if (this.__nbEl) try { this.__nbEl.pause(); } catch (e) {} return sus.apply(this, arguments); };
    AC.prototype.resume = function () { if (arguments[0] !== 'auto') this.__nbUser = false; var el = this.__nbEl; if (el && el.paused) { var pr = el.play(); if (pr && pr.catch) pr.catch(function () {}); } return res.call(this); };
    // ctx.destination 으로 가는 연결을 <audio> 출력으로 바꿔 끼움
    var con = AudioNode.prototype.connect;
    AudioNode.prototype.connect = function (dst) {
      if (dst && dst instanceof AudioDestinationNode && !this.__nbReal && this.context && this.context.__nbOut) { arguments[0] = this.context.__nbOut; }
      return con.apply(this, arguments);
    };
    try { window.AudioContext = Wrapped; window.webkitAudioContext = Wrapped; } catch (e) {}
  }
  var tag = null;
  function wakeAll() {
    list.forEach(function (c) {
      if (c.state === 'closed' || c.__nbUser) return;
      if (c.state !== 'running') { try { c.resume(); } catch (e) {} }
      var el = c.__nbEl; if (el && el.paused) { var pr = el.play(); if (pr && pr.catch) pr.catch(function () {}); }
    });
  }
  function unlock() {
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}
    try {
      if (!tag) {
        // 아주 짧은 무음 wav 반복 → iOS가 '미디어 재생' 상태로 인식 (무음 스위치 무시)
        tag = document.createElement('audio'); tag.setAttribute('playsinline', ''); tag.loop = true; tag.volume = 0.01;
        tag.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAAAA';
      }
      if (tag.paused) { var pr = tag.play(); if (pr && pr.catch) pr.catch(function () {}); }
    } catch (e) {}
    wakeAll();
  }
  ['touchend', 'click', 'keydown', 'pointerup'].forEach(function (ev) { addEventListener(ev, unlock, true); });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) wakeAll(); });
  // 이어폰 연결/해제 같은 출력 장치 변화
  try { navigator.mediaDevices && navigator.mediaDevices.addEventListener && navigator.mediaDevices.addEventListener('devicechange', function () { setTimeout(wakeAll, 400); }); } catch (e) {}
  function media() {
    try {
      if (!('mediaSession' in navigator) || navigator.mediaSession.__nb) return;
      var base = location.href.replace(/[^\/]*([?#].*)?$/, '');
      navigator.mediaSession.metadata = new MediaMetadata({ title: 'NØISE BAR', artist: 'NØISE BAR', album: 'NØISE BAR',
        artwork: [{ src: base + 'icon-512.png', sizes: '512x512', type: 'image/png' }, { src: base + 'icon-192.png', sizes: '192x192', type: 'image/png' }] });
      // 잠금화면·아일랜드의 재생 버튼으로도 다시 켤 수 있게
      navigator.mediaSession.setActionHandler('play', function () { list.forEach(function (c) { c.__nbUser = false; }); unlock(); });
      navigator.mediaSession.__nb = true;
    } catch (e) {}
  }
  addEventListener('click', media, true); addEventListener('touchend', media, true);

  // ── 전체 소리 끄기: 어느 단계에서든 상단 스피커 = 모든 소리(베이스·리큐르·가니시) 켜기/끄기, 단계를 넘어가도 유지
  function getM() { try { return !!window.top.__nbMuted; } catch (e) { return !!window.__nbMuted; } }
  function setM(v) { try { window.top.__nbMuted = v; } catch (e) { window.__nbMuted = v; } apply(); }
  var lastM = null;
  function apply() {
    var m = getM();
    list.forEach(function (c) { if (c.__nbOut && c.__nbM !== m) { c.__nbM = m; try { c.__nbOut.gain.setTargetAtTime(m ? 0 : 1, c.currentTime, .04); } catch (e) { c.__nbOut.gain.value = m ? 0 : 1; } } });
    if (m === lastM) return; lastM = m;
    document.documentElement.classList.toggle('nb-muted', m);
    var st = document.getElementById('stage'); if (st) st.classList.toggle('muted', m);
    if (document.getElementById('vol') && document.body) document.body.classList.toggle('muted', m);
    ['gVol', 'snd', 'vol'].forEach(function (id) { var b = document.getElementById(id); if (b) { b.setAttribute('aria-pressed', String(!m)); b.setAttribute('aria-label', m ? '소리 켜기' : '소리 끄기'); } });
  }
  setInterval(apply, 150);
  window.__nbToggleMute = function () { setM(!getM()); unlock(); };
  addEventListener('click', function (e) {
    var b = e.target && e.target.closest && e.target.closest('#gVol,#snd,#vol,.nbspk');
    if (!b) return; e.preventDefault(); e.stopImmediatePropagation(); window.__nbToggleMute();
  }, true);
  // 스피커 버튼이 그림으로만 있는 화면(믹스·글라스·가니시)에 누를 자리 + 꺼짐 표시를 붙임
  var OFF = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M23 9l-6 6M17 9l6 6"/></svg>';
  document.addEventListener('DOMContentLoaded', function () {
    var ph = document.getElementById('ph'); if (!ph || document.getElementById('vol')) return;
    var mix = /mix\.html/.test(location.pathname);
    var b = document.createElement('button'); b.type = 'button'; b.className = 'hit nbspk'; b.setAttribute('aria-label', '소리 끄기');
    b.style.cssText = 'left:338px;top:58px;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;color:' + (mix ? '#fff' : '#000') + ';z-index:30';
    b.innerHTML = '<span class="off">' + OFF + '</span>'; b.dataset.band = mix ? 'top' : 'art';
    ph.appendChild(b); try { window.nbFit && window.nbFit(); } catch (e) {}
    var st = document.createElement('style');
    st.textContent = '.nbspk .off{display:none;' + (mix ? 'mix-blend-mode:difference;' : 'background:#fff;border-radius:50%;padding:4px;') + '}html.nb-muted .nbspk .off{display:block}' + (mix ? 'html.nb-muted .gnb svg:last-child{visibility:hidden}' : '');
    document.head.appendChild(st); lastM = null; apply();
  });
  window.__nbUnlock = unlock;
})();

// 유저 모드 / 관리자 모드
// 기본은 유저 모드: 폰 테두리·설명 패널·바로가기·'수치 · 수정' 같은 디자인용 도구를 숨겨요.
// 관리자 모드: 주소 끝에 ?admin 을 붙이면 예전처럼 전부 보여요. (예: .../noise-bar/?admin)
(function () {
  var admin = false;
  try { admin = /[?&#]admin\b/.test(location.search + location.hash); } catch (e) {}
  try { if (!admin && window.parent !== window) admin = /[?&#]admin\b/.test(parent.location.search + parent.location.hash); } catch (e) {}
  var root = document.documentElement;
  root.classList.add(admin ? 'nb-admin' : 'nb-user');
  if (admin) return;
  var css =
    // 디자인·개발용 도구
    '.nb-user #devnav,.nb-user #devT,.nb-user .devT,.nb-user .dev,.nb-user .notes,.nb-user #gtBtn,.nb-user #gt{display:none!important}' +
    // 폰 모양(검은 테두리·둥근 모서리·그림자·가짜 상태바)
    '.nb-user .stage{box-shadow:none!important;border-radius:0!important}' +
    '.nb-user .sbar,.nb-user .sbarW,.nb-user .stage::before,.nb-user .stage::after{display:none!important}' +
    '.nb-user .ph{box-shadow:none!important;border-radius:0!important}' +
    // 폰에서 위·아래 여백 없이 화면 끝까지
    '@media (max-width:499px){html.nb-user,html.nb-user body{background:#fff!important;height:100vh!important;height:100lvh!important;min-height:100%}'+
    'html.nb-user .wrap,html.nb-user .stage{height:100vh!important;height:100lvh!important;min-height:100%!important}}' +
    // 피그마에서 그대로 들어온 시계(9:41)·신호·와이파이·배터리 아이콘과 홈 인디케이터 막대
    '.nb-user path[d^="M57.7583 20.7231"],.nb-user path[d^="M300.5"],.nb-user path[d^="M317.10"],' +
    '.nb-user path[d^="M340.172 33.5"],.nb-user path[d^="M359.672 25.28"],.nb-user path[d^="M335.672 26.5"],' +
    '.nb-user rect[width="144"][height="5"][rx="2.5"]{display:none!important}' +
    // 안내 문구(토스트·힌트·미리듣기 라벨·리큐르 테마 설명 카드)
    '.nb-user #toast,.nb-user #hint,.nb-user #listen,.nb-user #thb{display:none!important}' +
    // 플레이 화면의 '그래프 조절' 패널(부모 문서에 붙는 경우 포함)
    '.nb-user #gtHost{display:none!important}.nb-user body.gt-on{padding:0!important}';
  var s = document.createElement('style');
  s.textContent = css;
  (document.head || root).appendChild(s);
})();
