// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-on-scroll').forEach((element, index) => {
    observer.observe(element);
    element.style.transitionDelay = `${index * 0.1}s`;
});

// ============================================
// PROGRAM CARD HOVER EFFECTS
// ============================================
const programCards = document.querySelectorAll('.program-card');

programCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
        }
    });
});

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-cta, .nav-cta');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn-primary, .btn-secondary, .btn-cta, .nav-cta {
        position: relative;
        overflow: hidden;
    }
    
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

if (hero && heroContent) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = Math.max(1 - (scrolled / heroHeight) * 1.2, 0);
        }
    });
}

// ============================================
// STATS COUNTER ANIMATION
// ============================================
const stats = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            
            stats.forEach(stat => {
                const text = stat.textContent;
                const hasPercent = text.includes('%');
                const hasPlus = text.includes('+');
                const hasK = text.includes('K');
                
                let target = parseInt(text.replace(/\D/g, ''));
                if (hasK) {
                    target = target;
                }
                
                let count = 0;
                const increment = target / 60;
                
                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        let displayValue = Math.ceil(count);
                        
                        if (hasK) {
                            stat.textContent = displayValue + 'K+';
                        } else if (hasPercent) {
                            stat.textContent = displayValue + '%';
                        } else if (hasPlus) {
                            stat.textContent = displayValue + '+';
                        } else {
                            stat.textContent = displayValue;
                        }
                        
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = text;
                    }
                };
                
                updateCount();
            });
        }
    });
}, {
    threshold: 0.5
});

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ============================================
// ACTIVE SECTION HIGHLIGHT IN NAV
// ============================================
const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            navLink?.classList.add('active');
        }
    });
};

window.addEventListener('scroll', highlightNav);

// ============================================
// CUSTOM CURSOR GLOW (DESKTOP ONLY)
// ============================================
if (window.innerWidth > 768) {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .cursor-glow {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 255, 198, 0.3), transparent);
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: width 0.3s ease, height 0.3s ease;
        }
        
        a:hover ~ .cursor-glow,
        button:hover ~ .cursor-glow {
            width: 40px;
            height: 40px;
        }
    `;
    document.head.appendChild(cursorStyle);
}

// ============================================
// CARD GLOW EFFECT ON MOUSE MOVE
// ============================================
const glowCards = document.querySelectorAll('.program-card, .why-card, .testimonial-card');

glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

const glowStyle = document.createElement('style');
glowStyle.textContent = `
    .program-card, .why-card, .testimonial-card {
        position: relative;
    }
    
    .program-card::after, .why-card::after, .testimonial-card::after {
        content: '';
        position: absolute;
        top: var(--mouse-y, 50%);
        left: var(--mouse-x, 50%);
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 255, 198, 0.15), transparent);
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
        opacity: 0;
        pointer-events: none;
    }
    
    .program-card:hover::after, .why-card:hover::after, .testimonial-card:hover::after {
        width: 300px;
        height: 300px;
        opacity: 1;
    }
`;
document.head.appendChild(glowStyle);

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

const a11yStyle = document.createElement('style');
a11yStyle.textContent = `
    body:not(.keyboard-nav) *:focus {
        outline: none;
    }
    
    .keyboard-nav *:focus {
        outline: 2px solid var(--color-primary);
        outline-offset: 3px;
    }
    
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(a11yStyle);

// ============================================
// LAZY LOAD OPTIMIZATION
// ============================================
if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('.program-card, .why-card, .testimonial-card');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
}

// ============================================
// HERO STATS ENTRANCE ANIMATION
// ============================================
const heroStatsItems = document.querySelectorAll('.stat-item');
heroStatsItems.forEach((item, index) => {
    item.style.animationDelay = `${1 + (index * 0.15)}s`;
});

// ============================================
// TESTIMONIAL CARD STAGGER
// ============================================
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

// ============================================
// GRADIENT ANIMATION FOR HERO
// ============================================
const heroGradient = document.querySelector('.hero-gradient');
if (heroGradient) {
    let gradientPosition = 0;
    
    setInterval(() => {
        gradientPosition += 1;
        heroGradient.style.backgroundPosition = `${gradientPosition}px ${gradientPosition}px`;
    }, 50);
}

console.log('APEX Performance - Elite training experience loaded');