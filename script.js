/**
 * SoftsMac Landing Page JavaScript
 * Handles particle animations, countdown functionality, and smooth interactions
 */

// Particle Animation System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.particleContainer = document.querySelector('.particles');
        this.maxParticles = this.getMaxParticles();
        this.init();
    }

    getMaxParticles() {
        // Adjust particle count based on device performance
        const width = window.innerWidth;
        if (width < 768) return 15; // Mobile
        if (width < 1200) return 25; // Tablet
        return 35; // Desktop
    }

    init() {
        this.createParticles();
        this.animateParticles();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        const startX = Math.random() * window.innerWidth;
        const animationDelay = Math.random() * 6; // Stagger animations
        const animationDuration = 6 + Math.random() * 4; // Vary speed
        
        particle.style.left = startX + 'px';
        particle.style.animationDelay = animationDelay + 's';
        particle.style.animationDuration = animationDuration + 's';
        
        this.particleContainer.appendChild(particle);
        this.particles.push(particle);
    }

    handleResize() {
        const newMaxParticles = this.getMaxParticles();
        
        if (newMaxParticles < this.particles.length) {
            // Remove excess particles
            for (let i = this.particles.length - 1; i >= newMaxParticles; i--) {
                this.particles[i].remove();
                this.particles.splice(i, 1);
            }
        } else if (newMaxParticles > this.particles.length) {
            // Add more particles
            const difference = newMaxParticles - this.particles.length;
            for (let i = 0; i < difference; i++) {
                this.createParticle();
            }
        }
        
        this.maxParticles = newMaxParticles;
    }

    animateParticles() {
        // Continuous particle regeneration for seamless animation
        setInterval(() => {
            this.particles.forEach(particle => {
                if (!particle.parentNode) {
                    // Particle animation completed, recreate it
                    this.createParticle();
                }
            });
        }, 1000);
    }
}

// Countdown System for Download Page
class CountdownSystem {
    constructor() {
        this.countdownElement = document.getElementById('countdownNumber');
        this.redirectUrl = 'https://softsmac.net/';
        this.countdownDuration = 3; // seconds
        this.currentCount = this.countdownDuration;
        
        if (this.countdownElement) {
            this.startCountdown();
        }
    }

    startCountdown() {
        // Initial display
        this.updateDisplay();
        
        // Start countdown interval
        const countdownInterval = setInterval(() => {
            this.currentCount--;
            
            if (this.currentCount > 0) {
                this.updateDisplay();
                this.animateNumber();
            } else {
                clearInterval(countdownInterval);
                this.completeCountdown();
            }
        }, 1000);
    }

    updateDisplay() {
        if (this.countdownElement) {
            this.countdownElement.textContent = this.currentCount;
        }
    }

    animateNumber() {
        // Add scale animation for number change
        this.countdownElement.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
            this.countdownElement.style.transform = 'scale(1)';
        }, 200);
    }

    completeCountdown() {
        // Show completion state
        this.countdownElement.textContent = '0';
        this.countdownElement.style.color = '#00ff88';
        
        // Add final animation
        this.countdownElement.style.transform = 'scale(1.3)';
        
        setTimeout(() => {
            // Redirect to target URL
            window.location.href = this.redirectUrl;
        }, 500);
    }
}

// Smooth Scroll and Interaction Handler
class InteractionHandler {
    constructor() {
        this.init();
    }

    init() {
        this.handleButtonInteractions();
        this.handlePageLoad();
        this.optimizePerformance();
    }

    handleButtonInteractions() {
        const downloadBtn = document.querySelector('.download-btn');
        
        if (downloadBtn) {
            // Add loading state on click
            downloadBtn.addEventListener('click', (e) => {
                downloadBtn.style.transform = 'scale(0.95)';
                downloadBtn.style.opacity = '0.8';
                
                // Add loading text
                const originalText = downloadBtn.querySelector('.btn-text').textContent;
                downloadBtn.querySelector('.btn-text').textContent = 'Preparing...';
                
                // Reset after short delay (allows for page transition)
                setTimeout(() => {
                    downloadBtn.style.transform = '';
                    downloadBtn.style.opacity = '';
                    downloadBtn.querySelector('.btn-text').textContent = originalText;
                }, 300);
            });
        }
    }

    handlePageLoad() {
        // Ensure smooth fade-in animations
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
            
            // Trigger fade-in animations
            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.animationPlayState = 'running';
                }, index * 200);
            });
        });
    }

    optimizePerformance() {
        // Reduce animations on low-performance devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.documentElement.style.setProperty('--animation-speed', '0.5s');
        }

        // Handle visibility change to pause animations when tab is hidden
        document.addEventListener('visibilitychange', () => {
            const particles = document.querySelectorAll('.particle');
            particles.forEach(particle => {
                if (document.hidden) {
                    particle.style.animationPlayState = 'paused';
                } else {
                    particle.style.animationPlayState = 'running';
                }
            });
        });
    }
}

// Error Handler for Production
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        // Handle potential errors gracefully
        window.addEventListener('error', (e) => {
            console.warn('SoftsMac: Non-critical error occurred:', e.message);
            // Continue execution without disrupting user experience
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            console.warn('SoftsMac: Promise rejection handled:', e.reason);
            e.preventDefault(); // Prevent console error
        });
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all systems
    const particleSystem = new ParticleSystem();
    const countdownSystem = new CountdownSystem();
    const interactionHandler = new InteractionHandler();
    const errorHandler = new ErrorHandler();

    // Add development info (only visible in console)
    if (typeof console !== 'undefined') {
        console.log('%cSoftsMac Landing Page', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
        console.log('%cBuilt with vanilla HTML, CSS, and JavaScript', 'color: #8a2be2; font-size: 12px;');
        console.log('%cOptimized for performance and accessibility', 'color: #00ff88; font-size: 12px;');
    }
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ParticleSystem,
        CountdownSystem,
        InteractionHandler,
        ErrorHandler
    };
}

// Performance monitoring (development only)
if (window.performance && window.performance.mark) {
    window.performance.mark('softsmac-app-start');
    
    window.addEventListener('load', () => {
        window.performance.mark('softsmac-app-loaded');
        window.performance.measure('softsmac-load-time', 'softsmac-app-start', 'softsmac-app-loaded');
        
        const measurements = window.performance.getEntriesByType('measure');
        const loadTime = measurements.find(m => m.name === 'softsmac-load-time');
        
        if (loadTime && loadTime.duration > 0) {
            console.log(`SoftsMac load time: ${Math.round(loadTime.duration)}ms`);
        }
    });
}
