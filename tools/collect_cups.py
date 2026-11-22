#!/usr/bin/env python3
"""소리의 바다 기록 모으기 — ntfy에 12시간만 남는 잔들을 data/cups.json에 계속 쌓아 둠.
GitHub Actions가 1시간마다 실행해서, 아무 기기도 켜져 있지 않아도 기록이 남음."""
import json, os, urllib.request

TOPICS = ['noisebar-sea-k7q2x9m4vz', 'noisebar-arch-k7q2x9m4vz']
PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'cups.json')


def fetch(topic):
    req = urllib.request.Request(f'https://ntfy.sh/{topic}/json?poll=1&since=12h',
                                 headers={'User-Agent': 'noisebar-collector'})
    with urllib.request.urlopen(req, timeout=30) as r:
        for line in r.read().decode('utf-8').splitlines():
            try:
                e = json.loads(line)
                if e.get('event') == 'message':
                    yield json.loads(e['message'])
            except Exception:
                pass


def main():
    try:
        with open(PATH, encoding='utf-8') as f:
            cups = json.load(f)
    except Exception:
        cups = []
    by = {c['id']: c for c in cups if isinstance(c, dict) and c.get('id')}
    imgs = {}
    for t in TOPICS:
        for m in fetch(t):
            if not isinstance(m, dict):
                continue
            if m.get('bundle'):
                for d in m['bundle']:
                    if isinstance(d, dict) and d.get('id') and d.get('pk') and d['id'] not in by:
                        by[d['id']] = d
            elif m.get('upd') and m.get('id') and m.get('img'):
                imgs[m['id']] = m['img']
            elif m.get('id') and m.get('pk'):
                if m['id'] not in by:
                    by[m['id']] = m
                elif m.get('img') and not by[m['id']].get('img'):
                    by[m['id']]['img'] = m['img']
    for i, img in imgs.items():
        if i in by and not by[i].get('img'):
            by[i]['img'] = img
    out = sorted(by.values(), key=lambda c: c.get('t') or 0)
    if json.dumps(out, sort_keys=True) != json.dumps(cups, sort_keys=True):
        with open(PATH, 'w', encoding='utf-8') as f:
            json.dump(out, f, ensure_ascii=False, separators=(',', ':'))
        print(f'cups: {len(cups)} -> {len(out)}')
    else:
        print('no change')


if __name__ == '__main__':
    main()
