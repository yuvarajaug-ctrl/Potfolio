document.addEventListener('DOMContentLoaded', () => {
    
    // --- Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorGlow = document.querySelector('.cursor-glow');
    
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        // Use requestAnimationFrame for smoother performance
        requestAnimationFrame(() => {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Add a slight delay for the glow effect
            cursorGlow.style.left = `${posX}px`;
            cursorGlow.style.top = `${posY}px`;
        });
    });

    // --- Gravity Toggle Logic ---
    const appContainer = document.getElementById('app-container');
    const gravityToggle = document.getElementById('gravity-toggle');
    const gravityStatus = document.getElementById('gravity-status');
    const gravityIcon = gravityToggle.querySelector('i');
    
    let isGravityOn = false; // Initially anti-gravity is fully active (gravity off)

    gravityToggle.addEventListener('click', () => {
        isGravityOn = !isGravityOn;
        if (isGravityOn) {
            appContainer.classList.remove('gravity-off');
            appContainer.classList.add('gravity-on');
            gravityStatus.innerText = 'ON';
            gravityIcon.classList.remove('fa-rocket');
            gravityIcon.classList.add('fa-magnet');
            // Remove float animation classes dynamically or handled by CSS class gravity-on overriding off
            document.documentElement.style.setProperty('--transition', 'all 0.1s ease'); 
        } else {
            appContainer.classList.remove('gravity-on');
            appContainer.classList.add('gravity-off');
            gravityStatus.innerText = 'OFF';
            gravityIcon.classList.remove('fa-magnet');
            gravityIcon.classList.add('fa-rocket');
            document.documentElement.style.setProperty('--transition', 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)');
        }
    });

    // --- Scroll Intersection Observer ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optional: stay visible after scroll
            }
        });
    }, observerOptions);

    const fadeSections = document.querySelectorAll('.fade-in-section');
    fadeSections.forEach(section => {
        observer.observe(section);
    });

    // --- Magnetic Hover Effect for CTA buttons ---
    const magneticElements = document.querySelectorAll('.btn-cta, .btn-glow');

    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            elem.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        elem.addEventListener('mouseleave', () => {
            elem.style.transform = `translate(0px, 0px)`;
        });
    });

    // --- Resume Dropdown Logic ---
    const resumeDropdown = document.querySelector('.resume-dropdown');
    const resumeBtn = document.getElementById('resume-btn');

    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            resumeDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking elsewhere
        window.addEventListener('click', () => {
            if (resumeDropdown.classList.contains('active')) {
                resumeDropdown.classList.remove('active');
            }
        });
    }

    // --- Project Modal Logic ---
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    const modalActions = document.querySelector('.modal-actions');
    const projectData = {
        project1: { title: 'Portfolio', desc: 'A deeply interactive, physics-based portfolio built natively with ThreeJS and vanilla JavaScript. Features dynamic magnetic web elements, interactive modals, gravity toggling workflows, and a direct backend transmission feed via Web3Forms/Firebase.', source: 'https://github.com/yuvarajaug-ctrl/Portfolio.git', live: 'https://potfolio-three-phi.vercel.app/' },
        project2: { title: 'Sketch to Code GenAI IDE', desc: 'Led and contributed to project development initiatives, building web applications and AI/ML models. Worked in collaborative teams, applying coding, testing, and deployment skills to deliver functional solutions and strengthen problem-solving abilities.', source: 'https://github.com/yuvarajaug-ctrl/sketch-to-code.git', live: 'https://sketch-to-code.onrender.com' },
        project3: { title: 'Image Editing App', desc: 'An editing tool built with Python (using Pillow/OpenCV) for cropping, resizing, and applying filters to images.', source: '', live: '' },
        project4: { title: 'Smart Weather App', desc: 'Python-based application providing real-time weather forecasts with API integration and a Tkinter GUI.', source: '', live: '' },
        project5: { title: 'Expense Tracker App', desc: 'College Python project that manages daily expenses with add/edit/delete functionalities, and generates monthly reports.', source: '', live: '' }
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const data = projectData[projectId];
            if (data) {
                modalTitle.innerText = data.title;
                modalDesc.innerText = data.desc;

                // Build action buttons dynamically
                modalActions.innerHTML = '';
                if (data.source) {
                    const sourceBtn = document.createElement('a');
                    sourceBtn.href = data.source;
                    sourceBtn.target = '_blank';
                    sourceBtn.className = 'btn-glow btn-small';
                    sourceBtn.innerHTML = '<i class="fa-brands fa-github"></i> Source Code';
                    modalActions.appendChild(sourceBtn);
                }
                if (data.live) {
                    const liveBtn = document.createElement('a');
                    liveBtn.href = data.live;
                    liveBtn.target = '_blank';
                    liveBtn.className = 'btn-glow btn-small';
                    liveBtn.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo';
                    modalActions.appendChild(liveBtn);
                }
                if (!data.source && !data.live) {
                    modalActions.innerHTML = '<span style="color: var(--text-dim); font-style: italic;">Links coming soon...</span>';
                }

                modal.classList.add('active');
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.remove('active');
        }
    });

    // --- Certifications Modal Logic ---
    const certCard = document.getElementById('cert-card');
    const certModal = document.getElementById('cert-modal');
    const closeCertBtn = document.querySelector('.close-cert-modal');

    if (certCard && certModal && closeCertBtn) {
        certCard.addEventListener('click', () => {
            certModal.classList.add('active');
        });

        closeCertBtn.addEventListener('click', () => {
            certModal.classList.remove('active');
        });

        window.addEventListener('click', (e) => {
            if (e.target == certModal) {
                certModal.classList.remove('active');
            }
        });
    }

    // --- Toast Notification Helper ---
    function showToast(message, isError = false) {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toast-msg');
        const toastIcon = toast.querySelector('i');
        
        toastMsg.innerText = message;
        if (isError) {
            toastIcon.className = 'fa-solid fa-circle-xmark';
            toastIcon.style.color = '#ff4a4a';
        } else {
            toastIcon.className = 'fa-solid fa-circle-check';
            toastIcon.style.color = 'var(--neon-cyan)';
        }
        
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // --- Contact Form via Web3Forms ---
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = contactForm ? contactForm.querySelector('.submit-btn') : null;
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.style.opacity = '0.7';
            
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    showToast('Message sent successfully!');
                    contactForm.reset();
                } else {
                    showToast('Failed to send. Please try again.', true);
                }
            } catch (error) {
                showToast('Connection error. Please try again later.', true);
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.opacity = '1';
            }
        });
    }
});
