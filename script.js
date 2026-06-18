// ============================================
// Wait for GSAP and Lenis to load
// ============================================
document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // Smooth Scroll (Lenis)
    // ============================================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integrate GSAP with Lenis
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0, 0);

        // ============================================
        // Hero Parallax Zoom Effect (Awwwards Style)
        // ============================================
        const heroBg = document.getElementById('heroBg');
        if (heroBg) {
            gsap.to(heroBg, {
                yPercent: 30, // Move down slightly
                scale: 1.15,  // Zoom out slightly (from initial cover)
                ease: "none",
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

        // Staggered Text Reveal for Hero
        const gsReveals = document.querySelectorAll('.gs-reveal');
        gsReveals.forEach((el, i) => {
            gsap.fromTo(el, 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1.2, delay: i * 0.15, ease: "power4.out" }
            );
        });
    }

    // ============================================
    // Custom Cursor
    // ============================================
    const cursorDot = document.getElementById('cursorDot');
    const cursorFollower = document.getElementById('cursorFollower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dot follows instantly
        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
    });

    // Follower has easing
    function updateCursor() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        if (cursorFollower) {
            cursorFollower.style.left = `${followerX}px`;
            cursorFollower.style.top = `${followerY}px`;
        }
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Hover effect on interactables
    const interactables = document.querySelectorAll('a, button, .hover-target');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorFollower) cursorFollower.classList.add('hover-active');
            if (cursorDot) cursorDot.style.opacity = '0';
        });
        el.addEventListener('mouseleave', () => {
            if (cursorFollower) cursorFollower.classList.remove('hover-active');
            if (cursorDot) cursorDot.style.opacity = '1';
        });
    });

    // ============================================
    // Magnetic Physics (Buttons)
    // ============================================
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const h = rect.width / 2;
            const v = rect.height / 2;
            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - v;
            
            // Move the button towards the cursor
            gsap.to(btn, {
                x: x * 0.4,
                y: y * 0.4,
                duration: 0.5,
                ease: "power3.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // ============================================
    // 3D Tilt Effect
    // ============================================
    const tiltElements = document.querySelectorAll('.tilt-3d');
    tiltElements.forEach(el => {
        const inner = el.querySelector('.tilt-inner');
        if (!inner) return;

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg
            const rotateY = ((x - centerX) / centerX) * 15;
            
            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        el.addEventListener('mouseleave', () => {
            inner.style.transform = 'rotateX(0) rotateY(0)';
        });
    });

    // ============================================
    // Theme Toggle Logic
    // ============================================
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;

    const savedTheme = localStorage.getItem('site-theme');
    if (savedTheme) {
        htmlEl.setAttribute('data-theme', savedTheme);
    } else {
        const hour = new Date().getHours();
        const isNight = hour >= 18 || hour < 6;
        htmlEl.setAttribute('data-theme', isNight ? 'dark' : 'light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('site-theme', newTheme);
        });
    }

    // ============================================
    // Blur Reveal on Scroll (Vanilla Observer)
    // ============================================
    const revealBlurElements = document.querySelectorAll('.reveal-blur');
    const revealBlurObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealBlurElements.forEach(el => revealBlurObserver.observe(el));

    // ============================================
    // TOC Scroll Spy Logic
    // ============================================
    const tocItems = document.querySelectorAll('.toc-rail-item');
    const sections = document.querySelectorAll('.section-detect');
    const tocSpotlight = document.getElementById('tocSpotlight');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                tocItems.forEach(item => item.classList.remove('active'));
                
                const activeItem = document.querySelector(`.toc-rail-item[href="#${id}"]`);
                if (activeItem) {
                    activeItem.classList.add('active');
                    if (tocSpotlight) {
                        const itemTop = activeItem.offsetTop;
                        tocSpotlight.style.transform = `translateY(${itemTop}px)`;
                    }
                }
            }
        });
    }, {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Smooth scroll for anchor links using Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                lenis.scrollTo(targetEl, { offset: 0, duration: 1.2 });
            }
        });
    });

    // Remove loading class
    document.body.classList.remove('loading');
});
