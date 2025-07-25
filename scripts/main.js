// --- CONFIGURAÇÃO E ESTILOS DINÂMICOS ---
tailwind.config = {
    theme: { extend: { colors: { primary: 'var(--primary-color)' } } }
}

// Aplica estilos base reutilizáveis com JavaScript para manter o HTML limpo
const applyBaseStyles = () => {
    document.querySelectorAll('.nav-link').forEach(el => el.classList.add('hover:text-[var(--primary-color)]', 'transition-colors'));
    document.querySelectorAll('.menu-link').forEach(el => el.classList.add('text-2xl', 'font-bold', 'tracking-widest', 'hover:text-[var(--primary-color)]', 'transition-colors'));
    document.querySelectorAll('.cta-button').forEach(el => el.classList.add('bg-[var(--primary-color)]', 'text-black', 'font-bold', 'py-3', 'px-8', 'rounded-lg', 'transition-all', 'transform', 'hover:scale-105', 'hover:shadow-[0_0_20px_var(--primary-color)]'));
    document.querySelectorAll('.section-title').forEach(el => el.classList.add('text-3xl', 'md:text-4xl', 'font-bold', 'tracking-tighter'));
    document.querySelectorAll('.section-subtitle').forEach(el => el.classList.add('text-lg', 'text-gray-500', 'mt-2'));
    document.querySelectorAll('.social-link').forEach(el => el.classList.add('text-gray-400', 'hover:text-[var(--primary-color)]', 'transition-colors'));
    document.querySelectorAll('.skill-pill').forEach(el => el.classList.add('bg-white/5', 'text-cyan-300', 'text-sm', 'font-medium', 'py-1.5', 'px-4', 'rounded-full', 'border', 'border-white/10', 'hover:bg-white/10', 'transition-colors'));
    document.querySelectorAll('.filter-btn').forEach(el => el.classList.add('px-4', 'py-2', 'rounded-full', 'text-sm', 'font-medium', 'transition-colors', 'border', 'border-transparent'));
    document.querySelectorAll('.filter-btn.active').forEach(el => el.classList.add('bg-[var(--primary-color)]', 'text-black', 'border-[var(--primary-color)]'));
    document.querySelectorAll('.filter-btn:not(.active)').forEach(el => el.classList.add('bg-white/5', 'text-gray-300', 'hover:border-[var(--primary-color)]', 'hover:text-[var(--primary-color)]'));
    document.querySelectorAll('.project-card').forEach(el => el.classList.add('group', 'block', 'rounded-lg', 'glass-card', 'overflow-hidden', 'cursor-pointer'));
    document.querySelectorAll('.project-image').forEach(el => el.classList.add('w-full', 'h-full', 'object-cover', 'transition-transform', 'duration-500', 'group-hover:scale-105'));
    document.querySelectorAll('.form-input').forEach(el => el.classList.add('w-full', 'p-3', 'bg-white/5', 'border', 'border-white/10', 'rounded-lg', 'focus:outline-none', 'focus:ring-2', 'focus:ring-[var(--primary-color)]', 'transition-all'));
    document.querySelectorAll('.blog-post-card').forEach(el => el.classList.add('glass-card', 'rounded-lg', 'overflow-hidden', 'transition-all', 'hover:transform', 'hover:-translate-y-2'));
};

// --- CURSOR PERSONALIZADO ---
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', e => {
    cursor.setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px;`);
});
document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// --- MENU MOBILE ---
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const toggleMenu = () => {
    const isHidden = mobileMenu.classList.toggle('hidden');
    document.body.style.overflow = isHidden ? '' : 'hidden';
    menuBtn.querySelector('i').setAttribute('data-lucide', isHidden ? 'menu' : 'x');
    lucide.createIcons();
};
menuBtn.addEventListener('click', toggleMenu);
document.querySelectorAll('.menu-link').forEach(link => link.addEventListener('click', () => !mobileMenu.classList.contains('hidden') && toggleMenu()));

// --- ANIMAÇÃO DE SCROLL (REVEAL) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- FORMULÁRIO DE CONTATO ---
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    formStatus.textContent = 'Enviando...';
    formStatus.style.color = 'var(--text-color)';

    // Simulação de envio de formulário
    setTimeout(() => {
        formStatus.textContent = 'Mensagem enviada com sucesso!';
        formStatus.style.color = 'var(--primary-color)';
        form.reset();
    }, 1500);
});

// --- LÓGICA DO TEMA (MODO CLARO/ESCURO) ---
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const header = document.getElementById('main-header');

const applyTheme = (theme) => {
    if (theme === 'light') {
        document.documentElement.classList.add('light');
        document.querySelectorAll('.dark-icon').forEach(i => i.classList.add('hidden'));
        document.querySelectorAll('.light-icon').forEach(i => i.classList.remove('hidden'));
        header.style.backgroundColor = 'var(--header-bg)';
    } else {
        document.documentElement.classList.remove('light');
        document.querySelectorAll('.dark-icon').forEach(i => i.classList.remove('hidden'));
        document.querySelectorAll('.light-icon').forEach(i => i.classList.add('hidden'));
        header.style.backgroundColor = 'var(--header-bg)';
    }
    lucide.createIcons();
};

const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
};

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

// --- FILTRO DE PROJETOS ---
const filterButtons = document.querySelectorAll('.filter-btn');
const projectGrid = document.getElementById('project-grid');
const projectCards = projectGrid.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        // Botão Ativo
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        applyBaseStyles(); // Re-aplica estilos para o botão ativo

        // Lógica de Filtragem
        projectCards.forEach(card => {
            const tags = card.dataset.tags;
            if (filter === 'all' || tags.includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    applyBaseStyles();
    lucide.createIcons();
    document.getElementById('current-year').textContent = new
new Date().getFullYear();

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
});
