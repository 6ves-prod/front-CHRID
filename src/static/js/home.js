/* ==========================================
   CRIHD COMMON JAVASCRIPT
   ========================================== */

/**
 * Utilitaires globaux
 */
const CRIHD = {
  // Configuration
  config: {
    animationDuration: 300,
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    }
  },

  // Utilitaires
  utils: {
    /**
     * Débounce une fonction
     * @param {Function} func - Fonction à débouncer
     * @param {number} wait - Délai en ms
     * @param {boolean} immediate - Exécution immédiate
     * @returns {Function}
     */
    debounce(func, wait, immediate) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          timeout = null;
          if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
      };
    },

    /**
     * Throttle une fonction
     * @param {Function} func - Fonction à throttler
     * @param {number} limit - Limite en ms
     * @returns {Function}
     */
    throttle(func, limit) {
      let inThrottle;
      return function executedFunction(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    /**
     * Vérifie si un élément est visible dans le viewport
     * @param {Element} element - Élément à vérifier
     * @param {number} threshold - Seuil de visibilité (0-1)
     * @returns {boolean}
     */
    isInViewport(element, threshold = 0) {
      const rect = element.getBoundingClientRect();
      const height = rect.height || element.offsetHeight;
      const visible = threshold * height;
      
      return (
        rect.top + visible >= 0 &&
        rect.left >= 0 &&
        rect.bottom - visible <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },

    /**
     * Animation smooth scroll vers un élément
     * @param {string|Element} target - Sélecteur ou élément cible
     * @param {number} offset - Décalage en px
     */
    smoothScrollTo(target, offset = 0) {
      const element = typeof target === 'string' ? document.querySelector(target) : target;
      if (!element) return;

      const targetPosition = element.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    },

    /**
     * Gestion des classes avec animation
     * @param {Element} element - Élément DOM
     * @param {string} className - Classe à ajouter
     * @param {number} duration - Durée de l'animation
     */
    addClassWithAnimation(element, className, duration = 300) {
      element.classList.add(className);
      setTimeout(() => {
        element.classList.add(`${className}-active`);
      }, 10);
    },

    /**
     * Suppression de classe avec animation
     * @param {Element} element - Élément DOM
     * @param {string} className - Classe à supprimer
     * @param {number} duration - Durée de l'animation
     */
    removeClassWithAnimation(element, className, duration = 300) {
      element.classList.remove(`${className}-active`);
      setTimeout(() => {
        element.classList.remove(className);
      }, duration);
    }
  }
};

/**
 * Chargement de composants HTML
 * @param {string} containerId - ID du conteneur
 * @param {string} componentFile - Fichier du composant
 */
async function loadComponent(containerId, componentFile) {
  try {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`Container avec l'ID "${containerId}" non trouvé`);
      return;
    }

    const response = await fetch(componentFile);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const html = await response.text();
    container.innerHTML = html;

    // Initialiser les fonctionnalités du composant chargé
    initializeLoadedComponent(containerId);
    
  } catch (error) {
    console.error(`Erreur lors du chargement de ${componentFile}:`, error);
  }
}

/**
 * Initialisation des composants chargés
 * @param {string} containerId - ID du conteneur
 */
function initializeLoadedComponent(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Initialiser la navigation si c'est la navbar
  if (containerId === 'navbar-container') {
    initializeNavigation();
  }

  // Initialiser les animations
  initializeAnimations(container);
}

/**
 * Initialisation de la navigation
 */
function initializeNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.navbar-nav');
  
  if (!navbar) return;

  // Gestion du scroll pour la navbar sticky
  let lastScrollY = window.scrollY;
  const handleScroll = CRIHD.utils.throttle(() => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Masquer/afficher la navbar en fonction du scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  }, 10);

  window.addEventListener('scroll', handleScroll);

  // Menu mobile
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // Gestion des dropdowns
  const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
  dropdownItems.forEach(item => {
    const dropdownMenu = item.querySelector('.dropdown-menu');
    if (!dropdownMenu) return;

    let timeoutId;

    item.addEventListener('mouseenter', () => {
      clearTimeout(timeoutId);
      dropdownMenu.style.display = 'block';
      setTimeout(() => {
        dropdownMenu.classList.add('show');
      }, 10);
    });

    item.addEventListener('mouseleave', () => {
      dropdownMenu.classList.remove('show');
      timeoutId = setTimeout(() => {
        dropdownMenu.style.display = 'none';
      }, 300);
    });
  });

  // Navigation active
  setActiveNavigation();
}

/**
 * Définit la navigation active
 */
function setActiveNavigation() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (currentPath.endsWith(href) || href === currentPath)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Initialisation des animations au scroll
 * @param {Element} container - Conteneur à analyser
 */
function initializeAnimations(container = document) {
  const animatedElements = container.querySelectorAll('[data-animate]');
  
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animation = element.getAttribute('data-animate');
        const delay = element.getAttribute('data-delay') || 0;
        
        setTimeout(() => {
          element.classList.add('animate', `animate-${animation}`);
        }, parseInt(delay));
        
        observer.unobserve(element);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Gestion des formulaires
 */
function initializeForms() {
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
    
    // Validation en temps réel
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', CRIHD.utils.debounce(() => {
        if (input.classList.contains('error')) {
          validateField(input);
        }
      }, 300));
    });
  });
}

/**
 * Gestion de la soumission de formulaire
 * @param {Event} e - Événement de soumission
 */
