/* ==========================================
   CRIHD DIRECTION PAGE - JavaScript Spécifique
   ========================================== */

/**
 * Initialisation de la page Direction
 */
function initializeDirectionPage() {
    initializeVisionCards();
    initializeGovernanceTimeline();
    initializeStrategicPlan();
    initializeReportsSection();
    initializePerformanceIndicators();
    initializeDirectorMessage();
}

/**
 * Interactions pour les cartes de vision
 */
function initializeVisionCards() {
    const visionCards = document.querySelectorAll('.vision-card, .service-card');

    visionCards.forEach(card => {
        // Effet de parallaxe sophistiqué
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            const rotateX = deltaY * 10;
            const rotateY = deltaX * 10;

            this.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-16px)`;

            // Effet de brillance qui suit la souris
            const shine = this.querySelector('::after') || this;
            if (shine) {
                shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3) 0%, transparent 50%)`;
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });

        // Animation au clic
        card.addEventListener('click', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-12px) scale(0.98)';

            setTimeout(() => {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-16px) scale(1)';
            }, 150);

            // Déclencher l'action associée
            handleVisionCardClick(this);
        });
    });
}

/**
 * Gestion du clic sur les cartes de vision
 */
function handleVisionCardClick(card) {
    const title = card.querySelector('.service-title, h3')?.textContent || 'Vision';

    // Créer une modal ou notification avec plus de détails
    if (typeof showNotification === 'function') {
        showNotification(`Exploration de: ${title}`, 'info');
    }

    // Ici vous pourriez ouvrir une modal détaillée ou naviguer vers une page spécifique
    console.log(`Vision sélectionnée: ${title}`);
}

/**
 * Animation de la timeline de gouvernance
 */
function initializeGovernanceTimeline() {
    const timelineItems = document.querySelectorAll('.governance-item, .partner-logo');

    if (timelineItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('timeline-animate');
                        animateGovernanceItem(entry.target);
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach(item => observer.observe(item));
    }
}

/**
 * Animation d'un élément de gouvernance
 */
function animateGovernanceItem(item) {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'all 0.8s ease';

    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
    }, 100);

    // Animation du contenu interne
    const textElements = item.querySelectorAll('h3, p, strong');
    textElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
}

/**
 * Gestion du plan stratégique interactif
 */
function initializeStrategicPlan() {
    const strategicItems = document.querySelectorAll('.project-item');
    const strategicDisplay = document.querySelector('.project-display');

    if (strategicItems.length > 0 && strategicDisplay) {
        // Données du plan stratégique
        const strategicData = [
            {
                title: "Renforcement de l'Excellence en Recherche",
                description: "Développer une expertise de classe mondiale en recherche appliquée pour le développement, avec des méthodologies innovantes et des standards internationaux d'excellence.",
                image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop",
                objectives: ["Certification ISO 9001", "Publications internationales", "Partenariats académiques"]
            },
            {
                title: "Expansion des Partenariats Stratégiques",
                description: "Établir des alliances stratégiques avec des institutions de premier plan pour amplifier notre impact et notre portée géographique.",
                image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
                objectives: ["15 nouveaux partenaires", "Couverture sous-régionale", "Accords de coopération"]
            },
            {
                title: "Innovation Numérique et Transformation",
                description: "Intégrer les technologies émergentes pour moderniser nos processus et améliorer l'efficacité de nos interventions.",
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
                objectives: ["Plateforme digitale", "IA pour l'analyse", "Systèmes automatisés"]
            },
            {
                title: "Durabilité Financière et Impact Mesurable",
                description: "Assurer la pérennité financière tout en maximisant l'impact mesurable de nos interventions sur le terrain.",
                image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop",
                objectives: ["Diversification des fonds", "KPIs d'impact", "ROI social mesurable"]
            }
        ];

        // Gestion des clics sur les éléments stratégiques
        strategicItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                // Mettre à jour l'affichage
                updateStrategicDisplay(strategicData[index] || strategicData[0]);

                // Mettre à jour les états actifs
                strategicItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Initialiser avec le premier élément
        updateStrategicDisplay(strategicData[0]);
    }
}

/**
 * Mise à jour de l'affichage stratégique
 */
function updateStrategicDisplay(data) {
    const display = document.querySelector('.project-display');
    if (!display) return;

    const image = display.querySelector('img');
    const overlay = display.querySelector('.project-overlay');

    // Animation de transition
    if (image && overlay) {
        display.style.opacity = '0.7';

        setTimeout(() => {
            image.src = data.image;
            image.alt = data.title;

            overlay.querySelector('h3').textContent = data.title;
            overlay.querySelector('p').textContent = data.description;

            display.style.opacity = '1';
        }, 200);
    }
}

/**
 * Section des rapports interactifs
 */
