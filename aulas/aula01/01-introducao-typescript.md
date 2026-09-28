# Aula 01 — Introdução ao TypeScript (fundamentos + instalação + primeiros conceitos)

Este material apresenta uma visão inicial sobre **o que é o TypeScript**, **por que ele é utilizado**, **como ele funciona**, **como instalá-lo** e os primeiros conceitos importantes da linguagem, como **identificadores**, **variáveis** e **boas práticas**.

---

## Sumário
- [0) O que é TypeScript?](#0-o-que-é-typescript)
- [1) Por que TypeScript?](#1-por-que-typescript)
- [2) Como o TypeScript funciona?](#2-como-o-typescript-funciona)
- [3) Instalação do TypeScript](#3-instalação-do-typescript)
- [4) Executando manualmente o TypeScript](#4-executando-manualmente-o-typescript)
- [5) Entendendo o compilador do TypeScript](#5-entendendo-o-compilador-do-typescript)
- [6) Conhecendo a linguagem](#6-conhecendo-a-linguagem)
- [7) Identificadores](#7-identificadores)
- [8) Variáveis em TypeScript](#8-variáveis-em-typescript)
- [9) Melhores práticas no TypeScript](#9-melhores-práticas-no-typescript)
- [Resumo para estudo](#resumo-para-estudo)

---

## 0) O que é TypeScript?

O **TypeScript** é uma linguagem desenvolvida e mantida pela **Microsoft**. Ele é considerado um **superset do JavaScript**, ou seja, tudo o que é válido em JavaScript também pode ser utilizado em TypeScript, com o acréscimo de recursos extras.

Entre esses recursos adicionais, destacam-se:
- tipagem estática;
- interfaces;
- classes;
- generics;
- melhor organização para projetos maiores.

O TypeScript foi projetado para auxiliar no desenvolvimento de aplicações simples e também sistemas mais complexos, oferecendo mais segurança durante a escrita do código.

Sua primeira versão pública foi a **0.8**, lançada em **1 de outubro de 2012**.

---

## 1) Por que TypeScript?

O uso do TypeScript se tornou popular porque ele ajuda a reduzir erros comuns no desenvolvimento em JavaScript, especialmente em projetos de médio e grande porte.

Entre as principais vantagens, podemos destacar:

- **Tipagem estática:** permite detectar vários erros ainda durante o desenvolvimento.
- **Melhor manutenção:** o código tende a ficar mais organizado e legível.
- **Facilidade de evolução:** projetos longos se beneficiam de contratos de tipos bem definidos.
- **Mais apoio do editor/IDE:** autocompletar, navegação entre arquivos e sugestões ficam melhores.

Além disso, o TypeScript favorece um estilo de desenvolvimento mais próximo de linguagens orientadas a objetos, o que facilita a organização de sistemas maiores.

---

## 2) Como o TypeScript funciona?

Os navegadores e o Node.js não executam diretamente arquivos `.ts`. Por isso, o código TypeScript precisa passar por um processo chamado **transpilação**.

Nesse processo:
1. você escreve o código em TypeScript;
2. o compilador converte esse código para JavaScript;
3. o JavaScript gerado é então executado pelo navegador ou pelo Node.js.

Em resumo:

```text
TypeScript (.ts) → compilador/transpilador → JavaScript (.js)
```

Esse processo permite usar recursos modernos e verificações de tipo sem perder compatibilidade com o ecossistema JavaScript.

---

## 3) Instalação do TypeScript

Para instalar o TypeScript, é necessário ter o **Node.js** e o **npm** instalados na máquina.

### 3.1 Verificando Node.js e npm

Abra o terminal e execute:

```bash
node -v && npm -v
```

Esse comando mostra as versões instaladas do Node.js e do npm.

### 3.2 Instalando o TypeScript globalmente

```bash
npm install -g typescript
```

### 3.3 Verificando a instalação do TypeScript

```bash
tsc -v
```

Se tudo estiver correto, o terminal exibirá a versão instalada do compilador TypeScript.

---

## 4) Executando manualmente o TypeScript

Uma forma simples de começar é criar um arquivo `.ts`, compilá-lo e depois executar o `.js` gerado.

### 4.1 Criar um diretório e o arquivo `primeiro.ts`

Crie um diretório para o projeto e, dentro dele, o arquivo `primeiro.ts`.

### 4.2 Código inicial

```ts
const a: string = 'Hello World';
console.log(a);
```

### 4.3 Compilar o arquivo

```bash
tsc primeiro.ts
```

Esse comando gera o arquivo `primeiro.js`.

### 4.4 Executar o arquivo JavaScript gerado

```bash
node primeiro.js
```

### Resultado esperado

```text
Hello World
```

---

## 5) Entendendo o compilador do TypeScript

O compilador do TypeScript pode ser configurado para adaptar o projeto às necessidades da aplicação.

Com ele, é possível definir, por exemplo:

- onde estão os arquivos `.ts`;
- qual será o diretório de saída dos arquivos compilados;
- qual versão do ECMAScript será gerada;
- o nível de rigidez da verificação de tipos;
- se arquivos JavaScript também poderão ser aceitos no projeto.

### 5.1 Criando o arquivo de configuração

```bash
tsc --init
```

Esse comando cria o arquivo `tsconfig.json`, responsável por centralizar as configurações do compilador.

---

## 6) Conhecendo a linguagem

Antes de avançar para conceitos mais elaborados, é importante entender alguns comportamentos básicos da linguagem.

### 6.1 Espaços em branco e quebras de linha

Assim como no JavaScript, o TypeScript ignora espaços extras e quebras de linha em muitos contextos.

### 6.2 Ponto e vírgula

O ponto e vírgula é, em muitos casos, **opcional**, embora seu uso possa ajudar na padronização e legibilidade do código.

```ts
console.log("quero ;");
console.log("não quero ;")
console.log("aqui"); console.log("é obrigado ;");
```

Mesmo sendo opcional em várias situações, é recomendável manter um padrão no projeto.

---

## 7) Identificadores

Identificadores são os nomes usados para variáveis, funções, classes, interfaces, tipos e outros elementos do código.

### 7.1 Regras para identificadores

- Podem conter letras, números (desde que não no início), `_` e `$`.
- Não podem conter espaços.
- Não podem usar símbolos como `@`, `#` ou `-`.
- Não podem ser palavras reservadas da linguagem.
- São **case-sensitive**, ou seja, diferenciam maiúsculas de minúsculas.

### 7.2 Exemplos válidos

```ts
let idade: number = 25;
const _nome: string = "João";
function calcularTotal$() {}
class Usuario {}
interface IAnimal {}
```

### 7.3 Exemplos inválidos

```ts
let 2variavel: number = 10; // começa com número
function class() {} // palavra reservada
const nome-completo: string = "Ana"; // hífen não permitido
```

### 7.4 Tipos comuns de identificadores

#### Variáveis e constantes

```ts
let contador: number = 0;
const PI: number = 3.14;
```

#### Funções

```ts
function soma(a: number, b: number): number {
  return a + b;
}
```

#### Classes e interfaces

```ts
class Pessoa {}
interface ICarro {}
```

#### Tipos personalizados

```ts
type ID = string | number;
```

### 7.5 Convenções de nomenclatura

Algumas convenções são bastante utilizadas em projetos TypeScript:

- **camelCase**: variáveis e funções;
- **PascalCase**: classes e interfaces;
- **UPPER_CASE**: constantes globais;
- prefixo **I** para interfaces, quando adotado pelo padrão do projeto.

---

## 8) Variáveis em TypeScript

Em TypeScript, podemos declarar variáveis usando `var`, `let` e `const`.

### 8.1 Sintaxe básica

```ts
let nome: Tipo = Valor;
const nome: Tipo = Valor;
var nome: Tipo = Valor;
```

### 8.2 `var`, `let` e `const`

#### `var`

A palavra-chave `var` possui **escopo de função** ou **global**. Ela permite redeclaração e reatribuição.

```ts
function exemploVar() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10
}
```

#### `let`

A palavra-chave `let` possui **escopo de bloco**. Ela pode ser reatribuída, mas não redeclarada no mesmo escopo.

```ts
function exemploLet() {
  if (true) {
    let y = 20;
    console.log(y); // 20
  }
  console.log(y); // Erro
}
```

#### `const`

A palavra-chave `const` também possui **escopo de bloco**, mas não permite reatribuição.

```ts
const PI = 3.14;
// PI = 5; // Erro

const pessoa = { nome: "João" };
pessoa.nome = "Maria"; // OK
// pessoa = { nome: "Ana" }; // Erro
```

Mesmo com `const`, se o valor for um objeto ou array, suas propriedades ou itens ainda podem ser alterados, desde que a referência não seja trocada.

---

## 9) Melhores práticas no TypeScript

Ao começar a programar em TypeScript, algumas práticas ajudam bastante na organização e na segurança do código:

- prefira `const` sempre que o valor não precisar mudar;
- use `let` quando houver necessidade de reatribuição;
- evite `var`, pois é uma forma mais antiga e menos previsível de declaração;
- use nomes claros para variáveis, funções e tipos;
- mantenha um padrão de escrita no projeto;
- aproveite a tipagem para tornar o código mais seguro e legível.

---

## Resumo para estudo

- **TypeScript** é um superset do JavaScript com recursos extras, como tipagem estática.
- Ele ajuda a detectar erros ainda durante o desenvolvimento.
- O código TypeScript precisa ser **transpilado** para JavaScript antes de ser executado.
- A instalação pode ser feita com `npm install -g typescript`.
- O comando `tsc --init` cria o arquivo `tsconfig.json`.
- Identificadores precisam seguir regras específicas de nomenclatura.
- `var`, `let` e `const` possuem diferenças importantes de escopo e uso.
- Em projetos modernos, prefira `const` e `let`, evitando `var`.
