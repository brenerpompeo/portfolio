// --- LÓGICA DO MODAL DE PROJETOS ---
const projectModal = document.getElementById('project-modal');
const modalContentContainer = document.getElementById('modal-content-container');

// Dados dos projetos (simulando um banco de dados)
const projectData = {
    '1': {
        title: 'Campanhas no Pacto Global da ONU',
        category: 'ESG / Comunicação Estratégica',
        image: 'https://placehold.co/800x450/0D0D0D/FFFFFF?text=Solu%C3%A7%C3%A3o+Final',
        challenge: 'Liderar a estratégia de comunicação para campanhas de alto impacto, visando engajar o setor privado em pautas de sustentabilidade e direitos humanos.',
        role: 'Como estrategista de comunicação, fui responsável por desenvolver narrativas persuasivas, gerenciar campanhas integradas e construir relacionamentos com stakeholders-chave.',
        process: 'Utilizei metodologias ágeis para planejar e executar as campanhas, alinhando as mensagens com os ODS e as metas de ESG. O processo incluiu a criação de conteúdo, gestão de mídias sociais e organização de eventos.',
        solution: 'As campanhas alcançaram um amplo público, gerando um aumento significativo no engajamento e na adesão de empresas às iniciativas do Pacto Global.',
        impact: 'Aumento de 40% no engajamento de usuários e 15% na taxa de conversão nos primeiros 3 meses após o lançamento.'
    },
    '2': {
        title: 'Brasil Sustenta',
        category: 'Ecossistemas de Impacto / ESG',
        image: 'https://placehold.co/800x450/0D0D0D/FFFFFF?text=Solu%C3%A7%C3%A3o+Final',
        challenge: 'Desenvolver um ecossistema de impacto para jovens, conectando talentos a oportunidades de carreira em sustentabilidade e inovação social.',
        role: 'Como fundador e gestor do projeto, estruturei o modelo de negócio, orquestrei parcerias estratégicas e liderei a equipe de desenvolvimento.',
        process: 'O projeto foi desenvolvido com base em uma profunda pesquisa de mercado e na aplicação de metodologias de design thinking. A plataforma foi construída com foco na experiência do usuário e na escalabilidade.',
        solution: 'O "Brasil Sustenta" se tornou uma referência no setor, conectando centenas de jovens a empresas e ONGs engajadas com a sustentabilidade.',
        impact: 'Redução de 50% no tempo de carregamento da página e um aumento de 25% nas vendas.'
    }
};

const createModalContent = (data) => {
    return `
        <i data-lucide="x" class="close-modal w-8 h-8 text-gray-500 hover:text-white transition-colors"></i>
        <h2 class="text-3xl font-bold mb-2">${data.title}</h2>
        <p class="text-sm text-gray-400 mb-6">${data.category}</p>
        <img src="${data.image}" alt="${data.title}" class="w-full rounded-lg mb-8">
        <div class="space-y-6 text-gray-300">
            <div><h3 class="font-bold text-lg text-white mb-1">O Desafio</h3><p>${data.challenge}</p></div>
            <div><h3 class="font-bold text-lg text-white mb-1">Meu Papel</h3><p>${data.role}</p></div>
            <div><h3 class="font-bold text-lg text-white mb-1">O Processo</h3><p>${data.process}</p></div>
            <div><h3 class="font-bold text-lg text-white mb-1">A Solução e o Impacto</h3><p class="text-[var(--primary-color)] font-medium">${data.impact}</p></div>
        </div>
    `;
};

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.dataset.project;
        const data = projectData[projectId];
        modalContentContainer.innerHTML = createModalContent(data);
        projectModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        lucide.createIcons(); // Recria o ícone 'x'
        projectModal.querySelector('.close-modal').addEventListener('click', () => {
            projectModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    });
});

window.addEventListener('click', (event) => {
    if (event.target == projectModal) {
        projectModal.style.display = 'none';
        document.body.style.overflow = '';
    }
});
