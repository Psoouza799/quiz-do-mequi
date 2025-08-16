// JavaScript para Edição de Perguntas - Quiz Do Méqui

// Perguntas originais do quiz
const perguntasOriginais = [
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

// Variáveis globais
let perguntasEditadas = [];
let acaoConfirmacao = null;

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    carregarPerguntas();
    renderizarPerguntas();
});

// Carregar perguntas (editadas ou originais)
function carregarPerguntas() {
    const perguntasSalvas = localStorage.getItem('perguntasEditadas');
    if (perguntasSalvas) {
        try {
            perguntasEditadas = JSON.parse(perguntasSalvas);
        } catch (error) {
            console.error('Erro ao carregar perguntas editadas:', error);
            perguntasEditadas = [...perguntasOriginais];
        }
    } else {
        perguntasEditadas = [...perguntasOriginais];
    }
}

// Renderizar todas as perguntas na interface
function renderizarPerguntas() {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';

    perguntasEditadas.forEach((pergunta, index) => {
        const perguntaCard = criarCardPergunta(pergunta, index);
        container.appendChild(perguntaCard);
    });
}

// Criar card de edição para uma pergunta
function criarCardPergunta(pergunta, index) {
    const card = document.createElement('div');
    card.className = 'question-editor-card';
    card.innerHTML = `
        <div class="question-header">
            <div class="question-number">Pergunta ${index + 1}</div>
            <div class="question-actions">
                <button class="btn-icon btn-danger" onclick="removerPergunta(${index})" title="Remover pergunta">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>

        <div class="form-group">
            <label for="pergunta-${index}">Texto da Pergunta:</label>
            <textarea id="pergunta-${index}" placeholder="Digite o texto da pergunta...">${pergunta.pergunta}</textarea>
        </div>

        <div class="options-editor">
            <h4><i class="fas fa-list"></i> Opções de Resposta</h4>
            ${pergunta.opcoes.map((opcao, opcaoIndex) => `
                <div class="option-editor ${opcaoIndex === pergunta.respostaCorreta ? 'correct' : ''}">
                    <input type="radio" 
                           name="resposta-${index}" 
                           value="${opcaoIndex}" 
                           class="option-radio"
                           ${opcaoIndex === pergunta.respostaCorreta ? 'checked' : ''}
                           onchange="marcarRespostaCorreta(${index}, ${opcaoIndex})">
                    <input type="text" 
                           class="option-input" 
                           placeholder="Digite a opção de resposta..." 
                           value="${opcao}"
                           onchange="atualizarOpcao(${index}, ${opcaoIndex}, this.value)">
                    <span class="option-label">${opcaoIndex === pergunta.respostaCorreta ? 'Correta' : 'Opção ' + (opcaoIndex + 1)}</span>
                </div>
            `).join('')}
        </div>
    `;

    // Adicionar event listener para atualizar o texto da pergunta
    const textareaPergunta = card.querySelector(`#pergunta-${index}`);
    textareaPergunta.addEventListener('input', function() {
        perguntasEditadas[index].pergunta = this.value;
    });

    return card;
}

// Marcar resposta correta
function marcarRespostaCorreta(perguntaIndex, opcaoIndex) {
    perguntasEditadas[perguntaIndex].respostaCorreta = opcaoIndex;
    
    // Atualizar visual das opções
    const card = document.querySelectorAll('.question-editor-card')[perguntaIndex];
    const opcoes = card.querySelectorAll('.option-editor');
    
    opcoes.forEach((opcao, index) => {
        const label = opcao.querySelector('.option-label');
        if (index === opcaoIndex) {
            opcao.classList.add('correct');
            label.textContent = 'Correta';
        } else {
            opcao.classList.remove('correct');
            label.textContent = `Opção ${index + 1}`;
        }
    });
}

// Atualizar texto de uma opção
function atualizarOpcao(perguntaIndex, opcaoIndex, novoTexto) {
    perguntasEditadas[perguntaIndex].opcoes[opcaoIndex] = novoTexto;
}

