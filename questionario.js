// Sistema de Questionário - JavaScript

let currentQuizUser = null;
let quizQuestions = [];

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se usuário está logado
    checkUserLogin();
    
    // Carregar perguntas (editadas ou originais)
    loadQuestions();
    
    // Inicializar quiz
    initializeQuiz();
});

function loadQuestions() {
    // Tentar carregar perguntas editadas do localStorage
    const perguntasEditadas = localStorage.getItem('perguntasEditadas');
    
    if (perguntasEditadas) {
        try {
            quizQuestions = JSON.parse(perguntasEditadas);
            console.log('Perguntas editadas carregadas:', quizQuestions.length);
        } catch (error) {
            console.error('Erro ao carregar perguntas editadas:', error);
            // Fallback para perguntas originais se houver erro
            loadOriginalQuestions();
        }
    } else {
        // Carregar perguntas originais se não houver editadas
        loadOriginalQuestions();
    }
    
    // Atualizar interface com as perguntas carregadas
    updateQuestionsInterface();
}

function loadOriginalQuestions() {
    // Perguntas originais como fallback
    quizQuestions = [
        {
            pergunta: "Quais sanduíches foram descontinuados do cardápio do McDonald's?",
            opcoes: [
                "Big Mac e Quarter Pounder",
                "McCrispy Chicken Melt&Bacon e McCrispy Chicken Elite",
                "McChicken e Filet-O-Fish",
                "McDouble e Cheeseburger"
            ],
            respostaCorreta: 1
        },
        {
            pergunta: "Qual molho exclusivo foi descontinuado junto com os sanduíches McCrispy Chicken?",
            opcoes: [
                "Molho Big Mac",
                "Molho Barbecue",
                "Molho HoneyFire",
                "Molho Mostarda e Mel"
            ],
            respostaCorreta: 2
        },
        {
            pergunta: "Qual o objetivo do Calendário de Recebimento anual e etiquetas de bolinhas?",
            opcoes: [
                "Controlar vendas diárias",
                "Garantir a identificação correta dos produtos e rotação PEPS",
                "Organizar horários de funcionários",
                "Monitorar satisfação do cliente"
            ],
            respostaCorreta: 1
        },
        {
            pergunta: "Qual marca de bacon congelado os restaurantes começaram a receber, substituindo a Perdigão?",
            opcoes: [
                "Seara",
                "Sadia",
                "Aurora",
                "BRF"
            ],
            respostaCorreta: 1
        },
        {
            pergunta: "Quais os tamanhos das fatias de bacon que podem ser encontradas em uma mesma embalagem?",
            opcoes: [
                "5cm e 15cm",
                "10cm e 20cm",
                "8cm e 16cm",
                "12cm e 24cm"
            ],
            respostaCorreta: 1
        },
        {
            pergunta: "Qual a novidade no processo de envio do McFlurry para McDelivery?",
            opcoes: [
                "Embalagem especial",
                "Todos devem ser enviados selados",
                "Novo sabor exclusivo",
                "Desconto especial"
            ],
            respostaCorreta: 1
        },
        {
            pergunta: "Qual o primeiro passo para aplicar o material de 'O POTENCIAL EM NOSSO McDELIVERY'?",
            opcoes: [
                "Treinar funcionários",
                "Reunir equipe Gerencial",
                "Atualizar sistema",
                "Comprar equipamentos"
            ],
            respostaCorreta: 1
        },
        {
            pergunta: "Quais os principais KPIs afetados pela implementação do material McDelivery?",
            opcoes: [
                "Vendas, Lucro e Satisfação",
                "Imprecisão, McExperiência e Vendas",
                "Tempo, Qualidade e Preço",
                "Eficiência, Produtividade e Resultado"
            ],
            respostaCorreta: 1
        },
        {
            pergunta: "Qual processo está relacionado ao 'Layout Dlv'?",
            opcoes: [
                "Organização do estoque",
                "Posicionamento Reposicionamento Tablet e Função",
                "Limpeza do restaurante",
                "Treinamento de funcionários"
            ],
            respostaCorreta: 1
        },
        {
            pergunta: "Qual processo de treinamento está relacionado ao McFlurry?",
            opcoes: [
                "Atendimento ao cliente",
                "Reforço do procedimento operacional de bebidas",
                "Limpeza de equipamentos",
                "Controle de qualidade"
            ],
            respostaCorreta: 1
        }
    ];
    console.log('Perguntas originais carregadas:', quizQuestions.length);
}

