# Teste Tokio Marine (Front-end)

Este projeto contém as soluções dos pontos levantados na avaliação prática fornecida no [PDF](AvaliaçãoPraticaJava.pdf) relativos ao **FRONT-END**

### Inicialização

``npm install && ng serve``

### Tecnologias utilizadas:
- Angular 19;
- Bootstrap 5.3.7 (estilo)
- JQuery e Popper.js (necessários para o componente Dropdown funcionar)

### Estrutura de pastas e módulos

- *components*: Pasta que contém componentes carregados dinamicamente. Não ocupam a tela inteira, mas são usados dentro das páginas;
- *paginas*: Pasta que contém components que ocupam a tela inteira;
- *model*: Classes e interfaces de domínio (DTOs, entidades de front-end);
- *services*: Serviços responsáveis por lógica de negócio e utilitários não ligados diretamente à UI; 