function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const isValid = validateForm(form);
  
  if (isValid) {
    // Simuler l'envoi
    showLoadingState(form);
    
    setTimeout(() => {
      showSuccessMessage(form);
      form.reset();
    }, 2000);
  }
}

/**
 * Validation d'un champ
 * @param {Element} field - Champ à valider
 * @returns {boolean}
 */
function validateField(field) {
  const value = field.value.trim();
  const type = field.type;
  const required = field.hasAttribute('required');
  
  let isValid = true;
  let message = '';

  // Vérification obligatoire
  if (required && !value) {
    isValid = false;
    message = 'Ce champ est obligatoire';
  }
  
  // Validation par type
  if (value && type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      message = 'Email invalide';
    }
  }
  
  if (value && type === 'tel') {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
    if (!phoneRegex.test(value) || value.length < 8) {
      isValid = false;
      message = 'Numéro de téléphone invalide';
    }
  }

  // Affichage du résultat
  showFieldValidation(field, isValid, message);
  return isValid;
}

/**
 * Validation complète du formulaire
 * @param {Element} form - Formulaire à valider
 * @returns {boolean}
 */
function validateForm(form) {
  const fields = form.querySelectorAll('input, textarea, select');
  let isValid = true;
  
  fields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
  
  return isValid;
}

/**
 * Affichage de la validation d'un champ
 * @param {Element} field - Champ
 * @param {boolean} isValid - État de validation
 * @param {string} message - Message d'erreur
 */
function showFieldValidation(field, isValid, message) {
  const container = field.closest('.form-group') || field.parentNode;
  let errorElement = container.querySelector('.field-error');
  
  // Supprimer l'ancien message d'erreur
  if (errorElement) {
    errorElement.remove();
  }
  
  // Supprimer les classes d'état
  field.classList.remove('error', 'success');
  
  if (!isValid) {
    // Ajouter la classe d'erreur
    field.classList.add('error');
    
    // Créer le message d'erreur
    errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    container.appendChild(errorElement);
  } else if (field.value.trim()) {
    field.classList.add('success');
  }
}

/**
 * Affichage de l'état de chargement
 * @param {Element} form - Formulaire
 */
function showLoadingState(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
  }
}

/**
 * Affichage du message de succès
 * @param {Element} form - Formulaire
 */
function showSuccessMessage(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Envoyé <i class="fas fa-check"></i>';
    submitBtn.classList.add('success');
    
    setTimeout(() => {
      submitBtn.innerHTML = 'Envoyer';
      submitBtn.classList.remove('success');
    }, 3000);
  }
}

/**
 * Initialisation des tooltips
 */
function initializeTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
  });
}

/**
 * Affichage d'un tooltip
 * @param {Event} e - Événement
 */
function showTooltip(e) {
  const element = e.target;
  const text = element.getAttribute('data-tooltip');
  if (!text) return;

  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = text;
  document.body.appendChild(tooltip);

  const rect = element.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  
  tooltip.style.left = rect.left + (rect.width / 2) - (tooltipRect.width / 2) + 'px';
  tooltip.style.top = rect.top - tooltipRect.height - 10 + 'px';
  
  setTimeout(() => tooltip.classList.add('show'), 10);
}

/**
 * Masquage d'un tooltip
 */
function hideTooltip() {
  const tooltip = document.querySelector('.tooltip');
  if (tooltip) {
    tooltip.classList.remove('show');
    setTimeout(() => tooltip.remove(), 300);
  }
}

/**
 * Initialisation des modales
 */
function initializeModals() {
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modals = document.querySelectorAll('.modal');
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        showModal(modal);
      }
    });
  });
  
  modals.forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => hideModal(modal));
    }
    
    if (backdrop) {
      backdrop.addEventListener('click', () => hideModal(modal));
    }
  });
  
  // Fermer avec Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.show');
      if (activeModal) {
        hideModal(activeModal);
      }
    }
  });
}

/**
 * Affichage d'une modale
 * @param {Element} modal - Modale à afficher
 */
function showModal(modal) {
  modal.classList.add('show');
  document.body.classList.add('modal-open');
  
  // Focus sur le premier élément focusable
  const focusableElement = modal.querySelector('input, button, textarea, select, [tabindex]:not([tabindex="-1"])');
  if (focusableElement) {
    setTimeout(() => focusableElement.focus(), 100);
  }
}

/**
 * Masquage d'une modale
 * @param {Element} modal - Modale à masquer
 */
function hideModal(modal) {
  modal.classList.remove('show');
  document.body.classList.remove('modal-open');
}

/**
 * Initialisation au chargement du DOM
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeForms();
  initializeTooltips();
  initializeModals();
  initializeAnimations();
  
  // Initialisation spécifique selon la page
  const pageInit = {
    'home.html': () => {
      if (typeof initializeHome === 'function') {
        initializeHome();
      }
    },
    'contact.html': () => {
      if (typeof initializeContact === 'function') {
        initializeContact();
      }
    }
  };
  
  const currentPage = window.location.pathname.split('/').pop() || 'home.html';
  if (pageInit[currentPage]) {
    pageInit[currentPage]();
  }
});

/**
 * Gestion du redimensionnement
 */
window.addEventListener('resize', CRIHD.utils.debounce(() => {
  // Recalculer les éléments si nécessaire
  const modals = document.querySelectorAll('.modal.show');
  modals.forEach(modal => {
    // Recentrer les modales si nécessaire
  });
}, 250));

/**
 * Export des fonctions globales
 */
window.CRIHD = CRIHD;
window.loadComponent = loadComponent;