function initializeReportsSection() {
    const reportCards = document.querySelectorAll('.report-card, .blog-card');

    reportCards.forEach(card => {
        // Effet hover avancé
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';

            // Animation des éléments internes
            const elements = this.querySelectorAll('h3, p, .blog-excerpt');
            elements.forEach((element, index) => {
                element.style.transition = 'transform 0.3s ease';
                element.style.transform = `translateY(-${index * 2}px)`;
            });
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';

            const elements = this.querySelectorAll('h3, p, .blog-excerpt');
            elements.forEach(element => {
                element.style.transform = 'translateY(0)';
            });
        });

        // Gestion du téléchargement/ouverture
        card.addEventListener('click', function() {
            const title = this.querySelector('h3, .blog-title')?.textContent || 'Document';
            handleReportClick(title);
        });
    });
}

/**
 * Gestion du clic sur les rapports
 */
function handleReportClick(reportTitle) {
    // Simuler le téléchargement ou l'ouverture
    if (typeof showNotification === 'function') {
        showNotification(`Ouverture de: ${reportTitle}`, 'success');
    }

    // Ici vous pourriez déclencher un téléchargement réel ou ouvrir une modal
    console.log(`Rapport demandé: ${reportTitle}`);
}

/**
 * Indicateurs de performance animés
 */
function initializePerformanceIndicators() {
    const indicators = document.querySelectorAll('.indicator-card, .value-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animatePerformanceIndicator(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    indicators.forEach(indicator => observer.observe(indicator));
}

/**
 * Animation des indicateurs de performance
 */
function animatePerformanceIndicator(indicator) {
    const valueElement = indicator.querySelector('.indicator-value, [data-count]');
    const iconElement = indicator.querySelector('.indicator-icon, .value-icon');

    // Animation de l'icône
    if (iconElement) {
        iconElement.style.transform = 'scale(0) rotate(-180deg)';
        iconElement.style.transition = 'all 0.8s ease';

        setTimeout(() => {
            iconElement.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    }

    // Animation du compteur
    if (valueElement) {
        const targetValue = parseInt(valueElement.dataset.count || valueElement.textContent) || 0;
        animateCounter(valueElement, targetValue, 2000);
    }

    // Animation de l'indicateur complet
    indicator.style.opacity = '0';
    indicator.style.transform = 'translateY(30px) scale(0.9)';
    indicator.style.transition = 'all 1s ease';

    setTimeout(() => {
        indicator.style.opacity = '1';
        indicator.style.transform = 'translateY(0) scale(1)';
    }, 100);
}

/**
 * Animation du compteur numérique
 */
function animateCounter(element, targetValue, duration = 2000) {
    const startValue = 0;
    const startTime = Date.now();

    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Fonction d'easing pour animation naturelle
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutCubic);

        // Formatage des nombres pour la lisibilité
        if (targetValue >= 1000) {
            element.textContent = (currentValue / 1000).toFixed(1) + 'K';
        } else {
            element.textContent = currentValue;
        }

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            if (targetValue >= 1000) {
                element.textContent = (targetValue / 1000).toFixed(1) + 'K';
            } else {
                element.textContent = targetValue;
            }
        }
    }

    updateCounter();
}

/**
 * Message du directeur avec animations
 */
function initializeDirectorMessage() {
    const directorSection = document.querySelector('.services-section');

    if (directorSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateDirectorMessage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(directorSection);
    }
}

/**
 * Animation du message du directeur
 */
function animateDirectorMessage(section) {
    const title = section.querySelector('.section-title');
    const subtitle = section.querySelector('.section-subtitle');
    const cards = section.querySelectorAll('.service-card');

    // Animation du titre
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-20px)';
        title.style.transition = 'all 0.8s ease';

        setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 200);
    }

    // Animation du sous-titre
    if (subtitle) {
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(-20px)';
        subtitle.style.transition = 'all 0.8s ease';

        setTimeout(() => {
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 400);
    }

    // Animation des cartes
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.9)';
        card.style.transition = 'all 0.8s ease';

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 600 + (index * 200));
    });
}

/**
 * Système de tooltips pour les éléments complexes
 */
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            showTooltip(e, this.dataset.tooltip);
        });

        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

/**
 * Affichage de tooltip
 */
function showTooltip(event, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: #2c3e50;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    document.body.appendChild(tooltip);

    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';

    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
}

/**
 * Masquage de tooltip
 */
function hideTooltip() {
    const tooltip = document.querySelector('.custom-tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            tooltip.remove();
        }, 300);
    }
}

/**
 * Gestion avancée du scroll avec effets
 */
function initializeScrollEffects() {
    let ticking = false;

    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // Effet parallaxe sur les éléments de fond
        const parallaxElements = document.querySelectorAll('.hero-image, .project-display img');
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });

        // Effet de révélation progressive
        const revealElements = document.querySelectorAll('.vision-card, .governance-item, .report-card');
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

/**
 * Système de progression de lecture
 */
function initializeReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #c53c3c, #a73030);
        z-index: 1000;
        transition: width 0.1s ease;
    `;

    document.body.appendChild(progressBar);

    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / documentHeight) * 100;

        progressBar.style.width = Math.min(progress, 100) + '%';
    }

    window.addEventListener('scroll', CRIHD.utils.throttle(updateProgress, 10));
}

/**
 * Mode de présentation plein écran
 */
function initializePresentationMode() {
    const presentationBtn = document.createElement('button');
    presentationBtn.innerHTML = '<i class="fas fa-expand"></i>';
    presentationBtn.className = 'presentation-btn';
    presentationBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #c53c3c;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        transition: all 0.3s ease;
    `;

    presentationBtn.addEventListener('click', togglePresentationMode);
    presentationBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
    });

    presentationBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    });

    document.body.appendChild(presentationBtn);
}

/**
 * Basculement du mode présentation
 */
function togglePresentationMode() {
    document.body.classList.toggle('presentation-mode');

    // CSS pour le mode présentation
    if (!document.querySelector('#presentation-styles')) {
        const styles = document.createElement('style');
        styles.id = 'presentation-styles';
        styles.textContent = `
            .presentation-mode .navbar,
            .presentation-mode .breadcrumb-section,
            .presentation-mode .footer {
                display: none !important;
            }
            
            .presentation-mode .main-hero,
            .presentation-mode .services-section,
            .presentation-mode .research-section,
            .presentation-mode .projects-section {
                padding: 40px 0 !important;
            }
            
            .presentation-mode .container {
                max-width: 95% !important;
            }
            
            .presentation-mode .section-title {
                font-size: 2.5rem !important;
            }
        `;
        document.head.appendChild(styles);
    }
}

/**
 * Sauvegarde de l'état de la page
 */
function initializePageState() {
    // Sauvegarder la position de scroll
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('directionPageScroll', window.pageYOffset);
    });

    // Restaurer la position de scroll
    window.addEventListener('load', function() {
        const savedScroll = localStorage.getItem('directionPageScroll');
        if (savedScroll) {
            window.scrollTo(0, parseInt(savedScroll));
            localStorage.removeItem('directionPageScroll');
        }
    });
}

/**
 * Système d'analytics pour les interactions
 */
function trackUserInteractions() {
    // Suivi des clics sur les cartes de vision
    document.addEventListener('click', function(e) {
        if (e.target.closest('.vision-card, .service-card')) {
            const cardTitle = e.target.closest('.vision-card, .service-card')
                .querySelector('.service-title, h3')?.textContent || 'Unknown';

            // Envoyer à votre système d'analytics
            console.log('Vision card clicked:', cardTitle);
        }

        if (e.target.closest('.report-card, .blog-card')) {
            const reportTitle = e.target.closest('.report-card, .blog-card')
                .querySelector('h3, .blog-title')?.textContent || 'Unknown';

            console.log('Report accessed:', reportTitle);
        }
    });

    // Suivi du temps passé sur la page
    const startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        console.log('Time spent on direction page:', timeSpent, 'seconds');
    });
}

/**
 * Optimisations de performance
 */
function initializePerformanceOptimizations() {
    // Lazy loading des images non critiques
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
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
    }

    // Préchargement des ressources critiques
    const criticalResources = [
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&h=400&fit=crop',
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop'
    ];

    criticalResources.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

/**
 * Gestion des erreurs et fallbacks
 */
function initializeErrorHandling() {
    // Gestion des erreurs d'images
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUM5Q0EzIiBmb250LXNpemU9IjE4Ij5JbWFnZSBub24gZGlzcG9uaWJsZTwvdGV4dD4KPC9zdmc+';
            e.target.alt = 'Image non disponible';
        }
    }, true);

    // Fallback pour les navigateurs sans support IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        // Charger immédiatement toutes les animations
        const animatedElements = document.querySelectorAll('.vision-card, .governance-item, .report-card');
        animatedElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
}

/**
 * Initialisation complète de la page Direction
 */
document.addEventListener('DOMContentLoaded', function() {
    // Attendre que tous les éléments soient chargés
    setTimeout(() => {
        initializeDirectionPage();
        initializeScrollEffects();
        initializeReadingProgress();
        initializePresentationMode();
        initializeTooltips();
        initializePageState();
        trackUserInteractions();
        initializePerformanceOptimizations();
        initializeErrorHandling();

        // Indicateur que la page est prête
        document.body.classList.add('direction-ready');

        if (typeof showNotification === 'function') {
            showNotification('Page Direction chargée avec succès', 'success');
        }
    }, 200);
});

/**
 * Gestion du redimensionnement
 */
window.addEventListener('resize', CRIHD.utils.debounce(() => {
    // Réajuster les éléments responsive
    const visionCards = document.querySelectorAll('.vision-card');
    visionCards.forEach(card => {
        card.style.transform = 'none';
    });

    // Recalculer les positions des tooltips
    hideTooltip();
}, 250));

/**
 * Export des fonctions pour utilisation globale
 */
if (typeof window !== 'undefined') {
    window.DirectionPage = {
        handleVisionCardClick,
        animateCounter,
        updateStrategicDisplay,
        togglePresentationMode
    };
}