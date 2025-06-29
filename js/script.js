// The Drey Effect - Main JavaScript File
const WHATSAPP_NUMBER = "2349122376602";  // Replace with your real number here
// Global variables
let currentBookingsLeft = 20;
let totalPrice = 0;
let basePrice = 0;
let selectedOptions = {
    material: null,
    length: null,
    shape: null,
    baseStyle: null,
    nailArt: [],
    colorPalette: null,
    addons: []
};

// Gallery data
const galleryImages = [
    {
        src: 'img/chrome.jpeg',
        title: 'Chrome Tips',
        category: 'chrome',
        description: 'Elegant nails with chrome finish'
    },
    {
        src: 'img/custom floral art.jpeg',
        title: 'Custom Floral Art',
        category: 'custom',
        description: 'Hand-painted floral design with rhinestone accents'
    },
    {
        src: 'img/ombre.jpeg',
        title: 'Sunset Ombre',
        category: 'ombre',
        description: 'Beautiful gradient from orange to pink'
    },
    {
        src: 'img/rhinestone gel.jpeg',
        title: 'Rhinestone Glam',
        category: 'rhinestone',
        description: 'Luxurious rhinestone placement on nude base'
    },
    {
        src: 'img/french tips.jpeg',
        title: 'Classic French',
        category: 'french',
        description: 'Timeless white French tips on natural base'
    },
    {
        src: 'img/abstract.jpeg',
        title: 'Abstract Art',
        category: 'custom',
        description: 'Modern abstract design with bold colors'
    },
    {
        src: 'img/pink ombre.jpeg',
        title: 'Pink Ombre',
        category: 'ombre',
        description: 'Soft pink gradient with glitter accent'
    },
    {
        src: 'img/rhinsetone diamonds.jpeg',
        title: 'Diamond Accent',
        category: 'rhinestone',
        description: 'Single statement nail with diamond cluster'
    }
];

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // Small delay to ensure all elements are rendered
    setTimeout(() => {
        initializeWebsite();
        
        // Additional setup for visual options if they still don't work
        setupVisualOptionsDirectly();
    }, 100);
});

// Direct setup for visual options as fallback
function setupVisualOptionsDirectly() {
    // Add click handlers directly to all option items
    const allOptions = document.querySelectorAll('.option-item, .color-item');
    console.log('Setting up', allOptions.length, 'option items directly');
    
    allOptions.forEach((option, index) => {
        // Remove any existing listeners to avoid duplicates
        option.replaceWith(option.cloneNode(true));
        const freshOption = document.querySelectorAll('.option-item, .color-item')[index];
        
        freshOption.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Option clicked:', this.getAttribute('data-name'));
            
            // Determine option type based on data-name
            const name = this.getAttribute('data-name');
            let optionType = 'unknown';
            
            if (['gel', 'acrylic'].includes(name)) optionType = 'material';
            else if (['short', 'medium', 'long', 'extra-long'].includes(name)) optionType = 'length';
            else if (['square', 'coffin', 'almond', 'stiletto'].includes(name)) optionType = 'shape';
            else if (['plain', 'french', 'ombre', 'chrome'].includes(name)) optionType = 'baseStyle';
            else if (['nude', 'bold', 'pastels', 'blackwhite'].includes(name)) optionType = 'colorPalette';
            
            handleOptionSelection(this, optionType);
        });
        
        // Add cursor pointer style
        freshOption.style.cursor = 'pointer';
        
        // Add hover effect
        freshOption.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        
        freshOption.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
}

// Initialize all website functionality
function initializeWebsite() {
    setupNavigation();
    setupGallery();
    setupBookingForm();
    setupLightbox();
    setupMobileMenu();
    setupSpecialOffer();
    setupScrollAnimations();
    setMinDate();
    updateBookingsCounter();
    
    // Add debugging
    console.log('Website initialized');
    console.log('Visual options found:', document.querySelectorAll('.visual-options .option-item').length);
    console.log('Color options found:', document.querySelectorAll('.color-options .color-item').length);
}

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll to section
            scrollToSection(targetId);
        });
    });

    // Handle scroll to update active nav item
    window.addEventListener('scroll', updateActiveNavOnScroll);
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = 80;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Update active navigation item on scroll
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`[href="#${section.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

// Mobile Menu Setup
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Gallery Setup
function setupGallery() {
    populateGallery();
    setupGalleryFilters();
}

// Populate gallery with images
function populateGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = '';
    
    galleryImages.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-category', image.category);
        
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}" class="gallery-image" 
                 onclick="openLightbox('${image.src}', '${image.title}', '${image.description}')"
                 onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect width=\"300\" height=\"300\" fill=\"%23f0f0f0\"/><text x=\"150\" y=\"150\" text-anchor=\"middle\" fill=\"%23666\" font-family=\"Arial\" font-size=\"14\">Nail Art Sample</text></svg>'">
        `;
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Setup gallery filters
function setupGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            filterGallery(filter);
        });
    });
}

