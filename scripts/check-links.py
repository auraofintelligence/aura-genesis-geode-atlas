"""Bounded, reproducible external-link reachability report. No claim verification implied."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from urllib.request import Request, urlopen
from urllib.error import HTTPError
import json

root = Path(__file__).resolve().parent.parent
refs = json.loads((root / 'assets/references.json').read_text(encoding='utf-8'))

def check(ref):
    url = ref['url']
    row = {'id': ref['id'], 'url': url}
    try:
        with urlopen(Request(url, headers={'User-Agent': 'AuraGeodeAtlas/1.0 source-link-check'}), timeout=16) as res:
            row.update(status='redirect' if res.url != url else 'ok', code=res.status, final=res.url)
    except HTTPError as exc:
        row.update(status='blocked' if exc.code in (401,403,429) else 'missing' if exc.code in (404,410) else 'inconclusive', code=exc.code)
    except Exception as exc:
        row.update(status='inconclusive', error=type(exc).__name__)
    return row

with ThreadPoolExecutor(max_workers=8) as pool:
    results = list(pool.map(check, refs))
report = {'checked': '15 October 2026', 'method': 'GET, 16-second timeout, eight concurrent requests. HTTP reachability only; content and claims are separately contextualised.', 'results': results}
(root / 'assets/link-status.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
counts = {state: sum(r['status'] == state for r in results) for state in ('ok','redirect','blocked','missing','inconclusive')}
print(json.dumps(counts))
for row in results:
    if row['status'] == 'missing':
        print('UNAVAILABLE', row['id'], row['url'])
