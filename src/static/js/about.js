/* ==========================================
   CRIHD ABOUT PAGE - JavaScript
   ========================================== */

/**
 * Initialisation de la page "Qui sommes nous"
 */
function initializeAbout() {
    initializeDropdownNavigation();
    initializeScrollAnimations();
    initializeTechAnimations();
    initializeMissionCards();
    initializeTeamSection();
}

/**
 * Initialisation de la navigation avec dropdown
 */
function initializeDropdownNavigation() {
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    
    dropdownItems.forEach(item => {
        const dropdownMenu = item.querySelector('.dropdown-menu');
        if (!dropdownMenu) return;
        
        let timeoutId;
        
        // Afficher le menu au survol
        item.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
            dropdownMenu.style.display = 'block';
            setTimeout(() => {
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
                dropdownMenu.style.transform = 'translateY(0)';
            }, 10);
        });
        
        // Masquer le menu quand on quitte
        item.addEventListener('mouseleave', () => {
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.visibility = 'hidden';
            dropdownMenu.style.transform = 'translateY(-10px)';
            
            timeoutId = setTimeout(() => {
                dropdownMenu.style.display = 'none';
            }, 300);
        });
        
        // Gestion des clics sur les liens dropdown
        const dropdownLinks = dropdownMenu.querySelectorAll('.dropdown-link');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Supprimer la classe active de tous les liens
                dropdownLinks.forEach(l => l.classList.remove('active'));
                
                // Ajouter la classe active au lien cliqué
                link.classList.add('active');
                
                // Scroll vers la section correspondante
                const target = link.getAttribute('href');
                if (target && target.startsWith('#')) {
                    const section = document.querySelector(target);
                    if (section) {
                        section.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
                
                // Masquer le dropdown
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    dropdownMenu.style.display = 'none';
                }, 300);
            });
        });
    });
}

/**
 * Animations au scroll
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animations spéciales pour les cartes missions
                if (entry.target.classList.contains('mission-card')) {
                    animateMissionCard(entry.target);
                }
                
                // Animation pour la section équipe
                if (entry.target.classList.contains('team-content')) {
                    animateTeamContent(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Éléments à observer
    const elementsToObserve = document.querySelectorAll(`
        .hero-content,
        .hero-image,
        .missions-header,
        .mission-card,
        .team-content,
        .team-image
    `);
    
    elementsToObserve.forEach(element => {
        if (element) observer.observe(element);
    });
}

/**
 * Animation des éléments technologiques
 */