// Filter gallery items
function filterGallery(filter) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
            item.style.display = 'none';
        }
    });
}

// Lightbox Setup
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
}

// Open lightbox
function openLightbox(src, title, description) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    
    if (lightbox && lightboxImage) {
        lightboxImage.src = src;
        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Booking Form Setup
function setupBookingForm() {
    setupFormInteractions();
    setupPriceCalculation();
    setupFormValidation();
    setupFileUpload();
    setupPaymentOptions();
}

// Setup form interactions
function setupFormInteractions() {
    // Material selection
    setupOptionSelection('.visual-options .option-item', 'material');
    
    // Color palette selection
    setupOptionSelection('.color-options .color-item', 'colorPalette');
    
    // Checkbox options for nail art and add-ons
    setupCheckboxOptions();
    
    // Add click handlers for all option groups
    setupAllOptionGroups();
}




// Generic option selection setup
function setupOptionSelection(selector, optionType) {
    const options = document.querySelectorAll(selector);
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            const parent = this.closest('.visual-options, .color-options');
            
            // Remove active class from siblings
            parent.querySelectorAll('.option-item, .color-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Update selected options
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price')) || 0;
            
            selectedOptions[optionType] = { name, price };
            
            updatePricing();
        });
    });
}

// Setup all option groups with specific handlers
function setupAllOptionGroups() {
    // Nail Material options
    document.querySelectorAll('[data-name="gel"], [data-name="acrylic"]').forEach(option => {
        option.addEventListener('click', function() {
            handleOptionSelection(this, 'material');
        });
    });
    
    // Nail Length options
    document.querySelectorAll('[data-name="short"], [data-name="medium"], [data-name="long"], [data-name="extra-long"]').forEach(option => {
        option.addEventListener('click', function() {
            handleOptionSelection(this, 'length');
        });
    });
    
    // Nail Shape options
    document.querySelectorAll('[data-name="square"], [data-name="coffin"], [data-name="almond"], [data-name="stiletto"]').forEach(option => {
        option.addEventListener('click', function() {
            handleOptionSelection(this, 'shape');
        });
    });
    
    // Base Style options
    document.querySelectorAll('[data-name="plain"], [data-name="french"], [data-name="ombre"], [data-name="chrome"]').forEach(option => {
        option.addEventListener('click', function() {
            handleOptionSelection(this, 'baseStyle');
        });
    });
    
    // Color Palette options
    document.querySelectorAll('[data-name="nude"], [data-name="bold"], [data-name="pastels"], [data-name="blackwhite"]').forEach(option => {
        option.addEventListener('click', function() {
            handleOptionSelection(this, 'colorPalette');
        });
    });
}

// Handle option selection with visual feedback
function handleOptionSelection(clickedOption, optionType) {
    // Find the parent container
    const parent = clickedOption.closest('.visual-options, .color-options');
    
    // Remove active class from all siblings in this group
    parent.querySelectorAll('.option-item, .color-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    clickedOption.classList.add('active');
    
    // Update selected options
    const name = clickedOption.getAttribute('data-name');
    const price = parseInt(clickedOption.getAttribute('data-price')) || 0;
    
    selectedOptions[optionType] = { name, price };
    
    // Add visual feedback
    clickedOption.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickedOption.style.transform = 'scale(1)';
    }, 150);
    
    console.log(`Selected ${optionType}:`, selectedOptions[optionType]); // Debug log
    
    updatePricing();
}

