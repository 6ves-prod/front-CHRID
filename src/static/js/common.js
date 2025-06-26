/* ==========================================
   MENU MOBILE ET NAVBAR - JAVASCRIPT COMPLET
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeNavbarBehavior();
});

/**
 * Initialisation du menu mobile
 */
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.navbar-nav');

    if (!mobileToggle || !navMenu) {
        console.warn('Éléments de navigation mobile non trouvés');
        return;
    }

    // Variables pour gérer l'état
    let isMenuOpen = false;
    let scrollPosition = 0;

    /**
     * Ouvrir le menu mobile
     */
    function openMobileMenu() {
        // Sauvegarder la position de scroll actuelle
        scrollPosition = window.pageYOffset;

        // Activer les classes
        mobileToggle.classList.add('active');
        navMenu.classList.add('active');
        document.body.classList.add('menu-open');

        // Forcer la position pour empêcher le scroll
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';

        isMenuOpen = true;

        // Accessibilité
        mobileToggle.setAttribute('aria-expanded', 'true');
        navMenu.setAttribute('aria-hidden', 'false');
    }

    /**
     * Fermer le menu mobile
     */
    function closeMobileMenu() {
        // Retirer les classes
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');

        // Restaurer le scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollPosition);

        isMenuOpen = false;

        // Accessibilité
        mobileToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
    }

    /**
     * Toggle du menu mobile
     */
    function toggleMobileMenu() {
        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    // Event listener pour le bouton toggle
    mobileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !e.target.closest('.navbar')) {
            closeMobileMenu();
        }
    });

    // Fermer le menu avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
            mobileToggle.focus();
        }
    });

    // Fermer le menu au redimensionnement vers desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024 && isMenuOpen) {
            closeMobileMenu();
        }
    });

    // Gestion des dropdowns mobile
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    dropdownItems.forEach(item => {
        const navLink = item.querySelector('.nav-link');

        if (navLink) {
            navLink.addEventListener('click', function(e) {
                // Seulement en mode mobile
                if (window.innerWidth < 1024) {
                    e.preventDefault();
                    item.classList.toggle('dropdown-open');
                }
            });
        }
    });

    // Fermer le menu quand on clique sur un lien (pas dropdown)
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Si ce n'est pas un dropdown et qu'on est en mobile
            if (!link.parentElement.classList.contains('dropdown') && window.innerWidth < 1024) {
                // Petit délai pour permettre la navigation
                setTimeout(() => {
                    closeMobileMenu();
                }, 100);
            }
        });
    });

    // Initialisation des attributs d'accessibilité
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-controls', 'navbar-nav');
    mobileToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
    navMenu.setAttribute('aria-hidden', 'true');
    navMenu.setAttribute('id', 'navbar-nav');
}

/**
 * Initialisation du comportement de la navbar (scroll, etc.)
 */
function initializeNavbarBehavior() {
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');

    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
        const currentScrollY = window.scrollY;

        // Ajouter/retirer la classe scrolled
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Masquer/afficher la navbar en fonction du scroll (optionnel)
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    // Throttle du scroll pour les performances
    window.addEventListener('scroll', requestTick);

    // Gestion des dropdowns desktop avec hover
    if (window.innerWidth >= 1024) {
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
    }
}