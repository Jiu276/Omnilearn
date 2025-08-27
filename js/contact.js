// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeFAQInteractions();
});

function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm(form)) {
            submitForm(form, submitBtn, btnText, btnLoading);
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error state when user starts typing
            if (this.classList.contains('error')) {
                this.classList.remove('error');
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Email validation
    const emailField = form.querySelector('#email');
    if (emailField.value && !isValidEmail(emailField.value)) {
        showFieldError(emailField, 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        animation: fadeInUp 0.3s ease-out;
    `;
    
    field.parentNode.appendChild(errorDiv);
    
    // Update field styles
    field.style.borderColor = '#ef4444';
}

function clearFieldError(field) {
    field.classList.remove('error');
    field.style.borderColor = '';
    
    const errorMsg = field.parentNode.querySelector('.field-error');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function submitForm(form, submitBtn, btnText, btnLoading) {
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    
    // Simulate form submission (replace with actual API call)
    try {
        await simulateFormSubmission(new FormData(form));
        showSuccessMessage();
        form.reset();
        
        // Track form submission
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'Contact',
                'event_label': 'Contact Form'
            });
        }
        
    } catch (error) {
        showErrorMessage('Something went wrong. Please try again.');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate random success/failure (90% success rate)
            if (Math.random() > 0.1) {
                resolve('Form submitted successfully');
            } else {
                reject(new Error('Network error'));
            }
        }, 2000);
    });
}

function showSuccessMessage() {
    const form = document.getElementById('contact-form');
    
    // Remove existing messages
    removeExistingMessages(form);
    
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success show';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <strong>Thank you for your message!</strong><br>
        We'll get back to you within 24-48 hours.
    `;
    
    form.insertBefore(successDiv, form.firstChild);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove message after 10 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 10000);
}

function showErrorMessage(message) {
    const form = document.getElementById('contact-form');
    
    // Remove existing messages
    removeExistingMessages(form);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error show';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <strong>Error:</strong> ${message}
    `;
    
    form.insertBefore(errorDiv, form.firstChild);
    
    // Remove message after 8 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 8000);
}

function removeExistingMessages(form) {
    const existingSuccess = form.querySelector('.form-success');
    const existingError = form.querySelector('.form-error');
    
    if (existingSuccess) existingSuccess.remove();
    if (existingError) existingError.remove();
}

// FAQ interactions
function initializeFAQInteractions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Contact method interactions
document.addEventListener('DOMContentLoaded', function() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        const emailLink = method.querySelector('a[href^="mailto:"]');
        
        if (emailLink) {
            emailLink.addEventListener('click', function(e) {
                // Add visual feedback
                method.style.backgroundColor = 'var(--primary-color)';
                method.style.color = 'white';
                
                setTimeout(() => {
                    method.style.backgroundColor = '';
                    method.style.color = '';
                }, 300);
                
                // Track email clicks
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        'event_category': 'Contact',
                        'event_label': 'Email Link',
                        'value': this.href
                    });
                }
            });
        }
    });
});

// Social media tracking
document.addEventListener('click', function(e) {
    if (e.target.closest('.social-section .social-link')) {
        const link = e.target.closest('.social-section .social-link');
        const platform = link.querySelector('i').className;
        
        // Track social media clicks
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'Social Media',
                'event_label': platform,
                'value': link.href
            });
        }
    }
});

// Form field focus animations
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentNode.classList.remove('focused');
            }
        });
        
        // Check for pre-filled fields
        if (field.value) {
            field.parentNode.classList.add('focused');
        }
    });
});

// Auto-resize textarea
document.addEventListener('DOMContentLoaded', function() {
    const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
});

// Character counter for message field
document.addEventListener('DOMContentLoaded', function() {
    const messageField = document.getElementById('message');
    const maxLength = 1000;
    
    if (messageField) {
        // Create character counter
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.875rem;
            color: var(--text-light);
            margin-top: 0.25rem;
        `;
        messageField.parentNode.appendChild(counter);
        
        function updateCounter() {
            const remaining = maxLength - messageField.value.length;
            counter.textContent = `${remaining} characters remaining`;
            
            if (remaining < 50) {
                counter.style.color = '#ef4444';
            } else if (remaining < 150) {
                counter.style.color = '#f59e0b';
            } else {
                counter.style.color = 'var(--text-light)';
            }
        }
        
        messageField.addEventListener('input', updateCounter);
        messageField.setAttribute('maxlength', maxLength);
        updateCounter(); // Initial call
    }
});

// Copy email address functionality
function copyEmailToClipboard(email) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
            showToast('Email address copied to clipboard!');
        }).catch(() => {
            fallbackCopyText(email);
        });
    } else {
        fallbackCopyText(email);
    }
}

function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('Email address copied to clipboard!');
    } catch (err) {
        showToast('Could not copy email address');
    } finally {
        document.body.removeChild(textArea);
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background-color: var(--text-primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        font-size: 0.875rem;
        z-index: 1000;
        animation: slideInUp 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutDown 0.3s ease-in forwards';
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
    
    .form-group.focused label {
        color: var(--primary-color);
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .character-counter {
        transition: color 0.3s ease;
    }
`;
document.head.appendChild(style);