function updateQuestionsInterface() {
    // Esta função pode ser expandida para atualizar dinamicamente a interface
    // Por enquanto, apenas registra que as perguntas foram carregadas
    console.log('Interface atualizada com', quizQuestions.length, 'perguntas');
}

function checkUserLogin() {
    currentQuizUser = localStorage.getItem('quizUser');
    
    if (!currentQuizUser) {
        alert('Você precisa fazer login para acessar o questionário.');
        window.location.href = 'index.html';
        return;
    }
    
    // Atualizar interface com nome do usuário
    updateUserInterface();
}

function updateUserInterface() {
    // Atualizar título se necessário
    const header = document.querySelector('.header h1');
    if (header) {
        header.textContent = `Quiz Do Méqui - ${currentQuizUser}`;
    }
}

function initializeQuiz() {
    // Configurar comportamento dos checkboxes (apenas uma seleção por questão)
    setupCheckboxBehavior();
    
    // Atualizar barra de progresso
    updateProgress();
    
    // Adicionar animações aos cards das questões
    animateQuestionCards();
}

function setupCheckboxBehavior() {
    // Para cada questão, permitir apenas uma seleção
    const questionNames = ['q1', 'q2', 'q5', 'q6', 'q7', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14'];
    const totalQuestions = questionNames.length;

    // Para cada questão, permitir apenas uma seleção
    questionNames.forEach(qName => {
        const checkboxes = document.querySelectorAll(`input[name="${qName}"]`);
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    // Desmarcar outros checkboxes da mesma questão
                    checkboxes.forEach(cb => {
                        if (cb !== this) {
                            cb.checked = false;
                            cb.closest('.option').classList.remove('selected');
                        }
                    });
                    
                    // Marcar opção atual como selecionada
                    this.closest('.option').classList.add('selected');
                } else {
                    // Remover seleção
                    this.closest('.option').classList.remove('selected');
                }
                
                updateProgress();
            });
        });
    });
}

function updateProgress() {
    const questionNames = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"];
    const totalQuestions = questionNames.length;
    let answeredQuestions = 0;
    
    // Contar questões respondidas
    questionNames.forEach(qName => {
        const checkboxes = document.querySelectorAll(`input[name="${qName}"]:checked`);
        if (checkboxes.length > 0) {
            answeredQuestions++;
        }
    });
    
    // Atualizar texto e barra de progresso
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    
    if (answeredQuestions === totalQuestions) {
        progressText.textContent = 'Todas as questões respondidas!';
    } else {
        progressText.textContent = `${answeredQuestions} de ${totalQuestions} respondidas`;
    }
    
    const progressPercentage = (answeredQuestions / totalQuestions) * 100;
    progressFill.style.width = `${progressPercentage}%`;
}