function initializeTechAnimations() {
    const techOverlay = document.querySelector('.tech-overlay');
    if (!techOverlay) return;
    
    // Animation continue des éléments tech
    const techElements = techOverlay.querySelectorAll('.tech-element');
    const connectionLines = techOverlay.querySelectorAll('.connection-line');
    
    // Animer les nœuds avec des délais différents
    techElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Animer les lignes de connexion
    connectionLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.3}s`;
    });
    
    // Effet de souffle sur le nuage principal
    const cloudMain = techOverlay.querySelector('.cloud-main');
    if (cloudMain) {
        setInterval(() => {
            cloudMain.style.transform = 'translate(-50%, -50%) scale(1.1)';
            setTimeout(() => {
                cloudMain.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 1000);
        }, 3000);
    }
}

/**
 * Animation d'une carte mission
 * @param {Element} card - Carte mission
 */
function animateMissionCard(card) {
    const number = card.querySelector('.number');
    const image = card.querySelector('.mission-image img');
    const title = card.querySelector('.mission-title');
    const text = card.querySelector('.mission-text');
    
    // Animation séquentielle des éléments
    if (number) {
        number.style.transform = 'scale(0)';
        number.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
            number.style.transform = 'scale(1)';
        }, 200);
    }
    
    if (image) {
        image.style.opacity = '0';
        image.style.transform = 'scale(1.1)';
        image.style.transition = 'all 0.6s ease';
        setTimeout(() => {
            image.style.opacity = '1';
            image.style.transform = 'scale(1)';
        }, 400);
    }
    
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 600);
    }
    
    if (text) {
        text.style.opacity = '0';
        text.style.transform = 'translateY(20px)';
        text.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
        }, 800);
    }
}

/**
 * Animation du contenu équipe
 * @param {Element} content - Contenu équipe
 */
function animateTeamContent(content) {
    const label = content.querySelector('.team-label');
    const title = content.querySelector('.team-title');
    const description = content.querySelector('.team-description');
    const button = content.querySelector('.team-btn');
    
    const elements = [label, title, description, button];
    
    elements.forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateX(-30px)';
            element.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            }, index * 200 + 300);
        }
    });
}

/**
 * Gestion des cartes missions
 */
function initializeMissionCards() {
    const missionCards = document.querySelectorAll('.mission-card');
    
    missionCards.forEach(card => {
        // Effet hover amélioré
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.mission-image img');
            const number = this.querySelector('.number');
            
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
            
            if (number) {
                number.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.mission-image img');
            const number = this.querySelector('.number');
            
            if (image) {
                image.style.transform = 'scale(1)';
            }
            
            if (number) {
                number.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Animation au clic
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

/**
 * Gestion de la section équipe
 */
function initializeTeamSection() {
    const teamBtn = document.querySelector('.team-btn');
    const teamImage = document.querySelector('.team-image img');
    
    // Animation du bouton équipe
    if (teamBtn) {
        teamBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animation de clic
            this.style.transform = 'scale(0.95)';
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.innerHTML = 'Voir plus';
                
                // Simuler navigation
                if (typeof showNotification === 'function') {
                    showNotification('Redirection vers la page équipe...', 'info');
                }
            }, 1500);
        });
    }
    
    // Effet parallaxe sur l'image équipe
    if (teamImage) {
        window.addEventListener('scroll', CRIHD.utils.throttle(() => {
            const scrolled = window.pageYOffset;
            const teamSection = document.querySelector('.team-section');
            
            if (teamSection) {
                const rect = teamSection.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    const speed = 0.3;
                    const yPos = scrolled * speed;
                    teamImage.style.transform = `translateY(${yPos}px)`;
                }
            }
        }, 10));
    }
}

/**
 * Animation des lignes décoratives
 */
function animateDecorationLines() {
    const decoLines = document.querySelectorAll('.deco-line');
    
    decoLines.forEach((line, index) => {
        line.style.height = '0';
        line.style.transition = 'height 1s ease';
        line.style.transitionDelay = `${index * 0.2}s`;
        
        setTimeout(() => {
            const originalHeight = getComputedStyle(line).getPropertyValue('--original-height') || '70px';
            line.style.height = originalHeight;
        }, 1000 + (index * 200));
    });
}

/**
 * Gestion des effets de scroll personnalisés
 */
function initializeCustomScrollEffects() {
    let ticking = false;
    
    function updateElements() {
        const scrolled = window.pageYOffset;
        
        // Effet parallaxe sur les éléments tech
        const techElements = document.querySelectorAll('.tech-element');
        techElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = scrolled * speed;
            element.style.transform += ` translateY(${yPos}px)`;
        });
        
        // Animation des lignes de connexion basée sur le scroll
        const connectionLines = document.querySelectorAll('.connection-line');
        connectionLines.forEach((line, index) => {
            const opacity = Math.max(0.2, 1 - (scrolled * 0.001));
            line.style.opacity = opacity;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateElements);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

/**
 * Gestion de la pagination des missions
 */
function initializeMissionsPagination() {
    const paginationIndicator = document.querySelector('.page-indicator');
    let currentPage = 1;
    const totalPages = 5;
    
    // Simulation de changement de page (pour futur développement)
    function updatePagination() {
        if (paginationIndicator) {
            const current = currentPage.toString().padStart(2, '0');
            const total = totalPages.toString().padStart(2, '0');
            paginationIndicator.textContent = `${current}/${total}`;
        }
    }
    
    // Initialiser la pagination
    updatePagination();
    
    // Possibilité d'ajouter des boutons de navigation plus tard
    const missionCards = document.querySelectorAll('.mission-card');
    missionCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentPage = Math.min(index + 1, totalPages);
            updatePagination();
        });
    });
}

/**
 * Optimisations de performance
 */
function initializePerformanceOptimizations() {
    // Lazy loading des images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Préchargement des images critiques
    const criticalImages = [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=600&fit=crop'
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
 * Gestion du redimensionnement
 */
function handleAboutPageResize() {
    const techOverlay = document.querySelector('.tech-overlay');
    const teamDecoration = document.querySelector('.team-decoration');
    
    // Masquer les animations sur mobile pour optimiser les performances
    if (window.innerWidth <= 768) {
        if (techOverlay) {
            techOverlay.style.display = 'none';
        }
        if (teamDecoration) {
            teamDecoration.style.display = 'none';
        }
    } else {
        if (techOverlay) {
            techOverlay.style.display = 'block';
        }
        if (teamDecoration) {
            teamDecoration.style.display = 'block';
        }
    }
}

/**
 * Initialisation complète de la page about
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation principale
    initializeAbout();
    
    // Fonctionnalités avancées
    initializeCustomScrollEffects();
    initializeMissionsPagination();
    initializePerformanceOptimizations();
    
    // Gestion du redimensionnement
    window.addEventListener('resize', CRIHD.utils.debounce(handleAboutPageResize, 250));
    
    // Initialiser le redimensionnement
    handleAboutPageResize();
    
    // Animation d'entrée de la page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

/**
 * Export des fonctions spécifiques à about
 */
if (typeof window !== 'undefined') {
    window.AboutPage = {
        animateMissionCard,
        animateTeamContent,
        animateDecorationLines
    };
}