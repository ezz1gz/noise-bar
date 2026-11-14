# liq2.js 내용을 index.html 메인 스크립트(IIFE) 안의 /*L2:BEGIN*/…/*L2:END*/ 자리에 넣어요.
import re,pathlib
root=pathlib.Path(__file__).resolve().parent.parent
idx=root/'index.html';src=(root/'liq2.js').read_text()
s=idx.read_text()
s=s.replace('<script src="liq2.js"></script>\n','')
block='/*L2:BEGIN — 리큐르 v2 (원본: liq2.js, tools/inline_l2.py로 넣음)*/\n'+src+'\n/*L2:END*/\n'
if '/*L2:BEGIN' in s:
    s=re.sub(r'/\*L2:BEGIN.*?/\*L2:END\*/\n',lambda m:block,s,flags=re.S)
else:
    anchor='\nframe();\n})();\n</script>'
    assert s.count(anchor)==1
    s=s.replace(anchor,'\n'+block+'frame();\n})();\n</script>')
idx.write_text(s);print('ok')
