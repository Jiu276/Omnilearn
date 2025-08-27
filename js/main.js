// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            // Simulate form submission
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Subscribed!';
                button.style.backgroundColor = '#10b981';
                this.querySelector('input[type="email"]').value = '';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.backgroundColor = '';
                }, 2000);
            }, 1000);
        }
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.featured-card, .product-card').forEach(card => {
    observer.observe(card);
});

// Search Functionality (for pages that have search)
function initializeSearch() {
    const searchInput = document.querySelector('#search-input');
    const searchBtn = document.querySelector('#search-btn');
    const searchResults = document.querySelector('#search-results');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('#search-input');
    const query = searchInput.value.toLowerCase().trim();
    
    if (query.length < 2) {
        showSearchMessage('Please enter at least 2 characters to search.');
        return;
    }
    
    const allCards = document.querySelectorAll('.blog-card, .product-card');
    let visibleCount = 0;
    
    allCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const content = card.querySelector('p')?.textContent.toLowerCase() || '';
        const category = card.querySelector('.card-category')?.textContent.toLowerCase() || '';
        
        if (title.includes(query) || content.includes(query) || category.includes(query)) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    if (visibleCount === 0) {
        showSearchMessage(`No results found for "${query}"`);
    } else {
        hideSearchMessage();
    }
}

function showSearchMessage(message) {
    let messageEl = document.querySelector('.search-message');
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.className = 'search-message';
        messageEl.style.cssText = `
            text-align: center;
            padding: 2rem;
            color: var(--text-secondary);
            font-size: 1.125rem;
            grid-column: 1 / -1;
        `;
        document.querySelector('.blog-grid, .products-grid')?.appendChild(messageEl);
    }
    messageEl.textContent = message;
}

function hideSearchMessage() {
    const messageEl = document.querySelector('.search-message');
    if (messageEl) {
        messageEl.remove();
    }
}

// Category Filter
function initializeCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterByCategory(category);
        });
    });
}

function filterByCategory(category) {
    const allCards = document.querySelectorAll('.blog-card, .product-card');
    let visibleCount = 0;
    
    allCards.forEach(card => {
        const cardCategory = card.querySelector('.card-category')?.textContent.toLowerCase() || '';
        
        if (category === 'all' || cardCategory.includes(category.toLowerCase())) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    if (visibleCount === 0) {
        showSearchMessage(`No items found in "${category}" category`);
    } else {
        hideSearchMessage();
    }
}

// Pagination
function initializePagination() {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;
    
    const itemsPerPage = 6;
    const allCards = document.querySelectorAll('.blog-card, .product-card');
    const totalPages = Math.ceil(allCards.length / itemsPerPage);
    let currentPage = 1;
    
    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        
        allCards.forEach((card, index) => {
            if (index >= start && index < end) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        updatePaginationButtons(page, totalPages);
    }
    
    function updatePaginationButtons(current, total) {
        paginationContainer.innerHTML = '';
        
        // Previous button
        const prevBtn = createPaginationButton('Previous', current > 1);
        if (current > 1) {
            prevBtn.addEventListener('click', () => {
                currentPage--;
                showPage(currentPage);
            });
        }
        paginationContainer.appendChild(prevBtn);
        
        // Page numbers
        for (let i = 1; i <= total; i++) {
            const pageBtn = createPaginationButton(i.toString(), true, i === current);
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                showPage(currentPage);
            });
            paginationContainer.appendChild(pageBtn);
        }
        
        // Next button
        const nextBtn = createPaginationButton('Next', current < total);
        if (current < total) {
            nextBtn.addEventListener('click', () => {
                currentPage++;
                showPage(currentPage);
            });
        }
        paginationContainer.appendChild(nextBtn);
    }
    
    function createPaginationButton(text, enabled, active = false) {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.className = `pagination-btn ${active ? 'active' : ''} ${!enabled ? 'disabled' : ''}`;
        btn.disabled = !enabled;
        return btn;
    }
    
    // Initialize first page
    if (allCards.length > itemsPerPage) {
        showPage(1);
    }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeCategoryFilter();
    initializePagination();
});

// Utility Functions
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

// Back to Top Button
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    }, 100));
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);