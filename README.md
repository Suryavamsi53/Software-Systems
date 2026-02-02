# 🌑 Software Systems SDE Coding Interview Patterns

**Your Daily Revision Hub for Company SDE-1 / SDE-2 Coding Interviews**

A dark-themed, self-hosted interview preparation website focused on 18 essential DSA patterns used in real Company coding interviews. Built for pattern recognition, deep learning, and practical problem-solving.

---

## 🎯 Features

- **Dark Theme Only**: Easy on eyes, professional design inspired by Company internal tools
- **18 DSA Patterns**: Comprehensive coverage of all interview-critical patterns
- **Interview-Grade Content**: Written from an Company interviewer's perspective
- **Real-World Scenarios**: Business context for each pattern (not just textbook theory)
- **Go + Python**: Primary implementations in Go, with Python snippets
- **Colored Callout System**:
  - 🟢 **Green**: What Company Expects
  - 🔵 **Blue**: Key Intuition & Core Concepts
  - 🟡 **Yellow**: Interview Tips & Real-World Examples
  - 🔴 **Red**: Common Mistakes to Avoid
  - 🟣 **Purple**: Advanced Follow-up Questions

---

## 📚 Pattern Coverage

### Fundamental Patterns
- [Two Pointers](patterns/two-pointers.html) ✅ **FULL**
- [Sliding Window](patterns/sliding-window.html) ✅ **FULL**
- [Binary Search](patterns/binary-search.html)
- [Hash Maps & Sets](patterns/hash-maps.html)

### Data Structures
- [Linked Lists](patterns/linked-lists.html)
- [Stack](patterns/stack.html)
- [Heap (Priority Queue)](patterns/heap.html)
- [Trees](patterns/trees.html)
- [Tries](patterns/tries.html)

### Advanced Algorithms
- [Graphs](patterns/graphs.html)
- [Backtracking](patterns/backtracking.html)
- [Dynamic Programming](patterns/dynamic-programming.html)
- [Greedy](patterns/greedy.html)

### Specialized Topics
- [Fast & Slow Pointers](patterns/fast-slow-pointers.html)
- [Intervals](patterns/intervals.html)
- [Prefix Sum](patterns/prefix-sum.html)
- [Bit Manipulation](patterns/bit-manipulation.html)
- [Math & Geometry](patterns/math-geometry.html)

### Reference
- [Sort & Search](patterns/sort-search.html)

---

## 🏗️ Project Structure

```
amazon-coding-patterns/
│
├── index.html                    # Landing page with navigation
├── styles.css                    # Dark theme + colored callouts
├── script.js                     # Interactivity & local storage
│
├── patterns/
│   ├── two-pointers.html        # ✅ Full 10-section reference
│   ├── sliding-window.html      # ✅ Full 10-section reference
│   ├── binary-search.html       # Template (coming soon)
│   ├── hash-maps.html
│   ├── linked-lists.html
│   ├── stack.html
│   ├── heap.html
│   ├── trees.html
│   ├── tries.html
│   ├── graphs.html
│   ├── backtracking.html
│   ├── dynamic-programming.html
│   ├── greedy.html
│   ├── fast-slow-pointers.html
│   ├── intervals.html
│   ├── prefix-sum.html
│   ├── bit-manipulation.html
│   ├── math-geometry.html
│   └── sort-search.html
│
└── assets/                       # Diagrams & images (expandable)
```

---

## 📖 Each Pattern Page Includes

### 10 Comprehensive Sections:

1. **✅ What Company EXPECTS** (Green)
   - Interviewer's exact checklist
   - Communication signals Company values
   - When interviewer is satisfied

2. **🧠 Core Concept Theory** (Blue)
   - What the pattern solves
   - Recognition keywords
   - When NOT to use this pattern

3. **🎯 Real-World Company Scenario** (Yellow)
   - Business context (not just DSA terms)
   - Why Company uses this at scale
   - Examples: rate limiting, ranking, microservices

4. **🖼️ Visual / Image Explanation**
   - ASCII diagrams
   - Step-by-step pointer movement
   - State changes during algorithm

5. **🧩 Canonical Company Problem**
   - Official problem statement
   - Constraints & examples
   - Why Company loves this problem

6. **🔴 Brute Force → Why It Fails**
   - Naive approach
   - Time/space complexity
   - Why Company rejects it

7. **🟢 Optimized Solution (Go)**
   - Interview-quality code
   - Inline comments explaining WHY
   - Clean variable names

8. **🧩 Logical Walkthrough**
   - Step-by-step execution trace
   - Variable state table
   - Loop conditions

9. **⚙️ Complexity Analysis**
   - Time complexity proof
   - Space complexity breakdown
   - Why it meets Company's bar

10. **🟣 Company Follow-up Questions** (Purple)
    - Streaming data variant
    - Memory-constrained version
    - Parallelization approach
    - Real-world edge cases

---

## 🚀 Quick Start

### Option 1: Open in Browser (Local)
```bash
cd /home/suryavamsivaggu/Company/amazon-coding-patterns
python -m http.server 8000
# Then open: http://localhost:8000
```

