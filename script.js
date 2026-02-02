// ============================================================
// AMAZON CODING PATTERNS - INTERACTIVITY
// GEMINI CODE ASSIST - ENHANCED SIDEBAR
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeMobileSidebar();
  initializeAccordions();
  initializeCollapsibles();
  initializeSidebarControls();
  updateProgress();
  setActiveNavItem();
  highlightGoSyntax();
  initializeLanguageTabs();
  initializeSearch();
  initializeBackToTop();
  addPageNavigation();
});

// ============================================================
// NAVIGATION HANDLING
// ============================================================

function initializeNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      // The page will reload, so active class is set on load.
      // We just need to store the last clicked item for progress.
      // Store in localStorage
      if (this.dataset.id) {
        localStorage.setItem('lastPattern', this.dataset.id);
      }
    });
  });
}

// ============================================================
// PAGE NAVIGATION (NEXT/PREV)
// ============================================================

function addPageNavigation() {
  const path = window.location.pathname;
  const page = path.split('/').pop();
  const isPattern = path.includes('/patterns/');
  
  // Define study sequence
  const studySequence = [
    'interview-approach.html',
    'complexity-guide.html',
    'patterns/two-pointers.html',
    'patterns/sliding-window.html',
    'patterns/binary-search.html',
    'patterns/hash-maps.html',
    'patterns/linked-lists.html',
    'patterns/stack.html',
    'patterns/heap.html',
    'patterns/trees.html',
    'patterns/tries.html',
    'patterns/graphs.html',
    'patterns/backtracking.html',
    'patterns/dynamic-programming.html',
    'patterns/greedy.html',
    'patterns/fast-slow-pointers.html',
    'patterns/intervals.html',
    'patterns/prefix-sum.html',
    'patterns/bit-manipulation.html',
    'patterns/math-geometry.html',
    'patterns/sort-search.html'
  ];

  // Find current index
  let currentIndex = -1;
  if (isPattern) {
    currentIndex = studySequence.indexOf('patterns/' + page);
  } else {
    currentIndex = studySequence.indexOf(page);
  }

  if (currentIndex === -1) return;

  // Inject Styles
  const style = document.createElement('style');
  style.textContent = `
    .page-navigation { display: flex; justify-content: space-between; margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--border-color, #334155); }
    .nav-btn { display: inline-flex; align-items: center; padding: 0.75rem 1.5rem; background-color: var(--bg-secondary, #1e293b); color: var(--text-primary, #e5e7eb); text-decoration: none; border-radius: 0.5rem; border: 1px solid var(--border-color, #334155); transition: all 0.2s; font-weight: 500; font-size: 0.95rem; }
    .nav-btn:hover { background-color: var(--bg-tertiary, #334155); border-color: var(--callout-blue, #38bdf8); color: var(--callout-blue, #38bdf8); transform: translateY(-2px); }
  `;
  document.head.appendChild(style);

  const navContainer = document.createElement('div');
  navContainer.className = 'page-navigation';

  // Prev Button
  if (currentIndex > 0) {
    const prevPath = studySequence[currentIndex - 1];
    const link = getRelativeLink(isPattern, prevPath);
    const name = formatPageName(prevPath);
    navContainer.innerHTML += `<a href="${link}" class="nav-btn prev">← ${name}</a>`;
  } else {
    navContainer.innerHTML += `<div></div>`;
  }

  // Next Button
  if (currentIndex < studySequence.length - 1) {
    const nextPath = studySequence[currentIndex + 1];
    const link = getRelativeLink(isPattern, nextPath);
    const name = formatPageName(nextPath);
    navContainer.innerHTML += `<a href="${link}" class="nav-btn next">${name} →</a>`;
  }

  const mainContent = document.querySelector('.main-content') || document.querySelector('main') || document.body;
  mainContent.appendChild(navContainer);
}

function getRelativeLink(imInPatterns, targetPath) {
  if (imInPatterns) {
    return targetPath.startsWith('patterns/') ? targetPath.replace('patterns/', '') : '../' + targetPath;
  }
  return targetPath;
}

