# 녹음 소리 분류 — 리큐르 · 가니쉬

리큐르 45개 · 가니쉬 16자리 · 예비 가니쉬 13개. 파일은 `snd/`, 목록은 `snd/catalog.json`, 앱은 `snd/rec.js`로 읽어요.

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
| LQ-BR-01 | 시골 밤 풀벌레 | 숨 | 자연 | `#46607a` | 핑크 (-3.75) | 16.0초 | 풀벌레가 일정하게 반복해 우는 밤 | alex_jauk-countryside-night-ambience-234022.mp3 · Pixabay (사용자 제공) |
| LQ-BR-02 | 지나가는 차 | 숨 | 도시 | `#5b5f70` | 브라운 (-8.08) | 8.98초 | 다가왔다 멀어지는 한 번의 부풂 | freesound_community-car-coming-3-84572.mp3 · Pixabay (사용자 제공) |
| LQ-BR-03 | 바닷가 파도 | 숨 | 자연 | `#2e7fd6` | 브라운 (-4.54) | 16.0초 | 밀려왔다 빠지는 파도 | m_nature_waves.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BR-04 | 고양이 골골 | 숨 | 실내 | `#f2a6b8` | 브라운 (-5.08) | 14.0초 | 숨 쉬듯 반복되는 골골송 | m_animals_cat-purring.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BR-05 | 통돌이 세탁기 | 숨 | 실내 | `#a9c6e8` | 브라운 (-8.84) | 16.0초 | 일정하게 도는 통 | m_things_washing-machine.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BR-06 | 와이퍼 | 숨 | 도시 | `#8e8a9e` | 브라운 (-6.04) | 12.0초 | 쓱 — 쓱 일정한 왕복 | m_things_windshield-wipers.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BR-07 | 돛단배 | 숨 | 자연 | `#c9b08a` | 브라운 (-7.95) | 16.0초 | 천천히 흔들리며 삐걱임 | m_transport_sailboat.mp3 · Pixabay/CC0 (Moodist) |
| LQ-BR-08 | 나무 사이 바람 | 숨 | 자연 | `#9ccf8a` | 핑크 (-3.09) | 16.0초 | 부풀었다 잦아드는 바람 | m_nature_wind-in-trees.mp3 · Pixabay/CC0 (Moodist) |
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
| GP-01 | 물방울 똑 | MELT | -7.48 | 0.67초 | m_nature_droplets.mp3 @10.59s |
| GP-02 | 거품 뽀록 | MELT | -5.17 | 0.3초 | m_things_bubbles.mp3 @2.035s |
| GP-03 | 부엉이 부엉 | MELT | -7.5 | 1.38초 | m_animals_owl.mp3 @9.05s |
| GP-04 | 개 멍 | MELT | -6.68 | 0.95초 | m_animals_dog-barking.mp3 @0.015s |
| GP-05 | 딱따구리 딱 | MELT | -7.53 | 0.74초 | m_animals_woodpecker.mp3 @12.94s |
| GP-06 | 눈 뽀드득 | MELT | -8.42 | 0.3초 | m_nature_walk-in-snow.mp3 @22.665s |
| GP-07 | 불꽃 펑 | MELT | -10.14 | 0.78초 | m_urban_fireworks.mp3 @29.495s |
| GP-08 | 천둥 우르릉 | MELT | -15.65 | 1.4초 | m_rain_thunder.mp3 @24.66s |
| GP-09 | 갈매기 끼룩 | MELT | -5.37 | 1.4초 | m_animals_seagulls.mp3 @39.15s |
| GP-10 | 소 음매 | MELT | -9.86 | 1.4초 | m_animals_cows.mp3 @1.545s |
| GP-11 | 슬라이드 찰칵 | MELT | -6.3 | 0.3초 | m_things_slide-projector.mp3 @43.245s |
| GP-12 | 닭 꼬꼬 | MELT | -5.82 | 0.3초 | m_animals_chickens.mp3 @18.89s |
| GP-13 | 노 첨벙 | MELT | -9.57 | 0.3초 | m_transport_rowing-boat.mp3 @20.43s |

## 정한 것

- 염소 울음 MELT-05 · 킥 MELT-03 그대로 · 비슷한 합성 리큐르와 녹음 리큐르 둘 다 두기 · TV 지지직 유지
- 가니쉬 16자리 모두 실제 녹음 (임시 샘플 없음) · 스프레이는 SPARK에서 가장 높아 08로 옮김

## 출처

- 사용자 제공 Pixabay 녹음 20개
- [Moodist](https://github.com/remvze/moodist) 소리 모음 — Pixabay Content License · CC0 (프로젝트 README 기준)
- 전시 전에 원본별 라이선스 표기 조건을 한 번 더 확인할 것
