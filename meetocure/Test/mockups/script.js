// ========================================
// Global State Management
// ========================================

const AppState = {
    currentLanguage: 'telugu', // 'telugu' or 'english'
    isVoiceRecording: false,
    searchQuery: '',
    recordingTime: 0,
    recordingInterval: null
};

// ========================================
// Language Toggle Functionality
// ========================================

function initLanguageToggle() {
    const languageToggle = document.getElementById('languageToggle');
    const currentLangText = document.getElementById('currentLang');

    languageToggle.addEventListener('click', () => {
        // Toggle language
        if (AppState.currentLanguage === 'telugu') {
            AppState.currentLanguage = 'english';
            currentLangText.textContent = 'English';
            document.body.classList.remove('lang-telugu');
            document.body.classList.add('lang-english');
        } else {
            AppState.currentLanguage = 'telugu';
            currentLangText.textContent = 'తెలుగు';
            document.body.classList.remove('lang-english');
            document.body.classList.add('lang-telugu');
        }

        // Add ripple effect
        createRipple(languageToggle, event);

        // Announce to screen readers
        announceToScreenReader(`Language changed to ${AppState.currentLanguage}`);
    });
}

// ========================================
// Voice Search Functionality
// ========================================

function initVoiceSearch() {
    const voiceButton = document.getElementById('voiceButton');
    const voiceModal = document.getElementById('voiceModal');
    const closeVoiceModal = document.getElementById('closeVoiceModal');
    const stopRecording = document.getElementById('stopRecording');

    // Open voice modal
    voiceButton.addEventListener('click', () => {
        openVoiceModal();
        createRipple(voiceButton, event);
    });

    // Close voice modal
    closeVoiceModal.addEventListener('click', () => {
        closeVoiceModalFunc();
    });

    stopRecording.addEventListener('click', () => {
        stopVoiceRecording();
    });

    // Close modal on overlay click
    voiceModal.addEventListener('click', (e) => {
        if (e.target === voiceModal) {
            closeVoiceModalFunc();
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && voiceModal.classList.contains('active')) {
            closeVoiceModalFunc();
        }
    });
}

function openVoiceModal() {
    const voiceModal = document.getElementById('voiceModal');
    voiceModal.classList.add('active');
    AppState.isVoiceRecording = true;
    AppState.recordingTime = 0;

    // Start recording timer
    startRecordingTimer();

    // Simulate voice recognition (in real app, use Web Speech API)
    setTimeout(() => {
        simulateVoiceRecognition();
    }, 3000);

    announceToScreenReader('Voice recording started. Speak your symptoms.');
}

function closeVoiceModalFunc() {
    const voiceModal = document.getElementById('voiceModal');
    voiceModal.classList.remove('active');
    AppState.isVoiceRecording = false;
    stopRecordingTimer();
    announceToScreenReader('Voice recording cancelled.');
}

function stopVoiceRecording() {
    AppState.isVoiceRecording = false;
    stopRecordingTimer();

    // Simulate voice recognition result
    const recognizedText = AppState.currentLanguage === 'telugu'
        ? 'జ్వరం మరియు తలనొప్పి'
        : 'fever and headache';

    // Fill search bar with recognized text
    const searchInput = document.getElementById('searchInput');
    searchInput.value = recognizedText;
    AppState.searchQuery = recognizedText;

    // Close modal
    closeVoiceModalFunc();

    // Navigate to search results (simulated)
    setTimeout(() => {
        showToast(`Searching for: ${recognizedText}`);
        // In real app: navigateToSearchResults(recognizedText);
    }, 300);

    announceToScreenReader(`Voice recognition complete. Searching for ${recognizedText}`);
}

function startRecordingTimer() {
    const recordingTimeEl = document.querySelector('.recording-time');

    AppState.recordingInterval = setInterval(() => {
        AppState.recordingTime++;
        const minutes = Math.floor(AppState.recordingTime / 60);
        const seconds = AppState.recordingTime % 60;
        recordingTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        // Auto-stop after 30 seconds
        if (AppState.recordingTime >= 30) {
            stopVoiceRecording();
        }
    }, 1000);
}

function stopRecordingTimer() {
    if (AppState.recordingInterval) {
        clearInterval(AppState.recordingInterval);
        AppState.recordingInterval = null;
    }
}

function simulateVoiceRecognition() {
    // In a real app, this would use the Web Speech API
    // For demo purposes, we'll just show a message
    console.log('Voice recognition active...');
}

