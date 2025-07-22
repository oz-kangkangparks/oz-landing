// App Configuration
const APP_CONFIG = {
    name: '오늘은 퇴근하세요',
    version: '1.0.0',
    api: {
        baseUrl: '',
        endpoints: {
            emotions: '/api/emotions',
            quotes: '/api/quotes',
            notifications: '/api/notifications'
        }
    }
};

// Utility Functions
const utils = {
    // Local Storage Helper
    storage: {
        get: (key) => {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch (e) {
                return null;
            }
        },
        set: (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                return false;
            }
        },
        remove: (key) => {
            localStorage.removeItem(key);
        }
    },
    
    // Date Helper
    formatDate: (date) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
        };
        return new Date(date).toLocaleDateString('ko-KR', options);
    },
    
    // Debounce Function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Smooth Scroll
    smoothScroll: (target, duration = 1000) => {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;
        
        const targetPosition = targetElement.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
};

// Component: Navigation
const navigation = {
    init: function() {
        this.setupMobileMenu();
        this.setupScrollBehavior();
    },
    
    setupMobileMenu: function() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });
        }
    },
    
    setupScrollBehavior: function() {
        let lastScroll = 0;
        const header = document.querySelector('header');
        
        if (header) {
            window.addEventListener('scroll', utils.debounce(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > lastScroll && currentScroll > 100) {
                    header.classList.add('hide');
                } else {
                    header.classList.remove('hide');
                }
                
                if (currentScroll > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                lastScroll = currentScroll;
            }, 10));
        }
    }
};

// Component: Emotion Tracker
const emotionTracker = {
    emotions: ['😢', '😡', '😐', '🙂', '😄'],
    
    init: function() {
        this.loadTodayEmotion();
        this.setupEventListeners();
    },
    
    loadTodayEmotion: function() {
        const today = new Date().toDateString();
        const savedEmotions = utils.storage.get('emotions') || {};
        return savedEmotions[today];
    },
    
    saveEmotion: function(emotion) {
        const today = new Date().toDateString();
        const savedEmotions = utils.storage.get('emotions') || {};
        savedEmotions[today] = {
            emotion: emotion,
            timestamp: new Date().getTime()
        };
        utils.storage.set('emotions', savedEmotions);
    },
    
    setupEventListeners: function() {
        // Event listeners for emotion selection will be added here
    }
};

// Component: Quote Manager
const quoteManager = {
    quotes: [
        {
            text: "실패는 성공의 어머니다",
            author: "토마스 에디슨",
            category: "perseverance"
        },
        {
            text: "넘어지는 것은 실패가 아니다. 넘어진 자리에 머무는 것이 실패다",
            author: "넬슨 만델라",
            category: "resilience"
        }
    ],
    
    init: function() {
        this.displayRandomQuote();
    },
    
    displayRandomQuote: function() {
        const randomIndex = Math.floor(Math.random() * this.quotes.length);
        const quote = this.quotes[randomIndex];
        
        const quoteElement = document.querySelector('.daily-quote');
        if (quoteElement) {
            quoteElement.innerHTML = `
                <blockquote>
                    <p>"${quote.text}"</p>
                    <cite>- ${quote.author}</cite>
                </blockquote>
            `;
        }
    }
};

// Component: Form Handler
const formHandler = {
    init: function() {
        this.setupContactForm();
        this.setupNewsletterForm();
    },
    
    setupContactForm: function() {
        const form = document.querySelector('#contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Handle form submission
                console.log('Contact form submitted');
            });
        }
    },
    
    setupNewsletterForm: function() {
        const form = document.querySelector('#newsletter-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Handle newsletter subscription
                console.log('Newsletter subscription');
            });
        }
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    console.log(`${APP_CONFIG.name} v${APP_CONFIG.version} initialized`);
    
    // Initialize components
    navigation.init();
    emotionTracker.init();
    quoteManager.init();
    formHandler.init();
    
    // Setup smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            utils.smoothScroll(target);
        });
    });
});