// ============================================
// Custom Cursor
// ============================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
        cursorFollower.style.left = e.clientX - 15 + 'px';
        cursorFollower.style.top = e.clientY - 15 + 'px';
    }, 50);
});

// Hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .mini-project, .achievement-badge');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });

    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// ============================================
// Menu Toggle
// ============================================
const menuBtn = document.getElementById('menuBtn');
const fullscreenMenu = document.getElementById('fullscreenMenu');
const menuLinks = document.querySelectorAll('.menu-links a');

menuBtn.addEventListener('click', () => {
    const isOpening = !fullscreenMenu.classList.contains('active');
    menuBtn.classList.toggle('active');
    fullscreenMenu.classList.toggle('active');
    document.body.style.overflow = fullscreenMenu.classList.contains('active') ? 'hidden' : '';
    playMenuSound(isOpening);
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        fullscreenMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ============================================
// Sound Button Toggle & Audio System
// ============================================
const soundBtn = document.getElementById('soundBtn');
let soundEnabled = true;

// Create Audio Context for sound effects
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
}

// Sound effect generators
function playClickSound() {
    if (!soundEnabled) return;
    initAudio();

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.1);
}

function playHoverSound() {
    if (!soundEnabled) return;
    initAudio();

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.05);
}

function playSuccessSound() {
    if (!soundEnabled) return;
    initAudio();

    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 - Major chord

    notes.forEach((freq, index) => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

        const startTime = audioCtx.currentTime + index * 0.1;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.3);
    });
}

function playViratCelebration() {
    if (!soundEnabled) return;
    initAudio();

    // Play a triumphant fanfare
    const melody = [
        { freq: 392, duration: 0.15 },  // G4
        { freq: 392, duration: 0.15 },  // G4
        { freq: 392, duration: 0.15 },  // G4
        { freq: 311.13, duration: 0.4 }, // Eb4
        { freq: 349.23, duration: 0.15 }, // F4
        { freq: 349.23, duration: 0.15 }, // F4
        { freq: 349.23, duration: 0.15 }, // F4
        { freq: 293.66, duration: 0.4 },  // D4
    ];

    let time = audioCtx.currentTime;

    melody.forEach(note => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(note.freq, time);

        gainNode.gain.setValueAtTime(0.08, time);
        gainNode.gain.exponentialRampToValueAtTime(0.01, time + note.duration);

        oscillator.start(time);
        oscillator.stop(time + note.duration);

        time += note.duration;
    });
}

function playDivineSound() {
    if (!soundEnabled) return;
    initAudio();

    // Om-like deep resonant sound
    const frequencies = [136.1, 272.2, 408.3]; // Om frequency harmonics

    frequencies.forEach((freq, index) => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

        const volume = 0.08 / (index + 1);
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.5);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 2);
    });
}

function playScrollSound() {
    if (!soundEnabled) return;
    initAudio();

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400 + Math.random() * 200, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.1);
}

function playMenuSound(opening) {
    if (!soundEnabled) return;
    initAudio();

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';

    if (opening) {
        // Ascending whoosh for opening
        oscillator.frequency.setValueAtTime(200, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.2);
    } else {
        // Descending whoosh for closing
        oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.2);
    }

    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.2);
}

function playAchievementSound() {
    if (!soundEnabled) return;
    initAudio();

    // Sparkly achievement unlock sound
    const notes = [880, 1108.73, 1318.51, 1760]; // A5, C#6, E6, A6

    notes.forEach((freq, index) => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

        const startTime = audioCtx.currentTime + index * 0.08;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.06, startTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.2);
    });
}

// Toggle sound button
soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundBtn.innerHTML = soundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
    if (soundEnabled) {
        playSuccessSound();
    }
});

// Add hover sounds to interactive elements
document.querySelectorAll('a, button, .project-card, .mini-project, .achievement-badge, .timeline-content').forEach(el => {
    el.addEventListener('mouseenter', () => {
        playHoverSound();
    });
});

// Add click sounds
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => {
        playClickSound();
    });
});

// ============================================
// Smooth Scrolling
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Section Indicator Update
// ============================================
const sections = document.querySelectorAll('section[id]');
const sectionIndicator = document.querySelector('.current-section');
let currentSectionIndex = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            // Play section change sound when entering a new section
            if (currentSectionIndex !== index) {
                currentSectionIndex = index;
                playScrollSound();
            }
            sectionIndicator.textContent = String(index + 1).padStart(2, '0');
        }
    });
});

