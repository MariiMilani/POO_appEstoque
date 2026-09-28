# Aula 02 — Introdução ao TypeScript (conceitos + prática)

Este material reúne uma introdução **prática** (como criar um projeto TS do zero e rodar o primeiro código) e, em seguida, as explicações **teóricas** sobre **Tipos Básicos**, **Inferência vs Anotação** e **Funções e Tipos** em TypeScript.

---

## Sumário
- [0) Criando um projeto TypeScript do zero](#0-criando-um-projeto-typescript-do-zero)
- [1) Primeiro código](#1-primeiro-código)
- [2) Exemplo: bug silencioso em JavaScript vs erro em TypeScript](#2-exemplo-bug-silencioso-em-javascript-vs-erro-em-typescript)
- [3) Tipos básicos em TypeScript](#3-tipos-básicos-em-typescript)
- [4) Inferência vs Anotação](#4-inferência-vs-anotação)
- [5) Funções e tipos em TypeScript](#5-funções-e-tipos-em-typescript)
- [6) Modelagem de tipos: interface e type](#6-modelagem-de-tipos-interface-e-type)
- [Resumo para estudo](#resumo-para-estudo)

---

## 0) Criando um projeto TypeScript do zero

> Objetivo: ter um projeto simples com **TypeScript + ts-node**, para executar arquivos `.ts` diretamente no terminal (modo dev) e gerar build para rodar com Node (modo produção).

### 0.1 Criar pasta e inicializar o npm

```bash
mkdir aula01-typescript
cd aula01-typescript
npm init -y
```

### 0.2 Instalar TypeScript e dependências de desenvolvimento

```bash
npm i -D typescript ts-node @types/node
```

### 0.3 Gerar o `tsconfig.json`

```bash
npx tsc --init
```

### 0.4 Criar a pasta `src/`

```bash
mkdir src
```

### 0.5 Scripts no `package.json`

No `package.json`, adicione scripts:

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts"
  },
  "compilerOptions": {
    "module": "CommonJS",
    "moduleResolution": "Node",
    "types": [
      "node"
    ],
    "verbatimModuleSyntax": false
  }
}
```

> Observação importante: o script `start` espera o arquivo compilado em `dist/index.js`.  
> Se o seu `tsconfig.json` ainda não estiver com `outDir`/`rootDir`, configure (recomendado):
> - `"rootDir": "./src"`
> - `"outDir": "./dist"`

### 0.6 Scripts no `tsconfig.json`

No `tsconfig.json`, adicione scripts:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "target": "es2020",
    "types": ["node"],

    "strict": true,
    "verbatimModuleSyntax": false,

    "sourceMap": true,
    "skipLibCheck": true
  }
}
```

---

## 1) Primeiro código

Crie o arquivo `src/index.ts`:

```ts
console.log("Olá TypeScript!");

const nome = "Exemplo";
const idade = 18;

console.log(`${nome} tem ${idade} anos.`);
```

### Como executar

- **Modo desenvolvimento (executa TS direto):**
  ```bash
  npm run dev
  ```

- **Build + execução com Node:**
  ```bash
  npm run build
  npm start
  ```

---

## 2) Exemplo: bug silencioso em JavaScript vs erro em TypeScript

Quando você não tipa (JavaScript), alguns erros passam “em silêncio”.  
Em TypeScript, o mesmo problema aparece **na hora** (no editor/compilação).

**Arquivo:** `ex01.js`
```js
function soma(a, b) {
  return a + b;
}
console.log(soma("10", 2)); // "102" (bug silencioso)
```

**Arquivo:** `ex01.ts`
```ts
function soma(a: number, b: number) {
  return a + b;
}
soma("10", 2); // erro de tipo
```

---

## 3) Tipos básicos em TypeScript

Em TypeScript, **tipo** é a “categoria” de dado que uma variável pode armazenar. Ao declarar (ou inferir) um tipo, o TypeScript passa a **validar** o que pode (ou não) ser atribuído àquela variável, ajudando a detectar erros **antes de executar** o código.

### 3.1 Tipos primitivos mais comuns

- **`string`**  
  Representa textos, como nomes, mensagens e descrições.

- **`number`**  
  Representa números inteiros e decimais. (Em TypeScript não existe `int` separado: tudo é `number`.)

- **`boolean`**  
  Representa valores lógicos: `true` ou `false`.

- **`null`** e **`undefined`**  
  Representam ausência de valor.  
  - `undefined`: variável não inicializada / valor não definido.  
  - `null`: “vazio intencional” (você define explicitamente como vazio).

### 3.2 Tipos úteis no dia a dia

- **Arrays tipados**  
  Permitem criar listas com um tipo único, garantindo consistência.
  - Ex.: `number[]`, `string[]`, `Array<boolean>`

- **Tuplas**  
  São “arrays com estrutura fixa”: você define quantidade e tipo por posição.  
  Muito usadas para pares/estruturas posicionais, como coordenadas.

- **`enum`**  
  Um conjunto fechado de valores nomeados. É útil para padronizar estados e evitar “strings soltas” espalhadas no código.

### 3.3 Tipos que exigem atenção

- **`any`**  
  Desativa a verificação de tipos (o TS aceita qualquer coisa).  
  Use apenas quando realmente necessário (e por pouco tempo), pois você perde segurança.

- **`unknown`**  
  É mais seguro que `any`: você pode armazenar qualquer valor, mas **precisa validar** antes de usar.  
  Útil quando dados vêm “de fora” (API, arquivo, input do usuário).

- **`void`**  
  Usado em funções que **não retornam valor**.

- **`never`**  
  Usado em funções que **nunca terminam normalmente** (ex.: sempre lançam erro, ou loop infinito).

