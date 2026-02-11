// =====================================================
// PROFESSIONAL PORTFOLIO - ENHANCED JAVASCRIPT
// Modern Interactivity, Dark Mode, Charts & Animations
// =====================================================

// ===== DOM Elements =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const header = document.querySelector('.header');
const themeToggle = document.getElementById('themeToggle');
const loadingSpinner = document.getElementById('loadingSpinner');
const body = document.body;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
});

function initializePortfolio() {
    // Initialize theme from localStorage
    initializeTheme();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize animations
    setupScrollAnimations();
    
    // Initialize charts
    setTimeout(() => {
        initializeCharts();
    }, 500);
    
    // Hide loading spinner
    setTimeout(() => {
        hideLoadingSpinner();
    }, 1200);
    
    console.log('Portfolio initialized successfully');
}

// ===== LOADING SPINNER =====
function hideLoadingSpinner() {
    loadingSpinner.classList.add('hidden');
}

// ===== DARK MODE THEME TOGGLE =====
function initializeTheme() {
    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

function enableDarkMode() {
    body.classList.add('dark-mode');
    updateThemeIcon('sun');
    localStorage.setItem('portfolio-theme', 'dark');
}

function disableDarkMode() {
    body.classList.remove('dark-mode');
    updateThemeIcon('moon');
    localStorage.setItem('portfolio-theme', 'light');
}

function updateThemeIcon(icon) {
    const iconElement = themeToggle.querySelector('i');
    if (icon === 'sun') {
        iconElement.className = 'fas fa-sun';
    } else {
        iconElement.className = 'fas fa-moon';
    }
}

function toggleTheme() {
    if (body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

// ===== EVENT LISTENERS SETUP =====
function setupEventListeners() {
    // Mobile menu
    hamburger.addEventListener('click', toggleNavMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', closeNavMenu);
    });
    document.addEventListener('click', handleDocumentClick);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Scroll events
    window.addEventListener('scroll', debounce(updateHeaderScroll, 10));
}

// ===== MOBILE MENU FUNCTIONS =====
function toggleNavMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeNavMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

function handleDocumentClick(event) {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        closeNavMenu();
    }
}

// ===== SCROLL FUNCTIONALITY =====
function updateHeaderScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    updateActiveNavLink();
}

function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerOffset = 100;
        
        if (window.scrollY >= sectionTop - headerOffset) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// ===== SMOOTH SCROLL =====
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        const href = e.target.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
                
                // Stagger child animations
                const children = entry.target.querySelectorAll(
                    '[class*="card"], [class*="item"], .skill-category, .education-item'
                );
                
                children.forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.animation = `scaleIn 0.5s ease-out ${index * 0.08}s forwards`;
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });
}

// ===== DATA VISUALIZATION WITH CHART.JS =====
let specializationChart = null;

function initializeCharts() {
    // Only initialize if Chart.js is loaded and canvas exists
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded');
        return;
    }
    
    const chartCanvas = document.getElementById('specializationChart');
    if (!chartCanvas) return;
    
    // Healthcare Specialization Radar Chart
    const ctx = chartCanvas.getContext('2d');
    
    specializationChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Public Health Analysis',
                'Patient Data Analytics',
                'Healthcare Quality Metrics',
                'Epidemiological Analysis',
                'Health Systems Knowledge',
                'Clinical Data Interpretation'
            ],
            datasets: [
                {
                    label: 'Expertise Level',
                    data: [90, 88, 85, 87, 80, 83],
                    borderColor: '#4F46E5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#4F46E5',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#4F46E5',
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim(),
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 12,
                            weight: '600'
                        },
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(79, 70, 229, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#4F46E5',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            return context.raw + '% expertise';
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-light').trim(),
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 11
                        }
                    },
                    grid: {
                        color: 'rgba(79, 70, 229, 0.1)'
                    },
                    pointLabels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim(),
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 12,
                            weight: '500'
                        },
                        padding: 10
                    }
                }
            }
        }
    });
}

// ===== KEYBOARD SHORTCUTS =====
function handleKeyboardShortcuts(event) {
    // Escape to close mobile menu
    if (event.key === 'Escape') {
        closeNavMenu();
    }
    
    // Ctrl/Cmd + D for dark mode toggle
    if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
        event.preventDefault();
        toggleTheme();
    }
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Get scroll position as percentage
function getScrollPercentage() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = (window.scrollY / windowHeight) * 100;
    return scroll;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// ===== BUTTON RIPPLE EFFECT =====
function setupButtonRipples() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }
            
            this.appendChild(ripple);
        });
    });
}

// Call button ripple setup after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupButtonRipples);
} else {
    setupButtonRipples();
}

// ===== PREFETCH RESOURCES =====
function prefetchResources() {
    if ('prefetch' in document.createElement('link')) {
        // Links are already prefetched via link tags in HTML
    }
}

// ===== PERFORMANCE MONITORING =====
function logPerformanceMetrics() {
    if (window.performance && performance.timing) {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
        
        console.log(`
            Performance Metrics:
            - Total Load Time: ${loadTime}ms
            - DOM Content Loaded: ${domContentLoaded}ms
        `);
    }
}

window.addEventListener('load', logPerformanceMetrics);

// ===== PREFERS REDUCED MOTION =====
function handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.documentElement.style.scrollBehavior = 'auto';
        // Disable animations in CSS via media query
    }
}

handleReducedMotion();

// ===== EXPORT UTILITIES FOR GLOBAL ACCESS =====
window.portfolioUtils = {
    toggleTheme,
    enableDarkMode,
    disableDarkMode,
    toggleNavMenu,
    closeNavMenu,
    debounce,
    isInViewport,
    getScrollPercentage
};

// ===== EMAIL VALIDATION (for future form use) =====
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== PAGE VISIBILITY HANDLING =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page hidden
        console.log('Page hidden');
    } else {
        // Page visible again
        updateActiveNavLink();
        console.log('Page visible');
    }
});

// ===== WINDOW RESIZE HANDLING =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            closeNavMenu();
        }
    }, 250);
});

// ===== ANALYTICS TRACKING (Optional - add your tracking code) =====
// Example: Google Analytics, Mixpanel, etc.
function trackPageView(path) {
    console.log('Tracking page view:', path);
}

// ===== DEBUG MODE =====
const DEBUG = false;

function debugLog(...args) {
    if (DEBUG) {
        console.log('[DEBUG]', ...args);
    }
}

// ===== LOG WELCOME MESSAGE =====
console.log('%c🚀 Welcome to My Portfolio!', 'font-size: 20px; font-weight: bold; color: #4F46E5;');
console.log('%cData Analyst | Healthcare Analytics Specialist', 'font-size: 14px; color: #64748B;');
console.log('%cShortcuts: Ctrl/Cmd + D for Dark Mode', 'font-size: 12px; color: #94A3B8;');
