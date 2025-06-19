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
 * Initialisation du formulaire de contact
 */
function initializeContactForm() {
    const form = document.querySelector('form[data-validate]');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');
    
    // Validation en temps réel
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', CRIHD.utils.debounce(() => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        }, 300));
    });
    
    // Soumission du formulaire
    form.addEventListener('submit', handleContactFormSubmit);
}

/**
 * Gestion de la soumission du formulaire de contact
 * @param {Event} e - Événement de soumission
 */
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    // Valider tous les champs
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        submitContactForm(form);
    }
}

/**
 * Validation d'un champ spécifique
 * @param {Element} field - Champ à valider
 * @returns {boolean}
 */
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    let isValid = true;
    let message = '';

    // Supprimer les anciens messages d'erreur
    removeFieldError(field);
    
    // Vérification obligatoire
    if (required && !value) {
        isValid = false;
        message = 'Ce champ est obligatoire';
    }
    
    // Validation spécifique par type
    if (value) {
        switch (type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    message = 'Veuillez entrer une adresse email valide';
                }
                break;
                
            case 'tel':
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
                if (!phoneRegex.test(value) || value.length < 8) {
                    isValid = false;
                    message = 'Veuillez entrer un numéro de téléphone valide';
                }
                break;
        }
        
        // Validation pour textarea (message)
        if (field.tagName.toLowerCase() === 'textarea' && value.length < 10) {
            isValid = false;
            message = 'Le message doit contenir au moins 10 caractères';
        }
    }
    
    // Afficher le résultat de la validation
    showFieldValidation(field, isValid, message);
    return isValid;
}

/**
 * Affichage de la validation d'un champ
 * @param {Element} field - Champ
 * @param {boolean} isValid - État de validation
 * @param {string} message - Message d'erreur
 */
function showFieldValidation(field, isValid, message) {
    // Supprimer les classes d'état précédentes
    field.classList.remove('error', 'success');
    
    if (!isValid) {
        // Ajouter la classe d'erreur
        field.classList.add('error');
        
        // Afficher le message d'erreur
        if (message) {
            showFieldError(field, message);
        }
    } else if (field.value.trim()) {
        // Ajouter la classe de succès si le champ a une valeur
        field.classList.add('success');
    }
}

/**
 * Afficher un message d'erreur pour un champ
 * @param {Element} field - Champ
 * @param {string} message - Message d'erreur
 */
