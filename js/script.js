document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
        }, 500);
    });

    // 2. Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        document.getElementById('scroll-progress').style.width = scrollPercentage + '%';
    });

    // 3. Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        document.querySelectorAll('a, button, input, textarea').forEach((el) => {
            el.addEventListener('mouseenter', () => {
                follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                follower.style.backgroundColor = 'rgba(13, 110, 253, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                follower.style.transform = 'translate(-50%, -50%) scale(1)';
                follower.style.backgroundColor = 'transparent';
            });
        });
    }

    // 4. Navbar Scroll Effect & Active Link
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 5. Typing Animation
    const typedTextSpan = document.querySelector('.typed-text');
    const textArray = ['Web Developer', 'UI/UX Designer', 'Student'];
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(type, 500);
        }
    }

    if (typedTextSpan) {
        setTimeout(type, 1000);
    }

    // 6. Counter Animation
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    function runCounters() {
        counters.forEach((counter) => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 50;

            function updateCount() {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target + '+';
                }
            }
            updateCount();
        });
    }

    window.addEventListener('scroll', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const sectionPos = aboutSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;
            if (sectionPos < screenPos && !animated) {
                runCounters();
                animated = true;
            }
        }
    });

    // 7. Music Player Widget
    const musicBtn = document.getElementById('music-toggle-btn');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.classList.remove('playing');
                isPlaying = false;
            } else {
                bgMusic.play().then(() => {
                    musicBtn.classList.add('playing');
                    isPlaying = true;
                }).catch((e) => {
                    console.log("Audio play blocked:", e);
                });
            }
        });
    }

    // 8. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 9. Dark Mode Toggle
    const themeToggles = [document.getElementById('dark-mode-toggle'), document.getElementById('dark-mode-toggle-desktop')];
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggles.forEach(btn => {
            if (btn) btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        });
    }

    themeToggles.forEach((btn) => {
        if (btn) {
            btn.addEventListener('click', () => {
                let theme = document.documentElement.getAttribute('data-theme');
                if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light');
                    themeToggles.forEach(b => { if (b) b.innerHTML = '<i class="fa-solid fa-moon"></i>'; });
                } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    themeToggles.forEach(b => { if (b) b.innerHTML = '<i class="fa-solid fa-sun"></i>'; });
                }
            });
        }
    });
});