// ========================================
// Search Functionality
// ========================================

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBar = document.getElementById('searchBar');

    // Search input event
    searchInput.addEventListener('input', (e) => {
        AppState.searchQuery = e.target.value;

        // Show auto-suggestions after 2 characters (simulated)
        if (AppState.searchQuery.length >= 2) {
            // In real app: showSearchSuggestions(AppState.searchQuery);
            console.log('Show suggestions for:', AppState.searchQuery);
        }
    });

    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && AppState.searchQuery.trim()) {
            performSearch(AppState.searchQuery);
        }
    });

    // Focus animations
    searchInput.addEventListener('focus', () => {
        searchBar.style.transform = 'scale(1.01)';
    });

    searchInput.addEventListener('blur', () => {
        searchBar.style.transform = 'scale(1)';
    });
}

function performSearch(query) {
    showToast(`Searching for: ${query}`);
    announceToScreenReader(`Searching for ${query}`);

    // In real app: navigate to search results page
    console.log('Performing search:', query);

    // Simulate navigation delay
    setTimeout(() => {
        showToast('Loading search results...');
    }, 500);
}

// ========================================
// Symptom Chips Functionality
// ========================================

function initSymptomChips() {
    const symptomChips = document.querySelectorAll('.symptom-chip');

    symptomChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            const symptom = chip.getAttribute('data-symptom');
            const symptomText = chip.querySelector('.chip-label-en').textContent;
            const symptomTextTe = chip.querySelector('.chip-label-te').textContent;

            // Fill search bar
            const searchInput = document.getElementById('searchInput');
            searchInput.value = AppState.currentLanguage === 'telugu' ? symptomTextTe : symptomText;
            AppState.searchQuery = searchInput.value;

            // Visual feedback
            createRipple(chip, e);
            chip.style.transform = 'scale(0.95)';
            setTimeout(() => {
                chip.style.transform = 'scale(1)';
            }, 150);

            // Perform search
            setTimeout(() => {
                performSearch(AppState.searchQuery);
            }, 300);

            announceToScreenReader(`Selected symptom: ${symptomText}`);
        });

        // Keyboard accessibility
        chip.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                chip.click();
            }
        });
    });
}

// ========================================
// Specialty Chips Functionality
// ========================================

function initSpecialtyChips() {
    const specialtyChips = document.querySelectorAll('.specialty-chip');

    specialtyChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            const specialty = chip.getAttribute('data-specialty');
            const specialtyText = chip.querySelector('.chip-label-en').textContent;
            const specialtyTextTe = chip.querySelector('.chip-label-te').textContent;

            // Visual feedback
            createRipple(chip, e);
            chip.style.transform = 'scale(0.95)';
            setTimeout(() => {
                chip.style.transform = 'scale(1)';
            }, 150);

            // Navigate to specialty search
            const displayText = AppState.currentLanguage === 'telugu' ? specialtyTextTe : specialtyText;
            showToast(`Searching for ${displayText} doctors`);

            setTimeout(() => {
                // In real app: navigateToSpecialtySearch(specialty);
                console.log('Navigate to specialty:', specialty);
            }, 300);

            announceToScreenReader(`Selected specialty: ${specialtyText}`);
        });

        // Keyboard accessibility
        chip.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                chip.click();
            }
        });
    });
}

// ========================================
// Location Button Functionality
// ========================================