### Option 2: VS Code Live Server
```bash
# Open index.html in VS Code
# Right-click → Open with Live Server
```

### Option 3: Open Directly
```bash
open index.html
# or
firefox index.html
# or
google-chrome index.html
```

---

## 📖 Recommended Study Paths

### Daily Revision Mode (30 minutes)
1. Pick one pattern from sidebar
2. Read "What Company Expects" section (2 min)
3. Review canonical problem + solution (5 min)
4. Walk through complexity analysis (3 min)
5. Implement from scratch in Go (20 min)

### Deep Dive Mode (2 hours)
1. Read all 10 sections completely
2. Code brute force solution
3. Code optimized solution
4. Try edge case variations
5. Answer follow-up questions from memory
6. Explain aloud (simulate real interview)

### Interview Prep Sprint (1 week before)
- 2 patterns per day (60 min each)
- Focus on: Two Pointers, Sliding Window, Binary Search
- Practice: Linked Lists, Trees, Graphs
- Polish: Dynamic Programming, Backtracking

---

## 🎓 Content Philosophy

This site follows **ByteByteGo** methodology:
- ✅ Pattern-based (not problem-based)
- ✅ Deep concepts (not memorization)
- ✅ Why > How (reasoning before coding)
- ✅ Interview-realistic (what Company actually asks)
- ✅ Scalable thinking (works for 10^5 inputs)

---

## 🌟 Key Differentiators

| Aspect | This Guide | Generic LeetCode |
|--------|-----------|------------------|
| Theme | Dark only | Generic light |
| Language | Go + Python | All languages |
| Context | Company-specific | Generic |
| Depth | 10 sections per pattern | Brief explanation |
| Real-world | Business scenarios | DSA terminology |
| Follow-ups | Company interview questions | N/A |
| Complexity | Explained + proved | Sometimes stated |
| Code quality | Interview-grade | Mixed quality |

---

## 💾 Local Storage Features

The site automatically tracks:
- Last pattern studied
- Collapsible section states (expanded/collapsed)
- Page visit history

Type `getStudyStats()` in browser console to see your study progress.

---

## 🔧 Technology Stack

- **Frontend**: HTML5 + CSS3 + Vanilla JavaScript
- **Code Language**: Go (primary), Python (secondary)
- **Theme**: Custom dark theme with colored callouts
- **Hosting**: Self-hosted (any HTTP server)
- **No dependencies**: Zero external libraries required

---

## 📱 Responsive Design

- ✅ Desktop (optimal experience)
- ✅ Tablet (sidebar collapses)
- ✅ Mobile (single column layout)

---

## 🎬 Next Steps

### To Complete Full Content:
1. Fill in Binary Search with full 10-section content
2. Expand all remaining patterns (use Two Pointers as template)
3. Add practice problems for each pattern
4. Add solution implementations in Python
5. Create daily challenge mode

### To Deploy:
1. Upload to any static host (GitHub Pages, Netlify)
2. Or self-host on private server
3. Access daily for revision

---

## 📝 Content Status

- ✅ **Two Pointers** - Complete (Container With Most Water)
- ✅ **Sliding Window** - Complete (Minimum Window Substring)
- ⏳ **Binary Search** - Template ready (needs content)
- ⏳ **Other 15 patterns** - Templates ready (need content)

---

## 🎯 Study Guarantee

If you:
1. Study **one pattern per day** for 3 weeks
2. Implement **all canonical problems** from memory
3. Answer **follow-up questions** without looking
4. **Explain aloud** like a real interview

**Result**: You'll recognize patterns instantly, code confidently, and crush Company interviews.

---

## 👨‍💻 Interview Pro Tips

1. **Clarify first** - Ask about constraints, edge cases, input ranges
2. **Brute force before optimization** - Show your thought process
3. **Complexity always** - State time & space upfront
4. **Code & explain** - Don't stay silent while coding
5. **Test with examples** - Walk through small inputs
6. **Handle edge cases** - Empty input, single element, duplicates
7. **Ask about trade-offs** - Time vs space, simplicity vs efficiency

---

## 🌐 Self-Hosted Note

This is intentionally self-hosted (no cloud dependency) because:
- ✅ You own your data
- ✅ Works offline after first load
- ✅ Instant access (no latency)
- ✅ Can be shared privately
- ✅ Perfect for daily revision loop

---

## 📞 Support

This is a personal study tool. For issues:
1. Check browser console (F12) for errors
2. Verify all HTML files are in correct folders
3. Use Python's `python -m http.server` for serving

---

## 💡 Why This Exists

Most interview prep is generic or memorization-based. Real interviews at Company require:
- **Pattern recognition** (immediate identification)
- **Deep reasoning** (why this approach)
- **Real-world context** (business impact)
- **System thinking** (scale, constraints, trade-offs)

This guide fills that gap. 🚀

---

**Built with 💚 for Company SDE candidates**

*Last Updated: January 25, 2026*
*Study Mode: Daily Revision + Deep Dives*
