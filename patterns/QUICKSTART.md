# Quick Start Guide - Topological Sort Visualizer

## 🚀 Get Started in 30 Seconds

### 1. Open the Visualizer
```
File: patterns/topological-sort-visualizer.html
Just open in your browser!
```

### 2. Click Play ▶️
```
Automatic animation starts
Watch nodes turn blue, green, orange
```

### 3. Watch the Queue & Result Build
```
Queue panel shows nodes ready to process
Result panel shows final topological order
```

### 4. Try Different Scenarios
```
🎲 Random DAG - New random graph
📚 Prerequisites - Course deps
🔨 Build System - Compile pipeline
⚙️ CI/CD Pipeline - DevOps stages
```

---

## 🎮 Controls Quick Reference

| Button | Action | When to Use |
|--------|--------|------------|
| ▶️ Play | Auto-run algorithm | Want to see full animation |
| ⏭️ Step | Move forward one step | Studying individual steps |
| ⏮️ Back | Move backward one step | Review previous step |
| 🔄 Reset | Start from beginning | Restart animation |
| 🎲 New Random | Generate random graph | Practice with variations |
| ⏱️ Speed | Adjust animation speed | Too fast/slow? Adjust here |
| 🌙 Theme | Toggle dark/light mode | Reduce eye strain |

---

## 📚 Learning Modes

### 👶 Beginner
```
Use when: Learning topological sort for first time
Features:
  ✓ In-degree table visible
  ✓ Clear explanations
  ✓ Slower animation
  ✓ Step-by-step guidance
```

### 🎓 Intermediate
```
Use when: Want to test your understanding
Features:
  ✓ No explanation help
  ✓ Predict next step
  ✓ Still visual feedback
  ✓ Practice mode
```

### 🚀 Expert
```
Use when: Master the algorithm
Features:
  ✓ Minimal UI help
  ✓ Manual node selection
  ✓ Validate correctness
  ✓ Full control
```

---

## 🎨 Understand the Colors

```
🔵 Blue Node     = Currently processing
🟢 Green Node    = Already finished (in result)
🟠 Orange Node   = In queue (ready to process)
⚪ Gray Node     = Waiting to be processed

🔴 Red Badge     = Has dependencies (in-degree > 0)
🟢 Green Badge   = No dependencies (in-degree = 0)
```

---

## 📊 What You're Looking At

### The Queue
```
Shows nodes with in-degree = 0
These are ready to process
When a node is selected, neighbors update
```

### The Result
```
Building topological order
Nodes added as they're processed
Final result = valid topological sort
```

### The In-Degree Table (Beginner Mode)
```
Node | In-Degree
CS101 | 0         ← Ready to process!
DS102 | 1         ← Waiting for CS101
```

---

## ⚡ Quick Tips

1. **Start with Beginner mode** - Understand basics first
2. **Try each scenario** - See different patterns
3. **Read the explanations** - Each step is explained
4. **Use Speed slider** - Adjust to your pace
5. **Watch the badges** - Red → Green shows progress
6. **Check in-degree table** - See algorithm state
7. **Review with Back button** - Reinforce understanding

---

## 🎯 The Algorithm in 4 Steps

```
Step 1: Calculate in-degrees
  Count incoming edges for each node

Step 2: Add ready nodes to queue
  All nodes with in-degree 0

Step 3: Process queue
  Pick node from queue
  Add to result
  Decrease in-degree of neighbors
  Add neighbors with in-degree 0 to queue

Step 4: Result is topological order!
  All nodes ordered by dependencies
```

---

## ❓ FAQs

**Q: Why are some nodes green and some blue?**
```
Blue = Currently being processed
Green = Already processed (added to result)
```

**Q: What does the red badge mean?**
```
Red badge shows in-degree (# of dependencies)
When it becomes 0, badge turns green
Then node is ready to process
```

**Q: Can I manually select nodes?**
```
Yes! Switch to 🚀 Expert mode
Then click nodes to process them
```

