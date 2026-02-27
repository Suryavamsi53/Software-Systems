/**
 * Graph Algorithms Visualizer
 * Core Logic: Graph Model, Renderer, Algorithms Engine
 */

// ============================================================
// 1. GRAPH DATA MODEL
// ============================================================

class Graph {
    constructor() {
        this.nodes = []; // {id, x, y}
        this.edges = []; // {source, target, weight, id}
        this.isDirected = false;
        this.isWeighted = false;
        this.isGrid = false;
        this.nodeIdCounter = 0;
        this.edgeIdCounter = 0;
    }

    addNode(x, y) {
        const node = {
            id: this.nodeIdCounter++,
            x: x,
            y: y,
            isWall: false
        };
        this.nodes.push(node);
        return node;
    }

    addEdge(sourceId, targetId, weight = 1) {
        // Check if edge exists
        const exists = this.edges.some(e => 
            (e.source === sourceId && e.target === targetId) ||
            (!this.isDirected && e.source === targetId && e.target === sourceId)
        );
        
        if (exists) return null;
        if (sourceId === targetId) return null; // No self-loops for simplicity

        const edge = {
            id: this.edgeIdCounter++,
            source: sourceId,
            target: targetId,
            weight: this.isWeighted ? weight : null
        };
        this.edges.push(edge);
        return edge;
    }

    removeNode(id) {
        this.nodes = this.nodes.filter(n => n.id !== id);
        this.edges = this.edges.filter(e => e.source !== id && e.target !== id);
    }

    removeEdge(id) {
        this.edges = this.edges.filter(e => e.id !== id);
    }

    clear() {
        this.nodes = [];
        this.edges = [];
        this.nodeIdCounter = 0;
        this.edgeIdCounter = 0;
    }

    getAdjacencyList() {
        const adj = new Map();
        this.nodes.forEach(n => adj.set(n.id, []));
        
        this.edges.forEach(e => {
            adj.get(e.source).push({ to: e.target, weight: e.weight });
            if (!this.isDirected) {
                adj.get(e.target).push({ to: e.source, weight: e.weight });
            }
        });
        
        // Sort neighbors for consistent traversal
        adj.forEach(neighbors => neighbors.sort((a, b) => a.to - b.to));
        return adj;
    }

    getAdjacencyMatrix() {
        const size = this.nodes.length;
        // Map node IDs to 0..size-1 indices
        const idToIndex = new Map();
        this.nodes.forEach((n, i) => idToIndex.set(n.id, i));

        const matrix = Array(size).fill().map(() => Array(size).fill(0));
        
        this.edges.forEach(e => {
            const u = idToIndex.get(e.source);
            const v = idToIndex.get(e.target);
            const w = this.isWeighted ? e.weight : 1;
            matrix[u][v] = w;
            if (!this.isDirected) {
                matrix[v][u] = w;
            }
        });
        
        return { matrix, nodes: this.nodes };
    }
}

// ============================================================
// 2. RENDERING ENGINE (SVG)
// ============================================================

class Renderer {
    constructor(svgId, graph) {
        this.svg = document.getElementById(svgId);
        this.graph = graph;
        this.width = this.svg.clientWidth;
        this.height = this.svg.clientHeight;
        
        // Define arrow marker
        this.svg.innerHTML = `
            <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                refX="28" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                </marker>
                <marker id="arrowhead-visited" markerWidth="10" markerHeight="7" 
                refX="28" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#34d399" />
                </marker>
            </defs>
            <g id="viewport">
                <g id="edges-layer"></g>
                <g id="nodes-layer"></g>
            </g>
        `;
        
        this.viewport = document.getElementById('viewport');
        this.edgesLayer = document.getElementById('edges-layer');
        this.nodesLayer = document.getElementById('nodes-layer');
    }

    draw() {
        if (this.graph.isGrid) {
            this.drawGrid();
            return;
        }
        this.drawEdges();
        this.drawNodes();
    }

    drawNodes() {
        this.nodesLayer.innerHTML = '';
        this.graph.nodes.forEach(node => {
            const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g.setAttribute('class', 'node-group');
            g.setAttribute('data-id', node.id);
            g.setAttribute('transform', `translate(${node.x}, ${node.y})`);
            
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute('r', 20);
            circle.setAttribute('class', 'node-circle');
            circle.setAttribute('id', `node-${node.id}`);
            
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute('class', 'node-label');
            text.textContent = node.id;
            
            g.appendChild(circle);
            g.appendChild(text);
            this.nodesLayer.appendChild(g);
        });
    }

    drawEdges() {
        this.edgesLayer.innerHTML = '';
        this.graph.edges.forEach(edge => {
            const source = this.graph.nodes.find(n => n.id === edge.source);
            const target = this.graph.nodes.find(n => n.id === edge.target);
            if (!source || !target) return;

            const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute('x1', source.x);
            line.setAttribute('y1', source.y);
            line.setAttribute('x2', target.x);
            line.setAttribute('y2', target.y);
            line.setAttribute('class', 'edge-line');
            line.setAttribute('id', `edge-${edge.source}-${edge.target}`);
            
            if (this.graph.isDirected) {
                line.setAttribute('marker-end', 'url(#arrowhead)');
            }

            g.appendChild(line);

            if (this.graph.isWeighted) {
                const midX = (source.x + target.x) / 2;
                const midY = (source.y + target.y) / 2;
                
                // Background for text readability
                const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute('x', midX - 10);
                rect.setAttribute('y', midY - 10);
                rect.setAttribute('width', 20);
                rect.setAttribute('height', 20);
                rect.setAttribute('class', 'edge-weight-bg');

                const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute('x', midX);
                text.setAttribute('y', midY);
                text.setAttribute('class', 'node-label edge-weight'); // Reuse label style
                text.textContent = edge.weight;
                
                g.appendChild(rect);
                g.appendChild(text);
            }
            
            this.edgesLayer.appendChild(g);
        });
    }

    drawGrid() {
        this.nodesLayer.innerHTML = '';
        this.edgesLayer.innerHTML = ''; // No explicit edges in grid visual
        
        // Assuming nodes have x, y as grid coordinates (col, row)
        // and we scale them up
        const CELL_SIZE = 40;
        
        this.graph.nodes.forEach(node => {
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute('x', node.x * CELL_SIZE);
            rect.setAttribute('y', node.y * CELL_SIZE);
            rect.setAttribute('width', CELL_SIZE - 2);
            rect.setAttribute('height', CELL_SIZE - 2);
            rect.setAttribute('class', 'node-rect'); // New class for grid cells
            rect.setAttribute('id', `node-${node.id}`);
            rect.setAttribute('data-id', node.id);
            
            // Style based on type (wall, start, end, etc. - stored in node properties if needed)
            rect.style.fill = 'var(--bg-tertiary)';
            rect.style.stroke = 'var(--border-color)';
            if (node.isWall) {
                rect.style.fill = '#334155';
            }
            
            this.nodesLayer.appendChild(rect);
        });
    }

    highlightNode(id, className) {
        const el = document.getElementById(`node-${id}`);
        if (el) {
            // Remove other status classes
            el.classList.remove('visiting', 'visited', 'start', 'path');
            if (className) el.classList.add(className);
        }
    }

    highlightEdge(u, v, className) {
        let id = `edge-${u}-${v}`;
        let el = document.getElementById(id);
        if (!el && !this.graph.isDirected) {
            id = `edge-${v}-${u}`;
            el = document.getElementById(id);
        }
        
        if (el) {
            if (className === 'visited' && this.graph.isDirected) {
                el.setAttribute('marker-end', 'url(#arrowhead-visited)');
            }
            el.classList.add(className);
        }
    }

