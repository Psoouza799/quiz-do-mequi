// Sistema de Login e Navegação

// Variáveis globais
let currentUser = null;
let isAdmin = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Verificar se há usuário logado
    checkExistingLogin();
    
    // Configurar eventos de login
    setupLoginEvents();
}

function checkExistingLogin() {
    const savedUser = localStorage.getItem('currentUser');
    const savedIsAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (savedUser) {
        currentUser = savedUser;
        isAdmin = savedIsAdmin;
        showMainInterface();
    } else {
        showLoginInterface();
    }
}

function setupLoginEvents() {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordGroup = document.getElementById('password-group');
    const passwordInput = document.getElementById('password');
    
    // Mostrar/ocultar campo de senha baseado no usuário
    usernameInput.addEventListener('input', function() {
        const username = this.value.toLowerCase().trim();
        
        if (username === 'admin') {
            passwordGroup.style.display = 'block';
            passwordInput.required = true;
        } else {
            passwordGroup.style.display = 'none';
            passwordInput.required = false;
            passwordInput.value = '';
        }
    });
    
    // Processar login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        processLogin();
    });
}

function processLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (!username) {
        alert('Por favor, digite seu nome de usuário.');
        return;
    }
    
    // Verificar se é admin
    if (username.toLowerCase() === 'admin') {
        if (password !== 'admin') {
            alert('Senha incorreta para o usuário admin.');
            return;
        }
        
        currentUser = 'Administrador';
        isAdmin = true;
    } else {
        // Login simplificado para outros usuários
        currentUser = username;
        isAdmin = false;
    }
    
    // Salvar no localStorage
    localStorage.setItem('currentUser', currentUser);
    localStorage.setItem('isAdmin', isAdmin.toString());
    
    // Mostrar interface principal
    showMainInterface();
}

function showLoginInterface() {
    document.getElementById('login-section').style.display = 'flex';
    document.getElementById('hero-section').style.display = 'none';
}

function showMainInterface() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('hero-section').style.display = 'block';
    
    // Atualizar informações do usuário
    document.getElementById('current-user').textContent = currentUser;
    
    // Mostrar botão de resultados apenas para admin
    const viewResultsBtn = document.getElementById('view-results-btn');
    if (isAdmin) {
        viewResultsBtn.style.display = 'flex';
    } else {
        viewResultsBtn.style.display = 'none';
    }
}

function logout() {
    // Limpar dados do localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    
    // Resetar variáveis
    currentUser = null;
    isAdmin = false;
    
    // Limpar formulário de login
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-group').style.display = 'none';
    
    // Mostrar interface de login
    showLoginInterface();
}

function iniciarQuestionario() {
    if (!currentUser) {
        alert('Por favor, faça login primeiro.');
        return;
    }
    
    // Salvar dados do usuário para o questionário
    localStorage.setItem('quizUser', currentUser);
    localStorage.setItem('quizIsAdmin', isAdmin.toString());
    
    // Redirecionar para o questionário
    window.location.href = 'questionario.html';
}

function visualizarResultados() {
    if (!isAdmin) {
        alert('Acesso negado. Apenas administradores podem visualizar os resultados.');
        return;
    }
    
    // Redirecionar para a página de resultados
    window.location.href = 'resultados.html';
}

// Função para salvar resultado do quiz (será chamada do questionário)
function saveQuizResult(userName, score, totalQuestions, answers) {
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    
    const result = {
        id: Date.now(),
        userName: userName,
        score: score,
        totalQuestions: totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        answers: answers,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString('pt-BR'),
        time: new Date().toLocaleTimeString('pt-BR')
    };
    
    results.push(result);
    localStorage.setItem('quizResults', JSON.stringify(results));
}

// Função para obter todos os resultados (para a página de resultados)
function getAllResults() {
    return JSON.parse(localStorage.getItem('quizResults') || '[]');
}

