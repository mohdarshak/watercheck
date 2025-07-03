// Global state management
let currentPage = 'dashboard';

// Navigation functions
function navigateToPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
    }
    
    // Update sidebar navigation
    updateSidebarNavigation(pageId);
    
    // Scroll to top of new page
    const pageContent = targetPage.querySelector('.page-content') || targetPage.querySelector('.content-main');
    if (pageContent) {
        pageContent.scrollTop = 0;
    }
}

function navigateBack() {
    navigateToPage('dashboard');
}

function updateSidebarNavigation(activePageId) {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to current nav item
    const activeNavItem = document.querySelector(`[data-page="${activePageId}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}

// Initialize circular progress animations
function initializeCircularProgress() {
    const progressElements = document.querySelectorAll('.circular-progress');
    
    progressElements.forEach(element => {
        const percentage = element.getAttribute('data-percentage');
        const circle = element.querySelector('.progress-ring-fill');
        
        if (circle && percentage) {
            const radius = circle.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            const offset = circumference - (percentage / 100) * circumference;
            
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = offset;
        }
    });
}

// Simulate real-time data updates
function updateRealTimeData() {
    // Update TDS value
    const tdsValue = document.querySelector('.metric-card .value');
    if (tdsValue) {
        const currentValue = parseInt(tdsValue.textContent);
        const newValue = currentValue + Math.floor(Math.random() * 6) - 3; // Random change between -3 and +3
        const clampedValue = Math.max(120, Math.min(150, newValue)); // Keep between 120-150
        tdsValue.textContent = clampedValue;
        
        // Update status badge color based on value
        const badge = tdsValue.parentElement.querySelector('.badge');
        if (badge) {
            if (clampedValue > 140) {
                badge.className = 'badge badge-yellow';
                badge.textContent = 'High';
            } else {
                badge.className = 'badge badge-green';
                badge.textContent = 'Dom';
            }
        }
    }
    
    // Update last sync time
    const lastSyncElements = document.querySelectorAll('[data-last-sync]');
    lastSyncElements.forEach(element => {
        const now = new Date();
        const minutes = Math.floor(Math.random() * 5) + 1;
        element.textContent = `Last Sync: ${minutes} mins ago`;
    });
}

// Add click handlers for interactive elements
function initializeClickHandlers() {
    // Add click handlers for all clickable cards and buttons
    const clickableElements = document.querySelectorAll('[onclick]');
    clickableElements.forEach(element => {
        element.style.cursor = 'pointer';
    });
    
    // Add hover effects for metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects for filter cards
    const filterCards = document.querySelectorAll('.filter-card');
    filterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Simulate alert notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 0.5rem;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                padding: 1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                z-index: 1000;
                animation: slideIn 0.3s ease;
            }
            
            .notification-success {
                border-left: 4px solid #10b981;
            }
            
            .notification-warning {
                border-left: 4px solid #f59e0b;
            }
            
            .notification-info {
                border-left: 4px solid #3b82f6;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                color: #64748b;
                padding: 0.25rem;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Simulate system events
function simulateSystemEvents() {
    const events = [
        { message: "System health check completed", type: "success" },
        { message: "Filter replacement reminder", type: "warning" },
        { message: "Water quality test passed", type: "success" },
        { message: "Maintenance scheduled", type: "info" }
    ];
    
    // Show random event every 30 seconds
    setInterval(() => {
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        showNotification(randomEvent.message, randomEvent.type);
    }, 30000);
}

// Add loading states for buttons
function addLoadingState(button, duration = 2000) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    button.style.opacity = '0.6';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.opacity = '1';
        showNotification('Action completed successfully!', 'success');
    }, duration);
}

// Add click handlers for action buttons
function initializeActionButtons() {
    const actionButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    actionButtons.forEach(button => {
        if (!button.onclick && !button.disabled) {
            button.addEventListener('click', function(e) {
                if (!this.getAttribute('onclick')) {
                    e.preventDefault();
                    addLoadingState(this);
                }
            });
        }
    });
}

// Initialize search functionality (placeholder)
function initializeSearch() {
    const searchInputs = document.querySelectorAll('input[type="search"], input[placeholder*="search"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Placeholder for search functionality
            console.log('Searching for:', this.value);
        });
    });
}

// Initialize tooltips for icons
function initializeTooltips() {
    const icons = document.querySelectorAll('.header-actions i, .nav-item i');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function(e) {
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('title') || 'Click for more options';
            tooltip.style.cssText = `
                position: absolute;
                background: #1e293b;
                color: white;
                padding: 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.75rem;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
            `;
            
            document.body.appendChild(tooltip);
            
            // Position tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.bottom + 5 + 'px';
            
            // Store reference for cleanup
            this._tooltip = tooltip;
        });
        
        icon.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });
}

// Initialize keyboard shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + number keys for quick navigation
        if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '8') {
            e.preventDefault();
            const pages = ['dashboard', 'live-water-quality', 'filter-health', 'leak-detection', 'alerts', 'service-maintenance', 'reports', 'settings'];
            const pageIndex = parseInt(e.key) - 1;
            if (pages[pageIndex]) {
                navigateToPage(pages[pageIndex]);
            }
        }
        
        // Escape key to go back to dashboard
        if (e.key === 'Escape' && currentPage !== 'dashboard') {
            navigateBack();
        }
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeCircularProgress();
    initializeClickHandlers();
    initializeActionButtons();
    initializeSearch();
    initializeTooltips();
    initializeKeyboardShortcuts();
    
    // Start real-time updates
    updateRealTimeData();
    setInterval(updateRealTimeData, 30000); // Update every 30 seconds
    
    // Start system event simulation
    setTimeout(simulateSystemEvents, 10000); // Start after 10 seconds
    
    // Set initial page
    navigateToPage('dashboard');
    
    console.log('PurityGrid Dashboard initialized successfully!');
});

// Export functions for global access
window.navigateToPage = navigateToPage;
window.navigateBack = navigateBack;


// Real-Time Data from AWS Lambda
function fetchLiveWaterQuality() {
    const url = "https://qsh6ornnqxfn4ryi77dsy3sxyi0cbrsb.lambda-url.eu-north-1.on.aws/?device_id=223";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const payload = data.payload;
            const { temprature, tds, ph, filter_health, flow, timestamp } = payload;

            // TDS
            const tdsElem = document.querySelector('.metric-card:nth-child(1) .value');
            if (tdsElem) tdsElem.textContent = tds;

            // pH
            const phElem = document.querySelector('.metric-card:nth-child(2) .metric-value');
            if (phElem) phElem.textContent = ph.toFixed(2);

            // Temperature
            const tempElem = document.querySelector('.metric-card:nth-child(4) .value');
            if (tempElem) tempElem.textContent = temprature;

            // Update filter health circular progress
            const progressCircle = document.querySelector('.filter-card .progress-ring-fill');
            const progressText = document.querySelector('.filter-card .progress-text');
            if (progressCircle && progressText) {
                const radius = progressCircle.r.baseVal.value;
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (filter_health / 100) * circumference;
                progressCircle.style.strokeDashoffset = offset;
                progressText.textContent = `${Math.round(filter_health)}%`;
            }

            // Update last sync timestamp
            const syncEl = document.querySelector('.footer-actions span:first-child');
            if (syncEl) {
                const lastUpdated = new Date(timestamp);
                const now = new Date();
                const diffMins = Math.floor((now - lastUpdated) / 60000);
                syncEl.textContent = `Last Sync: ${diffMins} mins ago`;
            }
        })
        .catch(err => console.error("Failed to fetch water quality data", err));
}

// Start fetching every 5 seconds
setInterval(fetchLiveWaterQuality, 5000);
document.addEventListener("DOMContentLoaded", fetchLiveWaterQuality);