    resetVisuals() {
        document.querySelectorAll('.node-circle').forEach(el => {
            el.classList.remove('visiting', 'visited', 'start', 'path');
        });
        document.querySelectorAll('.node-rect').forEach(el => {
            el.classList.remove('visiting', 'visited', 'start', 'path');
        });
        document.querySelectorAll('.edge-line').forEach(el => {
            el.classList.remove('visited', 'path');
            if (this.graph.isDirected) el.setAttribute('marker-end', 'url(#arrowhead)');
        });
    }

    setTransform(x, y, k) {
        this.viewport.setAttribute('transform', `translate(${x}, ${y}) scale(${k})`);
    }

    updateNodePosition(node) {
        const el = document.getElementById(`node-${node.id}`);
        if (!el) return;

        if (this.graph.isGrid) {
            const CELL_SIZE = 40;
            el.setAttribute('x', node.x * CELL_SIZE);
            el.setAttribute('y', node.y * CELL_SIZE);
        } else {
            // Update Node Group
            const group = el.closest('.node-group');
            if (group) group.setAttribute('transform', `translate(${node.x}, ${node.y})`);

            // Update Connected Edges
            this.graph.edges.forEach(edge => {
                if (edge.source === node.id || edge.target === node.id) {
                    const line = document.getElementById(`edge-${edge.source}-${edge.target}`);
                    if (line) {
                        const otherId = edge.source === node.id ? edge.target : edge.source;
                        const other = this.graph.nodes.find(n => n.id === otherId);
                        if (other) {
                            if (edge.source === node.id) {
                                line.setAttribute('x1', node.x);
                                line.setAttribute('y1', node.y);
                            } else {
                                line.setAttribute('x2', other.x);
                                line.setAttribute('y2', other.y);
                                line.setAttribute('x2', node.x);
                                line.setAttribute('y2', node.y);
                            }
                            
                            // Update Weight Label
                            if (this.graph.isWeighted) {
                                const midX = (node.x + other.x) / 2;
                                const midY = (node.y + other.y) / 2;
                                const g = line.parentElement;
                                const rect = g.querySelector('rect');
                                const text = g.querySelector('text');
                                if (rect) { rect.setAttribute('x', midX - 10); rect.setAttribute('y', midY - 10); }
                                if (text) { text.setAttribute('x', midX); text.setAttribute('y', midY); }
                            }
                        }
                    }
                }
            });
        }
    }
}

// ============================================================
// 3. ALGORITHMS ENGINE (GENERATORS)
// ============================================================

class Algorithms {
    static *bfs(graph, startId) {
        const adj = graph.getAdjacencyList();
        const visited = new Set([startId]);
        const queue = [startId]; // q := []int{start}
        
        yield { 
            type: 'visit', node: startId, queue: [...queue], 
            msg: `Start BFS. Enqueue ${startId}`, 
            lines: { go: 2, java: 2, python: 2 } 
        };

        while (queue.length > 0) {
            yield { type: 'check', queue: [...queue], msg: 'Queue not empty', lines: { go: 4, java: 4, python: 4 } };
            
            const u = queue.shift();
            yield { type: 'process', node: u, queue: [...queue], msg: `Dequeue ${u}`, lines: { go: 5, java: 5, python: 5 } };

            const neighbors = adj.get(u) || [];
            for (const { to: v } of neighbors) {
                yield { type: 'explore', edge: [u, v], queue: [...queue], msg: `Check neighbor ${v}`, lines: { go: 7, java: 7, python: 7 } };
                
                if (!visited.has(v)) {
                    visited.add(v);
                    queue.push(v);
                    yield { 
                        type: 'visit', node: v, queue: [...queue], edge: [u, v],
                        msg: `Enqueue ${v} and mark visited`, 
                        lines: { go: 10, java: 10, python: 10 } 
                    };
                }
            }
        }
        yield { type: 'done', msg: 'BFS Complete', lines: { go: 14, java: 14, python: 4 } };
    }

    static *dfs(graph, startId) {
        const adj = graph.getAdjacencyList();
        const visited = new Set();
        const stack = [];
        
        // Recursive generator
        function* recurse(u) {
            stack.push(u);
            yield { type: 'visit', node: u, queue: [...stack], msg: `DFS(${u}) called`, lines: { go: 1, java: 1, python: 1 } };
            
            if (visited.has(u)) {
                stack.pop();
                yield { type: 'check', node: u, queue: [...stack], msg: `${u} visited. Return.`, lines: { go: 2, java: 2, python: 2 } };
                return;
            }

            visited.add(u);
            yield { type: 'process', node: u, queue: [...stack], msg: `Mark ${u} visited`, lines: { go: 3, java: 3, python: 3 } };

            const neighbors = adj.get(u) || [];
            for (const { to: v } of neighbors) {
                yield { type: 'explore', edge: [u, v], queue: [...stack], msg: `Loop neighbor ${v}`, lines: { go: 5, java: 5, python: 5 } };
                yield* recurse(v);
            }
            stack.pop();
            yield { type: 'backtrack', node: u, queue: [...stack], msg: `Finished ${u}`, lines: { go: 8, java: 8, python: 6 } };
        }

        yield* recurse(startId);
        yield { type: 'done', msg: 'DFS Complete', lines: { go: 8, java: 8, python: 6 } };
    }

    static *dijkstra(graph, startId) {
        const adj = graph.getAdjacencyList();
        const dist = new Map();
        const prev = new Map();
        const pq = [{ id: startId, dist: 0 }]; // Simple array as PQ
        
        graph.nodes.forEach(n => dist.set(n.id, Infinity));
        dist.set(startId, 0);

        yield { type: 'init', dist: new Map(dist), queue: pq.map(n=>`${n.id}:${n.dist}`), msg: `Initialize distances. Start: ${startId}`, lines: { go: 2, java: 2, python: 2 } };

        while (pq.length > 0) {
            // Sort to simulate Min-Priority Queue
            pq.sort((a, b) => a.dist - b.dist);
            const { id: u, dist: d } = pq.shift();

            yield { type: 'process', node: u, dist: new Map(dist), queue: pq.map(n=>`${n.id}:${n.dist}`), msg: `Processing node ${u} (dist: ${d})`, lines: { go: 6, java: 6, python: 5 } };

            if (d > dist.get(u)) continue;

            const neighbors = adj.get(u) || [];
            for (const { to: v, weight } of neighbors) {
                const alt = d + weight;
                if (alt < dist.get(v)) {
                    dist.set(v, alt);
                    prev.set(v, u);
                    pq.push({ id: v, dist: alt });
                    yield { type: 'relax', edge: [u, v], dist: new Map(dist), queue: pq.map(n=>`${n.id}:${n.dist}`), msg: `Relaxing edge ${u}->${v}. New dist: ${alt}`, lines: { go: 10, java: 10, python: 9 } };
                }
            }
        }
        yield { type: 'done', msg: 'Shortest paths calculated', lines: { go: 15, java: 15, python: 4 } };
    }

