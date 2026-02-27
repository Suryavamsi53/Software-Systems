# Topological Sort Visualizer - Learning Guide

## Overview

This project contains **two modern, interactive visualizers** for Topological Sorting using **Kahn's Algorithm**:

1. **topological-sort-visualizer.html** - Enhanced version with learning modes and scenario presets
2. **topological-sort-interactive.html** - React-based advanced visualizer with educational focus

Both visualizers emphasize **learning clarity** over complex rendering, making them perfect for understanding how topological sorting works.

---

## Features

### Core Algorithm Implementation ✓
- **Kahn's Algorithm** (BFS-based) step-by-step visualization
- In-degree calculation and tracking
- Queue-based processing
- Edge removal animation
- Complete explanation at each step

### Visual Feedback ✓
- **Active node highlighting** (blue during processing)
- **Processed nodes** (green when added to result)
- **Queue nodes** (orange while in queue)
- **In-degree badges** (red for nodes with dependencies, green when 0)
- **Edge animations** (highlight during removal)
- **Smooth transitions** and glow effects

### Learning Modes ✓
- **Beginner Mode**: 
  - In-degree table visible
  - Auto-playing explanations
  - Slower animation speed
  
- **Intermediate Mode**:
  - Explanation hidden
  - User can predict next steps
  - Normal speed
  
- **Expert Mode**:
  - Minimal UI help
  - User selects nodes manually
  - Validates correctness

### Scenario Presets ✓
- **Random DAG** - Randomly generated directed acyclic graph
- **Course Prerequisites** - Academic prerequisites (DS → Algo → Design)
- **Build System** - Compile, link, test, package, deploy sequence
- **CI/CD Pipeline** - Trigger → Checkout → Build → Test → Deploy

### Additional Features ✓
- **Dark/Light Theme** toggle
- **Animation Speed Control** (200ms - 2000ms)
- **Step Counter** with progress tracking
- **Cycle Detection** validation
- **Responsive Layout** (desktop and tablet)
- **Playback Controls** (Play, Pause, Step, Back, Reset)
- **Live Queue Panel** showing nodes ready to process
- **Live Result Panel** showing topological order being built
- **In-Degree Table** (Beginner mode)
- **Detailed Explanations** for each algorithm step

---

## How to Use

### Basic Navigation
1. **Play/Pause** - Start or pause the animation
2. **Step/Back** - Move forward or backward through steps
3. **Reset** - Restart from beginning
4. **Speed Slider** - Adjust animation speed
5. **Theme Toggle** - Switch between light and dark mode

### Selecting Scenarios
Click any preset button to load a pre-built graph:
- 🎲 New Random - Generate random DAG
- 📚 Prerequisites - Course prerequisites
- 🔨 Build System - Build workflow
- ⚙️ CI/CD Pipeline - DevOps pipeline

### Learning Modes
1. Click **👶 Beginner** for guided learning with in-degree table
2. Click **🎓 Intermediate** for step prediction practice
3. Click **🚀 Expert** for manual node selection

---

## Algorithm Explanation

### Kahn's Algorithm (BFS-based Topological Sort)

```
Input: DAG with n nodes and edges
Output: Topological order (or empty if cycle exists)

1. Calculate in-degree for each node
2. Add all nodes with in-degree 0 to queue
3. While queue is not empty:
   a. Remove node u from queue
   b. Add u to result
   c. For each edge u→v:
      - Decrease in-degree of v by 1
      - If in-degree of v becomes 0, add v to queue
4. Return result
```

### Time Complexity
- **O(V + E)** - Linear in number of vertices and edges

### Space Complexity
- **O(V)** - For queue and in-degree array

### Key Properties
- ✓ Works only on **Directed Acyclic Graphs (DAGs)**
- ✓ If result has fewer nodes than input, **cycle detected**
- ✓ Multiple valid topological orders may exist
- ✓ Used in: course prerequisites, build systems, task scheduling, CI/CD pipelines

---

## Understanding the Visualization

### Node Colors
| Color | Meaning |
|-------|---------|
| 🔵 Blue | Currently processing node |
| 🟢 Green | Already processed (in result) |
| 🟠 Orange | In queue (ready to process) |
| ⚪ Gray | Waiting to be processed |

### Badges
| Badge | Meaning |
|-------|---------|
| 🔴 Red | Node has incoming dependencies |
| 🟢 Green | Node has no dependencies (in-degree = 0) |

### Queue Panel
Shows nodes that are **ready to process** (in-degree = 0 and in queue)

### Result Panel
Builds the **final topological order** as nodes are processed

---

## Real-World Applications

### 1. Course Prerequisites
```
CS101 → DS102 → Algo103 → Design105
       ↓
      OOP104 ↓
```
Students must complete prerequisites in topological order.

