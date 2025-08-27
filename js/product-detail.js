// Product Detail Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeProductTabs();
    initializeThumbnailGallery();
    initializePricingTables();
});

// Tab Functionality
function initializeProductTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab)?.classList.add('active');
            
            // Smooth scroll to tabs
            document.querySelector('.details-tabs')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Thumbnail Gallery
function initializeThumbnailGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    if (!mainImage) return;
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const newImageSrc = this.querySelector('img').src.replace(/w=\d+&h=\d+/, 'w=600&h=400');
            const newImageAlt = this.querySelector('img').alt;
            
            // Fade effect
            mainImage.style.opacity = '0.5';
            setTimeout(() => {
                mainImage.src = newImageSrc;
                mainImage.alt = newImageAlt;
                mainImage.style.opacity = '1';
            }, 200);
        });
    });
}

// Pricing Table Interactions
function initializePricingTables() {
    const pricingTables = document.querySelectorAll('.pricing-table');
    
    pricingTables.forEach(table => {
        table.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        table.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// Storage Options Selection (for iPad models)
function initializeStorageOptions() {
    const storageOptions = document.querySelectorAll('.storage-option');
    
    storageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const parentCard = this.closest('.model-card');
            const siblingOptions = parentCard.querySelectorAll('.storage-option');
            
            // Remove active class from siblings
            siblingOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update any related price displays
            updateSelectedPrice(this);
        });
    });
}

function updateSelectedPrice(option) {
    const price = option.querySelector('.storage-price').textContent;
    const storage = option.querySelector('.storage-size').textContent;
    
    // Find and update main price display if it exists
    const priceSection = document.querySelector('.price-section .price-main');
    if (priceSection && priceSection.textContent.includes('$799 - $2,099')) {
        const priceDetails = document.querySelector('.price-section .price-details');
        if (priceDetails) {
            priceDetails.textContent = `${storage} model selected • Student discounts available • Apple Pencil sold separately`;
        }
    }
}

// Review Helpful Functionality
document.addEventListener('click', function(e) {
    if (e.target.matches('.review-helpful button') || e.target.closest('.review-helpful button')) {
        const button = e.target.closest('.review-helpful button');
        const icon = button.querySelector('i');
        const text = button.textContent;
        const match = text.match(/\((\d+)\)/);
        
        if (match) {
            const currentCount = parseInt(match[1]);
            const newCount = currentCount + 1;
            
            // Update button text
            button.innerHTML = `<i class="fas fa-thumbs-up"></i> Helpful (${newCount})`;
            
            // Visual feedback
            button.style.backgroundColor = 'var(--primary-color)';
            button.style.color = 'white';
            button.style.borderColor = 'var(--primary-color)';
            button.disabled = true;
            
            // Add a small animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        }
    }
});

// Save for Later Functionality
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-cta') && e.target.textContent.includes('Save for Later')) {
        e.preventDefault();
        
        const button = e.target;
        const originalText = button.innerHTML;
        const icon = button.querySelector('i');
        
        // Change icon and text
        icon.className = 'fas fa-check';
        button.innerHTML = '<i class="fas fa-check"></i> Saved!';
        button.style.backgroundColor = '#10b981';
        
        // Revert after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    }
});

// Smooth Scroll for CTA Buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Rating Bar Animation
function animateRatingBars() {
    const ratingFills = document.querySelectorAll('.rating-fill, .satisfaction-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.style.width;
                
                // Reset width and animate
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.transition = 'width 1s ease-out';
                    fill.style.width = width;
                }, 100);
                
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });
    
    ratingFills.forEach(fill => observer.observe(fill));
}

// Initialize rating animations when page loads
document.addEventListener('DOMContentLoaded', animateRatingBars);

// Comparison Table Hover Effects
function initializeComparisonInteractions() {
    const comparisonItems = document.querySelectorAll('.comparison-item');
    
    comparisonItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Course Item Interactions
function initializeCourseInteractions() {
    const courseItems = document.querySelectorAll('.course-item');
    
    courseItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.borderLeftWidth = '6px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.borderLeftWidth = '4px';
        });
    });
}

// Model Card Selection
function initializeModelSelection() {
    const modelCards = document.querySelectorAll('.model-card');
    
    modelCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selection from all cards
            modelCards.forEach(c => c.classList.remove('selected'));
            
            // Add selection to clicked card
            this.classList.add('selected');
            
            // Update any price displays
            const modelName = this.querySelector('h3').textContent;
            const startingPrice = this.querySelector('.storage-option .storage-price').textContent;
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

// Specialization Item Interactions
function initializeSpecializationInteractions() {
    const specializationItems = document.querySelectorAll('.specialization-item');
    
    specializationItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Initialize all interactions
document.addEventListener('DOMContentLoaded', function() {
    initializeComparisonInteractions();
    initializeCourseInteractions();
    initializeModelSelection();
    initializeSpecializationInteractions();
    initializeStorageOptions();
});

// Lazy Loading for Course Content
function initializeLazyLoading() {
    const courseItems = document.querySelectorAll('.course-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    courseItems.forEach(item => observer.observe(item));
}

// Error Handling for External Links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[target="_blank"]')) {
        // Add loading state to external links
        const link = e.target;
        const originalText = link.textContent;
        
        // Don't interfere with actual navigation, just add visual feedback
        link.style.opacity = '0.7';
        setTimeout(() => {
            link.style.opacity = '1';
        }, 300);
    }
});

// Price Animation on Scroll
function initializePriceAnimations() {
    const priceElements = document.querySelectorAll('.price-main, .plan-price');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceEl = entry.target;
                priceEl.style.animation = 'pricePopIn 0.6s ease-out';
                observer.unobserve(priceEl);
            }
        });
    }, { threshold: 0.5 });
    
    priceElements.forEach(price => observer.observe(price));
}

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes pricePopIn {
        0% {
            transform: scale(0.8);
            opacity: 0;
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .model-card.selected {
        border-color: var(--primary-color);
        box-shadow: var(--shadow-lg);
        transform: translateY(-3px);
    }
    
    .storage-option.active {
        background-color: var(--primary-color);
        color: white;
    }
    
    .storage-option {
        cursor: pointer;
        transition: var(--transition);
    }
    
    .storage-option:hover {
        background-color: var(--background-alt);
    }
`;
document.head.appendChild(style);

// Initialize price animations
document.addEventListener('DOMContentLoaded', initializePriceAnimations);