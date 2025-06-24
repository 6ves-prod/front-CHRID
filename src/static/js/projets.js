/* ==========================================
   CRIHD PROJECTS PAGE - JavaScript
   ========================================== */

/**
 * Initialisation de la page projects
 */
function initializeProjectsPage() {
    initializeProjectFilters();
    initializeProjectCards();
    initializePagination();
    initializeCountAnimations();
    initializeScrollAnimations();
    initializeSearchFunctionality();
}

/**
 * Système de filtrage des projets
 */
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Mettre à jour les boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filtrer les projets
            filterProjects(filter, projectCards);
        });
    });
}

/**
 * Filtrer les projets selon la catégorie
 * @param {string} filter - Catégorie de filtre
 * @param {NodeList} cards - Cartes de projets
 */
function filterProjects(filter, cards) {
    cards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
            // Animation d'entrée
            card.classList.remove('filtered-out');
            card.classList.add('filtered-in');
            card.style.animationDelay = `${index * 0.1}s`;
        } else {
            // Animation de sortie
            card.classList.remove('filtered-in');
            card.classList.add('filtered-out');
        }
    });

    // Mettre à jour le compteur de résultats
    updateResultsCounter(filter, cards);
}

/**
 * Mettre à jour le compteur de résultats
 * @param {string} filter - Filtre actif
 * @param {NodeList} cards - Cartes de projets
 */
function updateResultsCounter(filter, cards) {
    const visibleCards = Array.from(cards).filter(card => {
        const category = card.getAttribute('data-category');
        return filter === 'all' || category === filter;
    });

    // Créer ou mettre à jour le compteur
    let counter = document.querySelector('.results-counter');
    if (!counter) {
        counter = document.createElement('div');
        counter.className = 'results-counter';
        counter.style.cssText = `
            text-align: center;
            margin: 20px 0;
            color: #6b7280;
            font-size: 14px;
            font-weight: 500;
        `;
        document.querySelector('.projects-grid').parentNode.insertBefore(
            counter,
            document.querySelector('.projects-pagination')
        );
    }

    const total = cards.length;
    const visible = visibleCards.length;
    const filterName = filter === 'all' ? 'tous les projets' :
                      filter === 'recherche' ? 'projets de recherche' :
                      filter === 'inclusion' ? 'projets d\'inclusion' :
                      filter === 'sante' ? 'projets de santé' :
                      filter === 'environnement' ? 'projets environnementaux' : filter;

    counter.textContent = `${visible} projet${visible > 1 ? 's' : ''} trouvé${visible > 1 ? 's' : ''} (${filterName})`;
}

/**
 * Gestion des interactions des cartes de projets
 */
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        // Effet hover amélioré
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';

            // Animation de la barre de progression
            const progressFill = this.querySelector('.progress-fill');
            if (progressFill) {
                const currentWidth = progressFill.style.width;
                progressFill.style.width = '0%';
                setTimeout(() => {
                    progressFill.style.width = currentWidth;
                }, 100);
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        });

        // Gestion des clics sur les liens
        const projectLink = card.querySelector('.project-link');
        if (projectLink) {
            projectLink.addEventListener('click', function(e) {
                e.preventDefault();
                handleProjectLinkClick(card);
            });
        }
    });
}

/**
 * Gestion du clic sur un lien de projet
 * @param {Element} card - Carte du projet
 */
function handleProjectLinkClick(card) {
    const title = card.querySelector('.project-title').textContent;

    // Animation de clic
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 150);

    // Simuler la navigation (remplacer par vraie navigation)
    if (typeof showNotification === 'function') {
        showNotification(`Ouverture des détails : ${title}`, 'info');
    }

    // Ici, vous pourriez ouvrir une modale ou naviguer vers une page de détails
    openProjectModal(card);
}

/**
 * Ouvrir une modale avec les détails du projet
 * @param {Element} card - Carte du projet
 */
