/* ==========================================
   NAVIGATION MOBILE RESPONSIVE - JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Délai pour éviter les conflits avec les autres scripts
    setTimeout(initializeMobileNavigation, 50);
});

/**
 * Initialisation de la navigation mobile
 */
function initializeMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.navbar-nav');

    if (!mobileToggle || !navMenu) {
        console.warn('Éléments de navigation mobile non trouvés');
        return;
    }

    // Variables d'état
    let isMenuOpen = false;
    let scrollPosition = 0;
    let isAnimating = false;

    /**
     * Ouvrir le menu mobile
     */
    function openMobileMenu() {
        if (isAnimating || isMenuOpen) return;
        isAnimating = true;

        // Sauvegarder scroll
        scrollPosition = window.pageYOffset;

        // Activer les classes
        mobileToggle.classList.add('active');
        navMenu.classList.add('active');
        document.body.classList.add('menu-open');

        // Bloquer le scroll
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';

        isMenuOpen = true;

        // Accessibilité
        mobileToggle.setAttribute('aria-expanded', 'true');
        mobileToggle.setAttribute('aria-label', 'Fermer le menu de navigation');
        navMenu.setAttribute('aria-hidden', 'false');

        setTimeout(() => { isAnimating = false; }, 300);
    }

    /**
     * Fermer le menu mobile
     */
    function closeMobileMenu() {
        if (isAnimating || !isMenuOpen) return;
        isAnimating = true;

        // Retirer les classes
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');

        // Restaurer le scroll
        const tempScrollPos = scrollPosition;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        requestAnimationFrame(() => {
            window.scrollTo(0, tempScrollPos);
        });

        isMenuOpen = false;

        // Accessibilité
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
        navMenu.setAttribute('aria-hidden', 'true');

        // Fermer tous les dropdowns
        closeAllDropdowns();

        setTimeout(() => { isAnimating = false; }, 300);
    }

    /**
     * Toggle du menu mobile
     */
    function toggleMobileMenu() {
        if (isAnimating) return;

        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    /**
     * Fermer tous les dropdowns
     */
    function closeAllDropdowns() {
        document.querySelectorAll('.nav-item.dropdown.dropdown-open').forEach(item => {
            item.classList.remove('dropdown-open');
        });
    }

    /**
     * Réinitialiser l'état du menu
     */
    function resetMenuState() {
        if (window.innerWidth >= 1024) {
            isMenuOpen = false;
            isAnimating = false;
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            closeAllDropdowns();
        }
    }

    // ==========================================
    // EVENT LISTENERS
    // ==========================================

    // Clic sur le bouton toggle
    mobileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Fermer en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !e.target.closest('.navbar') && !isAnimating) {
            closeMobileMenu();
        }
    });

    // Fermer avec Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen && !isAnimating) {
            closeMobileMenu();
            mobileToggle.focus();
        }
    });

    // Redimensionnement
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resetMenuState, 150);
    });

    // Gestion des dropdowns mobile
    setupMobileDropdowns();

    // Gestion des liens de navigation
    setupNavigationLinks();

    // Initialisation accessibilité
    initializeAccessibility();

    // Reset au chargement
    resetMenuState();

    // ==========================================
    // FONCTIONS UTILITAIRES
    // ==========================================

    /**
     * Configuration des dropdowns mobiles
     */
    function setupMobileDropdowns() {
        const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

        dropdownItems.forEach(item => {
            const navLink = item.querySelector('.nav-link');

            if (navLink) {
                navLink.addEventListener('click', function(e) {
                    if (window.innerWidth < 1024) {
                        e.preventDefault();
                        e.stopPropagation();

                        // Fermer les autres dropdowns
                        dropdownItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('dropdown-open');
                            }
                        });

                        // Toggle le dropdown actuel
                        item.classList.toggle('dropdown-open');
                    }
                });
            }
        });
    }

    /**
     * Configuration des liens de navigation
     */
    function setupNavigationLinks() {
        const navLinks = navMenu.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (!link.parentElement.classList.contains('dropdown') && window.innerWidth < 1024) {
                    setTimeout(() => {
                        closeMobileMenu();
                    }, 100);
                }
            });
        });
    }

    /**
     * Initialisation des attributs d'accessibilité
     */
    function initializeAccessibility() {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-controls', 'navbar-nav');
        mobileToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
        navMenu.setAttribute('aria-hidden', 'true');
        navMenu.setAttribute('id', 'navbar-nav');
    }

    // ==========================================
    // GESTION DES CHANGEMENTS DE PAGE
    // ==========================================

    window.addEventListener('beforeunload', function() {
        if (isMenuOpen) {
            closeMobileMenu();
        }
    });

    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isMenuOpen) {
            closeMobileMenu();
        }
    });

    // ==========================================
    // DEBUG ET UTILITAIRES PUBLIQUES
    // ==========================================

    // Fonction de debug
    window.debugMobileNavigation = function() {
        console.log('=== DEBUG NAVIGATION MOBILE ===');
        console.log('Toggle exists:', !!mobileToggle);
        console.log('Nav menu exists:', !!navMenu);
        console.log('Menu open:', isMenuOpen);
        console.log('Is animating:', isAnimating);
        console.log('Viewport width:', window.innerWidth);
        console.log('Body classes:', document.body.classList.toString());
        console.log('Toggle classes:', mobileToggle.classList.toString());
        console.log('Nav classes:', navMenu.classList.toString());
    };

    // Fonction de reset forcé
    window.resetMobileNavigation = function() {
        closeMobileMenu();
        resetMenuState();
        console.log('Navigation mobile réinitialisée');
    };

    /**
 * NAVBAR AUTO-HIDE SIMPLE - À ajouter à common.js
 */

let lastScrollY = 0;
let ticking = false;

function updateNavbar() {
    const header = document.querySelector('.header');
    const currentScrollY = window.scrollY;

    if (!header) return;

    if (currentScrollY < 50) {
        // En haut de page - toujours visible
        header.style.transform = 'translateY(0)';
    } else if (currentScrollY > lastScrollY) {
        // Scroll vers le bas - masquer
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll vers le haut - afficher
        header.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

function onScroll() {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');

    if (header) {
        // Ajouter les styles nécessaires
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.left = '0';
        header.style.right = '0';
        header.style.zIndex = '1000';
        header.style.transition = 'transform 0.3s ease';
        header.style.backgroundColor = 'white';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';

        // Écouteur de scroll
        window.addEventListener('scroll', onScroll, { passive: true });

        // Ajouter un espaceur pour compenser la navbar fixe
        const spacer = document.createElement('div');
        spacer.style.height = header.offsetHeight + 'px';
        spacer.className = 'navbar-spacer';
        header.parentNode.insertBefore(spacer, header.nextSibling);
    }
});

    console.log('Navigation mobile initialisée avec succès');
}