    static *topologicalSort(graph) {
        const adj = graph.getAdjacencyList();
        const inDegree = new Map();
        graph.nodes.forEach(n => inDegree.set(n.id, 0));

        // Calculate in-degrees
        yield { type: 'init', msg: 'Calculating in-degrees...', lines: { go: 2, java: 2, python: 2 } };
        
        for (const [u, neighbors] of adj.entries()) {
            for (const { to: v } of neighbors) {
                inDegree.set(v, (inDegree.get(v) || 0) + 1);
            }
        }
        yield { type: 'init', msg: 'In-degrees calculated', lines: { go: 3, java: 3, python: 4 } };

        const queue = [];
        graph.nodes.forEach(n => {
            if (inDegree.get(n.id) === 0) queue.push(n.id);
        });

        yield { type: 'visit', queue: [...queue], msg: 'Enqueue nodes with 0 in-degree', lines: { go: 4, java: 5, python: 5 } };

        const result = [];
        while (queue.length > 0) {
            yield { type: 'check', queue: [...queue], msg: 'Queue not empty', lines: { go: 5, java: 6, python: 6 } };

            const u = queue.shift();
            result.push(u);
            yield { type: 'process', node: u, queue: [...queue], msg: `Process ${u}`, lines: { go: 6, java: 7, python: 7 } };
            yield { type: 'process', node: u, queue: [...queue], msg: `Add ${u} to result`, lines: { go: 7, java: 8, python: 8 } };

            const neighbors = adj.get(u) || [];
            for (const { to: v } of neighbors) {
                yield { type: 'explore', edge: [u, v], queue: [...queue], msg: `Check neighbor ${v}`, lines: { go: 8, java: 9, python: 9 } };
                
                inDegree.set(v, inDegree.get(v) - 1);
                yield { type: 'explore', edge: [u, v], queue: [...queue], msg: `Decrement in-degree of ${v} to ${inDegree.get(v)}`, lines: { go: 9, java: 10, python: 10 } };

                if (inDegree.get(v) === 0) {
                    queue.push(v);
                    yield { type: 'visit', node: v, queue: [...queue], msg: `${v} has 0 in-degree. Enqueue.`, lines: { go: 10, java: 11, python: 11 } };
                }
            }
        }

        if (result.length !== graph.nodes.length) {
             yield { type: 'done', msg: 'Cycle detected! Topological sort impossible.', lines: { go: 13, java: 14, python: 11 } };
        } else {
             yield { type: 'done', msg: `Topological Sort: ${result.join(' -> ')}`, lines: { go: 13, java: 14, python: 11 } };
        }
    }

    static *connectedComponents(graph) {
        const adj = graph.getAdjacencyList();
        const visited = new Set();
        let count = 0;
        
        yield { type: 'init', msg: 'Start Connected Components', lines: { go: 2, java: 2, python: 2 } };

        for (const node of graph.nodes) {
            yield { type: 'check', node: node.id, msg: `Check node ${node.id}`, lines: { go: 3, java: 3, python: 3 } };
            
            if (!visited.has(node.id)) {
                count++;
                yield { type: 'process', node: node.id, msg: `New Component #${count} found at ${node.id}`, lines: { go: 5, java: 5, python: 5 } };
                
                // Run BFS to mark component
                const queue = [node.id];
                visited.add(node.id);
                
                while(queue.length > 0) {
                    const u = queue.shift();
                    const neighbors = adj.get(u) || [];
                    for(const {to: v} of neighbors) {
                        if(!visited.has(v)) {
                            visited.add(v);
                            queue.push(v);
                            yield { type: 'visit', node: v, edge: [u, v], queue: [...queue], msg: `Mark ${v} as part of Component #${count}`, lines: { go: 5, java: 5, python: 5 } };
                        }
                    }
                }
            }
        }
        yield { type: 'done', msg: `Found ${count} connected components`, lines: { go: 8, java: 8, python: 8 } };
    }

    static *cycleDetection(graph) {
        const adj = graph.getAdjacencyList();
        const visited = new Set();
        const visiting = new Set(); // Recursion stack for directed
        const stack = [];
        let cycleFound = false;

        function* dfs(u, parent) {
            if (cycleFound) return;
            
            visiting.add(u);
            visited.add(u);
            stack.push(u);
            yield { type: 'visit', node: u, queue: [...stack], msg: `Visiting ${u}`, lines: { go: 2, java: 2, python: 2 } };

            const neighbors = adj.get(u) || [];
            for (const {to: v} of neighbors) {
                if (cycleFound) return;
                
                yield { type: 'explore', edge: [u, v], queue: [...stack], msg: `Checking edge ${u}->${v}`, lines: { go: 3, java: 3, python: 3 } };

                if (graph.isDirected) {
                    if (visiting.has(v)) {
                        cycleFound = true;
                        yield { type: 'process', node: v, edge: [u, v], queue: [...stack], msg: `Cycle detected! Back edge to ${v}`, lines: { go: 4, java: 4, python: 4 } };
                        return;
                    }
                } else {
                    if (visited.has(v) && v !== parent) {
                        cycleFound = true;
                        yield { type: 'process', node: v, edge: [u, v], queue: [...stack], msg: `Cycle detected! Back edge to ${v}`, lines: { go: 4, java: 4, python: 4 } };
                        return;
                    }
                }

                if (!visited.has(v)) {
                    yield* dfs(v, u);
                }
            }
            
            visiting.delete(u);
            stack.pop();
            yield { type: 'backtrack', node: u, queue: [...stack], msg: `Finished ${u}`, lines: { go: 9, java: 9, python: 9 } };
        }

        for (const node of graph.nodes) {
            if (!visited.has(node.id) && !cycleFound) {
                yield* dfs(node.id, -1);
            }
        }

        if (!cycleFound) {
            yield { type: 'done', msg: 'No cycles detected', lines: { go: 10, java: 10, python: 10 } };
        }
    }

    static *bipartiteCheck(graph) {
        const adj = graph.getAdjacencyList();
        const colors = new Map(); // node.id -> 0 or 1
        
        yield { type: 'init', msg: 'Start Bipartite Check', lines: { go: 1, java: 1, python: 1 } };

        for (const node of graph.nodes) {
            if (colors.has(node.id)) continue;
            
            colors.set(node.id, 0);
            const queue = [node.id];
            yield { type: 'visit', node: node.id, msg: `Start component at ${node.id}. Color: Red (0)`, lines: { go: 3, java: 3, python: 3 } };

            while (queue.length > 0) {
                const u = queue.shift();
                
                const neighbors = adj.get(u) || [];
                for (const { to: v } of neighbors) {
                    if (!colors.has(v)) {
                        const newColor = 1 - colors.get(u);
                        colors.set(v, newColor);
                        queue.push(v);
                        yield { 
                            type: 'visit', node: v, edge: [u, v], queue: [...queue],
                            msg: `Color ${v} ${newColor===0?'Red':'Blue'} (${newColor})`, 
                            lines: { go: 9, java: 9, python: 9 } 
                        };
                    } else if (colors.get(v) === colors.get(u)) {
                        yield { 
                            type: 'process', node: v, edge: [u, v], 
                            msg: `Conflict! ${u} & ${v} same color. Not Bipartite.`, 
                            lines: { go: 10, java: 10, python: 10 } 
                        };
                        return;
                    }
                }
            }
        }
        yield { type: 'done', msg: 'Graph is Bipartite', lines: { go: 14, java: 14, python: 12 } };
    }

