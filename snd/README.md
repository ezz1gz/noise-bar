# 녹음 소리 분류 — 리큐르 · 가니쉬

리큐르 90개 · 가니쉬 16자리 · 예비 가니쉬 87개. 파일은 `snd/`, 목록은 `snd/catalog.json`, 앱은 `snd/rec.js`로 읽어요.

## 나누는 기준

- **리큐르 vs 가니쉬**: 계속 이어지는 바탕 소리 → 리큐르(끊김 없이 반복되게 이음매를 겹친 7–16초) · 한 번 울리는 단발 → 가니쉬
- **색 대역**(스펙트럼 기울기 dB/oct, 100 Hz–8 kHz): 브라운 ≤ −4.5 < 핑크 ≤ −1.5 < 화이트 ≤ +1.5 < 블루
- **리큐르 테마** = 이어짐 × 규칙성: 흐름(이어짐·불규칙) · 숨(이어짐·규칙적 부풂) · 박자(끊김·규칙) · 흩뿌림(끊김·불규칙)
- **가니쉬 계열** = 잘라낸 단발 소리의 색 대역: FIZZ 화이트 · SPARK 블루 · BLOSSOM 핑크 · MELT 브라운 · **넘버 = 꼭짓점 수**(같은 계열에서 클수록 높은 소리)
- **번호**: 리큐르 `LQ-<테마>-<순번>` (BR 숨 · FL 흐름 · BT 박자 · SC 흩뿌림), 가니쉬 `GN-<계열>-<꼭짓점 수>`, 예비 `GP-<순번>`

## 리큐르