function showFieldError(field, message) {
    const container = field.closest('.form-group') || field.parentNode;
    
    // Créer l'élément d'erreur
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    // Ajouter après le champ
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

/**
 * Supprimer le message d'erreur d'un champ
 * @param {Element} field - Champ
 */
function removeFieldError(field) {
    const container = field.closest('.form-group') || field.parentNode;
    const errorElement = container.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Soumission du formulaire de contact
 * @param {Element} form - Formulaire
 */
function submitContactForm(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // État de chargement
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    
    // Simuler l'envoi (remplacer par vraie API)
    setTimeout(() => {
        // État de succès
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
        submitBtn.classList.add('success');
        
        // Notification de succès
        if (typeof showNotification === 'function') {
            showNotification('Votre message a été envoyé avec succès !', 'success');
        }
        
        // Reset après 3 secondes
        setTimeout(() => {
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('success');
            
            // Supprimer les classes de validation
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.classList.remove('error', 'success');
                removeFieldError(input);
            });
        }, 3000);
        
    }, 2000);
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
 * Effets de scroll pour la page contact
 */
function initializeScrollEffects() {
    const contactInfoSection = document.querySelector('.contact-info-section');
    
    if (!contactInfoSection) return;
    
    // Effet parallaxe léger sur les nuages
    window.addEventListener('scroll', CRIHD.utils.throttle(() => {
        const scrolled = window.pageYOffset;
        const clouds = document.querySelectorAll('.cloud-icon');
        
        clouds.forEach((cloud, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            cloud.style.transform = `translateY(${yPos}px)`;
        });
    }, 10));
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
    
    // Effet focus amélioré sur les champs de formulaire
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            const label = this.parentNode.querySelector('.form-label');
            if (label) {
                label.style.color = '#c53c3c';
                label.style.transform = 'translateY(-2px)';
            }
        });
        
        input.addEventListener('blur', function() {
            const label = this.parentNode.querySelector('.form-label');
            if (label) {
                label.style.color = '#2c3e50';
                label.style.transform = 'translateY(0)';
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

/**
 * Validation en temps réel améliorée
 */
function setupAdvancedValidation() {
    const form = document.querySelector('form[data-validate]');
    if (!form) return;
    
    // Validation du nom (pas de chiffres)
    const nameInput = form.querySelector('#name');
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            const value = this.value;
            const hasNumbers = /\d/.test(value);
            
            if (hasNumbers) {
                this.value = value.replace(/\d/g, '');
                showFieldError(this, 'Le nom ne peut pas contenir de chiffres');
            } else {
                removeFieldError(this);
            }
        });
    }
    
    // Compteur de caractères pour le message
    const messageTextarea = form.querySelector('#message');
    if (messageTextarea) {
        // Créer le compteur
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            font-size: 12px;
            color: #6b7280;
            text-align: right;
            margin-top: 4px;
        `;
        
        messageTextarea.parentNode.appendChild(counter);
        
        // Mettre à jour le compteur
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            const maxLength = 500;
            
            counter.textContent = `${length}/${maxLength} caractères`;
            
            if (length > maxLength) {
                counter.style.color = '#ef4444';
                this.style.borderColor = '#ef4444';
            } else if (length > maxLength * 0.8) {
                counter.style.color = '#f59e0b';
                this.style.borderColor = '#f59e0b';
            } else {
                counter.style.color = '#6b7280';
                this.style.borderColor = '#e5e7eb';
            }
        });
        
        // Initialiser le compteur
        messageTextarea.dispatchEvent(new Event('input'));
    }
}

/**
 * Gestion des erreurs de chargement d'images
 */
function handleImageErrors() {
    const images = document.querySelectorAll('.form-image img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Image de fallback en cas d'erreur
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDYwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMjUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUM5Q0EzIiBmb250LXNpemU9IjE4Ij5JbWFnZSBub24gZGlzcG9uaWJsZTwvdGV4dD4KPC9zdmc+';
            this.alt = 'Image non disponible';
            this.classList.add('image-error');
        });
        
        img.addEventListener('load', function() {
            this.classList.add('image-loaded');
        });
    });
}

/**
 * Préchargement des ressources critiques
 */
function preloadCriticalResources() {
    // Précharger l'image du formulaire
    const criticalImages = [
        'https://images.unsplash.com/photo-1634224154779-4c32f6ee1504?w=600&h=600&fit=crop'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

/**
 * Accessibilité améliorée
 */
function enhanceAccessibility() {
    // Ajouter des attributs ARIA aux champs de formulaire
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    
    formInputs.forEach(input => {
        const label = input.parentNode.querySelector('.form-label');
        if (label && !input.getAttribute('aria-describedby')) {
            const labelId = `label-${input.id || Math.random().toString(36).substr(2, 9)}`;
            label.id = labelId;
            input.setAttribute('aria-describedby', labelId);
        }
    });
    
    // Améliorer la navigation au clavier
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach((method, index) => {
        method.setAttribute('tabindex', '0');
        method.setAttribute('role', 'button');
        method.setAttribute('aria-label', `Méthode de contact ${index + 1}`);
        
        method.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = method.querySelector('a');
                if (link) link.click();
            }
        });
    });
}

/**
 * Initialisation complète de la page contact
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation principale
    initializeContact();
    
    // Fonctionnalités avancées
    initializeAdvancedInteractions();
    setupAdvancedValidation();
    handleImageErrors();
    preloadCriticalResources();
    enhanceAccessibility();
    
    // Gestion du redimensionnement
    window.addEventListener('resize', CRIHD.utils.debounce(handleContactPageResize, 250));
    
    // Initialiser le redimensionnement
    handleContactPageResize();
});

/**
 * Export des fonctions spécifiques au contact
 */
if (typeof window !== 'undefined') {
    window.ContactPage = {
        validateField,
        submitContactForm,
        animateContactMethods
    };
}