document.addEventListener('DOMContentLoaded', function() {
    
    // --- INICIALIZAÇÃO DA BIBLIOTECA DE ANIMAÇÃO DE SCROLL ---
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });

    // --- LÓGICA PARA O MENU MOBILE (OVERLAY) ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li a'); // Seleciona apenas os links

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

        document.querySelectorAll('.nav-links li').forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                 document.querySelectorAll('.nav-links li').forEach(link => link.style.animation = '');
            }
        });
    });

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes navLinkFade {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0px); }
        }
    `;
    document.head.appendChild(styleSheet);


    // --- LÓGICA PARA O TEMA ESCURO (DARK MODE) ---
    const themeToggles = document.querySelectorAll('.theme-checkbox');
    const currentTheme = localStorage.getItem('theme');

    function applyTheme(theme) {
        const isDarkMode = theme === 'dark-mode';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        themeToggles.forEach(toggle => {
            toggle.checked = isDarkMode;
        });
    }

    if (currentTheme) {
        applyTheme(currentTheme);
    }

    function switchTheme(e) {
        const newTheme = e.target.checked ? 'dark-mode' : 'light-mode';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
        
        if (typeof loadParticles === 'function') {
            loadParticles();
        }
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('change', switchTheme);
    });


    // --- LÓGICA PARA HEADER E BOTÃO VOLTAR AO TOPO ---
    const header = document.querySelector('header');
    const backToTopBtn = document.getElementById('back-to-top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // --- EFEITO DE DIGITAÇÃO NO HERO ---
    const typingText = document.querySelector('.typing-effect');
    if(typingText) {
        const text = typingText.innerHTML;
        typingText.innerHTML = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingText.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }
        typeWriter();
    }
    
    // --- LÓGICA DO PARTICLES.JS ---
    function loadParticles() {
        if (typeof particlesJS === 'undefined') return;
        const isDarkMode = document.body.classList.contains('dark-mode');
        const particleColor = isDarkMode ? "#ffffff" : "#333333";
        const lineColor = isDarkMode ? "#ffffff" : "#333333";

        particlesJS('particles-js', {
            "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": particleColor }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": false }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": lineColor, "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false } },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 } } },
            "retina_detect": true
        });
    }
    
    if (document.getElementById('particles-js')) {
        loadParticles();
    }


    // --- LÓGICA DE SCROLL PINNING (APENAS EM MOBILE) ---
    if (window.matchMedia("(max-width: 768px)").matches) {
        const pinWrapper = document.querySelector('.servicos-pin-wrapper');
        const servicoCards = document.querySelectorAll('.servico-card');
        
        if (pinWrapper && servicoCards.length > 0) {
            let currentActive = -1;

            window.addEventListener('scroll', () => {
                const wrapperRect = pinWrapper.getBoundingClientRect();
                
                if (wrapperRect.top <= 0 && wrapperRect.bottom >= window.innerHeight) {
                    const scrollableDist = pinWrapper.offsetHeight - window.innerHeight;
                    const progress = Math.abs(wrapperRect.top) / scrollableDist;

                    let newActive = -1;
                    if (progress < 0.45) { newActive = 0; } 
                    else if (progress < 0.9) { newActive = 1; } 
                    else { newActive = 2; }

                    if (newActive !== currentActive) {
                        currentActive = newActive;
                        servicoCards.forEach((card, index) => {
                            if (index === currentActive) {
                                card.classList.add('active');
                            } else {
                                card.classList.remove('active');
                            }
                        });
                    }
                }
            });
        }
    }

});

// --- FUNÇÃO PARA ABRIR LINKS ---
function openLink(url) {
    window.open(url, '_blank');
}