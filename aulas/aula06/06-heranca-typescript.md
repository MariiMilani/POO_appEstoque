# Aula 06 — Herança em Orientação a Objetos com TypeScript

Este material apresenta o conceito de **herança** em **Orientação a Objetos**, mostrando como uma classe pode reaproveitar atributos e métodos de outra classe. A proposta da aula é explicar, de forma gradual, o que é herança, quando ela faz sentido, como utilizar `extends` e `super` em TypeScript, e como criar exemplos práticos para desenvolver juntamente com os alunos.

---

## Projeto com exemplos

Os arquivos de exemplo desta aula estão disponíveis na pasta [`exemplo`](./exemploAula06/) e também no arquivo compactado disponibilizado junto com este material.

---

## Sumário
- [0) O que é herança?](#0-o-que-é-herança)
- [1) Relação entre superclasse e subclasse](#1-relação-entre-superclasse-e-subclasse)
- [2) Quando usar herança?](#2-quando-usar-herança)
- [3) Sintaxe da herança em TypeScript](#3-sintaxe-da-herança-em-typescript)
- [4) Uso de `super` no construtor](#4-uso-de-super-no-construtor)
- [5) Herança e modificadores de acesso](#5-herança-e-modificadores-de-acesso)
- [6) Sobrescrita de métodos](#6-sobrescrita-de-métodos)
- [7) Exemplo completo: pessoa, aluno e professor](#7-exemplo-completo-pessoa-aluno-e-professor)
- [8) Resumo para estudo](#8-resumo-para-estudo)

---

## 0) O que é herança?

A **herança** é um mecanismo da Orientação a Objetos que permite criar uma nova classe com base em uma classe já existente.

A nova classe **herda** características e comportamentos da classe original.

Isso significa que, em vez de escrever novamente atributos e métodos que já existem, podemos reaproveitá-los e, se necessário, adicionar novos recursos.

### Exemplo conceitual

Imagine uma classe `Pessoa` com os atributos:

- `nome`
- `idade`

E um método:

- `apresentar()`

Agora imagine que queremos criar uma classe `Aluno`.

Um aluno também possui:

- nome;
- idade;
- capacidade de se apresentar.

Mas além disso, pode ter:

- `matricula`;
- `curso`.

Nesse caso, faz sentido que `Aluno` aproveite o que já existe em `Pessoa`.

---

## 1) Relação entre superclasse e subclasse

Na herança, normalmente usamos os seguintes termos:

- **superclasse**: classe mais geral, da qual outras herdam;
- **subclasse**: classe mais específica, que herda da superclasse.

### Exemplo

```ts
class Pessoa {
  nome: string;
  idade: number;

  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }

  apresentar(): void {
    console.log(`Olá! Meu nome é ${this.nome} e tenho ${this.idade} anos.`);
  }
}

class Aluno extends Pessoa {
  matricula: string;

  constructor(nome: string, idade: number, matricula: string) {
    super(nome, idade);
    this.matricula = matricula;
  }
}
```

Nesse exemplo:

- `Pessoa` é a **superclasse**;
- `Aluno` é a **subclasse**;
- `Aluno` herda `nome`, `idade` e `apresentar()`.

---

## 2) Quando usar herança?

A herança deve ser usada quando existe uma relação de **“é um(a)”**.

### Exemplos em que faz sentido

- `Aluno` **é uma** `Pessoa`;
- `Professor` **é uma** `Pessoa`;
- `Cachorro` **é um** `Animal`;
- `Moto` **é um** `Veiculo`.

### Exemplos em que não faz sentido

- `Motor` **não é um** `Carro`;
- `Endereco` **não é uma** `Pessoa`.

Nesses casos, normalmente é melhor usar **composição** em vez de herança.

### Vantagens da herança

- reduz repetição de código;
- melhora o reaproveitamento;
- facilita manutenção;
- permite especializar comportamentos.

### Atenção

Herança não deve ser usada apenas para “reaproveitar código”.
Ela deve representar uma relação lógica entre as classes.

---

## 3) Sintaxe da herança em TypeScript

Em TypeScript, usamos a palavra-chave `extends` para indicar que uma classe herda de outra.

### Estrutura geral

```ts
class Superclasse {
  // atributos e métodos
}

class Subclasse extends Superclasse {
  // novos atributos e métodos
}
```

### Exemplo simples

```ts
class Animal {
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  emitirSom(): void {
    console.log("O animal emitiu um som.");
  }
}

class Cachorro extends Animal {
  latir(): void {
    console.log(`${this.nome} está latindo.`);
  }
}

const cachorro = new Cachorro("Rex");
cachorro.emitirSom();
cachorro.latir();
```

### O que observar?

A classe `Cachorro`:

- herdou o atributo `nome`;
- herdou o método `emitirSom()`;
- criou o método próprio `latir()`.

---

## 4) Uso de `super` no construtor

Quando a subclasse possui construtor, normalmente precisamos chamar o construtor da superclasse.

Para isso, usamos a palavra-chave `super(...)`.

### Exemplo

```ts
class Pessoa {
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }
}

class Professor extends Pessoa {
  disciplina: string;

  constructor(nome: string, disciplina: string) {
    super(nome);
    this.disciplina = disciplina;
  }
}

const prof = new Professor("Carlos", "POO");
console.log(prof.nome);
console.log(prof.disciplina);
```

### Explicação

- `super(nome)` chama o construtor da classe `Pessoa`;
- depois disso, a subclasse continua sua própria inicialização;
- em classes derivadas, o `super(...)` deve ser chamado antes do uso de `this` no construtor.

---

## 5) Herança e modificadores de acesso

Quando trabalhamos com herança, os modificadores de acesso ficam ainda mais importantes.

### `public`
O membro pode ser acessado em qualquer lugar.

### `private`
O membro só pode ser acessado dentro da própria classe.

### `protected`
O membro pode ser acessado:

- dentro da própria classe;
- dentro das subclasses.

### Exemplo com `protected`

```ts
class Animal {
  protected nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }
}

class Gato extends Animal {
  miar(): void {
    console.log(`${this.nome} está miando.`);
  }
}

const gato = new Gato("Mingau");
gato.miar();
// console.log(gato.nome); // erro
```

### Exemplo com `private`

```ts
class Conta {
  private saldo: number;

  constructor(saldo: number) {
    this.saldo = saldo;
  }
}

class ContaEspecial extends Conta {
  exibir(): void {
    // console.log(this.saldo); // erro
  }
}
```

### O que isso mostra?

- `protected` permite acesso pela subclasse;
- `private` não permite acesso direto pela subclasse.

---

## 6) Sobrescrita de métodos

A **sobrescrita** acontece quando a subclasse redefine um método herdado da superclasse.

Assim, a subclasse pode manter a mesma ideia geral do método, mas adaptar seu comportamento.

### Exemplo

```ts
class Animal {
  emitirSom(): void {
    console.log("O animal fez um som.");
  }
}

class Cachorro extends Animal {
  emitirSom(): void {
    console.log("O cachorro latiu.");
  }
}

class Gato extends Animal {
  emitirSom(): void {
    console.log("O gato miou.");
  }
}

const a1 = new Animal();
const a2 = new Cachorro();
const a3 = new Gato();

a1.emitirSom();
a2.emitirSom();
a3.emitirSom();
```

### Saída esperada

```text
O animal fez um som.
O cachorro latiu.
O gato miou.
```

### Observação

A subclasse pode:

- reutilizar um método herdado sem alteração;
- criar novos métodos;
- sobrescrever métodos para comportamento mais específico.

---

## 7) Exemplo completo: pessoa, aluno e professor

O exemplo abaixo reúne os principais conceitos da aula.

```ts
class Pessoa {
  protected nome: string;
  protected idade: number;

  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }

  apresentar(): void {
    console.log(`Nome: ${this.nome}`);
    console.log(`Idade: ${this.idade}`);
  }
}

class Aluno extends Pessoa {
  private matricula: string;
  private curso: string;

  constructor(nome: string, idade: number, matricula: string, curso: string) {
    super(nome, idade);
    this.matricula = matricula;
    this.curso = curso;
  }

  exibirDadosAluno(): void {
    this.apresentar();
    console.log(`Matrícula: ${this.matricula}`);
    console.log(`Curso: ${this.curso}`);
  }
}

class Professor extends Pessoa {
  private disciplina: string;

  constructor(nome: string, idade: number, disciplina: string) {
    super(nome, idade);
    this.disciplina = disciplina;
  }

  apresentar(): void {
    console.log(`Professor: ${this.nome}`);
    console.log(`Idade: ${this.idade}`);
    console.log(`Disciplina: ${this.disciplina}`);
  }
}

const aluno1 = new Aluno("Igor", 18, "2026001", "Análise e Desenvolvimento de Sistemas");
const professor1 = new Professor("Nelson", 40, "Programação Orientada a Objetos");

console.log("=== Aluno ===");
aluno1.exibirDadosAluno();

console.log("\n=== Professor ===");
professor1.apresentar();
```

### O que esse exemplo mostra?

- `Pessoa` é a superclasse;
- `Aluno` e `Professor` são subclasses;
- `Aluno` e `Professor` herdam atributos de `Pessoa`;
- `super(...)` é usado para inicializar a parte herdada;
- `Professor` sobrescreve o método `apresentar()`;
- `protected` permite que as subclasses acessem `nome` e `idade`.

---


## 8) Resumo para estudo

- **Herança** é o mecanismo que permite criar uma classe com base em outra.
- A classe mais geral é chamada de **superclasse**.
- A classe que herda é chamada de **subclasse**.
- Em TypeScript, usamos `extends` para indicar herança.
- Usamos `super(...)` para chamar o construtor da superclasse.
- O modificador `protected` é muito útil em herança, pois permite acesso pelas subclasses.
- O modificador `private` restringe o acesso à própria classe.
- A **sobrescrita** permite redefinir métodos herdados.
- A herança deve representar uma relação lógica de **“é um(a)”**.
