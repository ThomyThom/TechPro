document.addEventListener('DOMContentLoaded', function() {
    
    // --- INICIALIZAÇÃO DA BIBLIOTECA DE ANIMAÇÃO DE SCROLL ---
    AOS.init({
        duration: 800, // Duração da animação
        once: true, // Anima apenas uma vez
        offset: 50, // Começa a animar 50px antes do elemento aparecer
    });

    // --- LÓGICA PARA O MENU MOBILE (OVERLAY) ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Abre e fecha o menu
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

        // Anima a entrada dos links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Fecha o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                // Reseta a animação dos links
                 navLinks.forEach(link => link.style.animation = '');
            }
        });
    });

    // Keyframes da animação dos links (adicionado via JS para manter tudo junto)
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0px);
            }
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
    }

    themeToggle.addEventListener('change', switchTheme, false);


    // --- LÓGICA PARA HEADER COM EFEITO ACRÍLICO AO ROLAR ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Adiciona o efeito após rolar 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

});

// --- FUNÇÃO PARA ABRIR LINKS ---
function openLink(url) {
    window.open(url, '_blank');
}