    static *kruskal(graph) {
        let edges = [];
        graph.edges.forEach(e => edges.push({...e}));
        // Sort by weight
        edges.sort((a, b) => (a.weight || 1) - (b.weight || 1));
        
        const parent = new Map();
        graph.nodes.forEach(n => parent.set(n.id, n.id));
        
        function find(i) {
            if (parent.get(i) === i) return i;
            const root = find(parent.get(i));
            parent.set(i, root); // Path compression
            return root;
        }
        
        function union(i, j) {
            const rootI = find(i);
            const rootJ = find(j);
            if (rootI !== rootJ) {
                parent.set(rootI, rootJ);
                return true;
            }
            return false;
        }
        
        yield { type: 'init', queue: edges.map(e=>`${e.source}-${e.target}:${e.weight||1}`), msg: 'Sort edges by weight', lines: { go: 2, java: 2, python: 2 } };
        
        let mstWeight = 0;
        
        for (const edge of edges) {
            yield { type: 'explore', edge: [edge.source, edge.target], queue: edges.map(e=>`${e.source}-${e.target}:${e.weight||1}`), msg: `Check edge ${edge.source}-${edge.target} (w:${edge.weight||1})`, lines: { go: 4, java: 4, python: 4 } };
            
            if (union(edge.source, edge.target)) {
                mstWeight += (edge.weight || 1);
                yield { type: 'relax', edge: [edge.source, edge.target], queue: edges.map(e=>`${e.source}-${e.target}:${e.weight||1}`), msg: `Add to MST. Total: ${mstWeight}`, lines: { go: 6, java: 5, python: 5 } };
            } else {
                yield { type: 'process', edge: [edge.source, edge.target], queue: edges.map(e=>`${e.source}-${e.target}:${e.weight||1}`), msg: `Cycle detected. Skip.`, lines: { go: 4, java: 4, python: 4 } };
            }
        }
        
        yield { type: 'done', msg: `MST Complete. Cost: ${mstWeight}`, lines: { go: 10, java: 9, python: 7 } };
    }

    static *prims(graph, startId) {
        const adj = graph.getAdjacencyList();
        const dist = new Map();
        const visited = new Set();
        const parent = new Map();
        const pq = [{ id: startId, dist: 0 }]; // Simple array as PQ
        
        graph.nodes.forEach(n => dist.set(n.id, Infinity));
        dist.set(startId, 0);

        yield { type: 'init', queue: pq.map(n=>`${n.id}:${n.dist}`), msg: `Start Prim's from ${startId}`, lines: { go: 2, java: 2, python: 2 } };

        let mstCost = 0;

        while (pq.length > 0) {
            // Sort to simulate Min-Priority Queue
            pq.sort((a, b) => a.dist - b.dist);
            const { id: u, dist: d } = pq.shift();

            if (visited.has(u)) {
                yield { type: 'check', node: u, queue: pq.map(n=>`${n.id}:${n.dist}`), msg: `Node ${u} already visited. Skip.`, lines: { go: 6, java: 6, python: 6 } };
                continue;
            }

            visited.add(u);
            mstCost += d;
            
            if (parent.has(u)) {
                yield { type: 'relax', edge: [parent.get(u), u], queue: pq.map(n=>`${n.id}:${n.dist}`), msg: `Add edge ${parent.get(u)}-${u} to MST. Cost: ${mstCost}`, lines: { go: 7, java: 7, python: 7 } };
            } else {
                yield { type: 'process', node: u, queue: pq.map(n=>`${n.id}:${n.dist}`), msg: `Visit ${u}. Cost: ${mstCost}`, lines: { go: 7, java: 7, python: 7 } };
            }

            const neighbors = adj.get(u) || [];
            for (const { to: v, weight } of neighbors) {
                yield { type: 'explore', edge: [u, v], queue: pq.map(n=>`${n.id}:${n.dist}`), msg: `Check neighbor ${v} (w:${weight})`, lines: { go: 8, java: 8, python: 8 } };
                
                if (!visited.has(v) && weight < dist.get(v)) {
                    dist.set(v, weight);
                    parent.set(v, u);
                    pq.push({ id: v, dist: weight });
                    yield { type: 'visit', node: v, queue: pq.map(n=>`${n.id}:${n.dist}`), msg: `Update ${v} dist to ${weight}`, lines: { go: 10, java: 10, python: 10 } };
                }
            }
        }
        yield { type: 'done', msg: `Prim's MST Complete. Total Cost: ${mstCost}`, lines: { go: 14, java: 14, python: 14 } };
    }

    static *tarjan(graph) {
        const adj = graph.getAdjacencyList();
        const ids = new Map();
        const low = new Map();
        const onStack = new Set();
        const stack = [];
        let idCounter = 0;
        let sccCount = 0;

        graph.nodes.forEach(n => ids.set(n.id, -1));

        function* dfs(at) {
            stack.push(at);
            onStack.add(at);
            ids.set(at, idCounter);
            low.set(at, idCounter);
            idCounter++;
            
            yield { type: 'visit', node: at, queue: [...stack], msg: `Visit ${at}. ID/Low: ${ids.get(at)}`, lines: { go: 7, java: 6, python: 6 } };

            const neighbors = adj.get(at) || [];
            for (const { to } of neighbors) {
                if (ids.get(to) === -1) {
                    yield* dfs(to);
                    low.set(at, Math.min(low.get(at), low.get(to)));
                    yield { type: 'process', node: at, queue: [...stack], msg: `Update low[${at}] via DFS child ${to}: ${low.get(at)}`, lines: { go: 11, java: 10, python: 10 } };
                } else if (onStack.has(to)) {
                    low.set(at, Math.min(low.get(at), ids.get(to)));
                    yield { type: 'process', node: at, queue: [...stack], msg: `Update low[${at}] via back-edge ${to}: ${low.get(at)}`, lines: { go: 13, java: 12, python: 12 } };
                }
            }

            if (ids.get(at) === low.get(at)) {
                sccCount++;
                yield { type: 'process', node: at, queue: [...stack], msg: `SCC #${sccCount} found (Root: ${at})`, lines: { go: 16, java: 15, python: 13 } };
                while (stack.length > 0) {
                    const node = stack.pop();
                    onStack.delete(node);
                    yield { type: 'visit', node: node, queue: [...stack], msg: `Pop ${node} from stack (SCC #${sccCount})`, lines: { go: 17, java: 16, python: 14 } };
                    if (node === at) break;
                }
            }
        }

        for (const node of graph.nodes) {
            if (ids.get(node.id) === -1) {
                yield* dfs(node.id);
            }
        }
        yield { type: 'done', msg: `Tarjan's Complete. Found ${sccCount} SCCs.`, lines: { go: 20, java: 19, python: 14 } };
    }

    static *bellmanFord(graph, startId) {
        const dist = new Map();
        graph.nodes.forEach(n => dist.set(n.id, Infinity));
        dist.set(startId, 0);
        
        yield { type: 'init', dist: new Map(dist), msg: `Init Bellman-Ford. Start: ${startId}`, lines: { go: 2, java: 2, python: 3 } };

        const n = graph.nodes.length;
        let changed = false;

        for (let i = 0; i < n - 1; i++) {
            changed = false;
            yield { type: 'visit', dist: new Map(dist), msg: `Iteration ${i+1}/${n-1}`, lines: { go: 3, java: 3, python: 4 } };
            
            for (const edge of graph.edges) {
                const u = edge.source;
                const v = edge.target;
                const w = edge.weight || 1;
                
                yield { type: 'explore', edge: [u, v], dist: new Map(dist), msg: `Check ${u}->${v} (w:${w})`, lines: { go: 4, java: 4, python: 5 } };

                if (dist.get(u) !== Infinity && dist.get(u) + w < dist.get(v)) {
                    dist.set(v, dist.get(u) + w);
                    changed = true;
                    yield { type: 'relax', edge: [u, v], dist: new Map(dist), msg: `Relax ${u}->${v}. New dist: ${dist.get(v)}`, lines: { go: 6, java: 6, python: 7 } };
                }
            }
            if (!changed) break;
        }

        // Check for negative cycles
        for (const edge of graph.edges) {
            const u = edge.source;
            const v = edge.target;
            const w = edge.weight || 1;
            if (dist.get(u) !== Infinity && dist.get(u) + w < dist.get(v)) {
                yield { type: 'process', edge: [u, v], dist: new Map(dist), msg: `Negative Cycle Detected!`, lines: { go: 10, java: 10, python: 8 } };
                return;
            }
        }
        
        yield { type: 'done', dist: new Map(dist), msg: 'Bellman-Ford Complete', lines: { go: 11, java: 11, python: 7 } };
    }