// Adicionar nova pergunta
function adicionarPergunta() {
    const novaPergunta = {
        pergunta: "Nova pergunta...",
        opcoes: ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
        respostaCorreta: 0
    };
    
    perguntasEditadas.push(novaPergunta);
    renderizarPerguntas();
    
    // Scroll para a nova pergunta
    setTimeout(() => {
        const novaCard = document.querySelectorAll('.question-editor-card');
        const ultimaCard = novaCard[novaCard.length - 1];
        ultimaCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

// Remover pergunta
function removerPergunta(index) {
    mostrarModal(
        'Remover Pergunta',
        `Tem certeza que deseja remover a Pergunta ${index + 1}? Esta ação não pode ser desfeita.`,
        () => {
            perguntasEditadas.splice(index, 1);
            renderizarPerguntas();
            mostrarNotificacao('Pergunta removida com sucesso!', 'success');
        }
    );
}

// Salvar todas as alterações
function salvarPerguntas() {
    // Validar perguntas antes de salvar
    const erros = validarPerguntas();
    if (erros.length > 0) {
        mostrarModal(
            'Erro de Validação',
            `Por favor, corrija os seguintes erros antes de salvar:\n\n${erros.join('\n')}`,
            null
        );
        return;
    }

    mostrarModal(
        'Salvar Alterações',
        'Tem certeza que deseja salvar todas as alterações? As perguntas do quiz serão atualizadas.',
        () => {
            try {
                localStorage.setItem('perguntasEditadas', JSON.stringify(perguntasEditadas));
                mostrarNotificacao('Perguntas salvas com sucesso!', 'success');
            } catch (error) {
                console.error('Erro ao salvar perguntas:', error);
                mostrarNotificacao('Erro ao salvar perguntas. Tente novamente.', 'error');
            }
        }
    );
}

// Restaurar perguntas originais
function resetarPerguntas() {
    mostrarModal(
        'Restaurar Perguntas Originais',
        'Tem certeza que deseja restaurar as perguntas originais? Todas as alterações serão perdidas.',
        () => {
            perguntasEditadas = [...perguntasOriginais];
            localStorage.removeItem('perguntasEditadas');
            renderizarPerguntas();
            mostrarNotificacao('Perguntas originais restauradas!', 'success');
        }
    );
}

// Validar perguntas
function validarPerguntas() {
    const erros = [];
    
    perguntasEditadas.forEach((pergunta, index) => {
        // Validar texto da pergunta
        if (!pergunta.pergunta || pergunta.pergunta.trim() === '') {
            erros.push(`Pergunta ${index + 1}: Texto da pergunta não pode estar vazio.`);
        }
        
        // Validar opções
        pergunta.opcoes.forEach((opcao, opcaoIndex) => {
            if (!opcao || opcao.trim() === '') {
                erros.push(`Pergunta ${index + 1}: Opção ${opcaoIndex + 1} não pode estar vazia.`);
            }
        });
        
        // Validar resposta correta
        if (pergunta.respostaCorreta < 0 || pergunta.respostaCorreta >= pergunta.opcoes.length) {
            erros.push(`Pergunta ${index + 1}: Resposta correta inválida.`);
        }
    });
    
    return erros;
}

// Mostrar modal de confirmação
function mostrarModal(titulo, mensagem, callback) {
    const modal = document.getElementById('confirmation-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const confirmBtn = document.getElementById('modal-confirm-btn');
    
    modalTitle.textContent = titulo;
    modalMessage.textContent = mensagem;
    
    acaoConfirmacao = callback;
    
    if (callback) {
        confirmBtn.style.display = 'block';
    } else {
        confirmBtn.style.display = 'none';
    }
    
    modal.style.display = 'flex';
}

// Fechar modal
function fecharModal() {
    const modal = document.getElementById('confirmation-modal');
    modal.style.display = 'none';
    acaoConfirmacao = null;
}

// Confirmar ação do modal
function confirmarAcao() {
    if (acaoConfirmacao) {
        acaoConfirmacao();
    }
    fecharModal();
}

// Mostrar notificação
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Criar elemento de notificação
    const notificacao = document.createElement('div');
    notificacao.className = `notification notification-${tipo}`;
    notificacao.innerHTML = `
        <div class="notification-content">
            <i class="fas ${tipo === 'success' ? 'fa-check-circle' : tipo === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${mensagem}</span>
        </div>
    `;
    
    // Adicionar estilos inline
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#10b981' : tipo === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notificacao.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 500;
    `;
    
    document.body.appendChild(notificacao);
    
    // Animar entrada
    setTimeout(() => {
        notificacao.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 4 segundos
    setTimeout(() => {
        notificacao.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notificacao.parentNode) {
                notificacao.parentNode.removeChild(notificacao);
            }
        }, 300);
    }, 4000);
}

// Voltar ao início
function voltarInicio() {
    window.location.href = 'index.html';
}

// Fechar modal ao clicar fora
document.addEventListener('click', function(event) {
    const modal = document.getElementById('confirmation-modal');
    if (event.target === modal) {
        fecharModal();
    }
});

// Atalhos de teclado
document.addEventListener('keydown', function(event) {
    // Ctrl+S para salvar
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        salvarPerguntas();
    }
    
    // Escape para fechar modal
    if (event.key === 'Escape') {
        fecharModal();
    }
});

