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
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

        navLinks.forEach((link, index) => {
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
                 navLinks.forEach(link => link.style.animation = '');
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
    const themeToggle = document.getElementById('checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeToggle.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
        loadParticles();
    }

    themeToggle.addEventListener('change', switchTheme, false);


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
        const isDarkMode = document.body.classList.contains('dark-mode');
        const particleColor = isDarkMode ? "#ffffff" : "#333333";
        const lineColor = isDarkMode ? "#ffffff" : "#333333";

        particlesJS('particles-js', {
            "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": particleColor }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": false }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": lineColor, "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false } },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 } } },
            "retina_detect": true
        });
    }
    loadParticles();

    // --- LÓGICA DE ACORDEÃO (APENAS EM MOBILE) ---
    if (window.matchMedia("(max-width: 768px)").matches) {
        const servicoCards = document.querySelectorAll('.servico-card');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Um threshold de 50% funciona melhor com a nova lógica
        };
        
        // Armazena o último card que esteve ativo
        let lastVisibleCard = null;

        const observer = new IntersectionObserver((entries) => {
            // Verifica qual é o último card visível na lista de entries
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    lastVisibleCard = entry.target;
                }
            });

            // Ativa apenas o último card visível e desativa os outros
            let anyCardVisible = false;
            servicoCards.forEach(card => {
                if (card === lastVisibleCard) {
                    card.classList.add('active');
                    anyCardVisible = true;
                } else {
                    card.classList.remove('active');
                }
            });

            // Se nenhum card estiver visível (saiu da seção), reseta a variável
             if (!anyCardVisible) {
                lastVisibleCard = null;
            }

        }, observerOptions);

        servicoCards.forEach(card => {
            observer.observe(card);
        });
    }

});

// --- FUNÇÃO PARA ABRIR LINKS ---
function openLink(url) {
    window.open(url, '_blank');
}