    static *floydWarshall(graph) {
        const n = graph.nodes.length;
        const dist = Array(n).fill().map(() => Array(n).fill(Infinity));
        const idToIndex = new Map();
        graph.nodes.forEach((node, i) => {
            idToIndex.set(node.id, i);
            dist[i][i] = 0;
        });

        graph.edges.forEach(e => {
            const u = idToIndex.get(e.source);
            const v = idToIndex.get(e.target);
            dist[u][v] = e.weight || 1;
            if (!graph.isDirected) dist[v][u] = e.weight || 1;
        });

        // Helper to clone matrix for visualization
        const getMatrix = () => dist.map(row => [...row]);

        yield { type: 'init', msg: 'Init Distance Matrix', matrix: getMatrix(), lines: { go: 2, java: 2, python: 2 } };

        for (let k = 0; k < n; k++) {
            yield { type: 'visit', node: graph.nodes[k].id, msg: `Pivot k=${graph.nodes[k].id}`, matrix: getMatrix(), lines: { go: 3, java: 3, python: 3 } };
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (dist[i][j] > dist[i][k] + dist[k][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                        yield { type: 'check', msg: `Update dist[${graph.nodes[i].id}][${graph.nodes[j].id}] via ${graph.nodes[k].id} to ${dist[i][j]}`, matrix: getMatrix(), lines: { go: 7, java: 7, python: 7 } };
                    }
                }
            }
        }
        yield { type: 'done', msg: 'Floyd-Warshall Complete', matrix: getMatrix(), lines: { go: 12, java: 12, python: 7 } };
    }

    static *astar(graph, startId, endId) {
        // Heuristic: Manhattan distance for grid
        const heuristic = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
        
        const startNode = graph.nodes.find(n => n.id === startId);
        const endNode = graph.nodes.find(n => n.id === endId);
        
        const openSet = [{ id: startId, f: 0 }];
        const gScore = new Map();
        const cameFrom = new Map();
        
        graph.nodes.forEach(n => gScore.set(n.id, Infinity));
        gScore.set(startId, 0);
        
        yield { type: 'init', queue: openSet.map(n=>`${n.id}:${n.f.toFixed(1)}`), msg: `Start A* from (${startNode.x},${startNode.y}) to (${endNode.x},${endNode.y})`, lines: { go: 2, java: 2, python: 2 } };

        while (openSet.length > 0) {
            openSet.sort((a, b) => a.f - b.f);
            const current = openSet.shift();
            const u = current.id;
            const uNode = graph.nodes.find(n => n.id === u);

            if (u === endId) {
                // Reconstruct path
                let curr = endId;
                while (cameFrom.has(curr)) {
                    yield { type: 'relax', edge: [cameFrom.get(curr), curr], queue: openSet.map(n=>`${n.id}:${n.f.toFixed(1)}`), msg: 'Reconstructing Path', lines: { go: 6, java: 6, python: 6 } };
                    curr = cameFrom.get(curr);
                }
                yield { type: 'done', msg: 'Path Found!', lines: { go: 6, java: 6, python: 6 } };
                return;
            }

            yield { type: 'process', node: u, queue: openSet.map(n=>`${n.id}:${n.f.toFixed(1)}`), msg: `Visit (${uNode.x},${uNode.y})`, lines: { go: 5, java: 5, python: 5 } };

            // Implicit grid edges: up, down, left, right
            // For simplicity, using pre-calculated adjacency list if available, or calculating on fly for grid
            const neighbors = graph.getAdjacencyList().get(u) || [];
            
            for (const { to: v, weight } of neighbors) {
                const tentativeG = gScore.get(u) + weight;
                if (tentativeG < gScore.get(v)) {
                    cameFrom.set(v, u);
                    gScore.set(v, tentativeG);
                    const vNode = graph.nodes.find(n => n.id === v);
                    const f = tentativeG + heuristic(vNode, endNode);
                    openSet.push({ id: v, f: f });
                    yield { type: 'visit', node: v, queue: openSet.map(n=>`${n.id}:${n.f.toFixed(1)}`), msg: `Update neighbor. f=${f}`, lines: { go: 10, java: 10, python: 10 } };
                }
            }
        }
        yield { type: 'done', msg: 'No Path Found', lines: { go: 16, java: 16, python: 12 } };
    }

    static *bidirectionalSearch(graph, startId, endId) {
        const adj = graph.getAdjacencyList();
        const q1 = [startId];
        const q2 = [endId];
        const visited1 = new Set([startId]);
        const visited2 = new Set([endId]);
        const parent1 = new Map();
        const parent2 = new Map();

        yield { type: 'init', queue: [...q1, '|', ...q2], msg: `Start Bidirectional Search from ${startId} and ${endId}`, lines: { go: 2, java: 2, python: 2 } };

        while (q1.length > 0 && q2.length > 0) {
            // Step from Start
            if (q1.length > 0) {
                const u = q1.shift();
                yield { type: 'process', node: u, queue: [...q1, '|', ...q2], msg: `Forward Search: Visit ${u}`, lines: { go: 6, java: 6, python: 6 } };
                
                const neighbors = adj.get(u) || [];
                for (const { to: v } of neighbors) {
                    if (visited2.has(v)) {
                        yield { type: 'relax', edge: [u, v], msg: `Meeting Point Found at ${v}!`, lines: { go: 13, java: 13, python: 13 } };
                        yield { type: 'done', msg: 'Path Found!', lines: { go: 13, java: 13, python: 13 } };
                        return;
                    }
                    if (!visited1.has(v)) {
                        visited1.add(v);
                        parent1.set(v, u);
                        q1.push(v);
                        yield { type: 'visit', node: v, edge: [u, v], queue: [...q1, '|', ...q2], msg: `Forward: Enqueue ${v}`, lines: { go: 14, java: 14, python: 14 } };
                    }
                }
            }

            // Step from End
            if (q2.length > 0) {
                const u = q2.shift();
                yield { type: 'process', node: u, queue: [...q1, '|', ...q2], msg: `Backward Search: Visit ${u}`, lines: { go: 7, java: 7, python: 7 } };
                
                const neighbors = adj.get(u) || [];
                for (const { to: v } of neighbors) {
                    if (visited1.has(v)) {
                        yield { type: 'relax', edge: [u, v], msg: `Meeting Point Found at ${v}!`, lines: { go: 13, java: 13, python: 13 } };
                        yield { type: 'done', msg: 'Path Found!', lines: { go: 13, java: 13, python: 13 } };
                        return;
                    }
                    if (!visited2.has(v)) {
                        visited2.add(v);
                        parent2.set(v, u);
                        q2.push(v);
                        yield { type: 'visit', node: v, edge: [u, v], queue: [...q1, '|', ...q2], msg: `Backward: Enqueue ${v}`, lines: { go: 14, java: 14, python: 14 } };
                    }
                }
            }
        }
        yield { type: 'done', msg: 'No Path Found', lines: { go: 9, java: 9, python: 9 } };
    }
}