| 번호 | 이름 | 테마 | 묶음 | 메타볼 색 | 색 대역(기울기) | 길이 | 설명 | 원본 · 라이선스 |
|---|---|---|---|---|---|---|---|---|
| LQ-FL-01 | 커피 머신 | 흐름 | 실내 | `#8a5a3c` | 브라운 (-7.01) | 16.0초 | 끊김 없이 이어지는 기계 소음, 낮은 쪽에 힘 | alex_jauk-coffee-machine-noise-218424.mp3 · Pixabay (사용자 제공) |
| LQ-FL-02 | TV 지지직 | 흐름 | 실내 | `#d9dde3` | 화이트 (0.03) | 14.0초 | 거의 평평한 스펙트럼(화이트에 가까움) | alex_jauk-tv-static-noise-256449.mp3 · Pixabay (사용자 제공) |
| LQ-FL-03 | 솔숲 바람 | 흐름 | 자연 | `#6f9a8a` | 브라운 (-9.55) | 16.0초 | 산 바람이 소나무를 지나는 소리, 아주 낮고 깊음 | capaholiczsfx-heavy-wind-noise-in-the-mountains-and-pine-trees-402291.mp3 · Pixabay (사용자 제공) |
| LQ-FL-04 | 돌풍 | 흐름 | 자연 | `#a9c4d6` | 핑크 (-3.87) | 16.0초 | 천천히 부풀었다 가라앉는 바람 | edr-wind-noise-001-8332.mp3 · Pixabay (사용자 제공) |
| LQ-FL-05 | AM 라디오 잡음 | 흐름 | 실내 | `#9a8fb8` | 브라운 (-7.19) | 16.0초 | 주파수 사이 잡음, 고르게 이어짐 | freesound_community-am-radio-static-60183.mp3 · Pixabay (사용자 제공) |
| LQ-FL-06 | 폭포 | 흐름 | 자연 | `#7fd3e6` | 브라운 (-4.81) | 16.0초 | 쏟아지는 물이 고르게 이어짐 | m_nature_waterfall.mp3 · Pixabay/CC0 (Moodist) |
| LQ-FL-07 | 강물 | 흐름 | 자연 | `#4aa3c7` | 핑크 (-1.99) | 16.0초 | 흐르는 물살 | m_nature_river.mp3 · Pixabay/CC0 (Moodist) |
| LQ-FL-08 | 물속 | 흐름 | 자연 | `#1f3f8f` | 브라운 (-22.03) | 16.0초 | 아주 낮게 웅웅 — 가장 깊은 소리 | m_places_underwater.mp3 · Pixabay/CC0 (Moodist) |
| LQ-FL-09 | 천장 선풍기 | 흐름 | 실내 | `#cfe3d0` | 핑크 (-4.45) | 13.39초 | 날개 바람이 고르게 | m_things_ceiling-fan.mp3 · Pixabay/CC0 (Moodist) |
| LQ-FL-10 | 건조기 | 흐름 | 실내 | `#e9d6c0` | 브라운 (-9.47) | 16.0초 | 낮게 웅웅 도는 기계 | m_things_dryer.mp3 · Pixabay/CC0 (Moodist) |
| LQ-FL-11 | 정글 | 흐름 | 자연 | `#3fbf6a` | 블루 (2.67) | 16.0초 | 벌레 소리가 벽처럼 이어짐 — 밝은 블루 대역 | m_nature_jungle.mp3 · Pixabay/CC0 (Moodist) |
| LQ-FL-12 | 고속도로 | 흐름 | 도시 | `#6b6f78` | 브라운 (-7.23) | 16.0초 | 차들이 지나가는 큰 흐름 | m_urban_highway.mp3 · Pixabay/CC0 (Moodist) |
| LQ-FL-13 | 벌집 | 흐름 | 자연 | `#e8b830` | 브라운 (-6.87) | 16.0초 | 날갯짓이 겹쳐 웅웅 이어짐 | m_animals_beehive.mp3 · Pixabay/CC0 (Moodist) |
| LQ-FL-14 | 선풍기 | 흐름 | 실내 | `#bfe6f2` | 브라운 (-7.45) | 8.15초 | 낮게 도는 날개 바람 | bigsoundbank #0078 · BigSoundBank (CC0) |
| LQ-FL-15 | 헤어드라이어 | 흐름 | 실내 | `#f6b8c8` | 핑크 (-4.2) | 16.0초 | 뜨거운 바람이 고르게 | bigsoundbank #0661 · BigSoundBank (CC0) |
| LQ-FL-16 | 에어컨 | 흐름 | 실내 | `#d8eef8` | 브라운 (-7.76) | 16.0초 | 창밖 실외기처럼 낮게 웅 | bigsoundbank #1471 · BigSoundBank (CC0) |
| LQ-FL-17 | 작은 개울 | 흐름 | 자연 | `#69c2d8` | 핑크 (-2.9) | 16.0초 | 졸졸 흐르는 개울 | bigsoundbank #0864 · BigSoundBank (CC0) |
| LQ-FL-18 | 절 마당 물소리 | 흐름 | 자연 | `#7fa7a0` | 핑크 (-3.4) | 16.0초 | 돌확에 떨어지는 물이 이어짐 | bigsoundbank #0913 · BigSoundBank (CC0) |
| LQ-FL-19 | 압력솥 김 | 흐름 | 실내 | `#e9eef0` | 블루 (6.63) | 16.0초 | 칙— 새는 김, 아주 밝은 블루 대역 | bigsoundbank #0805 · BigSoundBank (CC0) |
| LQ-FL-20 | 호박벌 | 흐름 | 자연 | `#f2c12e` | 브라운 (-5.07) | 9.77초 | 붕— 낮게 맴도는 날갯짓 | bigsoundbank #1000 · BigSoundBank (CC0) |
| LQ-FL-21 | 16mm 카메라 | 흐름 | 실내 | `#a09080` | 화이트 (-0.01) | 16.0초 | 필름이 돌아가는 기계음 | bigsoundbank #0939 · BigSoundBank (CC0) |
| LQ-BR-01 | 시골 밤 풀벌레 | 숨 | 자연 | `#46607a` | 핑크 (-3.75) | 16.0초 | 풀벌레가 일정하게 반복해 우는 밤 | alex_jauk-countryside-night-ambience-234022.mp3 · Pixabay (사용자 제공) |
| LQ-BR-02 | 지나가는 차 | 숨 | 도시 | `#5b5f70` | 브라운 (-8.08) | 8.98초 | 다가왔다 멀어지는 한 번의 부풂 | freesound_community-car-coming-3-84572.mp3 · Pixabay (사용자 제공) |
| LQ-BR-03 | 바닷가 파도 | 숨 | 자연 | `#2e7fd6` | 브라운 (-4.54) | 16.0초 | 밀려왔다 빠지는 파도 | m_nature_waves.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BR-04 | 고양이 골골 | 숨 | 실내 | `#f2a6b8` | 브라운 (-5.08) | 14.0초 | 숨 쉬듯 반복되는 골골송 | m_animals_cat-purring.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BR-05 | 통돌이 세탁기 | 숨 | 실내 | `#a9c6e8` | 브라운 (-8.84) | 16.0초 | 일정하게 도는 통 | m_things_washing-machine.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BR-06 | 와이퍼 | 숨 | 도시 | `#8e8a9e` | 브라운 (-6.04) | 12.0초 | 쓱 — 쓱 일정한 왕복 | m_things_windshield-wipers.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BR-07 | 돛단배 | 숨 | 자연 | `#c9b08a` | 브라운 (-7.95) | 16.0초 | 천천히 흔들리며 삐걱임 | m_transport_sailboat.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BR-08 | 나무 사이 바람 | 숨 | 자연 | `#9ccf8a` | 핑크 (-3.09) | 16.0초 | 부풀었다 잦아드는 바람 | m_nature_wind-in-trees.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BR-09 | 풍력 발전기 | 숨 | 자연 | `#cfd8dc` | 브라운 (-7.43) | 16.0초 | 휘익— 날개가 돌 때마다 부풂 | bigsoundbank #1314 · BigSoundBank (CC0) |
| LQ-BR-10 | 식기세척기 | 숨 | 실내 | `#9fc3d8` | 브라운 (-6.27) | 16.0초 | 물줄기가 일정하게 돌며 쏴아 | bigsoundbank #1002 · BigSoundBank (CC0) |
| LQ-BR-11 | 스캐너 | 숨 | 실내 | `#b8c0ff` | 브라운 (-7.1) | 13.89초 | 천천히 훑고 돌아오는 소리 | bigsoundbank #1415 · BigSoundBank (CC0) |
| LQ-BR-12 | 아기 고양이 골골 | 숨 | 실내 | `#ffc2d1` | 브라운 (-5.9) | 16.0초 | 작은 숨에 맞춰 골골 | bigsoundbank #0981 · BigSoundBank (CC0) |
| LQ-BR-13 | 졸린 고양이 골골 | 숨 | 실내 | `#e8a0b4` | 브라운 (-6.17) | 16.0초 | 느리고 깊은 골골송 | bigsoundbank #1010 · BigSoundBank (CC0) |
| LQ-BR-14 | 코 고는 소리 | 숨 | 실내 | `#8a7fa0` | 핑크 (-4.29) | 16.0초 | 드르렁 — 쉬익, 숨 따라 반복 | bigsoundbank #0170 · BigSoundBank (CC0) |
| LQ-BR-15 | 강아지 숨소리 | 숨 | 실내 | `#d9a46a` | 브라운 (-7.62) | 13.75초 | 헥헥 일정한 숨 | bigsoundbank #1547 · BigSoundBank (CC0) |
| LQ-BR-16 | 잔잔한 해변 | 숨 | 자연 | `#5aa0e0` | 브라운 (-4.97) | 16.0초 | 밀려오고 빠지는 작은 파도 | bigsoundbank #1446 · BigSoundBank (CC0) |
| LQ-BR-17 | 그네 삐걱 | 숨 | 도시 | `#c98f6a` | 핑크 (-2.34) | 16.0초 | 왔다 갔다 삐걱 | bigsoundbank #1094 · BigSoundBank (CC0) |
| LQ-BT-01 | 옛날 카메라 | 박자 | 실내 | `#8f8678` | 브라운 (-11.12) | 16.0초 | 셔터·태엽이 일정하게 끊김 | creatorshome-old-camera-noise-336343.mp3 · Pixabay (사용자 제공) |
| LQ-BT-02 | 숲길 발걸음 | 박자 | 자연 | `#8a7a5a` | 핑크 (-1.62) | 14.0초 | 흙길을 걷는 발걸음 | dbsound-footsteps-on-nature-trail-246038.mp3 · Pixabay (사용자 제공) |
| LQ-BT-03 | 탁상시계 | 박자 | 실내 | `#d8c8f0` | 화이트 (-0.89) | 12.0초 | 정확히 1초마다 똑딱 | m_things_clock.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BT-04 | 말발굽 | 박자 | 자연 | `#9a6a48` | 핑크 (-4.12) | 7.94초 | 다그닥 다그닥 | m_animals_horse-gallop.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BT-05 | 타자기 | 박자 | 실내 | `#f0e6d2` | 화이트 (0.19) | 14.0초 | 타닥타닥 끊기는 타건 | m_things_typewriter.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BT-06 | 노 젓기 | 박자 | 자연 | `#3e6f8a` | 브라운 (-8.84) | 16.0초 | 물을 가르는 일정한 노질 | m_transport_rowing-boat.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BT-07 | 자갈길 걸음 | 박자 | 자연 | `#b0a090` | 브라운 (-4.75) | 14.0초 | 자박자박 일정한 발걸음 | m_nature_walk-on-gravel.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BT-08 | 눈길 걸음 | 박자 | 자연 | `#eef4ff` | 브라운 (-6.21) | 14.0초 | 뽀드득 눈 밟는 소리 | m_nature_walk-in-snow.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BT-09 | 동굴 물방울 | 박자 | 자연 | `#5fc8c0` | 브라운 (-5.55) | 16.0초 | 똑 — 똑 떨어지는 물방울 | m_nature_droplets.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BT-10 | 기차 덜컹 | 박자 | 도시 | `#7a5a8a` | 브라운 (-6.88) | 16.0초 | 레일 이음매마다 덜컹 | m_transport_train.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BT-11 | 벽시계 째깍 | 박자 | 실내 | `#efe3c8` | 브라운 (-6.11) | 14.0초 | 째깍째깍 일정하게 | bigsoundbank #1069 · BigSoundBank (CC0) |
| LQ-BT-12 | 괘종시계 | 박자 | 실내 | `#7a5230` | 브라운 (-9.19) | 16.0초 | 크고 느린 똑— 딱— | bigsoundbank #1567 · BigSoundBank (CC0) |
| LQ-BT-13 | 재봉틀 | 박자 | 실내 | `#c03a5a` | 브라운 (-4.52) | 14.0초 | 드르륵 빠르게 박음질 | bigsoundbank #1115 · BigSoundBank (CC0) |
| LQ-BT-14 | 잉크젯 프린터 | 박자 | 실내 | `#e0e4ea` | 핑크 (-3.54) | 16.0초 | 왕복하는 헤드 | bigsoundbank #0169 · BigSoundBank (CC0) |
| LQ-BT-15 | 영사기 | 박자 | 실내 | `#4a4a5a` | 브라운 (-4.72) | 16.0초 | 필름 넘어가는 덜컥임 | bigsoundbank #0065 · BigSoundBank (CC0) |
| LQ-BT-16 | 건초 씹는 말 | 박자 | 자연 | `#c8a860` | 브라운 (-5.25) | 8.26초 | 우적우적 일정하게 씹음 | bigsoundbank #0497 · BigSoundBank (CC0) |
| LQ-BT-17 | 풀 뜯는 말 | 박자 | 자연 | `#7fb069` | 핑크 (-3.28) | 16.0초 | 풀을 뜯는 일정한 소리 | bigsoundbank #0986 · BigSoundBank (CC0) |
| LQ-BT-18 | 통통배 장난감 | 박자 | 실내 | `#ff8c42` | 블루 (2.41) | 16.0초 | 통통통 빠르게 튀는 증기 | bigsoundbank #0586 · BigSoundBank (CC0) |
| LQ-BT-19 | 낚싯줄 감기 | 박자 | 자연 | `#5ac8fa` | 화이트 (1.42) | 14.0초 | 드르륵 감기는 릴 | bigsoundbank #1437 · BigSoundBank (CC0) |
| LQ-BT-20 | 들귀뚜라미 | 박자 | 자연 | `#9fd36a` | 블루 (8.54) | 16.0초 | 찌르르 일정하게 끊어 울음 | bigsoundbank #1020 · BigSoundBank (CC0) |
| LQ-SC-01 | 사람들 웅성임 | 흩뿌림 | 도시 | `#b08a6a` | 핑크 (-4.27) | 16.0초 | 목소리가 불규칙하게 겹치는 배경 | 31736081-people-background-noise-1-306811.mp3 · Pixabay (사용자 제공) |
| LQ-SC-02 | 보글보글 끓는 물 | 흩뿌림 | 실내 | `#c97a4a` | 브라운 (-10.66) | 7.16초 | 낮은 기포가 불규칙하게 터짐 | alex_jauk-bubbling-liquid-noise-224920.mp3 · Pixabay (사용자 제공) |
| LQ-SC-03 | LP 지글지글 | 흩뿌림 | 실내 | `#3d3540` | 블루 (4.48) | 16.0초 | 높은 잡음 위로 작은 튐이 흩어짐 | danevaer-vinyl-crackle-noise-1-434733_1.mp3 · Pixabay (사용자 제공) |
| LQ-SC-04 | 아침 새소리 | 흩뿌림 | 자연 | `#8fbf7a` | 브라운 (-7.6) | 16.0초 | 새들이 불규칙하게 지저귐 | dbsound-morning-nature-sounds-246034.mp3 · Pixabay (사용자 제공) |
| LQ-SC-05 | 한낮의 농장 | 흩뿌림 | 자연 | `#c2a86a` | 브라운 (-4.55) | 16.0초 | 바탕 소리 위 동물 소리가 띄엄띄엄 | fletchpike-daytime-farm-ambience-409990.mp3 · Pixabay (사용자 제공) |
| LQ-SC-06 | 숲속 새 지저귐 | 흩뿌림 | 자연 | `#9fe07a` | 블루 (3.44) | 16.0초 | 높고 밝게 흩어지는 새소리 — 블루 대역 | m_animals_birds.mp3 · Pixabay/CC0 (Moodist) |
| LQ-SC-07 | 모닥불 장작 | 흩뿌림 | 자연 | `#ff7a3a` | 화이트 (-1.0) | 16.0초 | 탁탁 튀는 불꽃 | m_nature_campfire.mp3 · Pixabay/CC0 (Moodist) |
| LQ-SC-08 | 우산 위 빗방울 | 흩뿌림 | 도시 | `#6a8cff` | 핑크 (-3.18) | 16.0초 | 우산을 두드리는 빗방울 | m_rain_rain-on-umbrella.mp3 · Pixabay/CC0 (Moodist) |
| LQ-SC-09 | 가랑비 | 흩뿌림 | 자연 | `#bfe8ff` | 화이트 (0.67) | 16.0초 | 가늘게 흩뿌리는 비 — 화이트 대역 | m_rain_light-rain.mp3 · Pixabay/CC0 (Moodist) |
| LQ-SC-10 | 사무실 | 흩뿌림 | 실내 | `#c8c0b0` | 브라운 (-5.01) | 16.0초 | 타자·전화·발소리가 띄엄띄엄 | m_places_office.mp3 · Pixabay/CC0 (Moodist) |
| LQ-SC-11 | 딱따구리 | 흩뿌림 | 자연 | `#c0442e` | 브라운 (-7.17) | 14.0초 | 불규칙하게 나무를 쪼는 소리 | m_animals_woodpecker.mp3 · Pixabay/CC0 (Moodist) |
| LQ-SC-12 | 개구리 연못 | 흩뿌림 | 자연 | `#6aa84f` | 브라운 (-4.87) | 16.0초 | 띄엄띄엄 개굴 | m_animals_frog.mp3 · Pixabay/CC0 (Moodist) |
| LQ-SC-13 | 키보드 타건 | 흩뿌림 | 실내 | `#e0e0ff` | 화이트 (-1.02) | 10.95초 | 불규칙한 키 누름 — 화이트 대역 | m_things_keyboard.mp3 · Pixabay/CC0 (Moodist) |
| LQ-SC-14 | 종이 바스락 | 흩뿌림 | 실내 | `#fff4d6` | 화이트 (0.31) | 16.0초 | 종이를 넘기고 구기는 소리 | m_things_paper.mp3 · Pixabay/CC0 (Moodist) |
| LQ-SC-15 | 유리잔 사이다 | 흩뿌림 | 실내 | `#e8f8d8` | 핑크 (-1.68) | 5.72초 | 기포가 톡톡 올라와 터짐 | bigsoundbank #0117 · BigSoundBank (CC0) |
| LQ-SC-16 | 탄산수 | 흩뿌림 | 실내 | `#d0f0ff` | 화이트 (0.09) | 12.0초 | 잘게 흩어지는 기포 — 화이트 대역 | bigsoundbank #0230 · BigSoundBank (CC0) |
| LQ-SC-17 | 지글지글 프라이팬 | 흩뿌림 | 실내 | `#ffb347` | 블루 (3.21) | 5.28초 | 기름이 튀는 높은 지글거림 | bigsoundbank #0143 · BigSoundBank (CC0) |
| LQ-SC-18 | 팝콘 튀기기 | 흩뿌림 | 실내 | `#fff0b3` | 화이트 (-1.34) | 16.0초 | 펑펑 불규칙하게 튀는 옥수수 | bigsoundbank #0413 · BigSoundBank (CC0) |
| LQ-SC-19 | 냄비 속 국물 | 흩뿌림 | 실내 | `#d2691e` | 브라운 (-9.4) | 5.67초 | 보글보글 끓는 국물 | bigsoundbank #0491 · BigSoundBank (CC0) |
| LQ-SC-20 | 쥐 갉작 | 흩뿌림 | 실내 | `#a89888` | 화이트 (0.13) | 16.0초 | 사각사각 갉는 소리 | bigsoundbank #0185 · BigSoundBank (CC0) |
| LQ-SC-21 | 오리 | 흩뿌림 | 자연 | `#4fa36a` | 핑크 (-1.68) | 16.0초 | 꽥꽥 띄엄띄엄 | bigsoundbank #0276 · BigSoundBank (CC0) |
| LQ-SC-22 | 닭장 | 흩뿌림 | 자연 | `#e8c070` | 브라운 (-5.89) | 16.0초 | 꼬꼬댁 흩어지는 닭 소리 | bigsoundbank #0282 · BigSoundBank (CC0) |
| LQ-SC-23 | 염소 무리 | 흩뿌림 | 자연 | `#d8c8b0` | 화이트 (0.46) | 16.0초 | 방울 소리와 음매 | bigsoundbank #0821 · BigSoundBank (CC0) |
| LQ-SC-24 | 제비 | 흩뿌림 | 자연 | `#2e4a7a` | 블루 (3.13) | 16.0초 | 재잘재잘 높은 지저귐 | bigsoundbank #1015 · BigSoundBank (CC0) |
| LQ-SC-25 | 개구리 떼 | 흩뿌림 | 자연 | `#3f7f3f` | 브라운 (-8.86) | 16.0초 | 개굴개굴 떼로 우는 논 | bigsoundbank #0997 · BigSoundBank (CC0) |
| LQ-SC-26 | 외양간 | 흩뿌림 | 자연 | `#8b6b4a` | 브라운 (-11.8) | 16.0초 | 소들이 움직이고 우는 헛간 | bigsoundbank #0991 · BigSoundBank (CC0) |
| LQ-SC-28 | 식당 | 흩뿌림 | 도시 | `#d9a77c` | 브라운 (-5.99) | 16.0초 | 그릇 소리와 웅성임 | bigsoundbank #0624 · BigSoundBank (CC0) |
| LQ-SC-29 | 양치질 | 흩뿌림 | 실내 | `#a8e6e2` | 화이트 (-0.18) | 14.0초 | 치카치카 | bigsoundbank #0718 · BigSoundBank (CC0) |
| LQ-SC-30 | 밤 풀벌레 합창 | 흩뿌림 | 자연 | `#203a5a` | 화이트 (0.89) | 16.0초 | 아주 높은 풀벌레 합창 — 블루 대역 | bigsoundbank #1470 · BigSoundBank (CC0) |
| LQ-SC-31 | 방수포 위 비 | 흩뿌림 | 자연 | `#4f6f9f` | 핑크 (-4.11) | 16.0초 | 후두둑 두드리는 비 | bigsoundbank #1292 · BigSoundBank (CC0) |
| LQ-SC-32 | 웅덩이 빗방울 | 흩뿌림 | 도시 | `#8fb8de` | 화이트 (-0.28) | 16.0초 | 톡톡 웅덩이에 떨어지는 비 | bigsoundbank #1290 · BigSoundBank (CC0) |
| LQ-SC-33 | 도서관 | 흩뿌림 | 실내 | `#b8a58a` | — | 20초 | 조용한 열람실 공기 위로 책장 넘김·연필·책 덮는 소리가 띄엄띄엄 | bigsoundbank #0917 룸톤 + #0164·0362·0493·1413 책장 넘김 · #0221 연필 · #1410 책 덮기 · #0376 먼 발소리 · #1404 숨 — 섞어 만든 열람실 · CC0 |

