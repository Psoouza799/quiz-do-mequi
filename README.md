# Sistema de Questionário EduQuiz

## Descrição
Sistema de questionário responsivo desenvolvido em HTML, CSS e JavaScript puro, com design moderno e funcionalidades completas de correção automática.

## Funcionalidades Implementadas

### Página Inicial (index.html)
- Design responsivo moderno com gradientes e animações
- Seção hero com call-to-action atrativo
- Cards informativos sobre estudo e treinamento
- Seção de recursos com ícones e descrições
- Seção "Sobre" com estatísticas
- Botão funcional "Iniciar Questionário"
- Navegação suave entre seções
- Totalmente responsivo para desktop e mobile

### Página do Questionário (questionario.html)
- 10 questões de conhecimentos gerais com múltipla escolha
- Checkboxes personalizados com design moderno
- Sistema de progresso visual (barra e contador)
- Apenas uma seleção por questão (comportamento de radio button)
- Validação para garantir que todas as questões sejam respondidas
- Botões de navegação ("Voltar ao Início" e "Ver Resultado")

### Sistema de Correção
- Cálculo automático da pontuação
- Destaque das respostas corretas em verde
- Destaque das respostas incorretas (quando aplicável)
- Exibição do resultado com:
  - Pontuação numérica (X/10)
  - Percentual de acertos
  - Ícone de troféu
  - Efeito de confete para pontuações altas (≥80%)
- Botões para refazer o quiz ou voltar ao início

### Recursos Técnicos
- **Responsividade**: Funciona perfeitamente em desktop e mobile
- **Acessibilidade**: Suporte a navegação por teclado
- **Persistência**: Salva progresso no localStorage
- **Animações**: Transições suaves e efeitos visuais
- **UX/UI**: Design moderno com hover effects e micro-interações

## Estrutura de Arquivos
```
questionario-app/
├── index.html          # Página inicial
├── questionario.html    # Página do questionário
├── styles.css          # Estilos da página inicial
├── questionario.css    # Estilos específicos do questionário
├── script.js           # JavaScript da página inicial
├── questionario.js     # JavaScript do sistema de questionário
└── README.md           # Documentação
```

## Como Usar
1. Abra `index.html` em um navegador web
2. Clique em "Iniciar Questionário"
3. Responda todas as 10 questões selecionando uma alternativa por questão
4. Clique em "Ver Resultado" para ver a correção
5. Use "Refazer Quiz" para tentar novamente ou "Voltar ao Início" para retornar

## Questões Incluídas (Para Teste)
1. Capital do Brasil
2. Número de continentes
3. Maior planeta do sistema solar
4. Ano de descobrimento do Brasil
5. Elemento químico "O"
6. Lados de um hexágono
7. Oceano que banha a costa leste do Brasil
8. Autor de "Dom Casmurro"
9. Fórmula química da água
10. Continente do Egito

## Tecnologias Utilizadas
- HTML5 semântico
- CSS3 com Flexbox e Grid
- JavaScript ES6+
- Font Awesome para ícones
- Google Fonts (Inter)

## Características do Design
- Paleta de cores moderna (azuis e verdes)
- Tipografia limpa e legível
- Animações suaves e transições
- Cards com hover effects
- Gradientes e sombras modernas
- Layout responsivo com breakpoints otimizados

## Compatibilidade
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Dispositivos desktop e mobile
- Tablets e smartphones

