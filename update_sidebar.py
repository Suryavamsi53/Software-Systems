import os
import re

# Define the new sidebar structure (Root Level)
ROOT_SIDEBAR = """      <nav class="sidebar-nav">
        <a href="index.html" class="nav-item">🏠 Home Dashboard</a>
    
        <!-- Linear Data Structures -->
        <details class="nav-section">
          <summary class="nav-section-title">Linear Data Structures</summary>
          <a href="patterns/linked-lists.html" class="nav-item">Linked Lists</a>
          <a href="patterns/linked-list-reversal.html" class="nav-item indent">↳ Visualizer: Reversal</a>
          <a href="patterns/linked-list-visualizer.html" class="nav-item indent">↳ Visualizer: Operations</a>
          <a href="patterns/stack.html" class="nav-item">Stacks</a>
          <a href="patterns/stack-visualizer.html" class="nav-item indent">↳ Visualizer: Stack</a>
          <a href="patterns/queues.html" class="nav-item">Queues</a>
          <a href="patterns/queue-visualizer.html" class="nav-item indent">↳ Visualizer: Queue</a>
        </details>
    
        <!-- Non-Linear Data Structures -->
        <details class="nav-section">
          <summary class="nav-section-title">Non-Linear Data Structures</summary>
          <a href="patterns/hash-maps.html" class="nav-item">Hash Maps</a>
          <a href="patterns/hash-map-visualizer.html" class="nav-item indent">↳ Visualizer: Hash Map</a>
          <a href="patterns/trees.html" class="nav-item">Trees</a>
          <a href="patterns/bst-visualizer.html" class="nav-item indent">↳ Visualizer: BST</a>
          <a href="patterns/graphs.html" class="nav-item">Graphs</a>
          <a href="patterns/graph-visualizer.html" class="nav-item indent">↳ Visualizer: Graph Algo</a>
          <a href="patterns/bfs-graph.html" class="nav-item indent">↳ Visualizer: BFS</a>
          <a href="patterns/pathfinding-visualizer.html" class="nav-item indent">↳ Visualizer: Pathfinding</a>
          <a href="patterns/topological-sort-visualizer.html" class="nav-item indent">↳ Visualizer: Topo Sort</a>
          <a href="patterns/mst-visualizer.html" class="nav-item indent">↳ Visualizer: MST</a>
          <a href="patterns/union-find.html" class="nav-item indent">↳ Visualizer: Union-Find</a>
          <a href="patterns/heap.html" class="nav-item">Heaps</a>
          <a href="patterns/heap-visualizer.html" class="nav-item indent">↳ Visualizer: Heap</a>
          <a href="patterns/tries.html" class="nav-item">Tries</a>
          <a href="patterns/trie-visualizer.html" class="nav-item indent">↳ Visualizer: Trie</a>
          <a href="patterns/segment-tree.html" class="nav-item">Segment Trees</a>
        </details>
    
        <!-- Algorithms -->
        <details class="nav-section">
          <summary class="nav-section-title">Algorithms</summary>
          <a href="patterns/sort-search.html" class="nav-item">Sorting & Search</a>
          <a href="patterns/sorting-visualizer.html" class="nav-item indent">↳ Visualizer: Sorting</a>
          <a href="patterns/binary-search-visualizer.html" class="nav-item indent">↳ Visualizer: Binary Search</a>
          <a href="patterns/jump-search-visualizer.html" class="nav-item indent">↳ Visualizer: Jump Search</a>
          <a href="patterns/interpolation-search-visualizer.html" class="nav-item indent">↳ Visualizer: Interpolation Search</a>
          <a href="patterns/exponential-search-visualizer.html" class="nav-item indent">↳ Visualizer: Exponential Search</a>
          <a href="patterns/ternary-search-visualizer.html" class="nav-item indent">↳ Visualizer: Ternary Search</a>
          <a href="patterns/kmp-search-visualizer.html" class="nav-item indent">↳ Visualizer: KMP String Search</a>
          <a href="patterns/dynamic-programming.html" class="nav-item">Dynamic Programming</a>
          <a href="patterns/knapsack-dp.html" class="nav-item indent">↳ Visualizer: Knapsack</a>
          <a href="patterns/dp-lcs.html" class="nav-item indent">↳ Visualizer: LCS</a>
          <a href="patterns/backtracking.html" class="nav-item">Backtracking</a>
          <a href="patterns/n-queens.html" class="nav-item indent">↳ Visualizer: N-Queens</a>
          <a href="patterns/sudoku-solver.html" class="nav-item indent">↳ Visualizer: Sudoku</a>
          <a href="patterns/maze-generator.html" class="nav-item indent">↳ Visualizer: Maze</a>
          <a href="patterns/greedy.html" class="nav-item">Greedy</a>
          <a href="patterns/bit-manipulation.html" class="nav-item">Bit Manipulation</a>
          <a href="patterns/math-geometry.html" class="nav-item">Math & Geometry</a>
        </details>

        <!-- Patterns -->
        <details class="nav-section">
          <summary class="nav-section-title">Patterns</summary>
          <a href="patterns/two-pointers.html" class="nav-item">Two Pointers</a>
          <a href="patterns/two-pointers-visualizer.html" class="nav-item indent">↳ Visualizer: Two Pointers</a>
          <a href="patterns/sliding-window.html" class="nav-item">Sliding Window</a>
          <a href="patterns/sliding-window-visualizer.html" class="nav-item indent">↳ Visualizer: Sliding Window</a>
          <a href="patterns/fast-slow-pointers.html" class="nav-item">Fast & Slow Pointers</a>
          <a href="patterns/binary-search.html" class="nav-item">Binary Search</a>
          <a href="patterns/intervals.html" class="nav-item">Intervals</a>
          <a href="patterns/prefix-sum.html" class="nav-item">Prefix Sum</a>
        </details>
    
      </nav>"""