**Q: What if there's no result?**
```
There might be a cycle!
Cycles can't be topologically sorted
```

**Q: How do I slow down the animation?**
```
Use the Speed slider at top
Drag left = slower, drag right = faster
```

---

## 🔥 Cool Features to Try

### 1. Switch Modes While Running
- Start in Beginner (see table)
- Switch to Intermediate (disappears)
- Switch to Expert (full control)

### 2. Stop and Step Through
- Click Play to start
- Click ⏸️ Pause (changes from Play)
- Click ⏭️ Step for one step at a time

### 3. Compare Scenarios
- Load Course Prerequisites
- Note the order
- Load Build System
- See different patterns

### 4. Extreme Speed
- Set speed to 200ms (fastest)
- Watch animation zip through
- Then set to 2000ms (slowest)
- Observe every detail

---

## 📱 Mobile Tips

- Visualizer is responsive
- All buttons are touch-friendly
- Portrait mode works
- Landscape mode recommended for better view
- Scroll down to see all panels if needed

---

## 🎓 Learning Path (20 minutes)

**Minutes 0-3: Basics**
- Open visualizer
- Click Play with Random DAG
- Watch nodes change colors
- Observe queue and result

**Minutes 3-8: First Scenario**
- Load Course Prerequisites
- Switch to Beginner mode
- Look at in-degree table
- Read explanations
- Watch animation

**Minutes 8-15: Manual Control**
- Load Build System
- Use ⏭️ Step button (don't auto-play)
- Predict what happens next
- Then click Step to verify
- Do this for all steps

**Minutes 15-20: Master It**
- Load CI/CD Pipeline
- Switch to Expert mode
- Manually select nodes
- Get it right or see what happens
- Try again with different choices

---

## 🚨 What NOT to Do

❌ Don't select a node with dependencies (in-degree > 0)
❌ Don't expect processing in any specific order (multiple valid sorts)
❌ Don't break the visualization - it's robust!
❌ Don't expect DFS algorithm - this is BFS (Kahn's)

---

## ✅ What You Should Do

✅ Try all 4 scenarios
✅ Switch between learning modes
✅ Use both Play and Step buttons
✅ Adjust animation speed
✅ Toggle dark/light theme
✅ Read the explanations
✅ Watch the badges change
✅ Follow the queue

---

## 🔗 Real-World Examples in Scenarios

### 📚 Prerequisites
```
CS101 (no prereqs)
    ↓
DS102 (needs CS101)
    ↓
Algorithms103 (needs DS102)
    ↓
Design105 (needs Algorithms & OOP)
```

### 🔨 Build System
```
source code
    ↓
compile
    ↓
link + test (in parallel)
    ↓
package
    ↓
deploy
```

### ⚙️ CI/CD
```
trigger
    ↓
checkout
    ↓
build → test
    ↓
deploy-dev & deploy-prod (parallel)
    ↓
monitor (both must finish)
```

---

## 📞 Still Confused?

1. **Read the step explanation** - Shows what's happening
2. **Check the in-degree table** - See algorithm state
3. **Look at the queue** - Nodes ready to process
4. **Watch the result build** - Final topological order
5. **Use Step button** - Go one at a time
6. **Try different scenario** - See the pattern

---

## 🎉 Success Criteria

You've mastered this when you can:

✅ Explain what Kahn's Algorithm does
✅ Understand in-degree concept
✅ Predict which node processes next
✅ Explain why certain nodes go to queue
✅ Give real-world examples (scheduling, builds, etc.)
✅ Recognize cycles vs valid DAGs
✅ Use both Play and Step modes effectively

---

## 🚀 Ready?

**1. Open topological-sort-visualizer.html**
**2. Click ▶️ Play**
**3. Start learning!**

---

Made with 💜 for learners like you!

Questions? Check TOPOLOGICAL_SORT_GUIDE.md for detailed info.
