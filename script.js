document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. MOBILE NAVIGATION MENU LOGIC
    // ==========================================================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu if clicked outside header
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header') && navMenu.classList.contains('active')) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
        }
    });


    // ==========================================================================
    // 2. THEME SWITCHER (DARK / LIGHT THEME WITH OVERLAY EFFECT)
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const themeTransitionOverlay = document.querySelector('.theme-transition-overlay');

    // Retrieve saved theme preference, defaulting to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Dynamically populate blocks if empty
        if (themeTransitionOverlay && themeTransitionOverlay.children.length === 0) {
            const rows = 10;
            const cols = 16;
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const bit = document.createElement('div');
                    bit.className = 'theme-transition-bit';
                    // Snappy stagger delay from bottom rows to top rows
                    const delay = (rows - 1 - r) * 15 + (c % 4) * 8;
                    bit.style.transitionDelay = `${delay}ms`;
                    themeTransitionOverlay.appendChild(bit);
                }
            }
        }
        
        // Set dynamic colors based on target theme
        if (newTheme === 'light') {
            themeTransitionOverlay.classList.remove('to-dark');
            themeTransitionOverlay.classList.add('to-light');
        } else {
            themeTransitionOverlay.classList.remove('to-light');
            themeTransitionOverlay.classList.add('to-dark');
        }
        
        // Trigger overlay entry (bits scaling up and joining)
        themeTransitionOverlay.classList.remove('retracting');
        themeTransitionOverlay.classList.add('active');
        
        // Swap theme attributes at the peak of transition cover (350ms)
        setTimeout(() => {
            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        }, 350);
        
        // Retract overlay (bits shrinking out simultaneously)
        setTimeout(() => {
            themeTransitionOverlay.classList.add('retracting');
            themeTransitionOverlay.classList.remove('active');
        }, 750);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fa-solid fa-moon';
        } else {
            icon.className = 'fa-solid fa-sun';
        }
    }


    // ==========================================================================
    // 3. HERO TITLES CAROUSEL
    // ==========================================================================
    const carouselSpans = document.querySelectorAll('.hero-titles-carousel span');
    let activeSpanIndex = 0;

    if (carouselSpans.length > 0) {
        setInterval(() => {
            carouselSpans[activeSpanIndex].classList.remove('active-title');
            activeSpanIndex = (activeSpanIndex + 1) % carouselSpans.length;
            carouselSpans[activeSpanIndex].classList.add('active-title');
        }, 3500);
    }


    // ==========================================================================
    // 4. STATS COUNTER COUNT-UP ANIMATION
    // ==========================================================================
    const statNums = document.querySelectorAll('.stat-num');
    const statsSection = document.querySelector('.about-stats');

    function animateCounter(el) {
        const targetVal = parseInt(el.getAttribute('data-val'), 10);
        const duration = 1500; // Total count duration in ms
        const stepTime = Math.max(Math.floor(duration / targetVal), 30);
        let currentVal = 0;

        const timer = setInterval(() => {
            currentVal += 1;
            el.textContent = currentVal;
            
            if (currentVal >= targetVal) {
                el.textContent = targetVal + "+";
                clearInterval(timer);
            }
        }, stepTime);
    }

    if (statsSection && statNums.length > 0) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNums.forEach(num => animateCounter(num));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        statsObserver.observe(statsSection);
    }


    // ==========================================================================
    // 5. SKILL PROGRESS BAR ANIMATION
    // ==========================================================================
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const skillsGrid = document.querySelector('.skills-grid');

    if (skillsGrid && skillBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const progress = bar.getAttribute('data-progress');
                        bar.style.width = progress;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        skillsObserver.observe(skillsGrid);
    }


    // ==========================================================================
    // 6. SCROLL SPY - ACTIVE NAVIGATION LINK TRACKING
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // offset header height
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove('active');
            }
        });
    });


    // ==========================================================================
    // 7. PROJECTS PORTFOLIO FILTERING SYSTEM
    // ==========================================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state and add to clicked
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    // Small timeout for CSS transition opacity triggers
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });


    // ==========================================================================
    // 8. COPY TO CLIPBOARD BUTTONS
    // ==========================================================================
    const copyBtns = document.querySelectorAll('.copy-btn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    showToast('Copied to Clipboard!', 'success');
                    
                    // Temporary update icon
                    const icon = btn.querySelector('i');
                    const originalClass = icon.className;
                    icon.className = 'fa-solid fa-check text-orange';
                    
                    setTimeout(() => {
                        icon.className = originalClass;
                    }, 2000);
                })
                .catch(err => {
                    showToast('Failed to copy text', 'info');
                    console.error('Clipboard copy failed: ', err);
                });
        });
    });


    // ==========================================================================
    // 9. TOAST NOTIFICATION GENERATOR
    // ==========================================================================
    function showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let iconClass = 'fa-info-circle';
        if (type === 'success') {
            iconClass = 'fa-circle-check';
        }
        
        toast.innerHTML = `
            <i class="fa-solid ${iconClass}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Fade out trigger
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                toast.remove();
            }, 500); // matches fade-out transition duration
        }, 3000);
    }


    // ==========================================================================
    // 10. CONTACT FORM SUBMISSION HANDLER (EMAILJS INTEGRATION)
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    
    // EMAILJS CONFIGURATION
    // Get these from your dashboard at: https://dashboard.emailjs.com/
    const EMAILJS_PUBLIC_KEY = 'k6w6hklK4lHMyJXRk';
    const EMAILJS_SERVICE_ID = 'service_9sm004d';
    const EMAILJS_TEMPLATE_ID = 'template_wcl7xx7';

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();
            
            if (!name || !email || !subject || !message) {
                showToast('Please fill in all details!', 'info');
                return;
            }
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const submitText = submitBtn.querySelector('.btn-text');
            const submitIcon = submitBtn.querySelector('.btn-icon');
            
            submitBtn.disabled = true;
            submitText.textContent = 'Sending Message...';
            submitIcon.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
            
            if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
                // Fallback Mock Submission for offline/local testing
                setTimeout(() => {
                    showToast(`[Demo Mode] Message simulated successfully! Set your EmailJS keys in script.js to send real emails.`, 'success');
                    submitBtn.disabled = false;
                    submitText.textContent = 'Send Message';
                    submitIcon.innerHTML = '<i class="fa-regular fa-paper-plane"></i>';
                    contactForm.reset();
                }, 1200);
            } else {
                // Initialize EmailJS
                emailjs.init({
                    publicKey: EMAILJS_PUBLIC_KEY,
                });

                // Send email using EmailJS SDK
                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                    from_name: name,
                    reply_to: email,
                    subject: subject,
                    message: message
                })
                .then(() => {
                    showToast(`Thank you, ${name}! Your message was sent successfully.`, 'success');
                    contactForm.reset();
                })
                .catch(error => {
                    showToast("Failed to send message.", 'info');
                    console.error('EmailJS error:', error);
                })
                .then(() => {
                    submitBtn.disabled = false;
                    submitText.textContent = 'Send Message';
                    submitIcon.innerHTML = '<i class="fa-regular fa-paper-plane"></i>';
                });
            }
        });
    }

    // ==========================================================================
    // 11. INTRO PRELOADER & CAR TRANSFORMATION ANIMATION (WITH SOUND)
    // ==========================================================================
    const preloader = document.getElementById('preloader');
    const startBtn = document.getElementById('preloader-start-btn');
    const startScreen = document.getElementById('preloader-start-screen');
    const animScreen = document.getElementById('preloader-anim-screen');
    const carContainer = document.getElementById('preloader-car');
    const introName = document.getElementById('preloader-name');
    
    // Split the name characters dynamically to assign animation delays
    let nameText = "";
    if (introName) {
        nameText = introName.textContent.trim();
        introName.innerHTML = '';
        [...nameText].forEach((char, index) => {
            const span = document.createElement('span');
            if (char === ' ') {
                span.innerHTML = '&nbsp;';
                span.className = 'space';
            } else {
                span.textContent = char;
                span.className = 'letter';
            }
            // Delay is coordinated with the car passing: car reaches K (index 0) around 1.0s, and exits around 2.3s (index 18)
            span.style.animationDelay = `${1.0 + index * 0.07}s`;
            introName.appendChild(span);
        });
    }
    
    // Add preloading state to body to disable scroll
    document.body.classList.add('preloading');
    
    let audioCtx = null;
    let activeIntroAudio = null;
    
    function fadeAndStopAudio(audioElement, durationMs) {
        if (!audioElement) return;
        const startVolume = audioElement.volume;
        const steps = 20;
        const stepTime = durationMs / steps;
        let currentStep = 0;
        
        const fadeInterval = setInterval(() => {
            currentStep++;
            const newVolume = startVolume - (startVolume * (currentStep / steps));
            if (newVolume <= 0) {
                audioElement.volume = 0;
                audioElement.pause();
                clearInterval(fadeInterval);
            } else {
                audioElement.volume = newVolume;
            }
        }, stepTime);
    }
    function getAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioCtx;
    }
    
    function playSynthEngineSound(ctx, now) {
        // Engine & Air-Slicing Whoosh (t=0 to t=3.2s)
        const oscEngine = ctx.createOscillator();
        const gainEngine = ctx.createGain();
        oscEngine.type = 'sawtooth';
        oscEngine.frequency.setValueAtTime(45, now);
        oscEngine.frequency.exponentialRampToValueAtTime(280, now + 1.6); // Peak pitch as it reaches center
        oscEngine.frequency.linearRampToValueAtTime(70, now + 3.2);
        
        const filterEngine = ctx.createBiquadFilter();
        filterEngine.type = 'lowpass';
        filterEngine.frequency.setValueAtTime(130, now);
        filterEngine.frequency.exponentialRampToValueAtTime(700, now + 1.6);
        filterEngine.frequency.linearRampToValueAtTime(180, now + 3.2);
        
        oscEngine.connect(filterEngine);
        filterEngine.connect(gainEngine);
        gainEngine.connect(ctx.destination);
        
        gainEngine.gain.setValueAtTime(0.001, now);
        gainEngine.gain.linearRampToValueAtTime(0.12, now + 0.8);
        gainEngine.gain.exponentialRampToValueAtTime(0.001, now + 3.2);
        
        oscEngine.start(now);
        oscEngine.stop(now + 3.3);
    }

    function playIntroSound() {
        try {
            const ctx = getAudioContext();
            if (ctx.state === 'suspended') {
                ctx.resume();
            }
            
            const now = ctx.currentTime;
            
            // Try loading and playing the custom uploaded .m4a sound from the 13th second
            const customAudio = new Audio('./assets/car-sound.m4a');
            customAudio.volume = 0.55;
            
            // Ensure media is sufficiently buffered before seeking to 13s
            customAudio.addEventListener('canplaythrough', () => {
                customAudio.currentTime = 13;
            }, { once: true });
            
            customAudio.play()
                .then(() => {
                    console.log("Successfully playing custom car sound from 13th second.");
                    activeIntroAudio = customAudio;
                })
                .catch(err => {
                    console.warn("Failed to play custom car sound, falling back to Web Audio synth:", err);
                    playSynthEngineSound(ctx, now);
                });
            
            // 2. Sequential Typewriter Letter Chimes (syncs with letter pop-outs)
            [...nameText].forEach((char, index) => {
                if (char !== ' ') {
                    setTimeout(() => {
                        try {
                            const osc = ctx.createOscillator();
                            const gain = ctx.createGain();
                            osc.type = 'sine';
                            
                            // Ascending chime notes for each letter!
                            osc.frequency.setValueAtTime(320 + index * 15, ctx.currentTime);
                            
                            gain.gain.setValueAtTime(0.02, ctx.currentTime);
                            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
                            
                            osc.connect(gain);
                            gain.connect(ctx.destination);
                            osc.start(ctx.currentTime);
                            osc.stop(ctx.currentTime + 0.14);
                        } catch (err) {}
                    }, 1000 + index * 70); // Syncs exactly with CSS animation delay!
                }
            });
            
        } catch (e) {
            console.warn('Intro sound error:', e);
        }
    }

    if (startBtn && preloader) {
        startBtn.addEventListener('click', () => {
            // 1. Play Sound
            playIntroSound();
            
            // 2. Transition Start Screen to Animation Screen
            startScreen.classList.add('fade-out');
            
            setTimeout(() => {
                startScreen.style.display = 'none';
                animScreen.classList.remove('hidden');
                
                // 3. Trigger coordinated animations
                carContainer.classList.add('active');
                if (introName) introName.classList.add('active');
                
                // 4. Fade out preloader overlay after name stays visible
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    document.body.classList.remove('preloading');
                    
                    // Smoothly fade out and stop the custom car sound over 800ms
                    if (activeIntroAudio) {
                        fadeAndStopAudio(activeIntroAudio, 800);
                    }
                    
                    // Hide preloader element
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 800);
                    
                }, 4300); // Allow letters to appear slowly, car to drive away, and name to stay visible before fading
                
            }, 500); // Wait for start screen fade out
        });
    } else {
        // Fallback if elements not found
        document.body.classList.remove('preloading');
        if (preloader) preloader.style.display = 'none';
    }
});


// ==========================================================================
// FORCE SCROLL TO TOP ON PAGE LOAD
// ==========================================================================
// Prevent browser from remembering the scroll position
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Force scroll to top when page is fully loaded or refreshed
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

window.scrollTo(0, 0);
