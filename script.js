// Simple script for interactivity
document.addEventListener('DOMContentLoaded', () => {
    const soundToggle = document.querySelector('.sound-toggle');
    let soundOn = false;

    if (soundToggle) {
        const music = document.getElementById('bg-music');
        
        soundToggle.addEventListener('click', () => {
            soundOn = !soundOn;
            
            if (soundOn) {
                music.play().catch(e => console.log("Audio playback failed:", e));
                soundToggle.innerHTML = '<span class="icon">🔊</span> Sound On';
                soundToggle.style.background = '#FFC017';
            } else {
                music.pause();
                soundToggle.innerHTML = '<span class="icon">🔇</span> Sound Off';
                soundToggle.style.background = 'white';
            }
        });
    }

    // Hamburger Menu Logic
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navItems = navLinks.querySelectorAll('.nav-link');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Modal Logic
    const contactModal = document.getElementById('contact-modal');
    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    const closeModal = document.getElementById('close-modal');
    const cancelBtn = document.getElementById('cancel-btn');

    const toggleModal = (show) => {
        if (contactModal) {
            contactModal.style.display = show ? 'flex' : 'none';
        }
    };

    contactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            toggleModal(true);
        });
    });

    [closeModal, cancelBtn].forEach(btn => {
        if (btn) btn.addEventListener('click', () => toggleModal(false));
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === contactModal) toggleModal(false);
    });

    // Click Sound Logic
    const clickSound = document.getElementById('click-sound');
    const interactiveElements = document.querySelectorAll('button, a, .sound-toggle');

    interactiveElements.forEach(el => {
        el.addEventListener('click', () => {
            if (clickSound) {
                clickSound.currentTime = 0;
                clickSound.play().catch(e => console.log("Click sound blocked:", e));
            }
        });
    });

    // Contact Form Submission (Mailto)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = contactForm.querySelector('input[name="email"]').value;
            const subject = contactForm.querySelector('input[name="subject"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;
            
            const mailtoUrl = `mailto:bahtiarpratama208@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + email + "\n\n" + message)}`;
            
            window.location.href = mailtoUrl;
            toggleModal(false); // Close modal after sending
        });
    }

    // Add a simple entrance animation for cards
    const cards = document.querySelectorAll('.brutalist-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });

    // Gallery Slider Logic removed to support new list layout

    // Infinite Scroll Duplication Logic
    const scrollContainer = document.querySelector('.scroll-container');
    const scrollTrack = document.querySelector('.scroll-track');
    
    if (scrollContainer && scrollTrack && !scrollContainer.querySelector('.scroll-track[aria-hidden="true"]')) {
        // Clone the entire track for perfect CSS marquee
        const cloneTrack = scrollTrack.cloneNode(true);
        cloneTrack.setAttribute('aria-hidden', 'true');
        scrollContainer.appendChild(cloneTrack);
    }

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
