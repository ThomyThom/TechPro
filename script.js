document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA PARA O MENU MOBILE (HAMBURGER) ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        // Animação dos links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animação do Burger
        burger.classList.toggle('toggle');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                // Resetar animação para funcionar novamente
                navLinks.forEach(link => link.style.animation = '');
            }
        });
    });

    // --- LÓGICA PARA O FAQ (ACORDEÃO) ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const isOpen = question.classList.contains('active');

            // Fecha todos os outros itens abertos para garantir que apenas um esteja aberto de cada vez
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-question').classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            // Abre ou fecha o item clicado
            if (!isOpen) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                question.classList.remove('active');
                answer.style.maxHeight = null;
            }
        });
    });

});