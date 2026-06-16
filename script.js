// ============================================
// Custom Minimalist Cursor
// ============================================
const cursorDot = document.getElementById('cursorDot');
const cursorFollower = document.getElementById('cursorFollower');

let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
let followerX = cursorX;
let followerY = cursorY;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
});

function animateCursor() {
    // Smooth trailing effect
    followerX += (cursorX - followerX) * 0.15;
    followerY += (cursorY - followerY) * 0.15;

    if (cursorDot) {
        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';
    }

    if (cursorFollower) {
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
    }

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect for interactive elements
const hoverElements = document.querySelectorAll('a, button, [data-cursor="hover"]');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
    });

    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
    });
});

// ============================================
// Menu Toggle
// ============================================
const menuBtn = document.getElementById('menuBtn');
const fullscreenMenu = document.getElementById('fullscreenMenu');
const menuLinks = document.querySelectorAll('.menu-item');

menuBtn.addEventListener('click', () => {
    fullscreenMenu.classList.toggle('active');
    
    if (fullscreenMenu.classList.contains('active')) {
        menuBtn.textContent = 'CLOSE';
        document.body.style.overflow = 'hidden';
    } else {
        menuBtn.textContent = 'MENU';
        document.body.style.overflow = '';
    }
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        fullscreenMenu.classList.remove('active');
        menuBtn.textContent = 'MENU';
        document.body.style.overflow = '';
    });
});

// ============================================
// Scroll Reveal Animation (Intersection Observer)
// ============================================
const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-text-mask');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Optional: unobserve after revealing if you want it to happen only once
            // revealObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.1, 
    rootMargin: '0px 0px -100px 0px' 
});

revealElements.forEach(el => {
    // Add initial state classes if they are simple reveal elements
    if (el.classList.contains('reveal-on-scroll')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1), transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
    }
    revealObserver.observe(el);
});

// Handle the simple reveal elements when they get the 'revealed' class
const observerForSimpleReveals = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const el = mutation.target;
            if (el.classList.contains('reveal-on-scroll') && el.classList.contains('revealed')) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            } else if (el.classList.contains('reveal-on-scroll') && !el.classList.contains('revealed')) {
                // To allow repeating animations on scroll up
                el.style.opacity = '0';
                el.style.transform = 'translateY(40px)';
            }
        }
    });
});

document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observerForSimpleReveals.observe(el, { attributes: true });
});

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Trigger initial reveal for elements already in viewport
setTimeout(() => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('revealed');
        }
    });
}, 100);
