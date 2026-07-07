// visualizer-common.js
// Injects zoom buttons into visualizer toolbars and provides zoom + code highlight helpers
(function(){
    const ZOOM_STEP = 1.2;
    const DEFAULT_MIN = 0.5;
    const DEFAULT_MAX = 2.5;

    function createButton(id, text, cls, onClick){
        const b = document.createElement('button');
        b.id = id;
        b.className = cls || 'btn zoom-btn';
        b.textContent = text;
        b.addEventListener('click', onClick);
        return b;
    }

    function setupForPage(){
        // add shared CSS
        const style = document.createElement('style');
        style.textContent = `
            .btn.zoom-btn { padding:6px 10px; font-size:0.9rem; margin-right:6px }
            .vc-zoom-val { margin-left:6px; font-size:0.9rem; color:var(--text-muted); min-width:48px; display:inline-block; text-align:center }
            .code-highlight { background: rgba(59,130,246,0.12); border-left:3px solid var(--accent-color); }
            .code-highlight-enqueue { background: rgba(34,197,94,0.12); border-left:3px solid var(--neon-green); }
            .code-highlight-found { background: rgba(250,204,21,0.12); border-left:3px solid var(--neon-yellow); }
        `;
        document.head.appendChild(style);

        // Find toolbar control groups
        document.querySelectorAll('.algo-toolbar').forEach(toolbar => {
            const cg = toolbar.querySelector('.control-group');
            if (!cg) return;
            // avoid double-insert
            if (cg.querySelector('#vc-zoom-in')) return;

            const zoomOut = createButton('vc-zoom-out', '🔍-', 'btn zoom-btn', () => changeZoom(toolbar, false));
            const zoomIn = createButton('vc-zoom-in', '🔍+', 'btn zoom-btn', () => changeZoom(toolbar, true));

            cg.insertBefore(zoomOut, cg.firstChild);
            cg.insertBefore(zoomIn, zoomOut.nextSibling);

            // store zoom state on toolbar element
            if (!toolbar._vizState) toolbar._vizState = { zoomLevel: 1.0, minZoom: DEFAULT_MIN, maxZoom: DEFAULT_MAX, panX: 0, panY: 0 };
            // add zoom value text
            const zoomText = document.createElement('span');
            zoomText.className = 'vc-zoom-val';
            zoomText.textContent = `${Math.round(toolbar._vizState.zoomLevel*100)}%`;
            cg.appendChild(zoomText);
            toolbar._vizZoomText = zoomText;
            // expose helper to update zoom/pan programmatically
            toolbar.setZoom = (z) => { toolbar._vizState.zoomLevel = z; updateZoomTransform(toolbar); };
            toolbar.setPan = (x, y) => { toolbar._vizState.panX = x || 0; toolbar._vizState.panY = y || 0; updateZoomTransform(toolbar); };

            // determine best canvas container for this page (search near the toolbar)
            const root = toolbar.closest('.main-content') || document;
            const canvasSection = root.querySelector('.canvas-section, .viz-viewport, .viz-container, .viz-canvas, #sliding-window-canvas, #pathfinding-canvas, #tree-canvas, #maze-grid');
            if (canvasSection) {
                // save target container for this toolbar
                toolbar._vizTargetContainer = canvasSection;
                // attach wheel handler to container
                canvasSection.addEventListener('wheel', (e) => {
                    e.preventDefault();
                    if (e.deltaY < 0) changeZoom(toolbar, true); else changeZoom(toolbar, false);
                }, { passive: false });

                // simple pointer-based panning (drag to pan)
                let isDragging = false;
                let dragStartX = 0, dragStartY = 0;
                canvasSection.addEventListener('pointerdown', (e) => {
                    if (e.button !== 0) return; // left button only
                    isDragging = true;
                    dragStartX = e.clientX;
                    dragStartY = e.clientY;
                    canvasSection.setPointerCapture && canvasSection.setPointerCapture(e.pointerId);
                });

                window.addEventListener('pointermove', (e) => {
                    if (!isDragging) return;
                    const dx = e.clientX - dragStartX;
                    const dy = e.clientY - dragStartY;
                    dragStartX = e.clientX; dragStartY = e.clientY;
                    if (!toolbar._vizState) toolbar._vizState = { panX: 0, panY: 0, zoomLevel: 1.0 };
                    toolbar._vizState.panX += dx;
                    toolbar._vizState.panY += dy;
                    updateZoomTransform(toolbar);
                });

                window.addEventListener('pointerup', (e) => {
                    if (!isDragging) return;
                    isDragging = false;
                    canvasSection.releasePointerCapture && canvasSection.releasePointerCapture(e.pointerId);
                });
            }
        });

        // make highlight helpers global
        window.vc_clearCodeHighlights = function(){
            document.querySelectorAll('.line, .code-line').forEach(el => el.classList.remove('code-highlight','code-highlight-enqueue','code-highlight-found'));
        };

        window.vc_highlightCodeLine = function(idOrSelector, type){
            window.vc_clearCodeHighlights();
            if (!idOrSelector) return;
            let el = null;
            // If number passed, try to craft id
            if (typeof idOrSelector === 'number') {
                // try patterns
                el = document.getElementById('bfs-'+idOrSelector) || document.getElementById('dfs-'+idOrSelector) || document.getElementById('go-'+idOrSelector) || document.getElementById('line-'+idOrSelector);
            } else {
                el = document.querySelector(idOrSelector) || document.getElementById(idOrSelector);
            }
            if (el) {
                if (type === 'enqueue') el.classList.add('code-highlight-enqueue');
                else if (type === 'found') el.classList.add('code-highlight-found');
                else el.classList.add('code-highlight');
                // ensure visible
                if (el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };
    }

    function updateZoomTransform(toolbar){
        const container = (toolbar && toolbar._vizTargetContainer) || document.querySelector('.canvas-section') || document.querySelector('.viz-viewport') || document.querySelector('.viz-container');
        if (!container) return;
        let target = null;
        if (container.tagName && (container.tagName.toLowerCase() === 'svg' || container.id === 'maze-grid' || container.id === 'tree-canvas')) {
            target = container;
        } else {
            container.childNodes.forEach(n => {
                if (!target && n.nodeType === 1 && !n.classList.contains('log-section') && !n.classList.contains('log-panel')) target = n;
            });
            if (!target) target = container;
        }
        const state = toolbar && toolbar._vizState ? toolbar._vizState : { zoomLevel: 1.0, panX: 0, panY: 0 };
        // apply combined translate + scale (preserve pan + zoom)
        target.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoomLevel})`;
        target.style.transformOrigin = 'center center';
        // update zoom text if available
        try {
            const tb = toolbar || (container.closest && container.closest('.algo-toolbar'));
            if (tb && tb._vizZoomText) tb._vizZoomText.textContent = `${Math.round((tb._vizState?.zoomLevel||state.zoomLevel)*100)}%`;
        } catch (e) { /* ignore */ }
    }

    function changeZoom(toolbar, zoomIn){
        // prefer toolbar-specific target container if available
        const container = (toolbar && toolbar._vizTargetContainer) || document.querySelector('.canvas-section') || document.querySelector('.viz-viewport') || document.querySelector('.viz-container');
        if (!container) return;

        // prefer a child element to scale (avoid scaling log panels). pick first visual child
        let target = null;
        // If container is an SVG or intended direct target, use it directly
        if (container.tagName && (container.tagName.toLowerCase() === 'svg' || container.id === 'maze-grid' || container.id === 'tree-canvas')) {
            target = container;
        } else {
            container.childNodes.forEach(n => {
                if (!target && n.nodeType === 1 && !n.classList.contains('log-section') && !n.classList.contains('log-panel')) target = n;
            });
            // fallback to container itself
            if (!target) target = container;
        }

        if (!toolbar._vizState) toolbar._vizState = { zoomLevel:1.0, minZoom:DEFAULT_MIN, maxZoom:DEFAULT_MAX };
        const state = toolbar._vizState;
        if (zoomIn) state.zoomLevel = Math.min(state.maxZoom, state.zoomLevel * ZOOM_STEP);
        else state.zoomLevel = Math.max(state.minZoom, state.zoomLevel / ZOOM_STEP);
        updateZoomTransform(toolbar);
    }


    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupForPage);
    else setupForPage();
})();