// ============================================
// Skill Bars Animation
// ============================================
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
};

// Intersection Observer for skill bars
const skillsSection = document.querySelector('.skills-card');
if (skillsSection) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillObserver.observe(skillsSection);
}

// ============================================
// Scroll Reveal Animation
// ============================================
const revealElements = document.querySelectorAll('.timeline-item, .project-card, .mini-project, .about-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// ============================================
// Navbar Background on Scroll
// ============================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(253, 246, 236, 0.95)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Change navbar color based on section
const aboutSection = document.querySelector('.about');
const contactSection = document.querySelector('.contact');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const navLogo = document.querySelector('.nav-logo');

    // Check if we're in a dark section
    const inDarkSection = (aboutSection && scrollY >= aboutSection.offsetTop - 100 && scrollY < aboutSection.offsetTop + aboutSection.offsetHeight - 100) ||
                          (contactSection && scrollY >= contactSection.offsetTop - 100);

    if (inDarkSection) {
        navLogo.style.color = '#ffffff';
        navbar.style.background = 'rgba(15, 39, 68, 0.95)';
    } else if (window.scrollY > 50) {
        navLogo.style.color = '#2D3436';
        navbar.style.background = 'rgba(253, 246, 236, 0.95)';
    } else {
        navLogo.style.color = '#2D3436';
        navbar.style.background = 'transparent';
    }
});

// ============================================
// Achievements Infinite Scroll
// ============================================
const achievementsScroll = document.querySelector('.achievements-scroll');
const achievementsSection = document.querySelector('.achievements');
let achievementSoundPlayed = false;

if (achievementsScroll) {
    // Clone badges for infinite scroll effect
    const badges = achievementsScroll.innerHTML;
    achievementsScroll.innerHTML = badges + badges;
}

// Play achievement sound when section comes into view
if (achievementsSection) {
    const achievementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !achievementSoundPlayed) {
                playAchievementSound();
                achievementSoundPlayed = true;
                // Allow sound to play again after 10 seconds
                setTimeout(() => {
                    achievementSoundPlayed = false;
                }, 10000);
            }
        });
    }, { threshold: 0.3 });

    achievementObserver.observe(achievementsSection);
}

// ============================================
// Floating Icons Animation Enhancement
// ============================================
const floatingIcons = document.querySelectorAll('.floating-icon');

floatingIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.5}s`;
});

// ============================================
// Parallax Effect for Hero
// ============================================
const heroSection = document.querySelector('.hero');
const heroVisual = document.querySelector('.hero-visual');

window.addEventListener('scroll', () => {
    if (heroVisual && window.scrollY < heroSection.offsetHeight) {
        const scrolled = window.scrollY;
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ============================================
// Divine Roots Parallax Effect
// ============================================
const divineSection = document.querySelector('.divine-roots');
const divineImage = document.querySelector('.divine-image');
const divineContent = document.querySelector('.divine-content');
const omSymbol = document.querySelector('.om-symbol');
let divineSoundPlayed = false;

// Divine section observer for sound
if (divineSection) {
    const divineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !divineSoundPlayed) {
                playDivineSound();
                divineSoundPlayed = true;
                // Allow sound to play again after leaving and returning
                setTimeout(() => {
                    divineSoundPlayed = false;
                }, 5000);
            }
        });
    }, { threshold: 0.3 });

    divineObserver.observe(divineSection);
}

if (divineSection && divineImage) {
    window.addEventListener('scroll', () => {
        const sectionTop = divineSection.offsetTop;
        const sectionHeight = divineSection.offsetHeight;
        const scrollY = window.scrollY;

        // Check if section is in viewport
        if (scrollY > sectionTop - window.innerHeight && scrollY < sectionTop + sectionHeight) {
            const progress = (scrollY - (sectionTop - window.innerHeight)) / (sectionHeight + window.innerHeight);

            // Parallax for image
            divineImage.style.transform = `scale(${1 + progress * 0.1}) translateY(${progress * 50}px)`;

            // Fade and scale for content
            if (divineContent) {
                const contentOpacity = Math.min(1, progress * 2);
                divineContent.style.opacity = contentOpacity;
            }

            // Rotate Om symbol slightly
            if (omSymbol) {
                omSymbol.style.transform = `scale(${1 + Math.sin(progress * Math.PI) * 0.2}) rotate(${progress * 10}deg)`;
            }
        }
    });
}

// ============================================
// Project Cards Stagger Animation
// ============================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ============================================
// Timeline Animation
// ============================================
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
});

// ============================================
// Console Easter Egg
// ============================================
console.log('%c Hello there! 👋', 'color: #FF8C42; font-size: 24px; font-weight: bold;');
console.log('%c I\'m Lakshya Aryan', 'color: #2D3436; font-size: 16px;');
console.log('%c Data Scientist | Quantitative Researcher | Product Analyst', 'color: #636E72; font-size: 14px;');
console.log('%c Interested? Let\'s connect: lakshya.aryan.cer22@iitbhu.ac.in', 'color: #4ECDC4; font-size: 12px;');
console.log('%c 🏏 Try typing "18" or "virat" for a surprise!', 'color: #1a47a7; font-size: 12px; font-style: italic;');

// ============================================
// Matrix Data Rain Background
// ============================================
const matrixCanvas = document.getElementById('matrixCanvas');
if (matrixCanvas) {
    const ctx = matrixCanvas.getContext('2d');

    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン$%&@#QUANTALPHA';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(253, 246, 236, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        ctx.fillStyle = '#FF8C42';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);

    window.addEventListener('resize', () => {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    });
}

// ============================================
// Virat Kohli Jersey 18 Easter Egg
// ============================================
let keySequence = '';
const viratEasterEgg = document.getElementById('viratEasterEgg');

document.addEventListener('keydown', (e) => {
    keySequence += e.key.toLowerCase();

    // Check for "18" or "virat" or "kohli"
    if (keySequence.includes('18') || keySequence.includes('virat') || keySequence.includes('kohli')) {
        showViratEasterEgg();
        keySequence = '';
    }

    // Reset if sequence gets too long
    if (keySequence.length > 20) {
        keySequence = keySequence.slice(-10);
    }
});

function showViratEasterEgg() {
    if (viratEasterEgg) {
        viratEasterEgg.classList.add('active');

        // Play Virat celebration sound
        playViratCelebration();

        // Play a celebration effect
        createConfetti();

        // Hide after 4 seconds
        setTimeout(() => {
            viratEasterEgg.classList.remove('active');
        }, 4000);
    }
}

// Confetti effect for easter egg
function createConfetti() {
    const colors = ['#1a47a7', '#ffd700', '#ff9933', '#138808', '#ffffff'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            z-index: 10001;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
}

// Add confetti animation dynamically
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Secret click combo - click on logo 3 times
let logoClickCount = 0;
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
    navLogo.addEventListener('click', () => {
        logoClickCount++;
        if (logoClickCount >= 3) {
            showViratEasterEgg();
            logoClickCount = 0;
        }

        // Reset after 2 seconds
        setTimeout(() => {
            logoClickCount = 0;
        }, 2000);
    });
}

// Magic hint click in footer
const magicHint = document.querySelector('.magic-hint');
if (magicHint) {
    magicHint.addEventListener('click', () => {
        showViratEasterEgg();
    });
}

// ============================================
// Preloader (Optional)
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-greeting, .hero-name, .hero-tagline, .hero-cta');
        heroElements.forEach(el => {
            el.style.opacity = '1';
        });
    }, 100);
});

// ============================================
// Intersection Observer for About Section
// ============================================
const aboutCards = document.querySelectorAll('.about-card');

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

aboutCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    aboutObserver.observe(card);
});

// ============================================
// Dynamic Year in Footer
// ============================================
const footerYear = document.querySelector('.footer p:first-child');
if (footerYear && !footerYear.textContent.includes('2024')) {
    // Update year if needed
}

// ============================================
// Hologram Animation Enhancement
// ============================================
const hologramFigure = document.querySelector('.hologram-figure');

if (hologramFigure) {
    setInterval(() => {
        hologramFigure.style.filter = `brightness(${0.8 + Math.random() * 0.4})`;
    }, 100);
}

// ============================================
// Mini Project Hover Sound (Visual Feedback)
// ============================================
const miniProjects = document.querySelectorAll('.mini-project');

miniProjects.forEach(project => {
    project.addEventListener('mouseenter', () => {
        project.style.borderColor = '#FF8C42';
    });

    project.addEventListener('mouseleave', () => {
        project.style.borderColor = 'transparent';
    });
});

// ============================================
// Active Navigation Highlighting
// ============================================
const navLinks = document.querySelectorAll('.menu-links a');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = link.getAttribute('href') === `#${sectionId}` ? '#FF8C42' : '#ffffff';
            });
        }
    });
});
