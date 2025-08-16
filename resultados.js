// Sistema de Visualização de Resultados

let allResults = [];
let filteredResults = [];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se é admin
    checkAdminAccess();
    
    // Carregar e exibir resultados
    loadResults();
    
    // Configurar filtros
    setupFilters();
});

function checkAdminAccess() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (!isAdmin) {
        alert('Acesso negado. Apenas administradores podem visualizar os resultados.');
        window.location.href = 'index.html';
        return;
    }
}

function loadResults() {
    // Carregar resultados do localStorage
    allResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    filteredResults = [...allResults];
    
    // Atualizar estatísticas
    updateStatistics();
    
    // Exibir resultados
    displayResults();
    
    // Atualizar filtro de usuários
    updateUserFilter();
}

function updateStatistics() {
    const totalParticipants = allResults.length;
    const totalElement = document.getElementById('total-participants');
    const averageElement = document.getElementById('average-score');
    const bestElement = document.getElementById('best-score');
    const lastElement = document.getElementById('last-attempt');
    
    totalElement.textContent = totalParticipants;
    
    if (totalParticipants > 0) {
        // Calcular média
        const averageScore = allResults.reduce((sum, result) => sum + result.percentage, 0) / totalParticipants;
        averageElement.textContent = Math.round(averageScore) + '%';
        
        // Encontrar melhor pontuação
        const bestScore = Math.max(...allResults.map(result => result.percentage));
        bestElement.textContent = bestScore + '%';
        
        // Última tentativa
        const sortedByDate = [...allResults].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const lastAttempt = sortedByDate[0];
        lastElement.textContent = lastAttempt.date + ' ' + lastAttempt.time;
    } else {
        averageElement.textContent = '0%';
        bestElement.textContent = '0%';
        lastElement.textContent = '-';
    }
}

function updateUserFilter() {
    const userFilter = document.getElementById('filter-user');
    const uniqueUsers = [...new Set(allResults.map(result => result.userName))];
    
    // Limpar opções existentes (exceto "Todos")
    userFilter.innerHTML = '<option value="">Todos os usuários</option>';
    
    // Adicionar usuários únicos
    uniqueUsers.forEach(user => {
        const option = document.createElement('option');
        option.value = user;
        option.textContent = user;
        userFilter.appendChild(option);
    });
}

function displayResults() {
    const resultsList = document.getElementById('results-list');
    const noResults = document.getElementById('no-results');
    
    if (filteredResults.length === 0) {
        resultsList.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    resultsList.style.display = 'block';
    noResults.style.display = 'none';
    
    resultsList.innerHTML = '';
    
    filteredResults.forEach(result => {
        const resultItem = createResultItem(result);
        resultsList.appendChild(resultItem);
    });
}

function createResultItem(result) {
    const item = document.createElement('div');
    item.className = 'result-item';
    
    // Determinar classe de cor baseada na pontuação
    let scoreClass = 'score-poor';
    if (result.percentage >= 80) {
        scoreClass = 'score-excellent';
    } else if (result.percentage >= 60) {
        scoreClass = 'score-good';
    }
    
    // Obter iniciais do usuário
    const initials = result.userName.split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .join('')
        .substring(0, 2);
    
    item.innerHTML = `
        <div class="result-header">
            <div class="result-user">
                <div class="user-avatar">${initials}</div>
                <div class="user-info">
                    <h4>${result.userName}</h4>
                    <p>${result.date} às ${result.time}</p>
                </div>
            </div>
            <div class="result-score">
                <h3 class="score-value ${scoreClass}">${result.percentage}%</h3>
                <p class="score-details">${result.score}/${result.totalQuestions} acertos</p>
            </div>
        </div>
        <div class="result-details">
            <div class="result-detail">
                <i class="fas fa-calendar"></i>
                <span>Data: ${result.date}</span>
            </div>
            <div class="result-detail">
                <i class="fas fa-clock"></i>
                <span>Horário: ${result.time}</span>
            </div>
            <div class="result-detail">
                <i class="fas fa-check-circle"></i>
                <span>Acertos: ${result.score}</span>
            </div>
            <div class="result-detail">
                <i class="fas fa-times-circle"></i>
                <span>Erros: ${result.totalQuestions - result.score}</span>
            </div>
        </div>
    `;
    
    return item;
}

function filterResults() {
    const userFilter = document.getElementById('filter-user').value;
    
    filteredResults = allResults.filter(result => {
        if (userFilter && result.userName !== userFilter) {
            return false;
        }
        return true;
    });
    
    displayResults();
}

function sortResults() {
    const sortBy = document.getElementById('sort-by').value;
    
    filteredResults.sort((a, b) => {
        switch (sortBy) {
            case 'date-desc':
                return new Date(b.timestamp) - new Date(a.timestamp);
            case 'date-asc':
                return new Date(a.timestamp) - new Date(b.timestamp);
            case 'score-desc':
                return b.percentage - a.percentage;
            case 'score-asc':
                return a.percentage - b.percentage;
            case 'name-asc':
                return a.userName.localeCompare(b.userName);
            case 'name-desc':
                return b.userName.localeCompare(a.userName);
            default:
                return 0;
        }
    });
    
    displayResults();
}

function exportResults() {
    if (allResults.length === 0) {
        alert('Não há resultados para exportar.');
        return;
    }
    
    // Criar CSV
    const headers = ['Nome', 'Data', 'Horário', 'Pontuação', 'Acertos', 'Total', 'Percentual'];
    const csvContent = [
        headers.join(','),
        ...allResults.map(result => [
            `"${result.userName}"`,
            result.date,
            result.time,
            result.score,
            result.score,
            result.totalQuestions,
            result.percentage + '%'
        ].join(','))
    ].join('\n');
    
    // Download do arquivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `quiz-resultados-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function clearAllResults() {
    if (allResults.length === 0) {
        alert('Não há resultados para limpar.');
        return;
    }
    
    const confirmDelete = confirm(
        `Tem certeza que deseja limpar todos os ${allResults.length} resultados? Esta ação não pode ser desfeita.`
    );
    
    if (confirmDelete) {
        localStorage.removeItem('quizResults');
        allResults = [];
        filteredResults = [];
        
        updateStatistics();
        displayResults();
        updateUserFilter();
        
        alert('Todos os resultados foram removidos com sucesso.');
    }
}

function voltarInicio() {
    window.location.href = 'index.html';
}

