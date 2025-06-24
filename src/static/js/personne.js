/* ==========================================
   CRIHD PERSONNES PAGE - JavaScript Spécifique
   ========================================== */

/**
 * Initialisation de la page Personnes
 */
function initializePersonnesPage() {
    initializeTeamInteractions();
    initializeTeamFiltering();
    initializeTeamAnimations();
    initializeContactCards();
    initializeValuesSectionAnimations();
}

/**
 * Interactions avancées pour les cartes d'équipe
 */
function initializeTeamInteractions() {
    const teamCards = document.querySelectorAll('.team-member-card');

    teamCards.forEach(card => {
        // Effet de suivi de souris sophistiqué
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            const rotateX = deltaY * 8;
            const rotateY = deltaX * 8;

            this.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });

        // Animation au clic pour feedback utilisateur
        card.addEventListener('click', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-8px) scale(0.98)';

            setTimeout(() => {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-12px) scale(1)';
            }, 150);

            // Afficher les détails du membre (modal ou section)
            showMemberDetails(this);
        });

        // Support clavier pour accessibilité
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Rendre focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
    });
}

/**
 * Système de filtrage dynamique de l'équipe
 */
function initializeTeamFiltering() {
    // Créer les boutons de filtre s'ils n'existent pas déjà
    const filterContainer = createFilterButtons();

    if (filterContainer) {
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        const teamCards = document.querySelectorAll('.team-member-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;

                // Mise à jour des boutons actifs
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filtrage des cartes
                teamCards.forEach(card => {
                    const cardCategory = card.dataset.category || 'all';

                    if (filter === 'all' || cardCategory === filter) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';

                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(-30px)';

                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

/**
 * Création des boutons de filtre dynamiques
 */
function createFilterButtons() {
    const servicesSection = document.querySelector('.services-section .section-header');

    if (servicesSection && !document.querySelector('.team-filters')) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'team-filters';
        filterContainer.innerHTML = `
            <div class="filter-buttons">
                <button class="filter-btn active" data-filter="all">Tous</button>
                <button class="filter-btn" data-filter="direction">Direction</button>
                <button class="filter-btn" data-filter="recherche">Recherche</button>
                <button class="filter-btn" data-filter="support">Support</button>
            </div>
        `;

        // Styles pour les boutons de filtre
        const style = document.createElement('style');
        style.textContent = `
            .team-filters {
                margin-top: 20px;
            }
            .filter-buttons {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
            }
            .filter-btn {
                padding: 8px 20px;
                border: 2px solid #e5e7eb;
                background: white;
                color: #6b7280;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
                border-radius: 0;
            }
            .filter-btn:hover,
            .filter-btn.active {
                border-color: #c53c3c;
                background: #c53c3c;
                color: white;
            }
        `;
        document.head.appendChild(style);

        servicesSection.appendChild(filterContainer);
        return filterContainer;
    }

    return null;
}

/**
 * Animations spécifiques à l'équipe
 */
function initializeTeamAnimations() {
    // Animation en cascade pour les cartes d'équipe
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTeamSection(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const teamSections = document.querySelectorAll('.services-section, .research-section');
    teamSections.forEach(section => observer.observe(section));
}

/**
 * Animation d'une section d'équipe
 */
function animateTeamSection(section) {
    const cards = section.querySelectorAll('.team-member-card, .service-card');

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.6s ease';

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150 + 200);
    });
}

/**
 * Cartes de contact interactives
 */
function initializeContactCards() {
    const contactCards = document.querySelectorAll('.contact-method, .partner-logo');

    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        });
    });
}

/**
 * Animations pour la section des valeurs
 */
function initializeValuesSectionAnimations() {
    const valuesSection = document.querySelector('.team-section-dark, .blog-section');

    if (valuesSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValues(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(valuesSection);
    }
}

/**
 * Animation des valeurs
 */
function animateValues(section) {
    const valueItems = section.querySelectorAll('.value-item, .blog-card');

    valueItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8) translateY(30px)';
        item.style.transition = 'all 0.8s ease';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1) translateY(0)';
        }, index * 200 + 500);
    });
}

/**
 * Affichage des détails d'un membre
 */
