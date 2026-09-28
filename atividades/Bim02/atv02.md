# Lista de Exercícios — Herança em TypeScript

## Orientações
- Todos os exercícios devem ser implementados em **TypeScript**.
- Utilize nomes de classes, atributos e métodos de forma clara.
- Sempre que fizer sentido, use **construtor**, **encapsulamento** e **métodos**.
- Nos exercícios com herança, observe a relação de **“é um(a)”** entre as classes.

---

## Entrega
- Enviar link do repositório Git com commit final no Google Classroom;
- O arquivo deve estar sem a pasta node_modules;
- Demonstrar o programa funcionando no terminal
- Apresentar e explicar o código no dia da entrega (conforme seção acima).

---

## Exercício 1 
Crie uma classe `Pessoa` com:
- `nome`
- `idade`
- método `apresentar()`

Depois crie uma classe `Aluno` que herda de `Pessoa` e adicione:
- `matricula`
- `curso`

Crie um método `exibirDadosAluno()` para mostrar todas as informações.

---

## Exercício 2
Crie:
- uma classe `Veiculo` com os atributos `marca` e `modelo`;
- uma classe `Carro` que herda de `Veiculo` e possui o atributo `quantidadePortas`.

O construtor de `Carro` deve usar `o método construtor da superclasse` para inicializar os atributos herdados.

---

## Exercício 3
Crie uma classe `Funcionario` com:
- atributo `protected nome`
- atributo `protected salario`

Depois crie uma classe `Gerente` que herda de `Funcionario` e implemente o método:
- `exibirDadosGerente()`

Esse método deve acessar os atributos herdados diretamente e mostrá-los no terminal.

---

## Exercício 4
Crie uma classe `Conta` com:
- atributo `private saldo`
- construtor para inicializar o saldo

Depois crie uma classe `ContaPremium` que herda de `Conta` e tente acessar `saldo` diretamente dentro de um método.

Responda:
1. O código funciona?
2. Por que `private` impede esse acesso?
3. O que mudaria se o atributo fosse `protected`?

Dica: Usar comentários para as perguntas e repostas.

---

## Exercício 5
Crie:
- uma classe `Pessoa`
- uma classe `Aluno`
- uma classe `Professor`

Requisitos:
- `Pessoa` deve possuir `nome` e `idade`;
- `Aluno` deve possuir `matricula` e `curso`;
- `Professor` deve possuir `disciplina`.

Implemente:
- `Aluno.exibirDadosAluno()`
- `Professor.apresentar()` sobrescrevendo o método herdado

---

## Exercício 6
Monte um pequeno sistema com as classes:
- `Pessoa`
- `Aluno`
- `Professor`
- `Coordenador`

Sugestão:
- `Pessoa` é a superclasse;
- as demais herdam de `Pessoa`.

Cada classe deve possuir pelo menos:
- um atributo próprio;
- um método próprio;
- uso adequado de construtor com `super(...)`.

---

## Exercício 7
Crie a hierarquia abaixo:

- `Veiculo`
  - `Carro`
  - `Moto`
  - `Caminhao`

A classe `Veiculo` deve ter:
- `marca`
- `modelo`
- método `exibirDados()`

Cada subclasse deve ter:
- um atributo específico;
- um método específico;
- sobrescrita do método `exibirDados()`.

---

## Exercício 8
Crie uma classe `FuncionarioEscola` com:
- `nome`
- `idade`
- `salario`

Crie as subclasses:
- `Professor`
- `Secretario`
- `Zelador`

Cada uma deve ter uma função específica, por exemplo:
- `darAula()`
- `organizarDocumentos()`
- `limparAmbiente()`

---

## Exercício 9
Crie um sistema completo de cadastro com as classes:

- `Pessoa`
- `Aluno`
- `Professor`

Requisitos:
- usar `protected` em `nome` e `idade`;
- usar `private` em atributos específicos como `matricula` e `disciplina`;
- usar `extends`;
- usar `super(...)`;
- sobrescrever pelo menos um método;
- criar pelo menos 2 objetos de cada subclasse;
- exibir todos os dados no terminal.

---