# Generate Pattern Level Sidebar (Adjust links to ../)
PATTERN_SIDEBAR = ROOT_SIDEBAR.replace('href="patterns/', 'href="').replace('href="', 'href="../')
PATTERN_SIDEBAR = PATTERN_SIDEBAR.replace('href="../index.html"', 'href="../index.html"') # Fix index link

# Files to skip (Visualizers with custom sidebars or already updated files)
SKIP_FILES = {
    "index.html",
    "interview-approach.html",
    "amazon-two-pointers-questions.html",
    "patterns/linked-lists.html",
    # Visualizers
    "patterns/sorting-visualizer.html",
    "patterns/graph-visualizer.html",
    "patterns/pathfinding-visualizer.html",
    "patterns/topological-sort-visualizer.html",
    "patterns/mst-visualizer.html",
    "patterns/union-find.html",
    "patterns/heap-visualizer.html",
    "patterns/trie-visualizer.html",
    "patterns/stack-visualizer.html",
    "patterns/queue-visualizer.html",
    "patterns/linked-list-reversal.html",
    "patterns/linked-list-visualizer.html",
    "patterns/n-queens.html",
    "patterns/sudoku-solver.html",
    "patterns/maze-generator.html",
    "patterns/two-pointers-visualizer.html",
    "patterns/jump-search-visualizer.html",
    "patterns/interpolation-search-visualizer.html",
    "patterns/exponential-search-visualizer.html",
    "patterns/ternary-search-visualizer.html",
    "patterns/kmp-search-visualizer.html"
}

def update_file(filepath, is_pattern_level):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find the active link to preserve it
        active_match = re.search(r'<a href="([^"]+)" class="nav-item active"', content)
        active_href = active_match.group(1) if active_match else None

        # Select correct sidebar template
        new_sidebar = PATTERN_SIDEBAR if is_pattern_level else ROOT_SIDEBAR

        # Restore active class
        if active_href:
            # Remove 'active' from template first to be safe
            new_sidebar = new_sidebar.replace(' class="nav-item active"', ' class="nav-item"')
            # Add 'active' to the correct link
            # We need to match exact href in the template
            target_str = f'href="{active_href}" class="nav-item"'
            replacement_str = f'href="{active_href}" class="nav-item active"'
            
            if target_str in new_sidebar:
                new_sidebar = new_sidebar.replace(target_str, replacement_str)
            
            # Also check for indent items if active was one of them
            target_indent = f'href="{active_href}" class="nav-item indent"'
            replacement_indent = f'href="{active_href}" class="nav-item indent active"'
            if target_indent in new_sidebar:
                new_sidebar = new_sidebar.replace(target_indent, replacement_indent)

        # Regex to replace the nav block
        # Matches <nav class="sidebar-nav"> ... </nav>
        # Uses dotall flag to match across newlines
        pattern = r'<nav class="sidebar-nav">.*?</nav>'
        
        if re.search(pattern, content, re.DOTALL):
            new_content = re.sub(pattern, new_sidebar, content, flags=re.DOTALL)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✅ Updated {filepath}")
        else:
            print(f"⚠️  Skipped {filepath} (No sidebar found)")

    except Exception as e:
        print(f"❌ Error updating {filepath}: {e}")

# Walk through directories
for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".html"):
            path = os.path.join(root, file)
            # Normalize path for check
            rel_path = os.path.relpath(path, ".").replace("\\", "/")
            if rel_path in SKIP_FILES:
                continue
                
            # Check if it's in patterns/ subdir
            is_pattern = "patterns" in root
            update_file(path, is_pattern)