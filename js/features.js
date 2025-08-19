/**
 * Advanced Features for Tech Blog
 * - Reading Progress Bar
 * - Back to Top Button
 * - Parallax Effects
 * - Lazy Loading Images
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initReadingProgressBar();
    initBackToTopButton();
    initLazyLoading();
    
    // Only initialize parallax if not using reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        initParallaxEffects();
    }
});

/**
 * Reading Progress Bar
 * Shows reading progress for article pages
 */
function initReadingProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    const progressContainer = document.querySelector('.progress-container');
    
    // Only initialize if we're on an article page with the progress bar
    if (!progressBar || !progressContainer) return;
    
    window.addEventListener('scroll', function() {
        // Calculate how far down the page the user has scrolled
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Update the width of the progress bar
        progressBar.style.width = scrollPercent + '%';
    });
}

/**
 * Back to Top Button
 * Shows a button to scroll back to top when user scrolls down
 */
function initBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    
    // Only initialize if the button exists
    if (!backToTopButton) return;
    
    // Show button when user scrolls down 300px from the top
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        // Use smooth scrolling if not using reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            window.scrollTo(0, 0);
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

/**
 * Parallax Effects
 * Adds parallax scrolling to hero images
 */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.article-hero');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        
        parallaxElements.forEach(element => {
            // Move the background image at a different rate than the scroll
            const offset = scrollTop * 0.4;
            element.style.backgroundPositionY = `calc(50% + ${offset}px)`;
        });
    });
}

/**
 * Lazy Loading Images
 * Loads images only when they enter the viewport
 */
function initLazyLoading() {
    // Check if the browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    
                    // Optional: Load high-res version if available
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        // Load all images immediately
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
        });
    }
}