// Setup checkbox options
function setupCheckboxOptions() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const name = this.getAttribute('name');
            const value = this.value;
            const price = parseInt(this.getAttribute('data-price')) || 0;
            
            if (name === 'nailArt') {
                updateArrayOption('nailArt', value, price, this.checked);
            } else if (name === 'addons') {
                updateArrayOption('addons', value, price, this.checked);
            }
            
            updatePricing();
        });
    });
}

// Update array options (nail art, add-ons)
function updateArrayOption(optionType, value, price, isChecked) {
    if (isChecked) {
        selectedOptions[optionType].push({ name: value, price });
    } else {
        selectedOptions[optionType] = selectedOptions[optionType].filter(item => item.name !== value);
    }
}

// Setup price calculation
function setupPriceCalculation() {
    updatePricing(); // Initial calculation
}

// Update pricing display
function updatePricing() {
    let total = 0;
    const priceBreakdown = document.getElementById('priceBreakdown');
    
    if (!priceBreakdown) return;
    
    // Clear previous breakdown
    priceBreakdown.innerHTML = '';
    
    // Base service (material)
    if (selectedOptions.material) {
        basePrice = selectedOptions.material.price;
        total += basePrice;
        addPriceItem('Base Service (' + selectedOptions.material.name + ')', basePrice);
    }
    
    // Length
    if (selectedOptions.length) {
        total += selectedOptions.length.price;
        if (selectedOptions.length.price > 0) {
            addPriceItem('Length (' + selectedOptions.length.name + ')', selectedOptions.length.price);
        }
    }
    
    // Base style
    if (selectedOptions.baseStyle) {
        total += selectedOptions.baseStyle.price;
        if (selectedOptions.baseStyle.price > 0) {
            addPriceItem('Base Style (' + selectedOptions.baseStyle.name + ')', selectedOptions.baseStyle.price);
        }
    }
    
    // Nail art
    selectedOptions.nailArt.forEach(art => {
        total += art.price;
        addPriceItem('Nail Art (' + art.name + ')', art.price);
    });
    
    // Add-ons
    selectedOptions.addons.forEach(addon => {
        total += addon.price;
        addPriceItem('Add-on (' + addon.name + ')', addon.price);
    });
    
    totalPrice = total;
    
    // Apply discount if eligible
    const discountSection = document.getElementById('discountSection');
    const discountAmount = document.getElementById('discountAmount');
    
    if (currentBookingsLeft > 0) {
        const discount = Math.round(total * 0.2);
        total -= discount;
        
        if (discountSection && discountAmount) {
            discountSection.style.display = 'block';
            discountAmount.textContent = '-₦' + discount;
        }
    } else if (discountSection) {
        discountSection.style.display = 'none';
    }
    
    // Update display
    updatePriceDisplay(total);
}

// Add price item to breakdown
function addPriceItem(description, price) {
    const priceBreakdown = document.getElementById('priceBreakdown');
    const priceItem = document.createElement('div');
    priceItem.className = 'price-item';
    priceItem.innerHTML = `
        <span>${description}:</span>
        <span>₦${price}</span>
    `;
    priceBreakdown.appendChild(priceItem);
}

// Update price display
function updatePriceDisplay(total) {
    const totalPriceElement = document.getElementById('totalPrice');
    const depositAmountElement = document.getElementById('depositAmount');
    
    if (totalPriceElement) {
        totalPriceElement.textContent = '₦' + total;
    }
    
    if (depositAmountElement) {
        const deposit = Math.round(total / 3);
        depositAmountElement.textContent = '₦' + deposit;
    }
}

// Setup form validation
function setupFormValidation() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateBookingForm()) {
                submitBookingForm();
            }
        });
    }
}

