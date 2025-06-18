/* ==========================================
   CRIHD PROJECTS - JavaScript fidèle au design
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeImageShowcase();
    initializeServicesCarousel();
    initializeProjectsSidebar();
    initializeBlogCarousel();
    initializeScrollAnimations();
});

/**
 * Initialisation du showcase d'images principal
 */
function initializeImageShowcase() {
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const mainImage = document.querySelector('.main-image');
    
    if (!indicators.length || !mainImage) return;
    
    let currentIndex = 0;
    const images = [
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=400&fit=crop',
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=400&fit=crop',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop'
    ];
    
    function updateShowcase(index) {
        // Mettre à jour l'image
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = images[index];
            mainImage.style.opacity = '1';
        }, 150);
        
        // Mettre à jour les indicateurs
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    function nextImage() {
        const nextIndex = (currentIndex + 1) % images.length;
        updateShowcase(nextIndex);
    }
    
    function prevImage() {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        updateShowcase(prevIndex);
    }
    
    // Event listeners
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => updateShowcase(index));
    });
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextImage);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevImage);
    }
    
    // Auto-play optionnel (5 secondes)
    setInterval(nextImage, 5000);
}

/**
 * Carousel des services
 */
function initializeServicesCarousel() {
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    const servicesGrid = document.querySelector('.services-grid');
    const pageCounter = document.querySelector('.page-counter');
    
    if (!servicesGrid) return;
    
    let currentPage = 1;
    const totalPages = 5; // Selon le design "01/05"
    
    function updatePageCounter() {
        if (pageCounter) {
            const current = currentPage.toString().padStart(2, '0');
            const total = totalPages.toString().padStart(2, '0');
            pageCounter.textContent = `${current}/${total}`;
        }
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updatePageCounter();
                // Animation ou changement de contenu ici
                animateServicesChange();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                updatePageCounter();
                // Animation ou changement de contenu ici
                animateServicesChange();
            }
        });
    }
    
    function animateServicesChange() {
        const cards = servicesGrid.querySelectorAll('.service-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0.6';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100 + 200);
        });
    }
    
    // Initialiser
    updatePageCounter();
}

/**
 * Sidebar des projets avec changement de contenu
 */
function initializeProjectsSidebar() {
    const projectItems = document.querySelectorAll('.project-item');
    const mainImage = document.querySelector('.project-display img');
    const overlayTitle = document.querySelector('.project-overlay h3');
    const overlayDescription = document.querySelector('.project-overlay p');
    
    if (!projectItems.length) return;
    
    // Données des projets
    const projectsData = [
        {
            title: "Analyse linguistique Nord Côte d'Ivoire",
            description: "Étude approfondie des langues locales pour préserver le patrimoine linguistique et améliorer l'accès à l'éducation dans le nord du pays.",
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop"
        },
        {
            title: "Inclusion sociale et marché du travail - Côte d'Ivoire",
            description: "Programme d'insertion professionnelle pour les populations vulnérables et amélioration de l'accès à l'emploi décent.",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
        },
        {
            title: "Renforcement systèmes de santé - Côte d'Ivoire",
            description: "Accompagnement pour améliorer durablement les infrastructures, les pratiques et l'accès aux soins de santé en Côte d'Ivoire.",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
        },
        {
            title: "Productivité et Certification vertes - Certification RainForest",
            description: "Soutien aux producteurs pour l'adoption de pratiques durables et l'obtention de certifications environnementales.",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop"
        }
    ];
    
    function showProject(index) {
        const project = projectsData[index];
        if (!project) return;
        
        // Animation de transition
        if (mainImage) {
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.src = project.image;
                mainImage.alt = project.title;
                mainImage.style.opacity = '1';
            }, 200);
        }
        
        if (overlayTitle) {
            overlayTitle.style.opacity = '0';
            setTimeout(() => {
                overlayTitle.textContent = project.title;
                overlayTitle.style.opacity = '1';
            }, 200);
        }
        
        if (overlayDescription) {
            overlayDescription.style.opacity = '0';
            setTimeout(() => {
                overlayDescription.textContent = project.description;
                overlayDescription.style.opacity = '1';
            }, 200);
        }
        
        // Mettre à jour les états actifs
        projectItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }
    
    // Event listeners
    projectItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            showProject(index);
        });
        
        // Support clavier
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showProject(index);
            }
        });
        
        // Rendre accessible
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
    });
    
    // Initialiser avec le premier projet (index 2 = projet 3 actif par défaut)
    showProject(2);
}

