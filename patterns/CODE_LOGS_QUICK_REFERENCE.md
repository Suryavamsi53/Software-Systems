# Code Tracking & Logs - Quick Reference

## 🎯 What's New

Your visualizer now shows **real-time code execution** with **live logs** alongside the graph animation.

## 🖥️ Layout

```
┌─ Canvas (Graph Animation)      ┌─ Code Panel (Go/Java/Python)
│ • Animated nodes & edges        │ • Current line highlighted blue
│ • Queue display                 │ • Syntax highlighting
│ • Results panel                 │ • Line numbers
└─ Sidebar Controls              └─ Logs Panel (Real-time Events)
  • Learning modes                 • Timestamped entries
  • Explanations                   • Color-coded severity
  • Graph generators               • Auto-scrolling
```

## 🚀 Quick Start

1. **Open**: `/patterns/topological-sort-visualizer.html`
2. **Play**: Click ▶ Play or ⟩ Step
3. **View Code**: Click Go/Java/Python tabs
4. **Follow**: Blue highlight tracks current line
5. **Read Logs**: See execution events in real-time

## 🎓 Learning with Code Tracking

### Step 1: Choose Language
- Click **Go**, **Java**, or **Python** tab
- Code displays with syntax highlighting

### Step 2: Start Algorithm
- Press **▶ Play** (auto-run) or **⟩ Step** (manual)
- Code line highlights blue as it executes
- Logs appear in real-time

### Step 3: Follow Along
- Sync the code line with visual graph changes
- Read logs to understand state changes
- See in-degree values update in logs

### Step 4: Understand Flow
- Blue line shows: "We're here in the code"
- Logs show: "This is what just happened"
- Canvas shows: "This is the visual result"

## 📊 Code Line References

| Line | What It Does |
|------|------------|
| 1 | Initialize algorithm (setup structures) |
| 2 | Build graph (create adjacency list) |
| 3 | Find nodes with in-degree 0 (start queue) |
| 4 | Process queue (main loop) |
| 5 | Update neighbors (reduce in-degrees) |
| 6 | Check for cycles (verify result) |

## 📋 Log Types

| Icon | Type | Color | Meaning |
|------|------|-------|---------|
| ℹ️ | Info | Blue | General information |
| ✅ | Success | Green | Action completed |
| ⚠️ | Warning | Yellow | Something to note |
| ❌ | Error | Red | Problem detected (cycle) |

## 🎮 Controls

### Code Panel
```
[Go] [Java] [Python]  ← Switch languages
[Active code line highlighted in blue]
[Line numbers shown on left]
```

### Logs Panel
```
[Clear 🗑️]  ← Click to reset logs
[HH:MM:SS 📋 Message displayed here]
[Scrolls automatically to show latest]
```

## 🔄 Workflow Example

```
1. Load graph with 6 nodes
   → Log: "Algorithm initialized"
   → Log: "Nodes and edges loaded"

2. Click ▶ Play
   → Highlight: Line 1 (initialize)
   → Log: "Starting Kahn's Algorithm on 6 nodes"

3. Continue executing
   → Highlight: Line 3 (find queue nodes)
   → Log: "Found 2 node(s) with in-degree 0: 0, 3"

4. Process nodes
   → Highlight: Line 4 (process loop)
   → Log: "Processing node: 0"

5. Update neighbors
   → Highlight: Line 5 (reduce in-degree)
   → Log: "Reduced in-degree of node 1 to 2"

6. Add to queue
   → Highlight: Line 3 (queue add)
   → Log: "Node 1 added to queue (in-degree now 0)"

7. Complete
   → Highlight: Line 6 (completion check)
   → Log: "✅ Topological sort complete! Order: 0 → 1 → 2..."
```

## 🎨 Color Coding

### Syntax Highlighting
- 🔴 **Pink**: Keywords (func, public, def, etc.)
- 🟢 **Green**: Strings ("text")
- 🟠 **Orange**: Numbers (0, 1, 100)
- 🟡 **Gray**: Comments (// explanation)

### Code Line States
- 🔵 **Blue background**: Currently executing line
- ⚪ **Normal**: Not executing
- Hover: Slight blue tint

### Log Severity
- 🔵 **Blue**: ℹ️ Info messages
- 🟢 **Green**: ✅ Success (action done)
- 🟠 **Orange**: ⚠️ Warning (check this)
- 🔴 **Red**: ❌ Error (cycle found)

## ⌨️ Keyboard/Button Quick Reference

| Action | Button | Result |
|--------|--------|--------|
| Start/Stop | ▶ Play / ⏸ Pause | Run algorithm auto |
| Next Step | ⟩ Step | Move to next line |
| Previous Step | ⟨ Back | Go back one step |
| Reset | ⟲ Reset | Start over |
| Clear Logs | 🗑️ Clear | Empty logs panel |
| Change Speed | Slider | Adjust animation speed |

## 💡 Pro Tips

1. **Slow animation speed** while learning to see each step clearly
2. **Use Step button** instead of Play to follow code line-by-line
3. **Compare languages** by switching tabs to see different styles
4. **Read logs first** before looking at code to predict what happens
5. **Watch queue and results** panels while reading code
6. **Check in-degree logs** to understand algorithm flow

## 🐛 Troubleshooting

### Code not highlighting?
- Try switching languages (Go → Java → Python)
- Refresh page with F5
- Check browser console (F12) for errors

### Logs not showing?
- Ensure algorithm is running (check Play button)
- Click Clear 🗑️ then start new algorithm
- Check logs panel has focus (not scrolled way down)

### Code display broken?
- Try dark/light mode toggle (may fix rendering)
- Clear browser cache (Ctrl+Shift+Delete)
- Try different browser

### Slow performance?
- Reduce animation speed slider
- Clear logs with 🗑️ button
- Close other browser tabs
- Refresh page

## 📚 Related Files

- **CODE_TRACKING_GUIDE.md** - Full feature documentation
- **CODE_TRACKING_TECHNICAL.md** - Technical implementation details
- **INTEGRATION_SUMMARY.md** - Overview of changes made

## 📞 Need Help?

1. Check **Troubleshooting** section above
2. Review **CODE_TRACKING_GUIDE.md** in patterns folder
3. Open browser console: Press F12, check "Console" tab
4. Look for red error messages

## ✨ Features at a Glance

✅ Three language implementations (Go, Java, Python)  
✅ Real-time syntax highlighting  
✅ Line numbers for code reference  
✅ Active line tracking (blue highlight)  
✅ Timestamped execution logs  
✅ Color-coded severity levels  
✅ Auto-scrolling for readability  
✅ Works in dark and light modes  
✅ Responsive on all devices  
✅ Fully integrated with existing features  

---

**Start learning Kahn's Algorithm by seeing it execute in real code!** 🎓
