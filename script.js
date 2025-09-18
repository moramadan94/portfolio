// Loading Animation
class LoadingManager {
    constructor() {
        this.commands = [
            'npm install portfolio-dependencies',
            'building mohamed-ramadan portfolio...',
            'compiling professional experience...',
            'optimizing skill showcase...',
            'initializing contact system...'
        ];
        this.currentCommandIndex = 0;
        this.currentCharIndex = 0;
        this.init();
    }

    init() {
        this.startLoading();
    }

    startLoading() {
        const commandElement = document.getElementById('loadingCommand');
        const outputElement = document.getElementById('terminalOutput');

        if (!commandElement || !outputElement) return;

        this.typeCommand(commandElement, () => {
            this.showOutput(outputElement);
        });
    }

    typeCommand(element, callback) {
        const command = this.commands[0];

        const typeInterval = setInterval(() => {
            if (this.currentCharIndex < command.length) {
                element.textContent = command.substring(0, this.currentCharIndex + 1);
                this.currentCharIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(callback, 500);
            }
        }, 50);
    }

    showOutput(element) {
        const outputs = [
            'Fetching frontend expertise... ✓',
            'Loading 7+ years of experience... ✓',
            'Compiling React Native projects... ✓',
            'Initializing Al Rajhi Bank portfolio... ✓',
            'Setting up interactive interface... ✓',
            'Portfolio ready! Welcome Mohamed Ramadan 🚀'
        ];

        let outputIndex = 0;
        const outputInterval = setInterval(() => {
            if (outputIndex < outputs.length) {
                const outputLine = document.createElement('div');
                outputLine.textContent = outputs[outputIndex];
                element.appendChild(outputLine);
                outputIndex++;
            } else {
                clearInterval(outputInterval);
            }
        }, 400);
    }
}

// Portfolio Interactive Functionality
class PortfolioManager {
    constructor() {
        this.activeTab = null;
        this.openTabs = [];
        this.draggedTab = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
        this.setupDragAndDrop();
        this.showWelcomePage();

        // Show main container after loading
        setTimeout(() => {
            document.getElementById('mainContainer').style.display = 'flex';
        }, 4500);
    }

