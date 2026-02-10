// ═══════════════════════════════════════════
// SMOOTH SCROLLING
// ═══════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: position,
                behavior: 'smooth'
            });
        }
    });
});

// ═══════════════════════════════════════════
// NAVBAR SCROLL EFFECT
// ═══════════════════════════════════════════
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.97)';
        navbar.style.borderBottomColor = 'rgba(0, 212, 170, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.borderBottomColor = '#E2E8F0';
    }
});

// ═══════════════════════════════════════════
// INTERSECTION OBSERVER FOR ANIMATIONS
// ═══════════════════════════════════════════
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Stagger children animations
            const children = entry.target.querySelectorAll('.problem-card, .pillar-card, .control-card, .persona-card, .promise-item, .faq-item');
            children.forEach((child, index) => {
                child.style.animationDelay = `${index * 0.1}s`;
            });
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ═══════════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════════
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// ═══════════════════════════════════════════
// COUNTER ANIMATION
// ═══════════════════════════════════════════
function animateValue(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeProgress);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Animate numbers when visible
const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const text = element.textContent;
            
            if (text.includes('%')) {
                const number = parseInt(text);
                if (!isNaN(number)) {
                    element.textContent = '0%';
                    animateValue(element, 0, number, 2000, '%');
                }
            }
            
            metricObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.metric-number, .result-number').forEach(el => {
    metricObserver.observe(el);
});

// ═══════════════════════════════════════════
// PARALLAX GLOW EFFECT
// ═══════════════════════════════════════════
const heroGlow = document.querySelector('.hero-glow');

if (heroGlow) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 50;
        const y = (e.clientY / window.innerHeight - 0.5) * 50;
        heroGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
}

// ═══════════════════════════════════════════
// CARD HOVER GLOW
// ═══════════════════════════════════════════
document.querySelectorAll('.problem-card, .pillar-card, .control-card, .persona-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Add glow effect styles
const glowStyles = document.createElement('style');
glowStyles.textContent = `
    .problem-card::before,
    .pillar-card::before,
    .control-card::before,
    .persona-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        background: radial-gradient(
            400px circle at var(--mouse-x) var(--mouse-y),
            rgba(0, 212, 170, 0.06),
            transparent 40%
        );
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .problem-card:hover::before,
    .pillar-card:hover::before,
    .control-card:hover::before,
    .persona-card:hover::before {
        opacity: 1;
    }
    
    .problem-card,
    .pillar-card,
    .control-card,
    .persona-card {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(glowStyles);

// ═══════════════════════════════════════════
// AI CORE PULSE
// ═══════════════════════════════════════════
const coreIcon = document.querySelector('.core-icon');

if (coreIcon) {
    setInterval(() => {
        coreIcon.style.filter = 'drop-shadow(0 0 40px rgba(0, 212, 170, 0.8))';
        setTimeout(() => {
            coreIcon.style.filter = 'drop-shadow(0 0 30px rgba(0, 212, 170, 0.5))';
        }, 500);
    }, 2000);
}

// ═══════════════════════════════════════════
// CONTACT FORM HANDLING (Formspree Integration)
// ═══════════════════════════════════════════
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Get submit button
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        const formNote = this.querySelector('.form-note');
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Submit to Formspree
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success state
                submitBtn.textContent = 'Message Sent! ✓';
                submitBtn.style.background = '#10b981';
                
                // Reset form
                this.reset();
                
                // Show success message
                if (formNote) {
                    formNote.textContent = 'Thank you! We\'ll be in touch within 24 hours.';
                    formNote.style.color = '#10b981';
                }
                
                // Reset button after 5 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    if (formNote) {
                        formNote.textContent = 'We\'ll respond within 24 hours';
                        formNote.style.color = '';
                    }
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error state
            submitBtn.textContent = 'Error - Try Again';
            submitBtn.style.background = '#ef4444';
            
            if (formNote) {
                formNote.textContent = 'Something went wrong. Please try again or email us directly.';
                formNote.style.color = '#ef4444';
            }
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                if (formNote) {
                    formNote.textContent = 'We\'ll respond within 24 hours';
                    formNote.style.color = '';
                }
            }, 3000);
        }
    });
}

// ═══════════════════════════════════════════
// FAQ ACCORDION (optional enhancement)
// ═══════════════════════════════════════════
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('expanded');
    });
});

// ═══════════════════════════════════════════
// ACTIVITY TICKER ANIMATION
// ═══════════════════════════════════════════
const activityTicker = document.querySelector('.activity-ticker');
if (activityTicker) {
    const tickerItems = activityTicker.querySelectorAll('.ticker-item');
    let currentIndex = 0;
    
    // Reset all items
    tickerItems.forEach(item => {
        item.style.animation = 'none';
        item.style.opacity = '0';
        item.style.position = 'relative';
    });
    
    function showNextTicker() {
        tickerItems.forEach((item, index) => {
            if (index === currentIndex) {
                item.style.opacity = '1';
                item.classList.add('active');
            } else {
                item.style.opacity = '0';
                item.classList.remove('active');
            }
        });
        currentIndex = (currentIndex + 1) % tickerItems.length;
    }
    
    // Initial show
    showNextTicker();
    // Cycle every 2 seconds
    setInterval(showNextTicker, 2000);
}

// ═══════════════════════════════════════════
// WORKFLOW STAGE INTERSECTION ANIMATION
// ═══════════════════════════════════════════
const workflowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate branches with stagger
            const branches = entry.target.querySelectorAll('.branch-item');
            branches.forEach((branch, i) => {
                setTimeout(() => {
                    branch.style.opacity = '1';
                    branch.style.transform = 'translateX(0)';
                }, i * 150);
            });
            
            // Animate action branches
            const actions = entry.target.querySelectorAll('.action-branch');
            actions.forEach((action, i) => {
                setTimeout(() => {
                    action.style.opacity = '1';
                }, i * 200 + 500);
            });
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.workflow-stage').forEach(stage => {
    workflowObserver.observe(stage);
});

// ═══════════════════════════════════════════
// CONSOLE BRANDING
// ═══════════════════════════════════════════
console.log('%c> Vigilense AI', 'font-size: 24px; font-weight: bold; color: #0A1628; font-family: monospace;');
console.log('%cThe Sovereign SOC', 'font-size: 14px; color: #00D4AA; font-family: monospace;');
console.log('%cYour Data. Your Infrastructure. Our Intelligence.', 'font-size: 12px; color: #475569; font-family: monospace;');