function openProjectModal(card) {
    const title = card.querySelector('.project-title').textContent;
    const description = card.querySelector('.project-description').textContent;
    const category = card.querySelector('.project-category').textContent;
    const duration = card.querySelector('.project-duration').textContent;
    const image = card.querySelector('.project-image img').src;

    // Créer la modale
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <img src="${image}" alt="${title}" style="width: 100%; height: 200px; object-fit: cover; margin-bottom: 16px;">
                <div class="project-meta" style="margin-bottom: 16px;">
                    <span style="background: #f3f4f6; padding: 4px 8px; font-size: 12px; margin-right: 8px;">${category}</span>
                    <span style="color: #6b7280; font-size: 12px;">${duration}</span>
                </div>
                <p style="line-height: 1.6; color: #374151;">${description}</p>
                <div style="margin-top: 24px;">
                    <button class="btn btn-primary">Télécharger le rapport</button>
                    <button class="btn btn-secondary" style="margin-left: 8px;">Voir les résultats</button>
                </div>
            </div>
        </div>
    `;

    // Styles pour la modale
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;

    const backdrop = modal.querySelector('.modal-backdrop');
    backdrop.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
    `;

    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        background: white;
        max-width: 600px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        z-index: 1;
    `;

    const header = modal.querySelector('.modal-header');
    header.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #e5e7eb;
    `;

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #6b7280;
        padding: 8px;
    `;

    const body = modal.querySelector('.modal-body');
    body.style.cssText = `
        padding: 20px;
    `;

    // Ajouter au DOM
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Événements de fermeture
    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    // Fermer avec Escape
    const handleKeydown = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleKeydown);
        }
    };
    document.addEventListener('keydown', handleKeydown);
}

/**
 * Gestion de la pagination
 */
function initializePagination() {
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');
    const pageNumbers = document.querySelectorAll('.page-number');

    let currentPage = 1;
    const totalPages = 8; // Exemple

    // Bouton précédent
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updatePagination(currentPage, totalPages, pageNumbers, prevBtn, nextBtn);
                loadPage(currentPage);
            }
        });
    }

    // Bouton suivant
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination(currentPage, totalPages, pageNumbers, prevBtn, nextBtn);
                loadPage(currentPage);
            }
        });
    }

    // Numéros de page
    pageNumbers.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = parseInt(btn.textContent);
            if (page !== currentPage) {
                currentPage = page;
                updatePagination(currentPage, totalPages, pageNumbers, prevBtn, nextBtn);
                loadPage(currentPage);
            }
        });
    });

    // Initialiser l'état
    updatePagination(currentPage, totalPages, pageNumbers, prevBtn, nextBtn);
}

/**
 * Mettre à jour l'état de la pagination
 * @param {number} current - Page actuelle
 * @param {number} total - Total de pages
 * @param {NodeList} pageNumbers - Boutons de numéros
 * @param {Element} prevBtn - Bouton précédent
 * @param {Element} nextBtn - Bouton suivant
 */
function updatePagination(current, total, pageNumbers, prevBtn, nextBtn) {
    // Mettre à jour les boutons précédent/suivant
    if (prevBtn) {
        prevBtn.disabled = current === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = current === total;
    }

    // Mettre à jour les numéros de page
    pageNumbers.forEach(btn => {
        const page = parseInt(btn.textContent);
        btn.classList.toggle('active', page === current);
    });
}

/**
 * Charger une page de projets
 * @param {number} page - Numéro de page
 */
function loadPage(page) {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    // Animation de chargement
    projectsGrid.style.opacity = '0.6';
    projectsGrid.style.pointerEvents = 'none';

    // Simuler le chargement
    setTimeout(() => {
        projectsGrid.style.opacity = '1';
        projectsGrid.style.pointerEvents = 'auto';

        // Scroll vers le haut de la grille
        projectsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (typeof showNotification === 'function') {
            showNotification(`Page ${page} chargée`, 'success');
        }
    }, 500);
}

/**
 * Animation des compteurs statistiques
 */
function initializeCountAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    if (!statNumbers.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(number => observer.observe(number));
}

/**
 * Animer un compteur numérique
 * @param {Element} element - Élément du compteur
 */
function animateCount(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const start = 0;
    const startTime = Date.now();

    function updateCount() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Fonction d'easing
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOutCubic);

        element.textContent = current.toLocaleString();
        element.classList.add('animate');

        if (progress < 1) {
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    updateCount();
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

                // Animation spéciale pour les cartes de projets
                if (entry.target.classList.contains('projects-grid')) {
                    animateProjectCards(entry.target);
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Éléments à observer
    const elementsToObserve = document.querySelectorAll(`
        .hero-content,
        .hero-description,
        .projects-header,
        .projects-grid,
        .impact-stats,
        .cta-content
    `);

    elementsToObserve.forEach(element => {
        if (element) observer.observe(element);
    });
}

/**
 * Animation des cartes de projets
 * @param {Element} grid - Grille des projets
 */
function animateProjectCards(grid) {
    const cards = grid.querySelectorAll('.project-card');

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100 + 200);
    });
}

/**
 * Fonctionnalité de recherche
 */
function initializeSearchFunctionality() {
    // Créer un champ de recherche
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <div class="search-input-wrapper">
            <i class="fas fa-search search-icon"></i>
            <input type="text" class="search-input" placeholder="Rechercher un projet...">
            <button class="search-clear" style="display: none;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Styles pour la recherche
    searchContainer.style.cssText = `
        margin-bottom: 20px;
        max-width: 400px;
    `;

    const inputWrapper = searchContainer.querySelector('.search-input-wrapper');
    inputWrapper.style.cssText = `
        position: relative;
        display: flex;
        align-items: center;
    `;

    const searchIcon = searchContainer.querySelector('.search-icon');
    searchIcon.style.cssText = `
        position: absolute;
        left: 12px;
        color: #6b7280;
        font-size: 14px;
        z-index: 1;
    `;

    const searchInput = searchContainer.querySelector('.search-input');
    searchInput.style.cssText = `
        width: 100%;
        padding: 12px 40px 12px 40px;
        border: 1px solid #e5e7eb;
        font-size: 14px;
        transition: all 0.3s ease;
        background: white;
    `;

    const clearBtn = searchContainer.querySelector('.search-clear');
    clearBtn.style.cssText = `
        position: absolute;
        right: 12px;
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        padding: 4px;
        font-size: 12px;
    `;

    // Insérer avant les filtres
    const projectsHeader = document.querySelector('.projects-header');
    if (projectsHeader) {
        projectsHeader.appendChild(searchContainer);
    }

    // Fonctionnalité de recherche
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();

        // Afficher/masquer le bouton de suppression
        clearBtn.style.display = query ? 'block' : 'none';

        // Debounce pour optimiser les performances
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchProjects(query);
        }, 300);
    });

    // Bouton de suppression
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        searchProjects('');
        searchInput.focus();
    });

    // Focus sur le champ de recherche
    searchInput.addEventListener('focus', function() {
        this.style.borderColor = '#c53c3c';
        this.style.boxShadow = '0 0 0 3px rgba(197, 60, 60, 0.1)';
    });

    searchInput.addEventListener('blur', function() {
        this.style.borderColor = '#e5e7eb';
        this.style.boxShadow = 'none';
    });
}

/**
 * Rechercher dans les projets
 * @param {string} query - Requête de recherche
 */
function searchProjects(query) {
    const projectCards = document.querySelectorAll('.project-card');
    let visibleCount = 0;

    projectCards.forEach(card => {
        const title = card.querySelector('.project-title').textContent.toLowerCase();
        const description = card.querySelector('.project-description').textContent.toLowerCase();
        const category = card.querySelector('.project-category').textContent.toLowerCase();

        const matches = !query || title.includes(query) || description.includes(query) || category.includes(query);

        if (matches) {
            card.style.display = 'block';
            card.classList.remove('filtered-out');
            card.classList.add('filtered-in');
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.classList.add('filtered-out');
            card.classList.remove('filtered-in');
        }
    });

    // Mettre à jour le compteur de résultats
    updateSearchResults(query, visibleCount, projectCards.length);
}

/**
 * Mettre à jour les résultats de recherche
 * @param {string} query - Requête de recherche
 * @param {number} visible - Nombre de résultats visibles
 * @param {number} total - Nombre total de projets
 */
function updateSearchResults(query, visible, total) {
    let counter = document.querySelector('.search-results-counter');

    if (!counter) {
        counter = document.createElement('div');
        counter.className = 'search-results-counter';
        counter.style.cssText = `
            text-align: center;
            margin: 20px 0;
            color: #6b7280;
            font-size: 14px;
            font-weight: 500;
        `;

        const grid = document.querySelector('.projects-grid');
        grid.parentNode.insertBefore(counter, grid);
    }

    if (query) {
        counter.textContent = `${visible} projet${visible !== 1 ? 's' : ''} trouvé${visible !== 1 ? 's' : ''} pour "${query}"`;
        counter.style.display = 'block';
    } else {
        counter.style.display = 'none';
    }
}

/**
 * Gestion des paramètres d'URL pour les filtres
 */
function initializeURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    const searchParam = urlParams.get('search');

    // Appliquer le filtre depuis l'URL
    if (filterParam) {
        const filterBtn = document.querySelector(`[data-filter="${filterParam}"]`);
        if (filterBtn) {
            filterBtn.click();
        }
    }

    // Appliquer la recherche depuis l'URL
    if (searchParam) {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.value = searchParam;
            searchProjects(searchParam);
        }
    }
}

/**
 * Mettre à jour l'URL avec les paramètres actuels
 * @param {string} filter - Filtre actuel
 * @param {string} search - Recherche actuelle
 */
function updateURL(filter, search) {
    const url = new URL(window.location);

    if (filter && filter !== 'all') {
        url.searchParams.set('filter', filter);
    } else {
        url.searchParams.delete('filter');
    }

    if (search) {
        url.searchParams.set('search', search);
    } else {
        url.searchParams.delete('search');
    }

    window.history.replaceState({}, '', url);
}

/**
 * Gestion du partage de projets
 */
function initializeProjectSharing() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        // Ajouter un bouton de partage
        const shareBtn = document.createElement('button');
        shareBtn.className = 'project-share-btn';
        shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
        shareBtn.style.cssText = `
            position: absolute;
            top: 16px;
            right: 16px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            padding: 8px;
            cursor: pointer;
            font-size: 12px;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 3;
        `;

        const projectImage = card.querySelector('.project-image');
        projectImage.style.position = 'relative';
        projectImage.appendChild(shareBtn);

        // Afficher le bouton au survol
        card.addEventListener('mouseenter', () => {
            shareBtn.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            shareBtn.style.opacity = '0';
        });

        // Fonctionnalité de partage
        shareBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            shareProject(card);
        });
    });
}

/**
 * Partager un projet
 * @param {Element} card - Carte du projet
 */
function shareProject(card) {
    const title = card.querySelector('.project-title').textContent;
    const description = card.querySelector('.project-description').textContent;
    const url = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: `CRIHD - ${title}`,
            text: description,
            url: url
        }).catch(console.error);
    } else {
        // Fallback : copier le lien
        const shareUrl = `${url}#${title.toLowerCase().replace(/\s+/g, '-')}`;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareUrl).then(() => {
                if (typeof showNotification === 'function') {
                    showNotification('Lien copié dans le presse-papier !', 'success');
                }
            });
        } else {
            // Créer un menu de partage personnalisé
            showShareMenu(card, title, description, shareUrl);
        }
    }
}