### 3.4 Exemplo: tipos básicos, arrays, tuplas e `enum`

**Arquivo:** `tipos.ts`
```ts
let ativo: boolean = true;
let idade: number = 20;
let nome: string = "Ana";

let notas: number[] = [8, 9.5, 7];
let tags: Array<string> = ["poo", "typescript", "ifpr"];

// tupla
let coordenada: [number, number] = [25.40, -54.00];

// enum (opcional, mas bom para mostrar)
enum Perfil {
  ADMIN = "ADMIN",
  USER = "USER"
}
let perfil: Perfil = Perfil.USER;

console.log({ ativo, idade, nome, notas, tags, coordenada, perfil });
```

---

## 4) Inferência vs Anotação

### 4.1 Inferência de tipos
**Inferência** é quando o TypeScript “descobre” automaticamente o tipo com base no valor atribuído.

Vantagens:
- Código mais **limpo** e rápido de escrever
- Menos repetição
- Mantém segurança: o TS impede uso incompatível depois

Quando usar inferência?
- Quando o tipo é óbvio pelo valor inicial (por exemplo: texto → `string`, número → `number`).

### 4.2 Anotação de tipos
**Anotação** é quando você declara explicitamente o tipo usando `: tipo`.

Vantagens:
- Mais **clareza** para quem lê o código
- Garante um “contrato” claro para variáveis e funções

Quando usar anotação?
1. **Quando você declara e só vai atribuir depois**  
2. **Quando você quer restringir o tipo** e evitar inferências “amplas demais”  
3. **Em parâmetros de função** (boa prática e padrão de projeto)  
4. **Quando o retorno da função precisa ficar explícito** (contrato/legibilidade)

### 4.3 Regra prática (para projetos)
- Use **inferência** quando o tipo já estiver evidente.
- Use **anotação** quando:
  - não houver valor inicial,
  - o tipo precisar ser mais restrito,
  - você estiver definindo contratos de função,
  - você quiser aumentar a legibilidade do código.

### 4.4 Exemplo: inferência e anotação de tipos

**Arquivo:** `inferencia.ts`
```ts
let curso = "TADS"; // inferido como string
// curso = 10; // erro

let ano: number; // anotação explícita
ano = 2025;

function dobro(x: number) {
  return x * 2; // retorno inferido como number
}

console.log(dobro(10));
```

---

## 5) Funções e tipos em TypeScript

Funções são um dos pontos mais importantes para tipagem, porque nelas definimos claramente:
- **o que entra** (parâmetros)
- **o que sai** (retorno)
- **se não sai nada** (`void`)
- **se nunca finaliza normalmente** (`never`)

Tipar funções ajuda a criar um **contrato**, evitando chamadas erradas, melhorando autocompletar e tornando a refatoração mais segura.

### 5.1 Tipando parâmetros
Ao tipar os parâmetros, você garante que a função será chamada com dados do tipo correto.

Benefícios:
- Reduz bugs por entrada inválida
- Melhora autocompletar e leitura do código
- Facilita manutenção do sistema

### 5.2 Tipando retorno
Tipar o retorno define claramente **o que a função devolve**.

Quando é útil deixar explícito?
- Quando a função é parte de uma API interna do projeto
- Quando muitas pessoas trabalham no mesmo código
- Quando você quer garantir consistência (contratos e padrões)

### 5.3 `void`: funções sem retorno
Use `void` quando a função:
- executa uma ação (ex.: imprimir, logar, salvar, chamar API)
- **não devolve** um valor para uso posterior

### 5.4 `never`: funções que não finalizam normalmente
Use `never` quando a função:
- sempre lança erro (`throw`)
- ou entra em loop infinito

Por que isso importa?
- Ajuda o TypeScript a entender fluxos do programa
- Melhora validações e tratamento de erros em projetos maiores

### 5.5 Exemplo: funções com retorno, `void` e `never`

**Arquivo:** `funcoes.ts`
```ts
function somar(a: number, b: number): number {
  return a + b;
}

const subtrair = (a: number, b: number): number => a - b;

function logar(mensagem: string): void {
  console.log(mensagem);
}

function falha(motivo: string): never {
  throw new Error(motivo);
}

console.log(somar(2, 3));
logar("OK");
// falha("Erro proposital");
```

---

## 6) Modelagem de tipos: interface e type

Em projetos reais, além de tipos básicos, você vai modelar “formatos” de dados (objetos) e criar **conjuntos de valores possíveis** (ex.: turma/estado/status).  
Normalmente:
- **`interface`**: ótimo para descrever o “contrato” de objetos e permitir extensão.
- **`type`**: ótimo para composições (uniões/interseções), aliases e tipos mais complexos.

### 6.1 Exemplo: contrato de objeto (`interface`) e união de valores (`type`)

**Arquivo:** `modelagem.ts`
```ts
// interface: ótima para "contratos" de objetos
interface Aluno {
  id: number;
  nome: string;
  email?: string; // opcional
  ativo: boolean;
}

// type: ótimo para composições e tipos mais complexos
type Turma = "1TADS" | "2TADS" | "3TADS";

const a1: Aluno = {
  id: 1,
  nome: "Igor",
  ativo: true
};

function matricular(aluno: Aluno, turma: Turma) {
  return `${aluno.nome} matriculado(a) na turma ${turma}`;
}

console.log(matricular(a1, "1TADS"));
```

---

## Resumo para estudo
- **Tipos básicos**: garantem coerência e previnem erros simples.
- **Inferência**: o TS deduz o tipo quando é óbvio.
- **Anotação**: você define o tipo explicitamente quando precisa de clareza e contrato.
- **Funções tipadas**: criam regras de uso, evitam chamadas erradas e deixam o projeto mais seguro.