## 가니쉬 자리표

| 계열 | 자리 1 | 자리 2 | 자리 3 | 자리 4 |
|---|---|---|---|---|
| FIZZ | 8 키보드 탁 | 10 캔 따는 소리 | 12 타자기 탁 | 14 불티 틱 |
| SPARK | 4 돌고래 딸깍 | 5 새 짹 | 6 풍경 딩 | 8 스프레이 치익 |
| BLOSSOM | 4 말발굽 한 번 | 5 장작 톡 | 6 시계 똑 | 8 종이 한 장 사락 |
| MELT | 3 쿵 (킥) | 4 퍽 (타격음) | 5 염소 울음 | 6 개구리 개굴 |

| 번호 | 이름 | 색 대역(기울기) | 길이 | 원본 · 라이선스 |
|---|---|---|---|---|
| GN-FIZZ-08 | 키보드 탁 | 화이트 (0.11) | 0.15초 | m_things_keyboard.mp3 @1.59s · Pixabay/CC0 (Moodist) |
| GN-FIZZ-10 | 캔 따는 소리 | 화이트 (-0.79) | 2.6초 | alex_jauk-opening-beer-can-noise-421403.mp3 · Pixabay (사용자 제공) |
| GN-FIZZ-12 | 타자기 탁 | 화이트 (-0.28) | 0.25초 | m_things_typewriter.mp3 @17.46s · Pixabay/CC0 (Moodist) |
| GN-FIZZ-14 | 불티 틱 | 화이트 (0.2) | 0.2초 | m_nature_campfire.mp3 @48.765s · Pixabay/CC0 (Moodist) |
| GN-SPARK-04 | 돌고래 딸깍 | 블루 (1.54) | 2.4초 | freesound_community-dolphin-noise-6968.mp3 · Pixabay (사용자 제공) |
| GN-SPARK-05 | 새 짹 | 블루 (5.36) | 0.9초 | m_animals_birds.mp3 @37.28s · Pixabay/CC0 (Moodist) |
| GN-SPARK-06 | 풍경 딩 | 블루 (10.27) | 0.9초 | m_things_wind-chimes.mp3 @39.225s · Pixabay/CC0 (Moodist) |
| GN-SPARK-08 | 스프레이 치익 | 블루 (1.51) | 2.2초 | alex_jauk-spray-can-noise-478948.mp3 · Pixabay (사용자 제공) |
| GN-BLOSSOM-04 | 말발굽 한 번 | 핑크 (-3.15) | 0.14초 | m_animals_horse-gallop.mp3 @8.995s · Pixabay/CC0 (Moodist) |
| GN-BLOSSOM-05 | 장작 톡 | 핑크 (-2.74) | 0.25초 | m_nature_campfire.mp3 @44.865s · Pixabay/CC0 (Moodist) |
| GN-BLOSSOM-06 | 시계 똑 | 핑크 (-2.1) | 0.14초 | m_things_clock.mp3 @2.655s · Pixabay/CC0 (Moodist) |
| GN-BLOSSOM-08 | 종이 한 장 사락 | 핑크 (-1.64) | 0.7초 | m_things_paper.mp3 @3.875s · Pixabay/CC0 (Moodist) |
| GN-MELT-03 | 쿵 (킥) | 브라운 (-6.75) | 0.5초 | djdominik7-kick_01-602464.mp3 · Pixabay (사용자 제공) |
| GN-MELT-04 | 퍽 (타격음) | 브라운 (-5.06) | 0.41초 | edr-video-game-hit-noise-001-135821.mp3 · Pixabay (사용자 제공) |
| GN-MELT-05 | 염소 울음 | 브라운 (-4.95) | 2.6초 | alex_jauk-goat-noise-192570.mp3 · Pixabay (사용자 제공) |
| GN-MELT-06 | 개구리 개굴 | 브라운 (-6.19) | 0.72초 | m_animals_frog.mp3 @0.435s · Pixabay/CC0 (Moodist) |

