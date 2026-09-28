# Aula 04 — Orientação a Objetos com TypeScript (classes, objetos, atributos, métodos e modificadores de acesso)

Este material apresenta os principais conceitos de **Orientação a Objetos** aplicados ao **TypeScript**. A proposta da aula é explicar, de forma gradual, o que são **classes** e **objetos**, como declarar **atributos** e **métodos**, como criar instâncias com `new` e como utilizar os modificadores de acesso `public`, `private` e `protected`.

---

## Sumário
- [0) O que é Orientação a Objetos?](#0-o-que-é-orientação-a-objetos)
- [1) Classes e objetos](#1-classes-e-objetos)
- [2) Declarando classes em TypeScript](#2-declarando-classes-em-typescript)
- [3) Construtor e instanciação com `new`](#3-construtor-e-instanciação-com-new)
- [4) Atributos e métodos](#4-atributos-e-métodos)
- [5) Modificadores de acesso em TypeScript](#5-modificadores-de-acesso-em-typescript)
- [6) Exemplo completo: conta corrente](#6-exemplo-completo-conta-corrente)
- [7) Exemplo para executar em sala](#7-exemplo-para-executar-em-sala)
- [8) Exercícios sugeridos](#8-exercícios-sugeridos)
- [Resumo para estudo](#resumo-para-estudo)

---

## 0) O que é Orientação a Objetos?

A **Orientação a Objetos (OO)** é uma forma de organizar programas com base em **objetos**.

Um objeto reúne:
- **dados**, que representam suas características;
- **ações**, que representam seus comportamentos.

Em outras palavras, um objeto agrupa informações e operações relacionadas a uma mesma responsabilidade.

Esse modelo ajuda a representar melhor elementos do mundo real ou entidades do sistema, tornando o código mais organizado e mais fácil de manter.

### Por que usar Orientação a Objetos?

Entre as principais vantagens, podemos destacar:

- **organização do código**, pois cada classe possui responsabilidades mais bem definidas;
- **reutilização**, já que uma classe pode ser usada para criar vários objetos;
- **manutenção facilitada**, porque alterações tendem a ficar mais localizadas;
- **clareza**, pois o sistema pode ser modelado com entidades mais próximas da realidade.

---

## 1) Classes e objetos

Em programação orientada a objetos, uma **classe** funciona como um **modelo** para a criação de objetos.

Ela define:
- quais serão os **atributos** da entidade;
- quais serão os **métodos** ou comportamentos disponíveis.

Já o **objeto** é uma instância criada a partir dessa classe.

### Exemplo conceitual

Pense em uma classe chamada `ContaCorrente`.

Essa classe pode definir atributos como:
- `titular`;
- `saldo`.

E também métodos como:
- `depositar()`;
- `sacar()`;
- `exibirSaldo()`.

A partir dessa classe, podem ser criados vários objetos diferentes, cada um com seus próprios valores.

Exemplo:
- uma conta de Marina;
- uma conta de Paulo;
- uma conta de Carlos.

Todos esses objetos pertencem à mesma classe, mas cada um possui seu próprio estado.

---

## 2) Declarando classes em TypeScript

Em TypeScript, usamos a palavra-chave `class` para declarar uma classe.

### Sintaxe básica

```ts
class NomeDaClasse {
  // corpo da classe
}
```

### Exemplo inicial

```ts
class Pessoa {
  nome: string;
  idade: number;
}
```

Nesse exemplo, a classe `Pessoa` possui dois atributos:

- `nome`, do tipo `string`;
- `idade`, do tipo `number`.

### Convenção de nomenclatura

Em TypeScript, é recomendável usar **PascalCase** para nomes de classes, ou seja, cada palavra começa com letra maiúscula.

Exemplos:

```ts
class ContaCorrente {}
class AlunoSistema {}
class ProdutoLoja {}
```

Exemplos não recomendados:

```ts
class contaCorrente {}
class aluno_sistema {}
class produto1 {}
```

---

## 3) Construtor e instanciação com `new`

Depois de declarar uma classe, precisamos criar objetos a partir dela. Esse processo é chamado de **instanciação**.

Em TypeScript, normalmente usamos o operador `new`.

Além disso, muitas classes possuem um **construtor**, que é o método especial responsável por inicializar os atributos do objeto no momento da criação.

### Exemplo

```ts
class Pessoa {
  nome: string;
  idade: number;

  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }
}

const p1 = new Pessoa("Ana", 20);
const p2 = new Pessoa("Carlos", 35);

console.log(p1.nome);
console.log(p2.idade);
```

### Explicação

- `class Pessoa` declara o modelo do objeto;
- `constructor(...)` recebe os valores iniciais;
- `this.nome` e `this.idade` referem-se aos atributos do próprio objeto;
- `new Pessoa("Ana", 20)` cria uma nova instância da classe.

---

## 4) Atributos e métodos

Os **atributos** armazenam o estado do objeto.

Os **métodos** definem os comportamentos que o objeto pode executar.

### Exemplo: classe `Produto`

```ts
class Produto {
  nome: string;
  preco: number;
  estoque: number;

  constructor(nome: string, preco: number, estoque: number) {
    this.nome = nome;
    this.preco = preco;
    this.estoque = estoque;
  }

  adicionarEstoque(qtd: number): void {
    this.estoque += qtd;
  }

  removerEstoque(qtd: number): void {
    if (qtd <= this.estoque) {
      this.estoque -= qtd;
    } else {
      console.log("Quantidade indisponível em estoque.");
    }
  }

  exibirProduto(): void {
    console.log(`Produto: ${this.nome}`);
    console.log(`Preço: R$ ${this.preco.toFixed(2)}`);
    console.log(`Estoque: ${this.estoque}`);
  }
}

const produto1 = new Produto("Mouse", 89.9, 10);
produto1.adicionarEstoque(5);
produto1.removerEstoque(3);
produto1.exibirProduto();
```

### O que observar nesse exemplo?

A classe `Produto` possui:

- **atributos**: `nome`, `preco` e `estoque`;
- **métodos**: `adicionarEstoque`, `removerEstoque` e `exibirProduto`;
- **construtor**: usado para inicializar o objeto no momento da criação.

---

## 5) Modificadores de acesso em TypeScript

Os modificadores de acesso permitem controlar quais membros da classe podem ser acessados fora dela.

Esse controle está relacionado ao conceito de **encapsulamento**, que ajuda a proteger os dados internos do objeto.

Os modificadores mais usados em TypeScript são:

- `public`
- `private`
- `protected`

> Observação: em TypeScript, quando nenhum modificador é informado, o membro é `public` por padrão.

### 5.1 `public`

O membro pode ser acessado livremente fora da classe.

```ts
class Aluno {
  public nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }
}

const aluno = new Aluno("João");
console.log(aluno.nome);
```

### 5.2 `private`

O membro só pode ser acessado dentro da própria classe.

```ts
class Cofre {
  private senha: string;

  constructor(senha: string) {
    this.senha = senha;
  }

  verificarSenha(tentativa: string): boolean {
    return tentativa === this.senha;
  }
}

const cofre = new Cofre("1234");
console.log(cofre.verificarSenha("1234"));
// console.log(cofre.senha); // erro
```

### 5.3 `protected`

O membro pode ser acessado na própria classe e também nas subclasses.

```ts
class Animal {
  protected nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }
}

class Cachorro extends Animal {
  latir(): void {
    console.log(`${this.nome} está latindo.`);
  }
}

const dog = new Cachorro("Rex");
dog.latir();
// console.log(dog.nome); // erro
```

### Resumo dos modificadores

| Modificador | Acesso na própria classe | Acesso fora da classe | Acesso em subclasses |
|---|---:|---:|---:|
| `public` | Sim | Sim | Sim |
| `private` | Sim | Não | Não |
| `protected` | Sim | Não | Sim |

---

## 6) Exemplo completo: conta corrente

O exemplo abaixo reúne os conceitos principais vistos até aqui.

```ts
class ContaCorrente {
  private saldo: number;
  public titular: string;

  constructor(titular: string, saldoInicial: number) {
    this.titular = titular;
    this.saldo = saldoInicial;
  }

  depositar(valor: number): void {
    if (valor > 0) {
      this.saldo += valor;
    }
  }

  sacar(valor: number): boolean {
    if (valor > 0 && valor <= this.saldo) {
      this.saldo -= valor;
      return true;
    }
    return false;
  }

  consultarSaldo(): number {
    return this.saldo;
  }

  exibirDados(): void {
    console.log(`Titular: ${this.titular}`);
    console.log(`Saldo: R$ ${this.saldo.toFixed(2)}`);
  }
}

const conta = new ContaCorrente("Marina", 1000);
conta.depositar(250);
console.log(conta.sacar(100));
conta.exibirDados();
console.log(conta.consultarSaldo());
```

### O que esse exemplo mostra?

- uso de **classe**;
- criação de **atributos**;
- uso de **construtor**;
- criação de **métodos**;
- uso de `private` para proteger o saldo;
- instanciação com `new`.

---

## 7) Exemplo para executar em sala

```ts
class Carro {
  marca: string;
  modelo: string;
  velocidade: number;

  constructor(marca: string, modelo: string) {
    this.marca = marca;
    this.modelo = modelo;
    this.velocidade = 0;
  }

  acelerar(valor: number): void {
    this.velocidade += valor;
  }

  frear(valor: number): void {
    this.velocidade -= valor;
    if (this.velocidade < 0) {
      this.velocidade = 0;
    }
  }

  exibirDados(): void {
    console.log(`Marca: ${this.marca}`);
    console.log(`Modelo: ${this.modelo}`);
    console.log(`Velocidade: ${this.velocidade} km/h`);
  }
}

const carro1 = new Carro("Toyota", "Corolla");
carro1.acelerar(50);
carro1.frear(20);
carro1.exibirDados();
```

### Perguntas para discussão

1. Qual é a classe do exemplo?
2. Quais são os atributos do objeto?
3. Quais são os métodos?
4. O que faz o construtor?
5. O que acontece quando usamos `new Carro(...)`?

---

## 8) Exercícios sugeridos

### Exercício 1
Crie uma classe `Aluno` com os atributos:

- `nome`
- `matricula`
- `notaFinal`

Implemente um método `situacao()` que informe se o aluno está aprovado ou reprovado.

### Exercício 2
Crie uma classe `Produto` com os atributos:

- `nome`
- `preco`
- `quantidade`

Implemente os métodos:

- `adicionarEstoque(qtd: number)`
- `removerEstoque(qtd: number)`
- `exibirProduto()`

### Exercício 3
Crie uma classe `Retangulo` com os atributos:

- `base`
- `altura`

Implemente os métodos:

- `calcularArea()`
- `calcularPerimetro()`

---

## Resumo para estudo

- **Orientação a Objetos** organiza programas com base em classes e objetos.
- **Classe** é o modelo; **objeto** é a instância criada a partir desse modelo.
- Em TypeScript, usamos `class` para declarar classes e `new` para criar objetos.
- **Atributos** armazenam dados do objeto.
- **Métodos** representam comportamentos do objeto.
- O **construtor** inicializa os valores no momento da criação.
- Os modificadores `public`, `private` e `protected` ajudam no controle de acesso e no encapsulamento.
- Esses conceitos são fundamentais para o desenvolvimento de sistemas mais organizados, reutilizáveis e fáceis de manter.
