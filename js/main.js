document.addEventListener('DOMContentLoaded', function() {
    // Category Filter Functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const categoryContainers = document.querySelectorAll('.category-section');
    
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const selectedCategory = this.textContent.trim();
                
                // Show/hide category sections based on selection
                if (selectedCategory === 'All') {
                    // Show all categories
                    categoryContainers.forEach(container => {
                        container.style.display = 'block';
                    });
                } else {
                    // Show only selected category
                    categoryContainers.forEach(container => {
                        const categoryTitle = container.querySelector('.category-title').textContent.trim();
                        if (categoryTitle === selectedCategory) {
                            container.style.display = 'block';
                        } else {
                            container.style.display = 'none';
                        }
                    });
                }
            });
        });
    }
    
    // Theme Toggle Functionality
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Toggle theme when button is clicked
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Load More Articles Button
    const loadMoreBtn = document.querySelector('.load-more button');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMoreArticles();
        });
    }

    // Lazy loading images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // Sticky header effect
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
});

// Function to simulate loading more articles
function loadMoreArticles() {
    const postsList = document.querySelector('.posts-list');
    const loadMoreBtn = document.querySelector('.load-more button');
    
    if (!postsList || !loadMoreBtn) return;
    
    // Show loading state
    loadMoreBtn.textContent = 'Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Sample new articles data (in a real app, this would come from an API)
        const newArticles = [
            {
                thumbnail: 'https://via.placeholder.com/300x200',
                category: 'Programming',
                title: 'Understanding TypeScript: A Comprehensive Guide',
                date: 'May 18, 2023',
                author: 'James Wilson',
                excerpt: 'Learn how TypeScript enhances JavaScript development with static typing and advanced features.'
            },
            {
                thumbnail: 'https://via.placeholder.com/300x200',
                category: 'IoT',
                title: 'Building Smart Home Systems with Raspberry Pi',
                date: 'May 15, 2023',
                author: 'Lisa Chen',
                excerpt: 'A step-by-step guide to creating your own smart home automation system using Raspberry Pi.'
            },
            {
                thumbnail: 'https://via.placeholder.com/300x200',
                category: 'DevOps',
                title: 'Containerization with Docker and Kubernetes',
                date: 'May 12, 2023',
                author: 'Mark Johnson',
                excerpt: 'Explore how containerization technologies are revolutionizing application deployment and scaling.'
            },
            {
                thumbnail: 'https://via.placeholder.com/300x200',
                category: 'Data Science',
                title: 'Data Visualization Techniques for Complex Datasets',
                date: 'May 10, 2023',
                author: 'Priya Sharma',
                excerpt: 'Effective methods for visualizing and communicating insights from large and complex datasets.'
            }
        ];
        
        // Create and append new article elements
        newArticles.forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.className = 'post-item';
            articleElement.innerHTML = `
                <div class="post-thumbnail">
                    <img src="${article.thumbnail}" alt="${article.title}">
                </div>
                <div class="post-content">
                    <span class="category">${article.category}</span>
                    <h3 class="post-title"><a href="#">${article.title}</a></h3>
                    <div class="post-meta">
                        <span class="post-date">${article.date}</span>
                        <span class="post-author">by <a href="#">${article.author}</a></span>
                    </div>
                    <p class="post-excerpt">${article.excerpt}</p>
                </div>
            `;
            
            postsList.appendChild(articleElement);
            
            // Add fade-in animation
            setTimeout(() => {
                articleElement.style.opacity = '1';
            }, 10);
        });
        
        // Reset button state
        loadMoreBtn.textContent = 'Load More Articles';
        loadMoreBtn.disabled = false;
        
        // If this was the last batch, hide the button (in a real app)
        // This is just for demonstration
        if (Math.random() > 0.3) {
            loadMoreBtn.textContent = 'No More Articles';
            loadMoreBtn.disabled = true;
        }
    }, 1500);
}

// Add CSS animation for newly loaded articles
const style = document.createElement('style');
style.textContent = `
    .post-item {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);