    setupEventListeners() {
        // File explorer navigation
        document.querySelectorAll('.file-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const tabName = item.dataset.tab;
                this.openTab(tabName);
            });
        });

        // Tab close functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-close')) {
                e.stopPropagation();
                const tab = e.target.closest('.tab');
                const tabName = tab.dataset.tab;
                this.closeTab(tabName);
            }
        });

        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                if (!e.target.classList.contains('tab-close')) {
                    const tabName = tab.dataset.tab;
                    this.switchToTab(tabName);
                }
            });
        });

        // Mobile responsive behavior
        this.setupMobileNavigation();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Number keys for quick navigation
            if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '6') {
                e.preventDefault();
                const shortcuts = {
                    '1': 'about',
                    '2': 'experience',
                    '3': 'skills',
                    '4': 'projects',
                    '5': 'education',
                    '6': 'contact'
                };
                this.openTab(shortcuts[e.key]);
            }

            // Ctrl/Cmd + W to close current tab
            if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
                e.preventDefault();
                this.closeTab(this.activeTab);
            }
        });
    }

    initializeActiveStates() {
        this.updateFileExplorerStates();
        this.updateTabBarStates();
        this.updateContentStates();
    }

    openTab(tabName) {
        if (!this.openTabs.includes(tabName)) {
            this.openTabs.push(tabName);
            this.createTabElement(tabName);
        }
        this.switchToTab(tabName);
    }

    closeTab(tabName) {
        const tabIndex = this.openTabs.indexOf(tabName);
        if (tabIndex === -1) return;

        // Remove from open tabs
        this.openTabs.splice(tabIndex, 1);

        // Remove tab element
        const tabElement = document.querySelector(`.tab[data-tab="${tabName}"]`);
        if (tabElement) {
            tabElement.remove();
        }

        // If no tabs left, show welcome page
        if (this.openTabs.length === 0) {
            this.showWelcomePage();
            return;
        }

        // If closing active tab, switch to another tab
        if (this.activeTab === tabName) {
            const newActiveTab = this.openTabs[Math.max(0, tabIndex - 1)];
            this.switchToTab(newActiveTab);
        }

        this.updateFileExplorerStates();
    }

    createTabElement(tabName) {
        const tabConfig = {
            about: { icon: 'fas fa-user', label: 'about.md' },
            experience: { icon: 'fas fa-briefcase', label: 'experience.md' },
            skills: { icon: 'fas fa-code', label: 'skills.md' },
            projects: { icon: 'fas fa-folder-open', label: 'projects.md' },
            education: { icon: 'fas fa-graduation-cap', label: 'education.md' },
            contact: { icon: 'fas fa-envelope', label: 'contact.md' }
        };

        const config = tabConfig[tabName];
        if (!config) return;

        const tabBar = document.querySelector('.tab-bar');
        const tabElement = document.createElement('div');
        tabElement.className = 'tab';
        tabElement.dataset.tab = tabName;

        tabElement.innerHTML = `
            <i class="${config.icon}"></i>
            <span>${config.label}</span>
            <button class="tab-close" aria-label="Close tab">×</button>
        `;

        // Add click listener for tab switching
        tabElement.addEventListener('click', (e) => {
            if (!e.target.classList.contains('tab-close')) {
                this.switchToTab(tabName);
            }
        });

        // Make tab draggable
        tabElement.draggable = true;

        // Add click listener for close button
        const closeBtn = tabElement.querySelector('.tab-close');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeTab(tabName);
        });

        tabBar.appendChild(tabElement);
    }

    switchToTab(tabName) {
        if (!this.openTabs.includes(tabName)) {
            this.openTab(tabName);
            return;
        }

        this.activeTab = tabName;
        this.updateFileExplorerStates();
        this.updateTabBarStates();
        this.updateContentStates();
        this.showTabContent(tabName);
        this.hideWelcomePage();
    }

    updateFileExplorerStates() {
        document.querySelectorAll('.file-item').forEach(item => {
            const tabName = item.dataset.tab;
            // Only show active if there are open tabs and this is the active tab
            item.classList.toggle('active', this.openTabs.length > 0 && tabName === this.activeTab);
        });
    }

    setupDragAndDrop() {
        // Add drag and drop functionality for tab reordering
        const tabBar = document.querySelector('.tab-bar');
        if (!tabBar) return;

        tabBar.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('tab')) {
                this.draggedTab = e.target;
                e.target.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            }
        });

        tabBar.addEventListener('dragover', (e) => {
            e.preventDefault();
            const tab = e.target.closest('.tab');
            if (tab && tab !== this.draggedTab) {
                tab.classList.add('drag-over');
            }
        });

        tabBar.addEventListener('dragleave', (e) => {
            const tab = e.target.closest('.tab');
            if (tab) {
                tab.classList.remove('drag-over');
            }
        });

        tabBar.addEventListener('drop', (e) => {
            e.preventDefault();
            const targetTab = e.target.closest('.tab');

            if (targetTab && targetTab !== this.draggedTab) {
                const draggedTabName = this.draggedTab.dataset.tab;
                const targetTabName = targetTab.dataset.tab;

                this.reorderTabs(draggedTabName, targetTabName);
            }

            // Clean up drag classes
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('dragging', 'drag-over');
            });

            this.draggedTab = null;
        });

        tabBar.addEventListener('dragend', () => {
            // Clean up drag classes
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('dragging', 'drag-over');
            });
            this.draggedTab = null;
        });

        // Make tabs draggable
        this.updateTabDraggability();
    }

    updateTabDraggability() {
        document.querySelectorAll('.tab').forEach(tab => {
            tab.draggable = true;
        });
    }

    reorderTabs(draggedTabName, targetTabName) {
        const draggedIndex = this.openTabs.indexOf(draggedTabName);
        const targetIndex = this.openTabs.indexOf(targetTabName);

        if (draggedIndex === -1 || targetIndex === -1) return;

        // Remove dragged tab from array
        const [draggedTab] = this.openTabs.splice(draggedIndex, 1);

        // Insert at new position
        this.openTabs.splice(targetIndex, 0, draggedTab);

        // Rebuild tab bar
        this.rebuildTabBar();
    }

    rebuildTabBar() {
        const tabBar = document.querySelector('.tab-bar');
        if (!tabBar) return;

        // Clear current tabs
        tabBar.innerHTML = '';

        // Recreate tabs in new order
        this.openTabs.forEach(tabName => {
            this.createTabElement(tabName);
        });

        // Update states
        this.updateTabBarStates();
        this.updateTabDraggability();
    }

    updateTabBarStates() {
        document.querySelectorAll('.tab').forEach(tab => {
            const tabName = tab.dataset.tab;
            tab.classList.toggle('active', tabName === this.activeTab);
        });
    }

    updateContentStates() {
        document.querySelectorAll('.tab-content').forEach(content => {
            const tabName = content.id;
            content.classList.toggle('active', tabName === this.activeTab);
        });
    }

    showTabContent(tabName) {
        // Hide all tab contents including welcome
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Show selected tab content
        const targetContent = document.getElementById(tabName);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // Scroll to top of content
        const editorContent = document.querySelector('.editor-content');
        if (editorContent) {
            editorContent.scrollTop = 0;
        }
    }

    showWelcomePage() {
        this.activeTab = null;

        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Show welcome page
        const welcomePage = document.getElementById('welcome');
        if (welcomePage) {
            welcomePage.classList.add('active');
        }

        // Update states
        this.updateFileExplorerStates();
        this.updateTabBarStates();
    }

    hideWelcomePage() {
        const welcomePage = document.getElementById('welcome');
        if (welcomePage) {
            welcomePage.classList.remove('active');
        }
    }

    setupMobileNavigation() {
        // Handle mobile tab scrolling
        const tabBar = document.querySelector('.tab-bar');
        if (tabBar) {
            // Enable smooth scrolling for tab bar on mobile
            tabBar.style.scrollBehavior = 'smooth';
        }

        // Handle responsive sidebar toggle for mobile
        this.setupMobileSidebar();
    }

    setupMobileSidebar() {
        // Add mobile sidebar toggle functionality if needed
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');

        // Handle mobile file explorer
        if (window.innerWidth <= 991) {
            this.setupMobileFileExplorer();
        }

        // Update on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 991) {
                this.setupMobileFileExplorer();
            }
        });
    }

    setupMobileFileExplorer() {
        const fileList = document.querySelector('.file-list');
        if (fileList) {
            // Ensure horizontal scrolling works properly on mobile
            fileList.style.overflowX = 'auto';
            fileList.style.whiteSpace = 'nowrap';
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 16px',
            borderRadius: '4px',
            color: '#ffffff',
            fontSize: '14px',
            zIndex: '9999',
            opacity: '0',
            transform: 'translateY(-20px)',
            transition: 'all 0.3s ease'
        });

        // Set background color based on type
        const colors = {
            info: 'var(--accent-blue)',
            success: 'var(--success-color)',
            warning: 'var(--warning-color)',
            error: 'var(--error-color)'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Contact functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success notification
        if (window.portfolioManager) {
            window.portfolioManager.showNotification(`Copied "${text}" to clipboard`, 'success');
        }
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        if (window.portfolioManager) {
            window.portfolioManager.showNotification(`Copied "${text}" to clipboard`, 'success');
        }
    });
}

// Smooth scroll behavior for internal links
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start loading animation
    window.loadingManager = new LoadingManager();

    // Initialize portfolio after loading
    setTimeout(() => {
        window.portfolioManager = new PortfolioManager();

        // Add loading animation
        document.body.classList.add('loaded');

        // Initialize tooltips or other UI enhancements
        initializeUIEnhancements();
    }, 1000);
});

function initializeUIEnhancements() {
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.file-item, .tab, .contact-btn, .skill-tag, .project-card');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('button, .file-item, .tab');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-blue)';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Initialize performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Portfolio loaded in ${loadTime}ms`);
        });
    }
}

// Handle browser back/forward navigation
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.tab) {
        if (window.portfolioManager) {
            window.portfolioManager.switchToTab(event.state.tab);
        }
    }
});

// Export for testing or external usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioManager, copyToClipboard, smoothScrollTo };
}