// ============================================================
// 4. CONTROLLER & INTERACTION
// ============================================================

class Controller {
    constructor() {
        this.graph = new Graph();
        this.renderer = new Renderer('graph-canvas', this.graph);
        this.mode = 'move'; // move, node, edge, delete
        this.isDragging = false;
        this.dragNode = null;
        this.edgeStartNode = null;
        this.algoIterator = null;
        this.isPlaying = false;
        this.speed = 1000; // ms
        this.currentLang = 'go';
        
        this.view = { x: 0, y: 0, k: 1 };
        this.isPanning = false;
        this.lastMouse = { x: 0, y: 0 };
        
        this.initEventListeners();
        this.injectViewControls();
        this.loadExample('tree');
    }

    initEventListeners() {
        // Toolbar
        document.getElementById('mode-move').onclick = () => this.setMode('move');
        document.getElementById('mode-node').onclick = () => this.setMode('node');
        document.getElementById('mode-edge').onclick = () => this.setMode('edge');
        document.getElementById('mode-delete').onclick = () => this.setMode('delete');
        
        document.getElementById('is-directed').onchange = (e) => {
            this.graph.isDirected = e.target.checked;
            this.updateUI();
        };
        document.getElementById('is-weighted').onchange = (e) => {
            this.graph.isWeighted = e.target.checked;
            this.updateUI();
        };
        document.getElementById('is-grid-mode').onchange = (e) => {
            this.graph.isGrid = e.target.checked;
            if (this.graph.isGrid) this.loadExample('grid');
            else this.loadExample('tree');
            
            document.getElementById('generate-maze').style.display = this.graph.isGrid ? 'block' : 'none';
        };
        
        document.getElementById('clear-graph').onclick = () => {
            this.graph.clear();
            this.updateUI();
        };
        
        document.getElementById('generate-maze').onclick = () => {
            this.generateMaze();
        };

        // Canvas Interaction
        const svg = document.getElementById('graph-canvas');
        
        svg.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        svg.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        svg.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        svg.addEventListener('wheel', (e) => this.handleWheel(e));
        
        // Playback
        document.getElementById('btn-start').onclick = () => this.startAlgo();
        document.getElementById('btn-step').onclick = () => this.stepAlgo();
        document.getElementById('btn-pause').onclick = () => this.pauseAlgo();
        document.getElementById('reset-algo').onclick = () => this.resetAlgo();
        
        document.getElementById('speed-range').oninput = (e) => {
            this.speed = 2000 / e.target.value;
        };
        
        // Algorithm Select Change
        document.getElementById('algo-select').onchange = (e) => {
            this.resetAlgo();
            this.updateCodePanel(e.target.value);
        };

        // Examples
        document.querySelectorAll('.ex-btn').forEach(btn => {
            btn.onclick = () => this.loadExample(btn.dataset.type);
        });

        // Tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.onclick = () => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(tab.dataset.target).classList.add('active');
            };
        });
    }

    injectViewControls() {
        const container = document.querySelector('.canvas-section');
        if (!container) return;
        
        const controls = document.createElement('div');
        controls.style.position = 'absolute';
        controls.style.top = '10px';
        controls.style.right = '10px';
        controls.style.display = 'flex';
        controls.style.gap = '5px';
        controls.style.zIndex = '100';
        
        const btnReset = document.createElement('button');
        btnReset.textContent = 'Reset View';
        btnReset.className = 'action-btn';
        btnReset.style.padding = '4px 8px';
        btnReset.style.fontSize = '0.8rem';
        btnReset.onclick = () => this.resetView();
        
        const btnFit = document.createElement('button');
        btnFit.textContent = 'Fit Screen';
        btnFit.className = 'action-btn';
        btnFit.style.padding = '4px 8px';
        btnFit.style.fontSize = '0.8rem';
        btnFit.onclick = () => this.fitToScreen();
        
        controls.appendChild(btnReset);
        controls.appendChild(btnFit);
        
        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }
        container.appendChild(controls);
    } eetE`nt.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`mode-${mode}`).classList.add('active');
        
        const svg = document.getElementById('graph-canvas');
        svg.className = mode === 'move' ? 'mode-move' : '';
    }

    getMousePos(e) {
        const rect = this.renderer.svg.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    handleMouseDown(e) {
        const rawPos = this.getMousePos(e);
        // Convert to graph coordinates
        const pos = {
            x: (rawPos.x - this.view.x) / this.view.k,
            y: (rawPos.y - this.view.y) / this.view.k
        };

        const target = e.target.closest('.node-group');
        const nodeId = target ? parseInt(target.dataset.id) : null;

        if (this.mode === 'node' && !target) {
            this.graph.addNode(pos.x, pos.y);
            this.updateUI();
        } else if (this.mode === 'delete') {
            if (nodeId !== null) {
                this.graph.removeNode(nodeId);
                this.updateUI();
            }
        } else if (this.mode === 'move') {
            if (nodeId !== null) {
                this.isDragging = true;
                this.dragNode = this.graph.nodes.find(n => n.id === nodeId);
            } else {
                this.isPanning = true;
                this.lastMouse = rawPos;
                this.renderer.svg.style.cursor = 'grabbing';
            }
        } else if (this.mode === 'edge' && nodeId !== null) {
            this.isDragging = true;
            this.edgeStartNode = nodeId;
        }
    }

    handleMouseMove(e) {
        const rawPos = this.getMousePos(e);
        
        if (this.isPanning) {
            const dx = rawPos.x - this.lastMouse.x;
            const dy = rawPos.y - this.lastMouse.y;
            this.view.x += dx;
            this.view.y += dy;
            this.renderer.setTransform(this.view.x, this.view.y, this.view.k);
            this.lastMouse = rawPos;
            return;
        }

        if (!this.isDragging) return;

        // Graph coordinates
        const pos = {
            x: (rawPos.x - this.view.x) / this.view.k,
            y: (rawPos.y - this.view.y) / this.view.k
        };

        if (this.mode === 'move' && this.dragNode) {
            if (this.graph.isGrid) {
                // Snap to grid logic if needed, or just update raw
                // For grid mode, x/y are indices.
                const CELL_SIZE = 40;
                this.dragNode.x = Math.round(pos.x / CELL_SIZE);
                this.dragNode.y = Math.round(pos.y / CELL_SIZE);
            } else {
                this.dragNode.x = pos.x;
                this.dragNode.y = pos.y;
            }
            this.renderer.updateNodePosition(this.dragNode);
        } else if (this.mode === 'edge' && this.edgeStartNode !== null) {
            // Draw temporary line (optional, skipping for simplicity)
        }
    }

    handleMouseUp(e) {
        if (this.isPanning) {
            this.isPanning = false;
            this.renderer.svg.style.cursor = 'default';
        }

        if (this.mode === 'edge' && this.edgeStartNode !== null) {
            const target = e.target.closest('.node-group');
            if (target) {
                const targetId = parseInt(target.dataset.id);
                if (this.edgeStartNode !== targetId) {
                    this.graph.addEdge(this.edgeStartNode, targetId);
                    this.updateUI();
                }
            }
        }
        
        this.isDragging = false;
        this.dragNode = null;
        this.edgeStartNode = null;
    }

    handleWheel(e) {
        e.preventDefault();
        const zoomSensitivity = 0.001;
        const delta = -e.deltaY * zoomSensitivity;
        const newK = Math.min(Math.max(0.5, this.view.k * (1 + delta)), 3);
        
        const rawPos = this.getMousePos(e);
        // Calculate graph point under mouse
        const gx = (rawPos.x - this.view.x) / this.view.k;
        const gy = (rawPos.y - this.view.y) / this.view.k;
        
        // Update scale
        this.view.k = newK;
        
        // Update translate to keep point under mouse stable
        this.view.x = rawPos.x - gx * newK;
        this.view.y = rawPos.y - gy * newK;
        
        this.renderer.setTransform(this.view.x, this.view.y, this.view.k);
    }

    resetView() {
        this.view = { x: 0, y: 0, k: 1 };
        this.renderer.setTransform(0, 0, 1);
    }

    fitToScreen() {
        if (this.graph.nodes.length === 0) return;
        
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        const CELL_SIZE = this.graph.isGrid ? 40 : 1;
        
        this.graph.nodes.forEach(n => {
            const nx = n.x * CELL_SIZE;
            const ny = n.y * CELL_SIZE;
            minX = Math.min(minX, nx);
            minY = Math.min(minY, ny);
            maxX = Math.max(maxX, nx);
            maxY = Math.max(maxY, ny);
        });
        
        // Add padding
        const padding = 50;
        const width = maxX - minX + padding * 2;
        const height = maxY - minY + padding * 2;
        
        const svgWidth = this.renderer.width;
        const svgHeight = this.renderer.height;
        
        const scaleX = svgWidth / width;
        const scaleY = svgHeight / height;
        let k = Math.min(scaleX, scaleY);
        k = Math.min(Math.max(0.5, k), 2); // Clamp
        
        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;
        
        this.view.k = k;
        this.view.x = (svgWidth / 2) - cx * k;
        this.view.y = (svgHeight / 2) - cy * k;
        
        this.renderer.setTransform(this.view.x, this.view.y, this.view.k);
    }

    updateUI() {
        this.renderer.draw();
        this.updateRepresentations();
        this.updateProperties();
    }

    updateRepresentations() {
        const adj = this.graph.getAdjacencyList();
        let listHtml = '';
        adj.forEach((neighbors, id) => {
            const nStr = neighbors.map(n => n.to + (this.graph.isWeighted ? `(${n.weight})` : '')).join(' -> ');
            listHtml += `${id}: ${nStr || 'null'}\n`;
        });
        document.getElementById('adj-list-display').textContent = listHtml;

        const { matrix, nodes } = this.graph.getAdjacencyMatrix();
        const matrixContainer = document.getElementById('adj-matrix-display');
        matrixContainer.style.gridTemplateColumns = `repeat(${nodes.length + 1}, 30px)`;
        matrixContainer.innerHTML = '';
        
        // Header row
        matrixContainer.appendChild(this.createCell(''));
        nodes.forEach(n => matrixContainer.appendChild(this.createCell(n.id, 'header')));
        
        // Rows
        matrix.forEach((row, i) => {
            matrixContainer.appendChild(this.createCell(nodes[i].id, 'header'));
            row.forEach(val => {
                const cell = this.createCell(val);
                if (val !== 0) cell.classList.add('active');
                matrixContainer.appendChild(cell);
            });
        });

        // Edge List
        let edgeHtml = '';
        this.graph.edges.forEach(e => {
            edgeHtml += `(${e.source}, ${e.target}${this.graph.isWeighted ? ', ' + e.weight : ''})\n`;
        });
        document.getElementById('edge-list-display').textContent = edgeHtml || '// No edges';
    }

    createCell(content, className = '') {
        const div = document.createElement('div');
        div.className = `matrix-cell ${className}`;
        div.textContent = content;
        return div;
    }

    updateProperties() {
        document.getElementById('prop-v').textContent = this.graph.nodes.length;
        document.getElementById('prop-e').textContent = this.graph.edges.length;
        // Simple checks (can be expanded)
        const isTree = this.graph.edges.length === this.graph.nodes.length - 1; // Simplified
        document.getElementById('prop-tree').textContent = isTree ? 'Likely' : 'No';
    }

    // ================= ALGORITHM EXECUTION =================

    startAlgo() {
        if (this.isPlaying) return;
        if (!this.algoIterator) {
            const type = document.getElementById('algo-select').value;
            const startNode = this.graph.nodes.length > 0 ? this.graph.nodes[0].id : 0;
            
            this.renderer.resetVisuals();
            this.updateCodePanel(type);
            
            switch(type) {
                case 'bfs': this.algoIterator = Algorithms.bfs(this.graph, startNode); break;
                case 'dfs': this.algoIterator = Algorithms.dfs(this.graph, startNode); break;
                case 'dijkstra': this.algoIterator = Algorithms.dijkstra(this.graph, startNode); break;
                case 'topological': this.algoIterator = Algorithms.topologicalSort(this.graph); break;
                case 'components': this.algoIterator = Algorithms.connectedComponents(this.graph); break;
                case 'cycle': this.algoIterator = Algorithms.cycleDetection(this.graph); break;
                case 'bipartite': this.algoIterator = Algorithms.bipartiteCheck(this.graph); break;
                case 'kruskal': this.algoIterator = Algorithms.kruskal(this.graph); break;
                case 'prims': this.algoIterator = Algorithms.prims(this.graph, startNode); break;
                case 'tarjan': this.algoIterator = Algorithms.tarjan(this.graph); break;
                case 'bellman': this.algoIterator = Algorithms.bellmanFord(this.graph, startNode); break;
                case 'floyd': this.algoIterator = Algorithms.floydWarshall(this.graph); break;
                case 'astar': this.algoIterator = Algorithms.astar(this.graph, startNode, this.graph.nodes[this.graph.nodes.length-1].id); break;
                case 'bidirectional': this.algoIterator = Algorithms.bidirectionalSearch(this.graph, startNode, this.graph.nodes[this.graph.nodes.length-1].id); break;
                default: alert('Algorithm not implemented yet'); return;
            }
        }
        
        this.isPlaying = true;
        this.playLoop();
    }

    playLoop() {
        if (!this.isPlaying) return;
        const done = this.stepAlgo();
        if (!done) {
            setTimeout(() => this.playLoop(), this.speed);
        } else {
            this.isPlaying = false;
        }
    }

    stepAlgo() {
        if (!this.algoIterator) this.startAlgo();
        
        const { value, done } = this.algoIterator.next();
        
        if (done) {
            this.isPlaying = false;
            document.getElementById('status-msg').textContent = "Finished";
            return true;
        }

        document.getElementById('status-msg').textContent = value.msg;
        
        if (value.type === 'visit') {
            this.renderer.highlightNode(value.node, 'visited');
        } else if (value.type === 'process') {
            this.renderer.highlightNode(value.node, 'visiting');
        } else if (value.type === 'explore') {
            this.renderer.highlightEdge(value.edge[0], value.edge[1], 'visited');
        } else if (value.type === 'relax') {
            this.renderer.highlightEdge(value.edge[0], value.edge[1], 'path');
        }

        // Update Matrix for Floyd-Warshall
        if (value.matrix) {
            this.renderMatrix(value.matrix);
        }
        
        // Highlight Code
        if (value.lines) {
            this.highlightCodeLine(value.lines);
        }

        // Update Queue/Stack Viz
        if (value.queue) {
            const container = document.getElementById('ds-queue');
            container.innerHTML = '';
            value.queue.forEach(id => {
                const el = document.createElement('div');
                el.className = 'ds-node';
                el.textContent = id;
                container.appendChild(el);
            });
        }

        return false;
    }

    renderMatrix(matrix) {
        const container = document.getElementById('fw-matrix');
        const overlay = document.getElementById('fw-matrix-overlay');
        overlay.style.display = 'block';
        container.innerHTML = '';
        
        const n = matrix.length;
        container.style.gridTemplateColumns = `repeat(${n}, 25px)`;
        
        for(let i=0; i<n; i++) {
            for(let j=0; j<n; j++) {
                const cell = document.createElement('div');
                cell.className = 'matrix-cell';
                cell.style.width = '25px';
                cell.style.height = '25px';
                const val = matrix[i][j];
                cell.textContent = val === Infinity ? '∞' : val;
                if (val !== Infinity && val !== 0) cell.classList.add('active');
                if (val === 0) cell.style.color = '#64748b';
                container.appendChild(cell);
            }
        }
    }

    highlightCodeLine(lines) {
        // Clear previous
        document.querySelectorAll('.code-line').forEach(el => el.classList.remove('active'));
        
        const algo = document.getElementById('algo-select').value;
        const lineNum = lines[this.currentLang];
        const id = `${algo}-${this.currentLang}-${lineNum}`;
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
    }

    pauseAlgo() {
        this.isPlaying = false;
    }

    resetAlgo() {
        this.isPlaying = false;
        this.algoIterator = null;
        this.renderer.resetVisuals();
        document.getElementById('status-msg').textContent = "Ready";
        document.getElementById('ds-queue').innerHTML = '';
        document.getElementById('fw-matrix-overlay').style.display = 'none';
    }

    loadExample(type) {
        this.graph.clear();
        const width = this.renderer.width || 800;
        const height = this.renderer.height || 600;
        const cx = width / 2;
        const cy = height / 2;

        if (type === 'tree') {
            // Binary Tree Layout
            this.graph.addNode(cx, 50); // 0
            this.graph.addNode(cx - 100, 150); // 1
            this.graph.addNode(cx + 100, 150); // 2
            this.graph.addNode(cx - 150, 250); // 3
            this.graph.addNode(cx - 50, 250); // 4
            this.graph.addNode(cx + 50, 250); // 5
            this.graph.addNode(cx + 150, 250); // 6
            
            this.graph.addEdge(0, 1); this.graph.addEdge(0, 2);
            this.graph.addEdge(1, 3); this.graph.addEdge(1, 4);
            this.graph.addEdge(2, 5); this.graph.addEdge(2, 6);
            this.graph.isDirected = false;
        } else if (type === 'cycle') {
            this.graph.addNode(cx, 50); // 0
            this.graph.addNode(cx + 100, 150); // 1
            this.graph.addNode(cx, 250); // 2
            this.graph.addNode(cx - 100, 150); // 3
            
            this.graph.addEdge(0, 1); this.graph.addEdge(1, 2);
            this.graph.addEdge(2, 3); this.graph.addEdge(3, 0);
            this.graph.isDirected = true;
        } else if (type === 'dag') {
            this.graph.addNode(100, 150); // 0
            this.graph.addNode(250, 150); // 1
            this.graph.addNode(400, 150); // 2
            this.graph.addNode(250, 50);  // 3
            
            this.graph.addEdge(0, 1); this.graph.addEdge(1, 2);
            this.graph.addEdge(0, 3); this.graph.addEdge(3, 2);
            this.graph.isDirected = true;
        } else if (type === 'grid') {
            // Create a 10x10 grid
            const rows = 10, cols = 10;
            const nodeMap = new Map(); // "x,y" -> id
            
            for(let y=0; y<rows; y++) {
                for(let x=0; x<cols; x++) {
                    const node = this.graph.addNode(x, y);
                    nodeMap.set(`${x},${y}`, node.id);
                }
            }
            // Add edges
            for(let y=0; y<rows; y++) {
                for(let x=0; x<cols; x++) {
                    const u = nodeMap.get(`${x},${y}`);
                    if (x+1 < cols) this.graph.addEdge(u, nodeMap.get(`${x+1},${y}`));
                    if (y+1 < rows) this.graph.addEdge(u, nodeMap.get(`${x},${y+1}`));
                }
            }
            this.graph.isGrid = true;
            document.getElementById('is-grid-mode').checked = true;
            document.getElementById('generate-maze').style.display = 'block';
        }
        
        this.updateUI();
        setTimeout(() => this.fitToScreen(), 100);
    }

    generateMaze() {
        if (!this.graph.isGrid) return;
        
        // Reset walls
        this.graph.nodes.forEach(n => n.isWall = true);
        
        const rows = 10;
        const cols = 10;
        const visited = new Set();
        
        // Recursive Backtracking
        const stack = [];
        const startNode = this.graph.nodes[0];
        startNode.isWall = false;
        visited.add(startNode.id);
        stack.push(startNode);
        
        while (stack.length > 0) {
            const current = stack.pop();
            const neighbors = [];
            
            // Check neighbors (jump 2 cells)
            const directions = [[0, -2], [0, 2], [-2, 0], [2, 0]];
            
            for (const [dx, dy] of directions) {
                const nx = current.x + dx;
                const ny = current.y + dy;
                
                if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
                    const neighbor = this.graph.nodes.find(n => n.x === nx && n.y === ny);
                    if (neighbor && !visited.has(neighbor.id)) {
                        neighbors.push(neighbor);
                    }
                }
            }
            
            if (neighbors.length > 0) {
                stack.push(current);
                
                // Random neighbor
                const next = neighbors[Math.floor(Math.random() * neighbors.length)];
                
                // Remove wall between current and next
                const midX = (current.x + next.x) / 2;
                const midY = (current.y + next.y) / 2;
                const midNode = this.graph.nodes.find(n => n.x === midX && n.y === midY);
                if (midNode) midNode.isWall = false;
                
                next.isWall = false;
                visited.add(next.id);
                stack.push(next);
            }
        }
        
        // Ensure start and end are open
        this.graph.nodes[0].isWall = false;
        this.graph.nodes[this.graph.nodes.length - 1].isWall = false;
        
        // Rebuild edges based on walls
        this.graph.edges = [];
        this.graph.edgeIdCounter = 0;
        
        const nodeMap = new Map();
        this.graph.nodes.forEach(n => nodeMap.set(`${n.x},${n.y}`, n));
        
        for(let y=0; y<rows; y++) {
            for(let x=0; x<cols; x++) {
                const u = nodeMap.get(`${x},${y}`);
                if (u.isWall) continue;
                
                // Check right
                if (x+1 < cols) {
                    const v = nodeMap.get(`${x+1},${y}`);
                    if (!v.isWall) this.graph.addEdge(u.id, v.id);
                }
                // Check down
                if (y+1 < rows) {
                    const v = nodeMap.get(`${x},${y+1}`);
                    if (!v.isWall) this.graph.addEdge(u.id, v.id);
                }
            }
        }
        
        this.updateUI();
    }
}

// Global Language Switcher
window.switchLang = function(lang, btn) {
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) {
        btn.classList.add('active');
    }
    
    // Update code visibility
    document.querySelectorAll('.lang-code').forEach(el => el.classList.remove('active'));
    document.querySelectorAll(`[id$="-${lang}"]`).forEach(el => el.classList.add('active'));
    
    // Update controller state if exists
    if (window.controller) window.controller.currentLang = lang;
};

// Initialize
window.onload = () => {
    window.controller = new Controller();
};