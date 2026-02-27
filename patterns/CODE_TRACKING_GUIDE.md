# Code Tracking & Execution Logs Guide

## Overview

The Topological Sort Visualizer now includes **real-time code tracking** and **execution logs** to enhance learning. You can view the algorithm implementation in Go, Java, or Python while watching it execute step-by-step.

## New Features

### 1. **Multi-Language Code Display**

View Kahn's Algorithm implementations in three languages:

- **Go** - Efficient concurrent-friendly implementation
- **Java** - Verbose, enterprise-style code
- **Python** - Clean, readable pseudocode-like style

#### How to Use:
- Click the language tabs (Go/Java/Python) in the **Code Panel**
- Code lines are automatically highlighted with syntax coloring:
  - 🔴 **Keywords** (func, public, def) - Pink
  - 🟢 **Strings** - Green
  - 🟠 **Numbers** - Orange
  - 🟡 **Comments** - Gray italic

### 2. **Real-Time Code Highlighting**

As the algorithm executes, the current code line is highlighted in the Code Panel:
- **Blue highlight** = Currently executing line
- **Line numbers** help track which part of the code is running
- Smooth scrolling keeps the active line visible

### 3. **Execution Logs Panel**

The **Logs Panel** displays real-time messages about algorithm execution:

#### Log Levels:
- **ℹ️ Info** (Blue) - General information about current step
- **✅ Success** (Green) - Successfully completed action (node added to queue, etc.)
- **⚠️ Warning** (Yellow) - Potential issues (rarely shown)
- **❌ Error** (Red) - Critical issues (cycle detected, etc.)

#### Log Entry Examples:
```
14:32:15 ℹ️ Starting Kahn's Algorithm on 6 nodes
14:32:15 ✅ Found 2 node(s) with in-degree 0: 0, 3
14:32:16 ℹ️ Processing node: 0
14:32:16 ℹ️ Reduced in-degree of node 1 to 2
14:32:16 ✅ Node 1 added to queue (in-degree now 0)
```

### 4. **Layout Integration**

The new layout maintains your learning experience:

```
┌─────────────────────────────────────────────────────────┬──────────┐
│                    Graph Visualization                   │          │
│  (Canvas with animated nodes and edges)                  │ Learning │
├─────────────────────────────────────────────────────────┤  Modes   │
│  Code Panel (Go/Java/Python)  │  Execution Logs Panel   │ & Info   │
│  - Line numbers                │  - Timestamped entries  │          │
│  - Syntax highlighting         │  - Log level indicators │          │
│  - Active line tracking        │  - Auto-scroll on new   │          │
└─────────────────────────────────────────────────────────┴──────────┘
```

### 5. **Dynamic Updates**

- **Logs update in real-time** as you step through the algorithm
- **Code highlighting moves** as you progress through steps
- **Clear button** (🗑️) resets all logs when starting a new graph
- **Timestamps** show exactly when each event occurred

## Key Algorithms & Code Lines

### Go Implementation (Lines Referenced)

| Line | Operation |
|------|-----------|
| 1 | Initialize adjacency list and in-degree array |
| 2 | Build graph from edges |
| 3 | Find vertices with in-degree 0 |
| 4 | Process nodes from queue |
| 5 | Remove edges and update in-degrees |
| 6 | Check for cycles |

### Java Implementation (Lines Referenced)

| Line | Operation |
|------|-----------|
| 1 | Initialize data structures |
| 2 | Build graph |
| 3 | Find nodes with in-degree 0 |
| 4 | Process queue |
| 5 | Process neighbors |
| 6 | Check for cycle |

### Python Implementation (Lines Referenced)

| Line | Operation |
|------|-----------|
| 1 | Initialize data structures |
| 2 | Build the graph |
| 3 | Find vertices with in-degree 0 |
| 4 | Process nodes from queue |
| 5 | Update in-degrees |
| 6 | Check for cycles |

## How It Works

### Initialization
1. When you load a new graph, all logs are cleared
2. Algorithm is initialized with "Algorithm initialized" and "Nodes and edges loaded" messages
3. Code display shows the selected language (default: Go)

### During Execution
1. Each algorithm step logs its action
2. The corresponding code line is highlighted
3. You can see exactly which line of code is executing
4. In-degree changes and queue operations are logged

### Algorithm Completion
- If successful: `✅ Topological sort complete! Order: 0 → 1 → 2 → ...`
- If cycle detected: `❌ Cycle detected! Only X/Y nodes processed`

## Features

### Code Panel Features
- ✅ Three programming language implementations
- ✅ Syntax highlighting for keywords, strings, numbers, comments
- ✅ Line numbers for easy reference
- ✅ Active line highlighting during execution
- ✅ Auto-scroll to keep active line visible
- ✅ Dark mode compatible color scheme

### Logs Panel Features
- ✅ Timestamped entries (HH:MM:SS format)
- ✅ Color-coded log levels (info/success/warning/error)
- ✅ Icon indicators for quick scanning
- ✅ Auto-scroll to show latest entries
- ✅ Clear button to reset logs
- ✅ 60KB max size with automatic truncation

## Technical Details

### State Management
- Logs are stored in a `logs[]` array with structure:
  ```javascript
  {
    message: "string",
    level: "info|success|warning|error",
    timestamp: "HH:MM:SS",
    lineNumber: number
  }
  ```

### Code Tracking
- Code snippets defined for each language in `codeSnippets` object
- Syntax highlighting via CSS classes applied during rendering
- Active line marked with `.active` class for visual indication
- Line numbers auto-generated with `<span class="line-number">`

### Performance
- Efficient DOM updates using innerHTML
- CSS animations for smooth transitions
- Minimal repaints during execution
- Memory-efficient log storage with optional clearing

## Learning Benefits

1. **Multi-Language Learning**: See the same algorithm in different language styles
2. **Code-to-Visualization Mapping**: Connect code execution to visual updates
3. **Step-by-Step Understanding**: Follow exactly what each line does
4. **Real-Time Feedback**: Immediate confirmation of operations
5. **Debugging Aid**: Trace execution path through logs

## Troubleshooting

### Logs Not Appearing
- Ensure console is open (developer tools F12)
- Check that `clearLogs()` wasn't called immediately after
- Verify algorithm is running (check Play button)

### Code Highlighting Not Working
- Try switching languages (Go → Java → Go)
- Refresh the page
- Check browser console for errors

### Slow Performance
- Reduce animation speed slider for faster execution
- Close unnecessary browser tabs
- Clear logs if too many entries accumulated

## Future Enhancements

- [ ] Step-by-step breakpoints in code
- [ ] Variable watch panel showing in-degree values
- [ ] Call stack visualization
- [ ] Execution time metrics per step
- [ ] Code export to file
- [ ] Custom algorithm implementations