function initLocationButton() {
    const locationButton = document.getElementById('locationButton');

    locationButton.addEventListener('click', (e) => {
        createRipple(locationButton, e);

        // Request location permission
        if ('geolocation' in navigator) {
            showToast('Requesting location permission...');

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    showToast(`Location found: ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);

                    // In real app: searchNearbyDoctors(latitude, longitude);
                    setTimeout(() => {
                        showToast('Searching for nearby doctors...');
                    }, 1000);

                    announceToScreenReader('Location permission granted. Searching for nearby doctors.');
                },
                (error) => {
                    showToast('Location permission denied. Please enable location services.');
                    announceToScreenReader('Location permission denied.');
                }
            );
        } else {
            showToast('Location services not available in this browser.');
            announceToScreenReader('Location services not available.');
        }
    });
}

// ========================================
// Bottom Navigation
// ========================================

function initBottomNav() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));

            // Add active class to clicked item
            item.classList.add('active');

            // Visual feedback
            createRipple(item, e);

            // Get nav label
            const labelEn = item.querySelector('.label-en')?.textContent;
            const labelTe = item.querySelector('.label-te')?.textContent;
            const label = AppState.currentLanguage === 'telugu' ? labelTe : labelEn;

            // Navigate (simulated)
            const routes = ['search', 'near-me', 'appointments', 'profile'];
            console.log(`Navigate to: ${routes[index]}`);
            announceToScreenReader(`Navigated to ${label}`);
        });
    });
}

// ========================================
// UI Helper Functions
// ========================================

// Create ripple effect on button clicks
function createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    // Add ripple styles if not already in CSS
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple-animation 0.6s ease-out';

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Show toast notification
function showToast(message, duration = 3000) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    // Style toast
    toast.style.position = 'fixed';
    toast.style.bottom = '80px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = '#323232';
    toast.style.color = '#FFFFFF';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '24px';
    toast.style.fontSize = '14px';
    toast.style.fontFamily = 'Roboto, sans-serif';
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    toast.style.zIndex = '10000';
    toast.style.maxWidth = '80%';
    toast.style.textAlign = 'center';
    toast.style.animation = 'toast-slide-up 0.3s ease-out';

    document.body.appendChild(toast);

    // Auto remove
    setTimeout(() => {
        toast.style.animation = 'toast-slide-down 0.3s ease-out';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// Announce to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

// ========================================
// Add CSS Animations
// ========================================

function addCSSAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        @keyframes toast-slide-up {
            from {
                transform: translateX(-50%) translateY(20px);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }

        @keyframes toast-slide-down {
            from {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            to {
                transform: translateX(-50%) translateY(20px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Service Worker for Offline Support (Optional)
// ========================================

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        });
    }
}

// ========================================
// Accessibility Features
// ========================================

function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '0';
    skipLink.style.background = '#0D7FBF';
    skipLink.style.color = '#FFFFFF';
    skipLink.style.padding = '8px';
    skipLink.style.textDecoration = 'none';
    skipLink.style.zIndex = '100';
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content ID
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('role', 'main');
    }

    // Ensure all interactive elements have proper ARIA labels
    document.querySelectorAll('button').forEach(button => {
        if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
            console.warn('Button missing aria-label:', button);
        }
    });

    // Add keyboard navigation for chips
    document.querySelectorAll('.symptom-chip, .specialty-chip').forEach(chip => {
        chip.setAttribute('role', 'button');
        chip.setAttribute('tabindex', '0');
    });
}

// ========================================
// Performance Monitoring
// ========================================

function initPerformanceMonitoring() {
    // Log page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);

        // Check if load time exceeds target (2 seconds)
        if (loadTime > 2000) {
            console.warn('Page load time exceeds 2 second target');
        }
    });

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 50) {
                    console.warn('Long task detected:', entry.duration + 'ms');
                }
            }
        });
        observer.observe({ entryTypes: ['longtask'] });
    }
}

// ========================================
// Analytics (Placeholder)
// ========================================

function trackEvent(eventName, eventData = {}) {
    // In real app, send to analytics service (Firebase, Google Analytics, etc.)
    console.log('Track event:', eventName, eventData);

    // Example: Firebase Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
}

// Track page view
function trackPageView(pageName) {
    trackEvent('page_view', { page_name: pageName });
}

// ========================================
// Initialize App
// ========================================

function initApp() {
    console.log('Initializing Patient-Doctor Appointment Booking App...');

    // Set initial language
    document.body.classList.add('lang-telugu');

    // Initialize all features
    initLanguageToggle();
    initVoiceSearch();
    initSearch();
    initSymptomChips();
    initSpecialtyChips();
    initLocationButton();
    initBottomNav();
    initAccessibility();
    addCSSAnimations();
    initPerformanceMonitoring();

    // Optional: Register service worker for offline support
    // registerServiceWorker();

    // Track initial page view
    trackPageView('home_search');

    // Show welcome message
    setTimeout(() => {
        const welcomeMessage = AppState.currentLanguage === 'telugu'
            ? 'స్వాగతం! వైద్యులను వెతకడానికి ప్రారంభించండి'
            : 'Welcome! Start searching for doctors';
        announceToScreenReader(welcomeMessage);
    }, 500);

    console.log('App initialized successfully!');
}

// ========================================
// Run on DOM Content Loaded
// ========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// ========================================
// Error Handling
// ========================================

window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    showToast('Something went wrong. Please try again.');

    // In real app: send error to logging service
    trackEvent('error', {
        message: event.error.message,
        stack: event.error.stack
    });
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    showToast('Something went wrong. Please try again.');

    trackEvent('promise_rejection', {
        reason: event.reason
    });
});

// ========================================
// Export for testing (if needed)
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AppState,
        performSearch,
        showToast,
        announceToScreenReader
    };
}
