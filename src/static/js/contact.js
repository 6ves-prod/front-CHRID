/* ==========================================
   CRIHD CONTACT PAGE - JavaScript
   ========================================== */

/**
 * Initialisation de la page contact
 */
function initializeContact() {
    initializeContactForm();
    initializeAnimations();
    initializeScrollEffects();
}
/**
 * Initialisation des animations spécifiques à la page contact
 */
function initializeAnimations() {
    // Animation des éléments au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animation spéciale pour les méthodes de contact
                if (entry.target.classList.contains('contact-methods')) {
                    animateContactMethods(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Éléments à observer
    const elementsToObserve = document.querySelectorAll(`
        .hero-content,
        .hero-description,
        .contact-info-content,
        .contact-methods,
        .form-container
    `);
    
    elementsToObserve.forEach(element => {
        if (element) observer.observe(element);
    });
}

/**
 * Animation des méthodes de contact
 * @param {Element} container - Conteneur des méthodes de contact
 */
function animateContactMethods(container) {
    const methods = container.querySelectorAll('.contact-method');
    
    methods.forEach((method, index) => {
        method.style.opacity = '0';
        method.style.transform = 'translateY(30px)';
        method.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            method.style.opacity = '1';
            method.style.transform = 'translateY(0)';
        }, index * 200 + 300);
    });
}


/**
 * Gestion des interactions avancées
 */
function initializeAdvancedInteractions() {
    // Effet hover sur les méthodes de contact
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.background = 'rgba(197, 60, 60, 0.2)';
            }
        });
        
        method.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });
    });
}

/**
 * Gestion du redimensionnement spécifique à la page contact
 */
function handleContactPageResize() {
    // Ajuster la hauteur de l'image du formulaire sur mobile
    const formImage = document.querySelector('.form-image img');
    
    if (formImage && window.innerWidth <= 768) {
        formImage.style.height = '300px';
    } else if (formImage) {
        formImage.style.height = '500px';
    }
    
    // Réorganiser les méthodes de contact sur mobile
    const contactMethods = document.querySelector('.contact-methods');
    
    if (contactMethods) {
        if (window.innerWidth <= 768) {
            contactMethods.style.gridTemplateColumns = '1fr';
            contactMethods.style.gap = '24px';
        } else {
            contactMethods.style.gridTemplateColumns = 'repeat(3, 1fr)';
            contactMethods.style.gap = '40px';
        }
    }
}
