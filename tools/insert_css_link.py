#!/usr/bin/env python3
import os
import re

ROOT = os.path.join(os.getcwd(), 'patterns')

# We'll scan all html files under patterns
files = [f for f in os.listdir(ROOT) if f.endswith('.html')]
LINK_TAG = '<link rel="stylesheet" href="visualizer-common.css">'
modified = []
for fname in files:
    path = os.path.join(ROOT, fname)
    with open(path, 'r', encoding='utf-8') as f:
        s = f.read()
    if 'visualizer-common.css' in s:
        continue
    # try to insert link into <head>
    m = re.search(r'<head[^>]*>', s, flags=re.I)
    if m:
        # insert after the head tag
        insert_at = m.end()
        s2 = s[:insert_at] + '\n  ' + LINK_TAG + s[insert_at:]
        with open(path, 'w', encoding='utf-8') as f:
            f.write(s2)
        modified.append(fname)

print('Inserted link into', len(modified), 'files')
for m in modified:
    print(' -', m)