### 2. Build System Dependencies
```
source → compile → link → package → deploy
           ↓
           test ↓
```
Build steps must follow dependency order.

### 3. Task Scheduling
```
Frontend ready → Integration → Testing → Deployment
                  ↑
Backend ready ----
```
Tasks scheduled based on dependencies.

### 4. CI/CD Pipeline
```
trigger → checkout → build → test → deploy-dev
                                ↓
                             deploy-prod → monitor
```
Pipeline stages execute in proper order.

---

## Educational Focus

### Why Kahn's Algorithm?

1. **Intuitive**: BFS approach similar to level-order traversal
2. **Incremental**: Process nodes one at a time with clear steps
3. **Explainable**: Each step has a clear reason and consequence
4. **Practical**: Used in real systems (build tools, schedulers, etc.)

### Learning Path

**Beginner** (5-10 minutes)
- See in-degree table update
- Watch queue grow and shrink
- Observe result build up
- Read explanations at each step

**Intermediate** (10-15 minutes)
- Predict what happens next
- Understand why nodes join queue
- Recognize dependency patterns
- Test understanding before clicking Step

**Expert** (15-20 minutes)
- Manually select next node
- Validate your understanding
- Recognize invalid choices
- Master the algorithm mentally

---

## Technical Stack

### Visualizer 1 (Enhanced HTML/CSS/JS)
- **Vanilla JavaScript** for algorithm logic
- **SVG** for graph rendering
- **D3.js** (loaded but using custom SVG)
- **CSS Grid** for responsive layout
- **CSS Variables** for theming

### Visualizer 2 (React)
- **React 18** (UMD build from CDN)
- **Babel** for JSX transpilation
- **D3.js** for potential graph manipulation
- **Tailwind-inspired CSS** for styling
- **Immutable state management**

---

## Browser Compatibility

✓ Chrome/Chromium (recommended)
✓ Firefox
✓ Safari
✓ Edge
✓ Mobile browsers (responsive)

---

## File Structure

```
patterns/
├── topological-sort-visualizer.html      # Main enhanced visualizer
├── topological-sort-interactive.html     # React-based alternative
├── graph-visualizer.css                  # Shared styles
├── graph-visualizer.js                   # Shared utilities
└── README.md                             # This file
```

---

## Keyboard Shortcuts (Future Enhancement)

| Key | Action |
|-----|--------|
| `Space` | Play/Pause |
| `→` | Step Forward |
| `←` | Step Backward |
| `R` | Reset |
| `T` | Toggle Theme |

---

## Performance Notes

- **Rendering**: O(V + E) per frame
- **Memory**: O(V) for algorithm state
- **Animation**: Smooth 60fps target
- **Large graphs**: Works well up to ~50 nodes

---

## Troubleshooting

### Graph not rendering?
- Check browser console for errors
- Ensure JavaScript is enabled
- Try different browser

### Animation too slow/fast?
- Use Speed slider (200ms - 2000ms)
- Default is 800ms for good pacing

### Can't see in-degree table?
- Switch to Beginner mode
- Refresh page if needed

### Dark mode not working?
- Click 🌙 Theme button
- Check if page is fully loaded

---

## Future Enhancements

- [ ] Drag-and-drop nodes
- [ ] Zoom and pan
- [ ] Custom graph builder
- [ ] Export visualization
- [ ] Keyboard shortcuts
- [ ] Algorithm comparison (DFS-based)
- [ ] Undo/Redo functionality
- [ ] Code execution trace
- [ ] Performance metrics

---

## Educational Resources

### Algorithm References
- [Wikipedia: Topological Sort](https://en.wikipedia.org/wiki/Topological_sorting)
- [GeeksforGeeks: Topological Sort](https://www.geeksforgeeks.org/topological-sorting/)
- [Abdul Bari: Topological Sort](https://www.youtube.com/watch?v=ddTC4Zovtbc)

### Related Concepts
- Directed Acyclic Graphs (DAGs)
- Graph traversal (BFS, DFS)
- Scheduling algorithms
- Dependency resolution

---

## Author Notes

This visualizer was designed with **learning clarity as the primary goal**. Each step is animated clearly, explanations are provided, and multiple scenarios help students understand real-world applications.

**Key Design Decisions:**
1. **Step-by-step animation** over smooth flowing visualization
2. **Clear labeling** of algorithm state (queue, result, in-degrees)
3. **Multiple learning modes** for different comprehension levels
4. **Real-world scenarios** to show practical relevance
5. **Responsive design** for various devices

---

## License

Educational resource - Free to use and modify for learning purposes.

---

**Ready to learn Topological Sort? Open `topological-sort-visualizer.html` in your browser!**

🎓 Happy Learning! 🎓