// Validate booking form
function validateBookingForm() {
    const requiredFields = ['clientName', 'clientEmail', 'clientPhone', 'preferredDate', 'preferredTime'];
    let isValid = true;
    
    // Check required fields
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else if (field) {
            clearFieldError(field);
        }
    });
    
    // Check if material is selected
    if (!selectedOptions.material) {
        showFormError('Please select a nail material');
        isValid = false;
    }
    
    // Check payment option
    const paymentOption = document.querySelector('input[name="paymentOption"]:checked');
    if (!paymentOption) {
        showFormError('Please select a payment option');
        isValid = false;
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Show form error
function showFormError(message) {
    // Create or update form error message
    let errorContainer = document.querySelector('.form-error');
    if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.className = 'form-error';
        document.querySelector('.booking-form').prepend(errorContainer);
    }
    
    errorContainer.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    
    // Scroll to error
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Submit booking form
function submitBookingForm() {
    const submitBtn = document.querySelector('.booking-form button[type="submit"]');
    const submitText = document.getElementById('submitText');
    
    // Show loading state
    if (submitBtn && submitText) {
        submitBtn.disabled = true;
        submitText.textContent = 'Processing...';
    }
    
    // Simulate form submission
    setTimeout(() => {
        // Update bookings counter
        if (currentBookingsLeft > 0) {
            currentBookingsLeft--;
            updateBookingsCounter();
        }
        
        // Show success message
        showBookingSuccess();
        
        // Reset form
        resetBookingForm();
        
        // Reset button state
        if (submitBtn && submitText) {
            submitBtn.disabled = false;
            submitText.textContent = 'Book Appointment';
        }
    }, 2000);
}

// Show booking success
function showBookingSuccess() {
    const successModal = document.createElement('div');
    successModal.className = 'booking-success-modal';
    successModal.innerHTML = `
        <div class="success-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Booking Confirmed!</h3>
            <p>Thank you for choosing The Drey Effect. We'll contact you within 24 hours to confirm your appointment details.</p>
            <button class="btn btn-primary" onclick="closeSuccessModal()">Continue</button>
        </div>
    `;
    
    document.body.appendChild(successModal);
    document.body.style.overflow = 'hidden';
}

// Close success modal
function closeSuccessModal() {
    const modal = document.querySelector('.booking-success-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Reset booking form
function resetBookingForm() {
    const form = document.getElementById('bookingForm');
    if (form) {
        form.reset();
    }
    
    // Reset selected options
    selectedOptions = {
        material: null,
        length: null,
        shape: null,
        baseStyle: null,
        nailArt: [],
        colorPalette: null,
        addons: []
    };
    
    // Remove active classes
    document.querySelectorAll('.option-item, .color-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Reset pricing
    updatePricing();
}

// Setup file upload
function setupFileUpload() {
    const fileInput = document.getElementById('referencePhoto');
    const fileDisplay = document.querySelector('.file-upload-display');
    
    if (fileInput && fileDisplay) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                fileDisplay.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <span>${file.name}</span>
                `;
                fileDisplay.classList.add('has-file');
            }
        });
    }
}

// Setup payment options
function setupPaymentOptions() {
    const paymentRadios = document.querySelectorAll('input[name="paymentOption"]');
    const paymentTimer = document.getElementById('paymentTimer');
    
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'later' && paymentTimer) {
                paymentTimer.style.display = 'block';
                startPaymentCountdown();
            } else if (paymentTimer) {
                paymentTimer.style.display = 'none';
            }
        });
    });
}

// Start payment countdown
function startPaymentCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    let timeLeft = 24 * 60 * 60; // 24 hours in seconds
    
    const timer = setInterval(() => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        countdownElement.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(timer);
            countdownElement.textContent = 'Payment overdue';
        }
    }, 1000);
}

// Set minimum date for booking
function setMinDate() {
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }
}

// Special Offer Setup
function setupSpecialOffer() {
    updateBookingsCounter();
    
    // Auto-hide offer when bookings reach 0
    const offerElement = document.getElementById('specialOffer');
    if (currentBookingsLeft <= 0 && offerElement) {
        offerElement.style.display = 'none';
    }
}

// Update bookings counter
function updateBookingsCounter() {
    const bookingsLeftElement = document.getElementById('bookingsLeft');
    if (bookingsLeftElement) {
        bookingsLeftElement.textContent = currentBookingsLeft;
        
        // Change color when low
        if (currentBookingsLeft <= 5) {
            bookingsLeftElement.style.color = '#ff6b6b';
            bookingsLeftElement.style.fontWeight = 'bold';
        }
        
        // Hide offer when no bookings left
        if (currentBookingsLeft <= 0) {
            const offerElement = document.getElementById('specialOffer');
            if (offerElement) {
                offerElement.style.display = 'none';
            }
        }
    }
}

// Scroll Animations Setup
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .gallery-item, .about-feature, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Utility Functions

// Debounce function
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

// Format phone number
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}

// Add phone formatting to phone input
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('clientPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            e.target.value = formatPhoneNumber(e.target.value);
        });
    }
});

// Handle window resize for mobile menu
window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth > 768) {
        if (navLinks) navLinks.classList.remove('active');
        if (mobileToggle) mobileToggle.classList.remove('active');
    }
});

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close lightbox with Escape key
    if (e.key === 'Escape') {
        closeLightbox();
        closeSuccessModal();
    }
    
    // Handle Enter key on option items
    if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('option-item') || 
            focusedElement.classList.contains('color-item')) {
            focusedElement.click();
        }
    }
});

// Performance optimization: Lazy load images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', setupLazyLoading);

// Export functions for global access (if needed)
window.scrollToSection = scrollToSection;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.closeSuccessModal = closeSuccessModal;










function submitBookingForm() {
    const submitBtn = document.querySelector('.booking-form button[type="submit"]');
    const submitText = document.getElementById('submitText');
    
    // Show loading state
    if (submitBtn && submitText) {
        submitBtn.disabled = true;
        submitText.textContent = 'Processing...';
    }
    
    // Prepare WhatsApp message content
    const clientName = document.getElementById('clientName').value.trim();
    const clientEmail = document.getElementById('clientEmail').value.trim();
    const clientPhone = document.getElementById('clientPhone').value.trim();
    const preferredDate = document.getElementById('preferredDate').value;
    const preferredTime = document.getElementById('preferredTime').value;
    const paymentOption = document.querySelector('input[name="paymentOption"]:checked').value;
    const specialRequests = document.getElementById('specialRequests').value.trim() || "None";
    
    // Build a detailed list of selections
    let selectionsText = "";
    
    if(selectedOptions.material) selectionsText += `Nail Material: ${selectedOptions.material.name}\n`;
    if(selectedOptions.length) selectionsText += `Nail Length: ${selectedOptions.length.name}\n`;
    if(selectedOptions.shape) selectionsText += `Nail Shape: ${selectedOptions.shape.name}\n`;
    if(selectedOptions.baseStyle) selectionsText += `Base Style: ${selectedOptions.baseStyle.name}\n`;
    if(selectedOptions.colorPalette) selectionsText += `Color Palette: ${selectedOptions.colorPalette.name}\n`;
    
    // Nail Art (array)
    if(selectedOptions.nailArt.length > 0) {
        const nailArtList = selectedOptions.nailArt.map(item => item.name).join(", ");
        selectionsText += `Nail Art: ${nailArtList}\n`;
    } else {
        selectionsText += `Nail Art: None\n`;
    }
    
    // Add-ons (array)
    if(selectedOptions.addons.length > 0) {
        const addonsList = selectedOptions.addons.map(item => item.name).join(", ");
        selectionsText += `Add-ons: ${addonsList}\n`;
    } else {
        selectionsText += `Add-ons: None\n`;
    }
    
    // Total price (show final after discount if any)
    const totalPayment = totalPrice;
    
    // Payment option text
    let paymentText = "";
    if(paymentOption === "full") paymentText = "Pay Full Amount Now";
    else if(paymentOption === "deposit") paymentText = "Pay Deposit Now (Remaining at appointment)";
    else if(paymentOption === "later") paymentText = "Reserve Now, Pay Deposit Within 24 Hours";
    
    // Compose message
    const message = 
`Hello! I'd like to book an appointment at The Drey Effect:

Name: ${clientName}
Email: ${clientEmail}
Phone: ${clientPhone}

Preferred Date: ${preferredDate}
Preferred Time: ${preferredTime}

Selections:
${selectionsText}
Special Requests: ${specialRequests}

Payment Option: ${paymentText}
Total Price: ₦${totalPayment}

Thank you!`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp URL
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Simulate processing delay, then redirect
    setTimeout(() => {
        // Update bookings counter
        if (currentBookingsLeft > 0) {
            currentBookingsLeft--;
            updateBookingsCounter();
        }
        
        // Reset form
        resetBookingForm();
        
        // Redirect to WhatsApp
        window.open = (whatsappUrl, '_blank');
        
        // Reset button state (in case redirect is canceled)
        if (submitBtn && submitText) {
            submitBtn.disabled = false;
            submitText.textContent = 'Book Appointment';
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    setupBookingForm();        // sets up interactions, price calc, etc.
    setupFormValidation();     // now your form will work!
});

