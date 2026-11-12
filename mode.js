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