function formatPageName(path) {
  return path.split('/').pop().replace('.html', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// ============================================================
// BACK TO TOP BUTTON
// ============================================================

function initializeBackToTop() {
  const mainContent = document.querySelector('.main-content');
  if (!mainContent) return;

  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top-btn';
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.setAttribute('aria-label', 'Back to Top');
  document.body.appendChild(backToTopBtn);

  mainContent.addEventListener('scroll', () => {
    if (mainContent.scrollTop > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    mainContent.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function setActiveNavItem() {
  const currentPage = window.location.pathname.split('/').pop();
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href').replace('../', '');
    if (href.includes(currentPage) || (currentPage === '' && href === 'patterns/two-pointers.html')) {
      item.classList.add('active');
    }
  });
}

function initializeSidebarToggle() {
}

// ============================================================
// CODE BLOCK COPY FUNCTIONALITY
// ============================================================

function addCopyButtons() {
  const codeBlocks = document.querySelectorAll('.code-block');
  
  codeBlocks.forEach((block, index) => {
    const copyBtn = document.createElement('button');
    copyBtn.textContent = '📋 Copy';
    copyBtn.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 6px 12px;
      font-size: 0.85rem;
      background-color: rgba(59, 130, 246, 0.6);
      border: 1px solid rgba(59, 130, 246, 0.8);
    `;
    
    block.style.position = 'relative';
    block.appendChild(copyBtn);
    
    copyBtn.addEventListener('click', function() {
      const codeText = block.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        copyBtn.textContent = '✅ Copied!';
        setTimeout(() => {
          copyBtn.textContent = '📋 Copy';
        }, 2000);
      });
    });
  });
}

// ============================================================
// SYNTAX HIGHLIGHTING (SIMPLE)
// ============================================================

function highlightGoSyntax() {
  const codeBlocks = document.querySelectorAll('.code-block');
  
  codeBlocks.forEach(block => {
    let code = block.innerHTML;
    
    // Keywords
    const keywords = [
      'package', 'import', 'func', 'type', 'struct', 'interface',
      'return', 'if', 'else', 'for', 'switch', 'case', 'default',
      'var', 'const', 'defer', 'go', 'chan', 'range', 'break', 'continue',
      'map', 'select', 'true', 'false', 'nil'
    ];
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      code = code.replace(regex, `<span style="color: #a78bfa;">${keyword}</span>`);
    });
    
    // Built-in functions
    const builtins = ['make', 'len', 'append', 'copy', 'delete', 'complex', 'real', 'imag', 'min', 'max'];
    builtins.forEach(builtin => {
      const regex = new RegExp(`\\b${builtin}\\b`, 'g');
      code = code.replace(regex, `<span style="color: #38bdf8;">${builtin}</span>`);
    });
    
    block.innerHTML = code;
  });
}

// ============================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================================
// PAGE LOAD TRACKING (FOR ANALYTICS/STUDY)
// ============================================================

function trackPageView() {
  const currentPage = window.location.pathname;
  try {
    const pageViews = JSON.parse(localStorage.getItem('pageViews') || '{}');
    
    if (!pageViews[currentPage]) {
      pageViews[currentPage] = 0;
    }
    pageViews[currentPage]++;
    
    localStorage.setItem('pageViews', JSON.stringify(pageViews));
  } catch (e) {
    console.warn('Page tracking disabled (localStorage unavailable)');
  }
  
  // Track daily activity for dashboard
  trackStudyDay();
  trackDailyGoal();
  updateProgress();
}

trackPageView();

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================

document.addEventListener('keydown', function(e) {
  // Ctrl/Cmd + K: Open navigation search (future feature)
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    console.log('Navigation search would open here');
  }
  
  // Ctrl/Cmd + Shift + D: Toggle dark mode (already dark, but placeholder)
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
    e.preventDefault();
    console.log('Theme toggle placeholder');
  }
});

// ============================================================
// HELPER: Wait for DOMContentLoaded, then add copy buttons
// ============================================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addCopyButtons);
} else {
  addCopyButtons();
}

// ============================================================
// EXPORT: Study stats to console
// ============================================================

window.getStudyStats = function() {
  const pageViews = JSON.parse(localStorage.getItem('pageViews') || '{}');
  const lastPattern = localStorage.getItem('lastPattern');
  
  return {
    'Page Views': pageViews,
    'Last Pattern Studied': lastPattern,
    'Total Pages Visited': Object.keys(pageViews).length
  };
};

console.log('📚 Amazon SDE Coding Patterns loaded. Type getStudyStats() to see your progress.');

/* ============================================================
// DASHBOARD & TRACKING LOGIC
// ============================================================

function trackStudyDay() {
  const today = new Date().toISOString().split('T')[0];
  try {
    const history = JSON.parse(localStorage.getItem('studyHistory') || '{}');
    
    if (!history[today]) {
      history[today] = 0;
    }
    history[today]++;
    
    localStorage.setItem('studyHistory', JSON.stringify(history));
  } catch (e) {
    console.warn('Study tracking unavailable (localStorage disabled)');
  }
}

window.renderDashboard = function() {
    let history = {};
    let pageViews = {};
    try {
        history = JSON.parse(localStorage.getItem('studyHistory') || '{}');
        pageViews = JSON.parse(localStorage.getItem('pageViews') || '{}');
    } catch (e) {
        console.warn('Dashboard rendering limited (localStorage unavailable)');
    }
    
    // 1. Calculate Stats
    const dates = Object.keys(history);
    const totalDays = dates.length;
    const streak = calculateStreak(history);
    
    // 2. Update DOM Elements
    const streakEl = document.getElementById('current-streak');
    if(streakEl) streakEl.textContent = streak;
    
    const totalEl = document.getElementById('total-days');
    if(totalEl) totalEl.textContent = totalDays;
    
    const patternsEl = document.getElementById('patterns-count');
    if(patternsEl) {
        // Count unique patterns visited (files in patterns/ folder)
        const patterns = Object.keys(pageViews).filter(url => url.includes('patterns/') && url.endsWith('.html'));
        patternsEl.textContent = patterns.length;
    }
    
    // 3. Render Heatmap
    renderHeatmapGrid(history);
    
    // 4. Render Daily Goal
    renderDailyGoal();
};

function calculateStreak(history) {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    let streak = 0;
    let d = new Date(today);
    
    // If no activity today, check if streak ended yesterday
    if (!history[todayStr]) {
        d.setDate(d.getDate() - 1);
        const yesterdayStr = d.toISOString().split('T')[0];
        if (!history[yesterdayStr]) return 0;
    }
    
    // Count backwards
    while (true) {
        const dateStr = d.toISOString().split('T')[0];
        if (history[dateStr]) {
            streak++;
            d.setDate(d.getDate() - 1);
        } else {
            break;
        }
    }
    return streak;
}

function renderHeatmapGrid(history) {
    const grid = document.getElementById('heatmap-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Generate last 365 days (approx 52 weeks)
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364);
    
    // Align start date to Sunday for proper grid alignment
    while (startDate.getDay() !== 0) {
        startDate.setDate(startDate.getDate() - 1);
    }
    
    const endDate = new Date(today);
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const count = history[dateStr] || 0;
        
        const cell = document.createElement('div');
        cell.className = 'day-cell';
        cell.title = `${dateStr}: ${count} activities`;
        
        // LeetCode style levels
        if (count > 0) cell.classList.add('level-1');
        if (count > 2) cell.classList.add('level-2');
        if (count > 5) cell.classList.add('level-3');
        if (count > 10) cell.classList.add('level-4');
        
        grid.appendChild(cell);
        
        currentDate.setDate(currentDate.getDate() + 1);
    }
}

// ============================================================
// DEMO DATA & RESET UTILS
// ============================================================

window.seedDemoData = function() {
    const history = {};
    const today = new Date();
    
    // Generate ~1 year of data
    for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        
        // Random activity (40% chance of studying)
        if (Math.random() > 0.6) {
            // Random intensity (1-15 actions)
            history[dateStr] = Math.floor(Math.random() * 15) + 1;
        }
    }
    
    localStorage.setItem('studyHistory', JSON.stringify(history));
    if (window.renderDashboard) window.renderDashboard();
};

window.resetProgress = function() {
    if(confirm('Are you sure you want to clear all progress?')) {
        localStorage.removeItem('studyHistory');
        localStorage.removeItem('pageViews');
        localStorage.removeItem('lastPattern');
        localStorage.removeItem('collapsibleState');
        location.reload();
    }
};

// ============================================================
// DAILY GOAL TRACKING
// ============================================================

function trackDailyGoal() {
    const currentPath = window.location.pathname;
    // Only track pattern pages
    if (!currentPath.includes('/patterns/') || !currentPath.endsWith('.html')) return;
    
    const patternId = currentPath.split('/').pop();
    const today = new Date().toISOString().split('T')[0];
    
    try {
        let goalData = JSON.parse(localStorage.getItem('dailyGoal') || '{}');
        
        // Initialize or Reset if new day
        if (goalData.date !== today) {
            goalData = {
                date: today,
                target: goalData.target || 2, // Keep existing target or default to 2
                patterns: []
            };
        }
        
        // Add pattern if not already tracked
        if (!goalData.patterns.includes(patternId)) {
            goalData.patterns.push(patternId);
            localStorage.setItem('dailyGoal', JSON.stringify(goalData));
        }
    } catch (e) {
        console.warn('Daily goal tracking failed');
    }
}

function renderDailyGoal() {
    const goalData = JSON.parse(localStorage.getItem('dailyGoal') || '{"target": 2, "patterns": []}');
    const today = new Date().toISOString().split('T')[0];
    
    let count = 0;
    let target = goalData.target || 2;
    
    if (goalData.date === today) {
        count = goalData.patterns ? goalData.patterns.length : 0;
    }
    
    const goalEl = document.getElementById('daily-goal');
    const progressEl = document.getElementById('daily-goal-progress');
    
    if (goalEl) {
        goalEl.textContent = `${count}/${target}`;
        goalEl.style.color = count >= target ? 'var(--callout-green)' : 'var(--callout-blue)';
    }
    
    if (progressEl) {
        const percent = Math.min(100, (count / target) * 100);
        progressEl.style.width = `${percent}%`;
        progressEl.style.backgroundColor = count >= target ? 'var(--callout-green)' : 'var(--callout-blue)';
    }
}

window.editDailyGoal = function() {
    const goalData = JSON.parse(localStorage.getItem('dailyGoal') || '{"target": 2}');
    const newTarget = prompt("Set your daily pattern goal:", goalData.target || 2);
    
    if (newTarget !== null) {
        const target = parseInt(newTarget);
        if (!isNaN(target) && target > 0) {
            goalData.target = target;
            localStorage.setItem('dailyGoal', JSON.stringify(goalData));
            if (window.renderDashboard) window.renderDashboard();
        }
    }
};

*/

// ============================================================
// NEW SIDEBAR LOGIC
// ============================================================

function initializeMobileSidebar() {
  const hamburger = document.querySelector('.hamburger-btn');
  const overlay = document.querySelector('.sidebar-overlay');
  
  if (!hamburger || !overlay) return;

  hamburger.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-active');
  });

  overlay.addEventListener('click', () => {
    document.body.classList.remove('sidebar-active');
  });

  // Inject Close Button into Sidebar Header if it doesn't exist
  const sidebarHeader = document.querySelector('.sidebar-header');
  if (sidebarHeader && !document.querySelector('.sidebar-close-btn')) {
    // Ensure header is relative for absolute positioning of close btn
    sidebarHeader.style.position = 'relative';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'sidebar-close-btn';
    closeBtn.innerHTML = '&times;'; // HTML entity for multiplication sign (X)
    closeBtn.setAttribute('aria-label', 'Close Sidebar');
    closeBtn.addEventListener('click', () => document.body.classList.remove('sidebar-active'));
    sidebarHeader.appendChild(closeBtn);
  }
}

function initializeAccordions() {
  const detailsElements = document.querySelectorAll('.sidebar-nav .nav-section');

  detailsElements.forEach(details => {
    const summary = details.querySelector('summary');
    
    summary.addEventListener('click', (event) => {
      // Prevent default behavior to handle animation
      event.preventDefault();
      
      // Check if it's open or closing
      if (details.open) {
        details.removeAttribute('open');
      } else {
        details.setAttribute('open', '');
      }
    });
  });
}

function initializeCollapsibles() {
  const collapsibles = document.querySelectorAll('.collapsible');
  
  collapsibles.forEach(collapsible => {
    collapsible.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      if (content && content.classList.contains('collapsible-content')) {
        if (this.classList.contains('active')) {
          content.style.display = 'block';
        } else {
          content.style.display = 'none';
        }
      }
    });
  });
}

function initializeSidebarControls() {
  const expandBtn = document.getElementById('expand-all-btn');
  const collapseBtn = document.getElementById('collapse-all-btn');
  const sections = document.querySelectorAll('.sidebar-nav .nav-section');

  if (!expandBtn || !collapseBtn) {
    return;
  }

  expandBtn.addEventListener('click', () => {
    sections.forEach(section => {
      section.open = true;
    });
  });

  collapseBtn.addEventListener('click', () => {
    sections.forEach(section => {
      section.open = false;
    });
  });
}

function updateProgress() {
    const visitedPages = JSON.parse(localStorage.getItem('pageViews') || '{}');
    const visitedHrefs = Object.keys(visitedPages).map(path => {
        // Normalize path for comparison
        return path.substring(path.indexOf('/amazon-coding-patterns/') + '/amazon-coding-patterns/'.length);
    });

    document.querySelectorAll('.nav-section').forEach(section => {
        const items = section.querySelectorAll('.nav-item');
        if (items.length === 0) return;

        let completedCount = 0;
        items.forEach(item => {
            const href = item.getAttribute('href').replace('../', '');
            if (visitedHrefs.includes(href)) {
                completedCount++;
                item.classList.add('completed');
            }
        });

        const progress = (completedCount / items.length) * 100;
        const progressBar = section.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    });
}

// ============================================================
// LANGUAGE TABS
// ============================================================

window.switchTab = function(lang) {
  // Update buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${lang}'`)) {
      btn.classList.add('active');
    }
  });

  // Update content
  document.querySelectorAll('.lang-content').forEach(content => {
    content.classList.remove('active');
  });
  
  const activeContent = document.getElementById(lang);
  if (activeContent) {
    activeContent.classList.add('active');
  }
  
  // Save preference
  localStorage.setItem('preferredLanguage', lang);
};

function initializeLanguageTabs() {
  const lang = localStorage.getItem('preferredLanguage') || 'go';
  if (document.querySelector('.code-tabs')) {
    switchTab(lang);
  }
}

// ============================================================
// SIDEBAR SEARCH
// ============================================================

function initializeSearch() {
  const searchInput = document.getElementById('pattern-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    const navSections = document.querySelectorAll('.nav-section');

    // Handle standalone items (like Home)
    const standaloneItems = document.querySelectorAll('.sidebar-nav > .nav-item');
    standaloneItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(term)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });

    navSections.forEach(section => {
      let hasVisibleItems = false;
      const items = section.querySelectorAll('.nav-item');
      
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(term)) {
          item.style.display = '';
          hasVisibleItems = true;
        } else {
          item.style.display = 'none';
        }
      });

      if (hasVisibleItems) {
        section.style.display = '';
        if (term.length > 0) section.open = true;
      } else {
        section.style.display = 'none';
      }
    });
  });
}