## 예비 가니쉬 (앱 자리 밖 — 자리를 늘리거나 바꿀 때 씀)

| 번호 | 이름 | 맞는 계열 | 기울기 | 길이 | 원본 |
|---|---|---|---|---|---|
| GP-01 | 물방울 똑 | MELT | -7.48 | 0.67초 | m_nature_droplets.mp3 @10.59s · Pixabay/CC0 (Moodist) |
| GP-02 | 거품 뽀록 | MELT | -5.17 | 0.3초 | m_things_bubbles.mp3 @2.035s · Pixabay/CC0 (Moodist) |
| GP-03 | 부엉이 부엉 | MELT | -7.5 | 1.38초 | m_animals_owl.mp3 @9.05s · Pixabay/CC0 (Moodist) |
| GP-04 | 개 멍 | MELT | -6.68 | 0.95초 | m_animals_dog-barking.mp3 @0.015s · Pixabay/CC0 (Moodist) |
| GP-05 | 딱따구리 딱 | MELT | -7.53 | 0.74초 | m_animals_woodpecker.mp3 @12.94s · Pixabay/CC0 (Moodist) |
| GP-06 | 눈 뽀드득 | MELT | -8.42 | 0.3초 | m_nature_walk-in-snow.mp3 @22.665s · Pixabay/CC0 (Moodist) |
| GP-07 | 불꽃 펑 | MELT | -10.14 | 0.78초 | m_urban_fireworks.mp3 @29.495s · Pixabay/CC0 (Moodist) |
| GP-08 | 천둥 우르릉 | MELT | -15.65 | 1.4초 | m_rain_thunder.mp3 @24.66s · Pixabay/CC0 (Moodist) |
| GP-09 | 갈매기 끼룩 | MELT | -5.37 | 1.4초 | m_animals_seagulls.mp3 @39.15s · Pixabay/CC0 (Moodist) |
| GP-10 | 소 음매 | MELT | -9.86 | 1.4초 | m_animals_cows.mp3 @1.545s · Pixabay/CC0 (Moodist) |
| GP-11 | 슬라이드 찰칵 | MELT | -6.3 | 0.3초 | m_things_slide-projector.mp3 @43.245s · Pixabay/CC0 (Moodist) |
| GP-12 | 닭 꼬꼬 | MELT | -5.82 | 0.3초 | m_animals_chickens.mp3 @18.89s · Pixabay/CC0 (Moodist) |
| GP-13 | 노 첨벙 | MELT | -9.57 | 0.3초 | m_transport_rowing-boat.mp3 @20.43s · Pixabay/CC0 (Moodist) |
| GP-14 | 새끼 고양이 야옹 | BLOSSOM | -3.69 | 0.47초 | bigsoundbank #0098 @2.22s · BigSoundBank (CC0) |
| GP-15 | 야옹 | MELT | -9.3 | 0.37초 | bigsoundbank #1472 @0.44s · BigSoundBank (CC0) |
| GP-16 | 야옹 2 | MELT | -7.56 | 0.33초 | bigsoundbank #1475 @0.48s · BigSoundBank (CC0) |
| GP-17 | 샴페인 펑 | MELT | -6.01 | 0.33초 | bigsoundbank #0211 @1.39s · BigSoundBank (CC0) |
| GP-18 | 캔 칙 | SPARK | 3.57 | 0.34초 | bigsoundbank #0116 @0.08s · BigSoundBank (CC0) |
| GP-19 | 병뚜껑 뽁 | SPARK | 4.39 | 0.39초 | bigsoundbank #1390 @1.79s · BigSoundBank (CC0) |
| GP-20 | 병뚜껑 짤랑 | SPARK | 4.15 | 0.37초 | bigsoundbank #1392 @0.55s · BigSoundBank (CC0) |
| GP-21 | 잔 쨍 | SPARK | 3.33 | 0.4초 | bigsoundbank #1335 @0.06s · BigSoundBank (CC0) |
| GP-22 | 뽁뽁이 | FIZZ | -0.68 | 0.33초 | bigsoundbank #0462 @2.65s · BigSoundBank (CC0) |
| GP-23 | 쪽 | SPARK | 2.15 | 0.36초 | bigsoundbank #0178 @3.15s · BigSoundBank (CC0) |
| GP-24 | 혀 차기 | BLOSSOM | -4.04 | 0.26초 | bigsoundbank #1038 @10.2s · BigSoundBank (CC0) |
| GP-25 | 손가락 딱 | BLOSSOM | -2.46 | 0.33초 | bigsoundbank #0483 @11.2s · BigSoundBank (CC0) |
| GP-26 | 볼펜 딸깍 | FIZZ | -1.11 | 0.69초 | bigsoundbank #0613 @11.11s · BigSoundBank (CC0) |
| GP-27 | 동전 짤랑 | FIZZ | -0.63 | 0.67초 | bigsoundbank #0339 @0.04s · BigSoundBank (CC0) |
| GP-28 | 주사위 | BLOSSOM | -3.24 | 0.51초 | bigsoundbank #0581 @0.07s · BigSoundBank (CC0) |
| GP-29 | 머그 스푼 | MELT | -5.11 | 0.33초 | bigsoundbank #0410 @14.72s · BigSoundBank (CC0) |
| GP-30 | 사과 아삭 | BLOSSOM | -1.5 | 0.71초 | bigsoundbank #1113 @0.48s · BigSoundBank (CC0) |
| GP-31 | 킁킁 | SPARK | 1.67 | 0.37초 | bigsoundbank #0784 @5.04s · BigSoundBank (CC0) |
| GP-32 | 병아리 삐약 | SPARK | 3.04 | 0.31초 | bigsoundbank #0672 @10.61s · BigSoundBank (CC0) |
| GP-33 | 작은 개 왕 | MELT | -7.0 | 0.69초 | bigsoundbank #0612 @7.34s · BigSoundBank (CC0) |
| GP-34 | 아기 염소 | FIZZ | -0.58 | 0.39초 | bigsoundbank #1378 @0.28s · BigSoundBank (CC0) |
| GP-35 | 흡착판 뽁 | BLOSSOM | -4.41 | 0.33초 | bigsoundbank #1262 @2.09s · BigSoundBank (CC0) |
| GP-36 | 빨대 쪽 | FIZZ | -1.28 | 0.3초 | bigsoundbank #1244 @0.49s · BigSoundBank (CC0) |
| GP-37 | 퐁당 | BLOSSOM | -3.18 | 0.89초 | bigsoundbank #1529 @0.04s · BigSoundBank (CC0) |
| GP-39 | 공 통 | MELT | -9.7 | 0.33초 | bigsoundbank #0584 @0.07s · BigSoundBank (CC0) |
| GP-40 | 삑삑이 | SPARK | 3.87 | 0.63초 | bigsoundbank #0879 @0.1s · BigSoundBank (CC0) |
| GP-41 | 오리 장난감 | FIZZ | -0.35 | 0.84초 | bigsoundbank #0364 @0.06s · BigSoundBank (CC0) |
| GP-42 | 레고 달그락 | SPARK | 4.04 | 1.75초 | bigsoundbank #1273 @17.8s · BigSoundBank (CC0) |
| GP-43 | 심장 쿵 | MELT | -18.67 | 0.6초 | bigsoundbank #0243 @0.03s · BigSoundBank (CC0) |
| GP-44 | 말 콧김 | MELT | -6.17 | 0.3초 | bigsoundbank #0285 @0.3s · BigSoundBank (CC0) |
| GP-45 | 꼬르륵 | MELT | -10.18 | 0.35초 | bigsoundbank #1280 @0.74s · BigSoundBank (CC0) |
| GP-46 | 얼음 달그락 | SPARK | 4.36 | 0.3초 | bigsoundbank #2123 @0.14s · BigSoundBank (CC0) |
| GP-47 | 얼음 톡톡 | SPARK | 2.11 | 0.4초 | bigsoundbank #2127 @0.0s · BigSoundBank (CC0) |
| GP-48 | 와인잔 짠 | SPARK | 3.4 | 0.35초 | bigsoundbank #1333 @0.02s · BigSoundBank (CC0) |
| GP-49 | 작은 잔 짠 | SPARK | 4.23 | 0.3초 | bigsoundbank #1325 @0.0s · BigSoundBank (CC0) |
| GP-50 | 유리잔 짠 | FIZZ | -0.6 | 0.3초 | bigsoundbank #1323 @0.01s · BigSoundBank (CC0) |
| GP-51 | 플루트 잔 짠 | FIZZ | 0.21 | 0.3초 | bigsoundbank #1337 @0.01s · BigSoundBank (CC0) |
| GP-52 | 잔 두드림 띵 | SPARK | 2.9 | 0.73초 | bigsoundbank #2888 @1.43s · BigSoundBank (CC0) |
| GP-53 | 코르크 펑 | MELT | -4.51 | 0.3초 | bigsoundbank #0648 @0.24s · BigSoundBank (CC0) |
| GP-54 | 와인 마개 뽁 | MELT | -8.87 | 0.32초 | bigsoundbank #0274 @0.01s · BigSoundBank (CC0) |
| GP-55 | 와인 마개 쏙 | MELT | -4.85 | 0.3초 | bigsoundbank #1719 @0.95s · BigSoundBank (CC0) |
| GP-56 | 사이다 마개 톡 | BLOSSOM | -4.07 | 0.3초 | bigsoundbank #0547 @0.04s · BigSoundBank (CC0) |
| GP-57 | 사이다 마개 팝 | MELT | -7.4 | 0.3초 | bigsoundbank #1619 @0.0s · BigSoundBank (CC0) |
| GP-58 | 맥주병 따기 | SPARK | 7.26 | 0.3초 | bigsoundbank #1931 @0.44s · BigSoundBank (CC0) |
| GP-59 | 병 불기 부웅 | MELT | -7.71 | 0.71초 | bigsoundbank #1939 @0.09s · BigSoundBank (CC0) |
| GP-60 | 병 불기 뿌우 | MELT | -7.09 | 2.23초 | bigsoundbank #1944 @0.1s · BigSoundBank (CC0) |
| GP-61 | 병 부딪힘 짤 | SPARK | 3.79 | 0.3초 | bigsoundbank #1938 @0.03s · BigSoundBank (CC0) |
| GP-62 | 컵 속 동전 | BLOSSOM | -2.18 | 0.39초 | bigsoundbank #0340 @0.07s · BigSoundBank (CC0) |
| GP-63 | 계산대 삑 | MELT | -4.85 | 0.11초 | bigsoundbank #1417 @0.09s · BigSoundBank (CC0) |
| GP-64 | 알림 띠링 | FIZZ | -0.34 | 0.16초 | bigsoundbank #2066 @0.24s · BigSoundBank (CC0) |
| GP-65 | 알림 띠로롱 | BLOSSOM | -3.07 | 0.3초 | bigsoundbank #2059 @0.0s · BigSoundBank (CC0) |
| GP-66 | 자전거 벨 따릉 | SPARK | 5.67 | 0.99초 | bigsoundbank #0275 @0.02s · BigSoundBank (CC0) |
| GP-67 | 작은 종 딸랑 | SPARK | 5.0 | 2.15초 | bigsoundbank #0292 @0.04s · BigSoundBank (CC0) |
| GP-68 | 종 땡 | SPARK | 4.81 | 2.23초 | bigsoundbank #2115 @0.03s · BigSoundBank (CC0) |
| GP-69 | 타자기 종 띵 | FIZZ | 0.35 | 1.49초 | bigsoundbank #2844 @0.1s · BigSoundBank (CC0) |
| GP-70 | 풍경 차르르 | SPARK | 11.36 | 1.39초 | bigsoundbank #2079 @0.59s · BigSoundBank (CC0) |
| GP-71 | 나비 풍경 | SPARK | 12.3 | 0.37초 | bigsoundbank #2087 @1.54s · BigSoundBank (CC0) |
| GP-72 | 만화 뾰잉 | MELT | -5.01 | 1.06초 | bigsoundbank #2277 @0.14s · BigSoundBank (CC0) |
| GP-73 | 만화 뾰용 | MELT | -5.33 | 0.81초 | bigsoundbank #2283 @0.15s · BigSoundBank (CC0) |
| GP-74 | 탁구공 똑 | BLOSSOM | -2.43 | 0.3초 | bigsoundbank #2236 @0.09s · BigSoundBank (CC0) |
| GP-75 | 유리구슬 통 | SPARK | 6.07 | 0.3초 | bigsoundbank #2240 @0.1s · BigSoundBank (CC0) |
| GP-76 | 쇠구슬 팅 | SPARK | 2.0 | 0.3초 | bigsoundbank #2242 @0.08s · BigSoundBank (CC0) |
| GP-77 | 온도조절기 딸깍 | SPARK | 4.81 | 0.1초 | bigsoundbank #2191 @0.04s · BigSoundBank (CC0) |
| GP-78 | 카메라 찰칵 | FIZZ | 1.13 | 0.3초 | bigsoundbank #2821 @0.11s · BigSoundBank (CC0) |
| GP-79 | 옛 셔터 철컥 | SPARK | 2.37 | 0.3초 | bigsoundbank #2544 @0.12s · BigSoundBank (CC0) |
| GP-80 | 얼음 쩍 | SPARK | 2.09 | 0.3초 | bigsoundbank #2205 @0.68s · BigSoundBank (CC0) |
| GP-81 | 셀러리 똑 | BLOSSOM | -1.63 | 0.3초 | bigsoundbank #1408 @0.24s · BigSoundBank (CC0) |
| GP-82 | 공 퉁 | MELT | -5.76 | 0.3초 | bigsoundbank #1825 @0.05s · BigSoundBank (CC0) |
| GP-83 | 아고고 톡 | SPARK | 2.11 | 0.3초 | bigsoundbank #2262 @0.21s · BigSoundBank (CC0) |
| GP-84 | 마룻바닥 삐걱 | FIZZ | 0.85 | 0.59초 | bigsoundbank #3055 @0.32s · BigSoundBank (CC0) |
| GP-85 | 초인종 딩동 | BLOSSOM | -3.67 | 2.23초 | bigsoundbank #0161 @0.01s · BigSoundBank (CC0) |
| GP-86 | 작은 첨벙 | MELT | -6.33 | 0.3초 | bigsoundbank #1531 @0.08s · BigSoundBank (CC0) |
| GP-87 | 펀치 퍽 | BLOSSOM | -1.65 | 0.3초 | bigsoundbank #2460 @0.11s · BigSoundBank (CC0) |
| GP-88 | 통신 삑 | FIZZ | -0.79 | 0.28초 | bigsoundbank #2380 @0.03s · BigSoundBank (CC0) |

## 정한 것

- 토끼장 리큐르 뺌 · 도서관은 합성음(느린 카페)이 도서관 같지 않아 녹음을 섞어 다시 만듦(조용한 룸톤 + 책장·연필·책 덮기·먼 발소리)

- 염소 울음 MELT-05 · 킥 MELT-03 그대로 · 비슷한 합성 리큐르와 녹음 리큐르 둘 다 두기 · TV 지지직 유지
- 가니쉬 16자리 모두 실제 녹음 (임시 샘플 없음) · 스프레이는 SPARK에서 가장 높아 08로 옮김

## 출처

- 사용자 제공 Pixabay 녹음 20개
- [Moodist](https://github.com/remvze/moodist) 소리 모음 — Pixabay Content License · CC0 (프로젝트 README 기준)
- [BigSoundBank](https://bigsoundbank.com) — CC0 (퍼블릭 도메인), 파일마다 `bigsoundbank #번호`
- 전시 전에 원본별 라이선스 표기 조건을 한 번 더 확인할 것