/**
 * Afficher un menu de partage personnalisé
 * @param {Element} card - Carte du projet
 * @param {string} title - Titre du projet
 * @param {string} description - Description du projet
 * @param {string} url - URL à partager
 */
function showShareMenu(card, title, description, url) {
    const shareMenu = document.createElement('div');
    shareMenu.className = 'share-menu';
    shareMenu.innerHTML = `
        <div class="share-backdrop"></div>
        <div class="share-content">
            <h3>Partager ce projet</h3>
            <div class="share-options">
                <button class="share-option" data-platform="facebook">
                    <i class="fab fa-facebook-f"></i> Facebook
                </button>
                <button class="share-option" data-platform="twitter">
                    <i class="fab fa-twitter"></i> Twitter
                </button>
                <button class="share-option" data-platform="linkedin">
                    <i class="fab fa-linkedin-in"></i> LinkedIn
                </button>
                <button class="share-option" data-platform="copy">
                    <i class="fas fa-copy"></i> Copier le lien
                </button>
            </div>
            <button class="share-close">&times;</button>
        </div>
    `;

    // Styles pour le menu de partage
    shareMenu.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1001;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const backdrop = shareMenu.querySelector('.share-backdrop');
    backdrop.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    `;

    const content = shareMenu.querySelector('.share-content');
    content.style.cssText = `
        background: white;
        padding: 24px;
        border-radius: 8px;
        position: relative;
        max-width: 300px;
        width: 90%;
    `;

    document.body.appendChild(shareMenu);

    // Événements de partage
    const shareOptions = shareMenu.querySelectorAll('.share-option');
    shareOptions.forEach(option => {
        option.addEventListener('click', () => {
            const platform = option.getAttribute('data-platform');
            handleShare(platform, title, description, url);
            shareMenu.remove();
        });
    });

    // Fermeture du menu
    const closeBtn = shareMenu.querySelector('.share-close');
    const closeMenu = () => shareMenu.remove();

    closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);
}

/**
 * Gérer le partage selon la plateforme
 * @param {string} platform - Plateforme de partage
 * @param {string} title - Titre
 * @param {string} description - Description
 * @param {string} url - URL
 */
function handleShare(platform, title, description, url) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    if (platform === 'copy') {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                if (typeof showNotification === 'function') {
                    showNotification('Lien copié !', 'success');
                }
            });
        }
    } else if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

/**
 * Gestion des favoris de projets
 */
function initializeProjectFavorites() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'project-favorite-btn';
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
        favoriteBtn.style.cssText = `
            position: absolute;
            top: 56px;
            right: 16px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            padding: 8px;
            cursor: pointer;
            font-size: 12px;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 3;
        `;

        const projectImage = card.querySelector('.project-image');
        projectImage.appendChild(favoriteBtn);

        // Afficher le bouton au survol
        card.addEventListener('mouseenter', () => {
            favoriteBtn.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            favoriteBtn.style.opacity = '0';
        });

        // Gestion des favoris
        const projectId = card.getAttribute('data-project-id') || generateProjectId(card);
        card.setAttribute('data-project-id', projectId);

        // Charger l'état des favoris
        const isFavorite = isProjectFavorite(projectId);
        updateFavoriteButton(favoriteBtn, isFavorite);

        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleProjectFavorite(projectId, favoriteBtn);
        });
    });
}

/**
 * Générer un ID de projet
 * @param {Element} card - Carte du projet
 * @returns {string}
 */
function generateProjectId(card) {
    const title = card.querySelector('.project-title').textContent;
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/**
 * Vérifier si un projet est en favori
 * @param {string} projectId - ID du projet
 * @returns {boolean}
 */
function isProjectFavorite(projectId) {
    const favorites = JSON.parse(localStorage.getItem('crihd-favorites') || '[]');
    return favorites.includes(projectId);
}

/**
 * Basculer l'état favori d'un projet
 * @param {string} projectId - ID du projet
 * @param {Element} button - Bouton favori
 */
function toggleProjectFavorite(projectId, button) {
    const favorites = JSON.parse(localStorage.getItem('crihd-favorites') || '[]');
    const isFavorite = favorites.includes(projectId);

    if (isFavorite) {
        const index = favorites.indexOf(projectId);
        favorites.splice(index, 1);
    } else {
        favorites.push(projectId);
    }

    localStorage.setItem('crihd-favorites', JSON.stringify(favorites));
    updateFavoriteButton(button, !isFavorite);

    if (typeof showNotification === 'function') {
        const message = !isFavorite ? 'Projet ajouté aux favoris' : 'Projet retiré des favoris';
        showNotification(message, 'success');
    }
}

/**
 * Mettre à jour l'apparence du bouton favori
 * @param {Element} button - Bouton favori
 * @param {boolean} isFavorite - État favori
 */
function updateFavoriteButton(button, isFavorite) {
    const icon = button.querySelector('i');
    if (isFavorite) {
        icon.className = 'fas fa-heart';
        button.style.color = '#ef4444';
    } else {
        icon.className = 'far fa-heart';
        button.style.color = 'white';
    }
}

/**
 * Initialisation complète de la page projects
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation principale
    initializeProjectsPage();

    // Fonctionnalités avancées
    initializeProjectSharing();
    initializeProjectFavorites();
    initializeURLParams();

    // Gestion du redimensionnement
    window.addEventListener('resize', CRIHD.utils.debounce(() => {
        // Réajuster les layouts si nécessaire
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid && window.innerWidth <= 768) {
            projectsGrid.style.gridTemplateColumns = '1fr';
        }
    }, 250));

    // Animation d'entrée de la page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

/**
 * Export des fonctions pour utilisation globale
 */
if (typeof window !== 'undefined') {
    window.ProjectsPage = {
        filterProjects,
        searchProjects,
        animateCount,
        shareProject,
        toggleProjectFavorite
    };
}