/**
 * Carousel du blog - Scroll horizontal de gauche à droite
 */
function initializeBlogCarousel() {
    const prevBtn = document.querySelector('.blog-prev');
    const nextBtn = document.querySelector('.blog-next');
    const blogGrid = document.querySelector('.blog-grid');
    
    if (!blogGrid) return;
    
    const scrollAmount = 374; // largeur carte (350px) + gap (24px)
    
    // Ajout dynamique d'articles supplémentaires
    const additionalArticles = [
        {
            title: "Innovation numérique pour le développement",
            excerpt: "Comment la technologie transforme les approches de développement en Afrique de l'Ouest.",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop"
        },
        {
            title: "Éducation et formation professionnelle",
            excerpt: "Renforcer les compétences pour un marché du travail en évolution constante.",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=200&fit=crop"
        },
        {
            title: "Gouvernance locale et participation citoyenne",
            excerpt: "Améliorer la gouvernance à travers l'engagement des communautés locales.",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=200&fit=crop"
        },
        {
            title: "Développement rural et agriculture durable",
            excerpt: "Modernisation des pratiques agricoles pour un développement rural inclusif.",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=200&fit=crop"
        },
        {
            title: "Recherche et développement communautaire",
            excerpt: "Approches participatives pour un développement centré sur les communautés.",
            image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=200&fit=crop"
        }
    ];
    
    // Ajouter les articles supplémentaires
    additionalArticles.forEach(article => {
        const blogCard = document.createElement('article');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
            <div class="blog-image">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="blog-content">
                <h3 class="blog-title">${article.title}</h3>
                <p class="blog-excerpt">${article.excerpt}</p>
            </div>
        `;
        blogGrid.appendChild(blogCard);
    });
    
    function updateButtonStates() {
        const maxScrollLeft = blogGrid.scrollWidth - blogGrid.clientWidth;
        
        if (prevBtn) {
            prevBtn.style.opacity = blogGrid.scrollLeft <= 0 ? '0.5' : '1';
            prevBtn.style.pointerEvents = blogGrid.scrollLeft <= 0 ? 'none' : 'auto';
        }
        
        if (nextBtn) {
            nextBtn.style.opacity = blogGrid.scrollLeft >= maxScrollLeft ? '0.5' : '1';
            nextBtn.style.pointerEvents = blogGrid.scrollLeft >= maxScrollLeft ? 'none' : 'auto';
        }
    }
    
    // Bouton PRÉCÉDENT (←) - Scroll vers la GAUCHE
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const newScrollLeft = Math.max(0, blogGrid.scrollLeft - scrollAmount);
            blogGrid.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        });
    }
    
    // Bouton SUIVANT (→) - Scroll vers la DROITE  
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const maxScrollLeft = blogGrid.scrollWidth - blogGrid.clientWidth;
            const newScrollLeft = Math.min(maxScrollLeft, blogGrid.scrollLeft + scrollAmount);
            blogGrid.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        });
    }
    
    // Mettre à jour les boutons lors du scroll (manuel ou programmatique)
    blogGrid.addEventListener('scroll', updateButtonStates);
    
    // Support du scroll avec la roulette de la souris
    blogGrid.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            // deltaY > 0 = scroll vers le bas = avancer vers la droite
            // deltaY < 0 = scroll vers le haut = reculer vers la gauche
            const scrollDirection = e.deltaY > 0 ? 1 : -1;
            const newScrollLeft = blogGrid.scrollLeft + (scrollDirection * scrollAmount * 0.3);
            blogGrid.scrollTo({
                left: Math.max(0, newScrollLeft),
                behavior: 'smooth'
            });
        }
    });
    
    // Support du glisser (drag) - Logique corrigée
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    
    blogGrid.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        scrollLeft = blogGrid.scrollLeft;
        blogGrid.style.cursor = 'grabbing';
        blogGrid.style.userSelect = 'none';
    });
    
    blogGrid.addEventListener('mouseleave', () => {
        isDragging = false;
        blogGrid.style.cursor = 'grab';
        blogGrid.style.userSelect = '';
    });
    
    blogGrid.addEventListener('mouseup', () => {
        isDragging = false;
        blogGrid.style.cursor = 'grab';
        blogGrid.style.userSelect = '';
    });
    
    blogGrid.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const currentX = e.pageX;
        const diffX = startX - currentX; // Différence de position
        // Glisser vers la droite (diffX négatif) = scroll vers la gauche
        // Glisser vers la gauche (diffX positif) = scroll vers la droite
        blogGrid.scrollLeft = scrollLeft + diffX;
    });
    
    // Support tactile - Logique corrigée
    let touchStartX = 0;
    let touchScrollLeft = 0;
    
    blogGrid.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchScrollLeft = blogGrid.scrollLeft;
    }, { passive: true });
    
    blogGrid.addEventListener('touchmove', (e) => {
        if (!touchStartX) return;
        const touchX = e.touches[0].clientX;
        const diffX = touchStartX - touchX; // Différence de position
        // Swipe vers la droite (diffX négatif) = scroll vers la gauche  
        // Swipe vers la gauche (diffX positif) = scroll vers la droite
        blogGrid.scrollLeft = touchScrollLeft + diffX;
    }, { passive: true });
    
    blogGrid.addEventListener('touchend', () => {
        touchStartX = 0;
    }, { passive: true });
    
    // Définir le curseur par défaut
    blogGrid.style.cursor = 'grab';
    
    // Initialiser l'état des boutons
    setTimeout(updateButtonStates, 100);
    
    // Mettre à jour lors du redimensionnement
    window.addEventListener('resize', updateButtonStates);
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
                
                // Animations spéciales
                if (entry.target.classList.contains('partners-grid')) {
                    animatePartners(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements à observer
    const elementsToObserve = document.querySelectorAll(`
        .services-grid,
        .research-section,
        .partners-grid,
        .projects-layout,
        .blog-grid
    `);
    
    elementsToObserve.forEach(element => {
        if (element) observer.observe(element);
    });
}

/**
 * Animation des logos partenaires
 */
function animatePartners(container) {
    const logos = container.querySelectorAll('.partner-logo');
    logos.forEach((logo, index) => {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px)';
        logo.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, index * 100 + 200);
    });
}

/**
 * Gestion des boutons "Voir plus"
 */
document.addEventListener('click', function(e) {
    if (e.target.closest('.voir-plus-btn')) {
        e.preventDefault();
        
        const button = e.target.closest('.voir-plus-btn');
        const originalText = button.innerHTML;
        
        // Animation de clic
        button.style.transform = 'scale(0.95)';
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.innerHTML = originalText;
            
            // Simuler navigation ou action
            console.log('Navigation vers plus de contenu...');
        }, 1000);
    }
});

/**
 * Gestion du clavier pour l'accessibilité
 */
document.addEventListener('keydown', function(e) {
    // Navigation dans les projets avec flèches
    if (e.target.classList.contains('project-item')) {
        const items = Array.from(document.querySelectorAll('.project-item'));
        const currentIndex = items.indexOf(e.target);
        
        let nextIndex = currentIndex;
        
        switch (e.key) {
            case 'ArrowDown':
            case 'ArrowRight':
                e.preventDefault();
                nextIndex = Math.min(currentIndex + 1, items.length - 1);
                break;
            case 'ArrowUp':
            case 'ArrowLeft':
                e.preventDefault();
                nextIndex = Math.max(currentIndex - 1, 0);
                break;
        }
        
        if (nextIndex !== currentIndex) {
            items[nextIndex].focus();
            items[nextIndex].click();
        }
    }
});

/**
 * Optimisations de performance
 */
function initializePerformanceOptimizations() {
    // Lazy loading des images non critiques
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
    
    // Preload des images critiques
    const criticalImages = [
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=400&fit=crop',
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // Gestion de la visibilité de la page
    document.addEventListener('visibilitychange', () => {
        const cards = document.querySelectorAll('.service-card, .blog-card');
        
        if (document.hidden) {
            // Pause des animations quand la page n'est pas visible
            cards.forEach(card => {
                card.style.animationPlayState = 'paused';
            });
        } else {
            // Reprendre les animations
            cards.forEach(card => {
                card.style.animationPlayState = 'running';
            });
        }
    });
}

/**
 * Gestion des états de hover avancés
 */
function initializeAdvancedHoverEffects() {
    // Effet parallaxe léger sur les cartes de service
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.service-image img');
            const arrow = this.querySelector('.service-arrow');
            
           
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.service-image img');
            const arrow = this.querySelector('.service-arrow');
            
            if (image) {
                image.style.transform = 'scale(1) rotate(0deg)';
            }
            
            if (arrow) {
                arrow.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Effet de mouvement de la souris
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const rotateX = deltaY * 5;
            const rotateY = deltaX * 5;
            
            this.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
    
    // Effet similaire pour les cartes de blog
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.blog-image img');
            
            if (image) {
                image.style.transform = 'scale(1.08)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.blog-image img');
            
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

/**
 * Animation des compteurs (si nécessaire)
 */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = Date.now();
    
    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Fonction d'easing
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOutCubic);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

/**
 * Gestion des erreurs d'images
 */
function initializeImageErrorHandling() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Image de fallback en cas d'erreur
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTI1TDE3NSAxMDBIMjI1TDIwMCAxMjVaIiBmaWxsPSIjOUM5Q0EzIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEyNSIgcj0iNSIgZmlsbD0iIzlDOUNBMyIvPgo8L3N2Zz4K';
            this.alt = 'Image non disponible';
            
            // Ajouter une classe pour le styling
            this.classList.add('image-error');
        });
        
        // Ajouter un indicateur de chargement
        img.addEventListener('loadstart', function() {
            this.classList.add('loading');
        });
        
        img.addEventListener('load', function() {
            this.classList.remove('loading');
            this.classList.add('loaded');
        });
    });
}

/**
 * Système de notifications pour les interactions
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Styles inline pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    `;
    
    document.body.appendChild(notification);
    
    // Animer l'apparition
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

/**
 * Copier dans le presse-papier
 */
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copié dans le presse-papier !', 'success');
        });
    } else {
        // Fallback pour les navigateurs plus anciens
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification('Copié dans le presse-papier !', 'success');
        } catch (err) {
            showNotification('Erreur lors de la copie', 'error');
        }
        
        document.body.removeChild(textArea);
    }
}

/**
 * Débounce utility
 */
function debounce(func, wait, immediate) {
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
}

/**
 * Throttle utility
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Initialisation complète au chargement
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initializations principales
    initializeImageShowcase();
    initializeServicesCarousel();
    initializeProjectsSidebar();
    initializeBlogCarousel();
    initializeScrollAnimations();
    
    // Améliorations
    initializePerformanceOptimizations();
    initializeAdvancedHoverEffects();
    initializeImageErrorHandling();
    
    // Animation d'entrée de la page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

/**
 * Gestion du redimensionnement de la fenêtre
 */
window.addEventListener('resize', debounce(() => {
    // Recalculer les layouts si nécessaire
    const blogCarousel = document.querySelector('.blog-grid');
    if (blogCarousel) {
        blogCarousel.style.transform = 'translateX(0)';
    }
}, 250));

/**
 * Export des fonctions pour utilisation globale
 */
if (typeof window !== 'undefined') {
    window.showNotification = showNotification;
    window.copyToClipboard = copyToClipboard;
    window.animateCounter = animateCounter;
}