function showMemberDetails(card) {
    const memberName = card.querySelector('.service-title, .member-name')?.textContent || 'Membre de l\'équipe';
    const memberRole = card.querySelector('.member-role')?.textContent || '';

    // Créer une notification ou modal simple
    if (typeof showNotification === 'function') {
        showNotification(`Profil de ${memberName} ${memberRole ? '- ' + memberRole : ''}`, 'info');
    } else {
        // Fallback: console log pour debug
        console.log(`Affichage du profil de ${memberName}`);
    }

    // Ici vous pourriez ouvrir une modal avec plus d'informations
    // ou rediriger vers une page de profil détaillée
}

/**
 * Compteur animé pour les statistiques
 */
function animateCounter(element, targetValue, duration = 2000) {
    const startValue = 0;
    const startTime = Date.now();

    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Fonction d'easing pour une animation fluide
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);

        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = targetValue;
        }
    }

    updateCounter();
}

/**
 * Initialisation des compteurs statistiques
 */
function initializeStatsCounters() {
    const statsElements = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetValue = parseInt(element.dataset.count);
                animateCounter(element, targetValue);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    statsElements.forEach(element => observer.observe(element));
}

/**
 * Gestion des erreurs d'images avec fallback
 */
function initializeImageErrorHandling() {
    const images = document.querySelectorAll('.member-image img, .service-image img');

    images.forEach(img => {
        img.addEventListener('error', function() {
            // Image de fallback professionnelle
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEyMCIgcj0iNDAiIGZpbGw9IiM5Q0E5QjMiLz4KPHBhdGggZD0iTTE2MCAyMDBDMTYwIDE4MC4xIDE3Ni4xIDE2NCAyMDAgMTY0UzI0MCAxODAuMSAyNDAgMjAwSDIwMFoiIGZpbGw9IiM5Q0E5QjMiLz4KPC9zdmc+';
            this.alt = 'Photo de profil non disponible';
            this.classList.add('fallback-image');
        });
    });
}

/**
 * Système de recherche en temps réel
 */
function initializeTeamSearch() {
    const searchInput = createSearchInput();

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const teamCards = document.querySelectorAll('.team-member-card');

            teamCards.forEach(card => {
                const name = card.querySelector('.service-title, .member-name')?.textContent.toLowerCase() || '';
                const role = card.querySelector('.member-role')?.textContent.toLowerCase() || '';
                const description = card.querySelector('.member-description')?.textContent.toLowerCase() || '';

                const matches = name.includes(searchTerm) ||
                              role.includes(searchTerm) ||
                              description.includes(searchTerm);

                if (matches || searchTerm === '') {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0.3';
                }
            });
        });
    }
}

/**
 * Création de l'input de recherche
 */
function createSearchInput() {
    const headerContent = document.querySelector('.services-section .header-content');

    if (headerContent && !document.querySelector('.team-search')) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'team-search';
        searchContainer.innerHTML = `
            <input type="text" placeholder="Rechercher un membre..." class="search-input">
        `;

        // Styles pour la recherche
        const style = document.createElement('style');
        style.textContent = `
            .team-search {
                margin-top: 20px;
            }
            .search-input {
                width: 100%;
                max-width: 300px;
                padding: 12px 16px;
                border: 2px solid #e5e7eb;
                background: white;
                font-size: 14px;
                transition: border-color 0.3s ease;
                border-radius: 0;
            }
            .search-input:focus {
                outline: none;
                border-color: #c53c3c;
            }
        `;
        document.head.appendChild(style);

        headerContent.appendChild(searchContainer);
        return searchContainer.querySelector('.search-input');
    }

    return null;
}

/**
 * Initialisation complète au chargement de la page
 */
document.addEventListener('DOMContentLoaded', function() {
    // Attendre que la page soit complètement chargée
    setTimeout(() => {
        initializePersonnesPage();
        initializeStatsCounters();
        initializeImageErrorHandling();
        initializeTeamSearch();

        // Optimisations de performance
        if ('IntersectionObserver' in window) {
            // Les animations sont déjà initialisées avec IntersectionObserver
        } else {
            // Fallback pour les navigateurs plus anciens
            initializeTeamAnimations();
        }
    }, 100);
});

/**
 * Gestion du redimensionnement
 */
window.addEventListener('resize', CRIHD.utils.debounce(() => {
    // Réajuster les animations sur changement de taille
    const teamCards = document.querySelectorAll('.team-member-card');
    teamCards.forEach(card => {
        card.style.transform = 'none';
    });
}, 250));

/**
 * Export des fonctions pour utilisation globale
 */
if (typeof window !== 'undefined') {
    window.PersonnesPage = {
        showMemberDetails,
        animateTeamSection,
        animateCounter
    };
}