document.addEventListener('DOMContentLoaded', () => {
    // Set year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Theme toggler
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        if (localStorage.getItem('gr-theme') === 'dark') {
            document.body.classList.add('dark');
        }
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            localStorage.setItem('gr-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        });
    }

    const studyPlan = [
        {
            phase: "Phase 1: The Foundation & Go Fluency (Months 1–2)",
            months: [
                {
                    month: 1,
                    title: "Go Language Deep Dive & Data Structures Theory",
                    weeks: [
                        { week: 1, task: "Master Go slices, maps, and pointers." },
                        { week: 2, task: "Understand structs and custom sorting (sort.Slice)." },
                        { week: 3, task: "Study Array, String, and Hash Table theory." },
                        { week: 4, task: "Implement Stack, Queue, and Linked List from scratch in Go." },
                    ]
                },
                {
                    month: 2,
                    title: "Advanced Data Structures Implementation",
                    weeks: [
                        { week: 5, task: "Study Tree and Graph representations (Adjacency List/Matrix)." },
                        { week: 6, task: "Implement a Binary Search Tree (BST) from scratch in Go." },
                        { week: 7, task: "Implement a Min/Max Heap (Priority Queue) from scratch in Go." },
                        { week: 8, task: "Implement a Trie from scratch in Go." },
                    ]
                }
            ]
        },
        {
            phase: "Phase 2: Breadth & Pattern Recognition (Months 3–6)",
            months: [
                {
                    month: 3,
                    title: "NeetCode 150: Arrays, Hashing, Two Pointers",
                    weeks: [
                        { week: 9, task: "Solve 3-5 problems on Arrays & Hashing." },
                        { week: 10, task: "Solve 3-5 problems on Two Pointers." },
                        { week: 11, task: "Review mistakes and solidify patterns." },
                        { week: 12, task: "Solve 3-5 problems combining these patterns." },
                    ]
                },
                {
                    month: 4,
                    title: "NeetCode 150: Sliding Window, Stack, Binary Search",
                    weeks: [
                        { week: 13, task: "Solve 3-5 problems on Sliding Window." },
                        { week: 14, task: "Solve 3-5 problems on Stacks." },
                        { week: 15, task: "Solve 3-5 problems on Binary Search." },
                        { week: 16, task: "Review mistakes and solve 1-2 hard problems." },
                    ]
                },
                {
                    month: 5,
                    title: "NeetCode 150: Linked Lists & Trees",
                    weeks: [
                        { week: 17, task: "Solve 3-5 problems on Linked Lists." },
                        { week: 18, task: "Solve 3-5 problems on Trees (Traversals, Depth)." },
                        { week: 19, task: "Solve 3-5 problems on Tries." },
                        { week: 20, task: "Review tree patterns (BFS vs DFS)." },
                    ]
                },
                {
                    month: 6,
                    title: "NeetCode 150: Backtracking & Heaps",
                    weeks: [
                        { week: 21, task: "Solve 3-5 problems on basic Backtracking." },
                        { week: 22, task: "Solve 3-5 problems on Heaps/Priority Queues." },
                        { week: 23, task: "Review heap applications (Top K, Median Stream)." },
                        { week: 24, task: "Solve 1-2 hard problems combining these topics." },
                    ]
                }
            ]
        },
        {
            phase: "Phase 3: Depth, Graphs, & Dynamic Programming (Months 7–8)",
            months: [
                {
                    month: 7,
                    title: "Advanced Topics: Graphs",
                    weeks: [
                        { week: 25, task: "Study Graph Algorithms: BFS, DFS." },
                        { week: 26, task: "Solve Google-tagged Graph problems (Medium)." },
                        { week: 27, task: "Study and implement Topological Sort and Dijkstra's." },
                        { week: 28, task: "Solve Google-tagged shortest path problems." },
                    ]
                },
                {
                    month: 8,
                    title: "Advanced Topics: Dynamic Programming",
                    weeks: [
                        { week: 29, task: "Study 1D Dynamic Programming patterns." },
                        { week: 30, task: "Solve Google-tagged 1D DP problems." },
                        { week: 31, task: "Study 2D Dynamic Programming patterns." },
                        { week: 32, task: "Solve Google-tagged 2D DP matrix problems." },
                    ]
                }
            ]
        },
        {
            phase: "Phase 4: System Design & Project Building (Months 9–10)",
            months: [
                {
                    month: 9,
                    title: "System Design Basics",
                    weeks: [
                        { week: 33, task: "Read 'Designing Data-Intensive Applications' (Ch 1-2)." },
                        { week: 34, task: "Learn Load Balancing and Caching fundamentals." },
                        { week: 35, task: "Study Sharding and Microservices patterns." },
                        { week: 36, task: "Watch System Design primer videos (e.g., Gaurav Sen)." },
                    ]
                },
                {
                    month: 10,
                    title: "Cloud Context & Advanced Design",
                    weeks: [
                        { week: 37, task: "Explore Google Cloud Pub/Sub and Spanner concepts." },
                        { week: 38, task: "Read 'Designing Data-Intensive Applications' (Ch 3-4)." },
                        { week: 39, task: "Attempt a high-level design: URL Shortener." },
                        { week: 40, task: "Attempt a high-level design: Twitter Feed." },
                    ]
                }
            ]
        },
        {
            phase: "Phase 5: The Google Polish & Mock Interviews (Months 11–12)",
            months: [
                {
                    month: 11,
                    title: "Mock Interviews and Communication",
                    weeks: [
                        { week: 41, task: "Complete 1 mock interview on Pramp/interviewing.io." },
                        { week: 42, task: "Practice coding in a Google Doc (no IDE)." },
                        { week: 43, task: "Complete 1-2 more mock interviews." },
                        { week: 44, task: "Refine 'Think Out Loud' communication protocol." },
                    ]
                },
                {
                    month: 12,
                    title: "Behavioral Prep & Final Review",
                    weeks: [
                        { week: 45, task: "Draft 5 core stories using the STAR method." },
                        { week: 46, task: "Practice 'Googleyness' behavioral questions." },
                        { week: 47, task: "Review all 'review later' LeetCode problems." },
                        { week: 48, task: "Relax, review notes, and stay confident." },
                    ]
                }
            ]
        }
    ];

    const studyPlanContainer = document.getElementById('study-plan');
    if (studyPlanContainer) {
        studyPlanContainer.innerHTML = ''; // Clear existing content

        studyPlan.forEach(phase => {
            const phaseHeader = document.createElement('h3');
            phaseHeader.textContent = phase.phase;
            phaseHeader.style.gridColumn = "1 / -1";
            studyPlanContainer.appendChild(phaseHeader);

            phase.months.forEach(monthData => {
                const monthDiv = document.createElement('div');
                monthDiv.className = 'month';
                
                const monthTitle = document.createElement('h4');
                monthTitle.textContent = `Month ${monthData.month}: ${monthData.title}`;
                monthDiv.appendChild(monthTitle);

                const weekList = document.createElement('ul');
                monthData.weeks.forEach(week => {
                    const weekItem = document.createElement('li');
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    const checkboxId = `week-${week.week}-${week.task.replace(/\s+/g, '-')}`;
                    checkbox.id = checkboxId;
                    checkbox.dataset.task = checkboxId;
                    checkbox.checked = localStorage.getItem(checkboxId) === 'true';

                    const label = document.createElement('label');
                    label.htmlFor = checkboxId;
                    label.textContent = `Week ${week.week}: ${week.task}`;

                    weekItem.appendChild(checkbox);
                    weekItem.appendChild(label);
                    weekList.appendChild(weekItem);

                    checkbox.addEventListener('change', (e) => {
                        localStorage.setItem(e.target.id, e.target.checked);
                    });
                });
                monthDiv.appendChild(weekList);
                studyPlanContainer.appendChild(monthDiv);
            });
        });
    }

    // export/import progress
    const exportBtn = document.getElementById('exportProgress');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const data = { tasks: {} };
            document.querySelectorAll('#study-plan input[type="checkbox"]').forEach(checkbox => {
                data.tasks[checkbox.dataset.task] = checkbox.checked;
            });
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'google-roadmap-progress.json';
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    const importBtn = document.getElementById('importProgress');
    const importFile = document.getElementById('importFile');
    if (importBtn && importFile) {
        importBtn.addEventListener('click', () => {
            importFile.click();
        });

        importFile.addEventListener('change', (e) => {
            const f = e.target.files[0];
            if (!f) return;
            const r = new FileReader();
            r.onload = (ev) => {
                try {
                    const data = JSON.parse(ev.target.result);
                    if (data.tasks) {
                        Object.keys(data.tasks).forEach(key => {
                            const checkbox = document.querySelector(`input[data-task="${key}"]`);
                            if (checkbox) {
                                checkbox.checked = data.tasks[key];
                                localStorage.setItem(checkbox.id, checkbox.checked);
                            }
                        });
                    }
                } catch (err) {
                    alert('Invalid JSON file.');
                }
            };
            r.readAsText(f);
        });
    }
});
