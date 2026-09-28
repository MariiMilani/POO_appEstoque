# Lista de exercícios — TypeScript

## Parte 1 — Fundamentos da linguagem

### 1. Primeiro programa em TypeScript
Crie um arquivo `index.ts` que exiba no terminal:
- seu nome;
- sua idade;
- seu curso;
- uma frase final dizendo que está aprendendo TypeScript.

### 2. Identificadores válidos e inválidos
Crie um arquivo com:
- 5 exemplos de identificadores válidos;
- 5 exemplos de identificadores inválidos.

Ao lado de cada exemplo inválido, explique por que ele está errado.

### 3. `var`, `let` e `const`
Crie um programa que mostre:
- uma variável declarada com `var`;
- uma variável declarada com `let`;
- uma constante declarada com `const`.

Depois:
- altere o valor da variável com `let`;
- explique por que `const` não pode ser reatribuído;
- descreva a diferença de escopo entre `var` e `let`.

### 4. Saída formatada no terminal
Crie variáveis para:
- nome do aluno;
- nota 1;
- nota 2;
- média.

Mostre tudo no terminal usando template string.

---

## Parte 2 — Tipos, inferência e funções

### 5. Tipos básicos
Crie um arquivo `tipos.ts` declarando e exibindo no terminal:
- uma variável `string`;
- uma variável `number`;
- uma variável `boolean`;
- um array de números;
- um array de strings;
- uma tupla com latitude e longitude;
- um `enum` com três perfis de usuário.

### 6. Inferência e anotação
Crie exemplos mostrando:
- uma variável com tipo inferido;
- uma variável com tipo anotado explicitamente;
- um caso em que a inferência já é suficiente;
- um caso em que a anotação deixa o código mais claro.

### 7. Funções tipadas
Implemente as funções abaixo:
- `somar(a, b)`
- `subtrair(a, b)`
- `multiplicar(a, b)`
- `dividir(a, b)`

Todas devem receber e retornar `number`.

### 8. Função com `void`
Crie uma função `exibirMensagem` que receba uma string e apenas mostre a mensagem no terminal, sem retornar valor.

### 9. Função com validação
Crie uma função `ehPar(numero: number): boolean` que retorne `true` se o número for par e `false` caso contrário.

### 10. Interface e type
Crie:
- uma `interface` chamada `Aluno` com `id`, `nome`, `email?` e `ativo`;
- um `type` chamado `Turma` que aceite apenas `"1TADS"`, `"2TADS"` ou `"3TADS"`.

Depois, crie um objeto e uma função que matricule esse aluno em uma turma.

---

## Parte 3 — Entrada de dados e validação

### 11. Leitura simples de dados
Crie um programa que pergunte no terminal:
- nome;
- idade;
- cidade.

Depois, exiba um resumo com os dados digitados.

### 12. Conversão de string para número
Crie um programa que:
- peça dois números ao usuário;
- converta os valores digitados para `number`;
- exiba a soma dos dois.

### 13. Campo obrigatório
Implemente uma função parecida com `obrigatorio(valor, nomeCampo)` para validar se o usuário digitou algo no campo nome.
Se o campo estiver vazio, mostre uma mensagem de erro.

### 14. Validação de número inteiro
Implemente uma função que:
- receba um valor digitado no terminal;
- valide se esse valor é um número inteiro;
- informe erro caso o valor seja inválido.

### 15. Validação por faixa
Crie um programa que peça a idade do usuário e aceite apenas valores entre `0` e `120`.
Caso o valor esteja fora da faixa, exiba uma mensagem de erro.

### 16. Cadastro simples com validação
Crie um programa que pergunte:
- nome;
- idade;
- nota final.

Regras:
- nome é obrigatório;
- idade deve ser inteira e entre `0` e `120`;
- nota final deve estar entre `0` e `10`.

Ao final, exiba os dados válidos ou a mensagem de erro correspondente.

---

## Parte 4 — Programação Orientada a Objetos

### 17. Classe `Pessoa`
Crie uma classe `Pessoa` com:
- `nome`;
- `idade`.

Implemente:
- um construtor;
- um método `apresentar()` que exiba os dados da pessoa.

### 18. Classe `Produto`
Crie uma classe `Produto` com:
- `nome`;
- `preco`;
- `estoque`.

Implemente os métodos:
- `adicionarEstoque(qtd: number)`;
- `removerEstoque(qtd: number)`;
- `exibirProduto()`.

### 19. Classe `Retangulo`
Crie uma classe `Retangulo` com:
- `base`;
- `altura`.

Implemente os métodos:
- `calcularArea()`;
- `calcularPerimetro()`.

### 20. Classe `ContaCorrente`
Crie uma classe `ContaCorrente` com:
- `titular`;
- `saldo`.

Implemente:
- `depositar(valor: number)`;
- `sacar(valor: number)`;
- `consultarSaldo()`;
- `exibirDados()`.

Aplique regras para impedir depósito ou saque com valor inválido.

### 21. `public`, `private` e `protected`
Crie três classes para demonstrar:
- um atributo `public`;
- um atributo `private`;
- um atributo `protected`.

Explique no comentário do código quem pode acessar cada um deles.

### 22. Encapsulamento com getters e setters
Crie uma classe `Temperatura` com atributo privado `_celsius`.
Implemente:
- `get celsius()`;
- `set celsius(valor)`.

Regra:
- não permitir valores abaixo de `-273.15`.

### 23. Uso de `this`
Crie uma classe `Televisao` com atributo `canal`.
Implemente:
- `setCanal(canal: number)`;
- `getCanal()`.

Explique no código a diferença entre `canal` e `this.canal`.

---

## Parte 5 — Métodos e sintaxe em POO

### 24. Métodos com parâmetros e retorno
Crie uma classe `Calculadora` com métodos:
- `somar(a: number, b: number): number`
- `subtrair(a: number, b: number): number`
- `multiplicar(a: number, b: number): number`

### 25. Método de observação e método de alteração
Crie uma classe `Lampada` com atributo privado `ligada`.
Implemente:
- `ligar()`;
- `desligar()`;
- `estaLigada()`.

### 26. Método estático de criação
Crie uma classe `Usuario` com:
- atributo `nome`;
- construtor;
- método estático `criarVisitante()` que crie um usuário padrão chamado `"Visitante"`.

### 27. Sobrecarga de método em TypeScript
Crie uma classe `Saudacao` com um método `exibir` que possa ser chamado:
- apenas com o nome;
- com nome e título.

Use assinaturas de método e uma única implementação real.

---

## Desafio

### 28. Sistema de cadastro de alunos em TypeScript
Crie um programa completo que una os conteúdos vistos. O programa deve:
- ler do terminal:
  - nome do aluno;
  - matrícula;
  - idade;
  - nota final;
- validar os dados informados;
- criar um objeto da classe `Aluno`;
- exibir:
  - nome;
  - matrícula;
  - idade;
  - nota final;
  - situação do aluno (`Aprovado` ou `Reprovado`).

Regras:
- nome obrigatório;
- idade entre `0` e `120`;
- nota entre `0` e `10`;
- a situação deve ser calculada por um método da classe.

---
