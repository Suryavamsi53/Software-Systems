#!/usr/bin/env python3
import os, re
ROOT = os.path.join(os.getcwd(), 'patterns')
files = [f for f in os.listdir(ROOT) if f.endswith('.html')]
TOOLBAR = '\n      <div class="algo-toolbar"><div class="control-group"></div></div>\n'
SCRIPT = '\n    <script src="visualizer-common.js"></script>\n'
modified = []
for fname in files:
    path = os.path.join(ROOT, fname)
    with open(path, 'r', encoding='utf-8') as f:
        s = f.read()
    orig = s
    changed = False
    if 'class="algo-toolbar"' not in s:
        # Try to insert after <h3> that mentions Visual or Visualization
        m = re.search(r'(<h[1-6][^>]*>[^<]{0,200}?Visual[^<]*</h[1-6]>)', s, flags=re.I)
        if m:
            insert_at = m.end()
            s = s[:insert_at] + TOOLBAR + s[insert_at:]
            changed = True
        else:
            # before first viz container
            m2 = re.search(r'(<div[^>]+(id=\"viz\"|class=\"viz\"|class=\"viz-viewport\"|id=\"viz-viewport\"))', s, flags=re.I)
            if m2:
                insert_at = m2.start()
                s = s[:insert_at] + TOOLBAR + s[insert_at:]
                changed = True
            else:
                # after opening body
                m3 = re.search(r'<body[^>]*>', s, flags=re.I)
                if m3:
                    insert_at = m3.end()
                    s = s[:insert_at] + TOOLBAR + s[insert_at:]
                    changed = True
    # ensure script included
    if 'visualizer-common.js' not in s:
        mbody = re.search(r'</body>', s, flags=re.I)
        if mbody:
            s = s[:mbody.start()] + SCRIPT + s[mbody.start():]
            changed = True
    if changed and s != orig:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(s)
        modified.append(fname)

print('Modified', len(modified), 'files')
for m in modified:
    print(' -', m)
