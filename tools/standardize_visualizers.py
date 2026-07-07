#!/usr/bin/env python3
import os
import re

ROOT = os.path.join(os.getcwd(), 'patterns')

TARGET_FILES = [
    'heap-visualizer.html','heap.html','bst-visualizer.html','trie-visualizer.html','tries.html',
    'graph-visualizer.html','bfs-graph.html','pathfinding-visualizer.html','topological-sort-visualizer.html',
    'mst-visualizer.html','union-find.html','sorting-visualizer.html','binary-search-visualizer.html',
    'jump-search-visualizer.html','interpolation-search-visualizer.html','exponential-search-visualizer.html',
    'ternary-search-visualizer.html','kmp-search-visualizer.html','linked-list-visualizer.html',
    'linked-list-reversal.html','n-queens.html','sudoku-solver.html','maze-generator.html',
    'knapsack-dp.html','dp-lcs.html','two-pointers-visualizer.html','two-pointers.html',
    'sliding-window-visualizer.html','sliding-window.html'
]

TOOLBAR_HTML = '\n      <div class="algo-toolbar"><div class="control-group"></div></div>\n'
SCRIPT_TAG = '\n<script src="visualizer-common.js"></script>\n'

modified = []
scanned = []
for fname in TARGET_FILES:
    path = os.path.join(ROOT, fname)
    if not os.path.exists(path):
        continue
    scanned.append(fname)
    with open(path, 'r', encoding='utf-8') as f:
        s = f.read()

    orig = s
    changed = False

    # Insert toolbar if missing
    if 'class="algo-toolbar"' not in s:
        # Prefer after an h3 with Visual/Visualization
        m = re.search(r'(<h3[^>]*>[^<]{0,120}?Visual[^<]*</h3>)', s, flags=re.I)
        if m:
            insert_at = m.end()
            s = s[:insert_at] + TOOLBAR_HTML + s[insert_at:]
            changed = True
        else:
            # Try before first viz container
            m2 = re.search(r'<div[^>]+(id="viz"|class="viz"|class="visual"|id="visual"|class="viz-viewport")', s, flags=re.I)
            if m2:
                insert_at = m2.start()
                s = s[:insert_at] + TOOLBAR_HTML + s[insert_at:]
                changed = True
            else:
                # As fallback, insert after opening body tag
                m3 = re.search(r'<body[^>]*>', s, flags=re.I)
                if m3:
                    insert_at = m3.end()
                    s = s[:insert_at] + TOOLBAR_HTML + s[insert_at:]
                    changed = True

    # Ensure visualizer-common.js is included (same-directory relative path)
    if 'visualizer-common.js' not in s:
        # insert before closing </body>
        mbody = re.search(r'</body>', s, flags=re.I)
        if mbody:
            s = s[:mbody.start()] + SCRIPT_TAG + s[mbody.start():]
            changed = True

    if changed and s != orig:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(s)
        modified.append(fname)

# Print summary
print('Scanned files:', len(scanned))
print('\n'.join(scanned))
print('Modified files:', len(modified))
for m in modified:
    print(' -', m)

if not modified:
    print('No modifications necessary.')
else:
    print('Done. Please verify pages in browser or via local server.')