function animateQuestionCards() {
    const cards = document.querySelectorAll('.question-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

function verResultado() {
    // Verificar se todas as questões foram respondidas
    const questionNames = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"];
    const totalQuestions = questionNames.length;
    let answeredQuestions = 0;
    
    for (let i = 0; i < totalQuestions; i++) {
        const qName = questionNames[i];
        const checkboxes = document.querySelectorAll(`input[name="${qName}"]:checked`);
        if (checkboxes.length > 0) {
            answeredQuestions++;
        }
    }
    
    if (answeredQuestions < totalQuestions) {
        alert(`Por favor, responda todas as questões. Você respondeu ${answeredQuestions} de ${totalQuestions} questões.`);
        return;
    }
    
    // Calcular pontuação
    let score = 0;
    
    for (let i = 0; i < totalQuestions; i++) {
        const qName = questionNames[i];
        const selectedCheckbox = document.querySelector(`input[name="${qName}"]:checked`);
        const correctCheckbox = document.querySelector(`input[name="${qName}"][data-correct="true"]`);
        
        if (selectedCheckbox && correctCheckbox) {
            const selectedOption = selectedCheckbox.closest('.option');
            const correctOption = correctCheckbox.closest('.option');
            
            // Destacar resposta correta em verde
            correctOption.classList.add('correct');
            
            // Se a resposta está correta
            if (selectedCheckbox === correctCheckbox) {
                score++;
            } else {
                // Destacar resposta incorreta
                selectedOption.classList.add('incorrect');
            }
        }
    }
    
    // Exibir resultado
    showResults(score, totalQuestions);
    
    // Scroll para o resultado
    document.getElementById('resultado').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

function showResults(score, total) {
    const resultSection = document.getElementById('resultado');
    const pointsElement = document.getElementById('pontos');
    const percentualElement = document.getElementById('percentual');
    
    // Atualizar pontuação
    pointsElement.textContent = score;
    
    // Calcular e exibir percentual
    const percentage = Math.round((score / total) * 100);
    percentualElement.textContent = `${percentage}%`;
    
    // Alterar cor do percentual baseado na performance
    if (percentage >= 80) {
        percentualElement.style.color = 'var(--accent-color)';
    } else if (percentage >= 60) {
        percentualElement.style.color = 'var(--secondary-color)';
    } else {
        percentualElement.style.color = '#ef4444';
    }
    
    // Mostrar seção de resultado
    resultSection.style.display = 'block';
    
    // Ocultar formulário
    document.getElementById('quiz-form').style.display = 'none';
    
    // Salvar resultado no sistema
    saveQuizResult(score, total);
    
    // Adicionar confete se pontuação alta
    if (percentage >= 80) {
        createConfetti();
    }
}

function saveQuizResult(score, totalQuestions) {
    if (!currentQuizUser) return;
    
    // Coletar respostas do usuário
    const answers = {};
    const questionNames = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"];
    
    questionNames.forEach(qName => {
        const selectedCheckbox = document.querySelector(`input[name="${qName}"]:checked`);
        const correctCheckbox = document.querySelector(`input[name="${qName}"][data-correct="true"]`);
        
        if (selectedCheckbox && correctCheckbox) {
            answers[qName] = {
                selected: selectedCheckbox.value,
                correct: correctCheckbox.value,
                isCorrect: selectedCheckbox === correctCheckbox
            };
        }
    });
    
    // Obter resultados existentes
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    
    // Criar novo resultado
    const result = {
        id: Date.now(),
        userName: currentQuizUser,
        score: score,
        totalQuestions: totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        answers: answers,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString('pt-BR'),
        time: new Date().toLocaleTimeString('pt-BR')
    };
    
    // Adicionar e salvar
    results.push(result);
    localStorage.setItem('quizResults', JSON.stringify(results));
    
    console.log('Resultado salvo:', result);
}

function createConfetti() {
    // Criar efeito de confete simples
    const colors = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = 'fall 3s linear forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 100);
    }
}

// Adicionar CSS para animação de queda do confete
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function refazerQuiz() {
    // Resetar todas as seleções
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.closest('.option').classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Ocultar resultado e mostrar formulário
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('quiz-form').style.display = 'block';
    
    // Resetar progresso
    updateProgress();
    
    // Scroll para o topo
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function voltarInicio() {
    // Adicionar animação antes de redirecionar
    document.body.style.opacity = '0.8';
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 300);
}

// Adicionar suporte a teclado para acessibilidade
document.addEventListener('keydown', function(e) {
    // Enter ou Espaço para selecionar opção focada
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.type === 'checkbox') {
            e.preventDefault();
            focusedElement.click();
        }
    }
    
    // Esc para voltar ao início
    if (e.key === 'Escape') {
        if (confirm('Deseja realmente voltar ao início? Seu progresso será perdido.')) {
            voltarInicio();
        }
    }
});

// Salvar progresso no localStorage (opcional)
function saveProgress() {
    const answers = {};
    const questionNames = ["q1", "q2", "q5", "q6", "q7", "q9", "q10", "q11", "q12", "q13", "q14"];
    
    questionNames.forEach(qName => {
        const selectedCheckbox = document.querySelector(`input[name="${qName}"]:checked`);
        if (selectedCheckbox) {
            answers[qName] = selectedCheckbox.value;
        }
    });
    
    localStorage.setItem("quizProgress", JSON.stringify(answers));
}

function loadProgress() {
    const savedAnswers = localStorage.getItem("quizProgress");
    
    if (savedAnswers) {
        const answers = JSON.parse(savedAnswers);
        
        Object.keys(answers).forEach(questionName => {
            const checkbox = document.querySelector(`input[name="${questionName}"][value="${answers[questionName]}"]`);
            if (checkbox) {
                checkbox.checked = true;
                checkbox.closest(".option").classList.add("selected");
            }
        });
        
        updateProgress();
    }
}

// Salvar progresso automaticamente
document.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox') {
        saveProgress();
    }
});

// Carregar progresso ao inicializar
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
});

