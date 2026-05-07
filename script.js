// Inicializar AOS (Animações)
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
});

// Header com efeito de vidro ao rolar a página
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Dados das estatísticas (valores reais do projeto)
const targetTrees = 12340;
const targetFamilies = 2475;
const targetHectares = 890;

let animated = false;
const treesSpan = document.getElementById('treesCount');
const familiesSpan = document.getElementById('familiesCount');
const hectaresSpan = document.getElementById('hectaresCount');

// Função para animar os contadores
function animateStats() {
    if (animated) return;
    animated = true;
    
    let currentTrees = 0;
    let currentFamilies = 0;
    let currentHectares = 0;
    
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const incTrees = targetTrees / steps;
    const incFamilies = targetFamilies / steps;
    const incHectares = targetHectares / steps;
    
    let step = 0;
    const interval = setInterval(() => {
        step++;
        if (step >= steps) {
            treesSpan.innerText = targetTrees.toLocaleString('pt-BR');
            familiesSpan.innerText = targetFamilies.toLocaleString('pt-BR');
            hectaresSpan.innerText = targetHectares.toLocaleString('pt-BR');
            clearInterval(interval);
        } else {
            currentTrees = Math.min(targetTrees, Math.floor(currentTrees + incTrees));
            currentFamilies = Math.min(targetFamilies, Math.floor(currentFamilies + incFamilies));
            currentHectares = Math.min(targetHectares, Math.floor(currentHectares + incHectares));
            treesSpan.innerText = currentTrees.toLocaleString('pt-BR');
            familiesSpan.innerText = currentFamilies.toLocaleString('pt-BR');
            hectaresSpan.innerText = currentHectares.toLocaleString('pt-BR');
        }
    }, stepTime);
}

// Observador para iniciar animação quando a seção de estatísticas aparecer
const statsSection = document.querySelector('.stats-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
            animateStats();
        }
    });
}, { threshold: 0.5 });

if (statsSection) observer.observe(statsSection);

// Fallback para garantir animação via scroll
window.addEventListener('scroll', function checkStats() {
    if (!animated && statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            animateStats();
            window.removeEventListener('scroll', checkStats);
        }
    }
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#" || targetId === "") return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Botão especial da Hero Section
const heroBtn = document.getElementById('heroDoarBtn');
if (heroBtn) {
    heroBtn.addEventListener('click', () => {
        const doarSection = document.getElementById('doar');
        if (doarSection) doarSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Navegação suave para links do menu
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Formulário de doação com feedback de esperança
const form = document.getElementById('donationForm');
const feedbackMsg = document.getElementById('formFeedback');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const valor = document.getElementById('valor').value.trim();
    const destinoSelect = document.getElementById('destino');
    const destinoTexto = destinoSelect.options[destinoSelect.selectedIndex].text;
    
    // Validação simples
    if (!nome || !email || !valor || valor <= 0) {
        feedbackMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Por favor, preencha todos os campos corretamente.';
        feedbackMsg.style.color = "#c75c2e";
        feedbackMsg.style.opacity = '1';
        setTimeout(() => {
            feedbackMsg.style.opacity = '0';
            setTimeout(() => feedbackMsg.innerHTML = '', 500);
        }, 3000);
        return;
    }
    
    const valorNum = parseFloat(valor);
    
    // Mensagem de sucesso inspiradora
    feedbackMsg.innerHTML = `<i class="fas fa-check-circle"></i> Obrigado, ${nome}! Sua doação de R$ ${valorNum.toFixed(2)} para "${destinoTexto}" vai gerar mudas reais e água para o sertão. 💚🌱`;
    feedbackMsg.style.color = "#1f6e43";
    feedbackMsg.style.opacity = '1';
    
    // Limpar formulário
    form.reset();
    
    // Esconder mensagem após alguns segundos
    setTimeout(() => {
        feedbackMsg.style.opacity = '0';
        setTimeout(() => feedbackMsg.innerHTML = '', 800);
    }, 5000);
});

// Carregamento lazy para imagens (otimização)
document.querySelectorAll('.img-block img').forEach(img => {
    img.setAttribute('loading', 'lazy');
});

// Pequeno efeito adicional nos cards com ícones (só para dar vida)
const cards = document.querySelectorAll('.impact-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.card-icon i');
        if (icon) {
            icon.style.transform = 'scale(1.1)';
            icon.style.transition = 'transform 0.2s';
        }
    });
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.card-icon i');
        if (icon) {
            icon.style.transform = 'scale(1)';
        }
    });
});

console.log('🌿 Raízes da Caatinga — Esperança e impacto positivo no semiárido brasileiro');

