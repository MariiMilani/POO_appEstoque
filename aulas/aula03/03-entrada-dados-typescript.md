# Aula 03 — Entrada de dados em TypeScript (CLI) + validação (com exemplo completo)

Este material segue a mesma proposta da aula anterior: primeiro apresenta os **conceitos principais** sobre **entrada de dados** em programas e, em seguida, mostra uma abordagem **prática** com **TypeScript no terminal (CLI)** usando `readline`, além de exemplos de **validação de entrada** para tornar o código mais seguro e confiável.

---

## Sumário
- [1) O que significa “entrada de dados”?](#1-o-que-significa-entrada-de-dados)
- [2) Entrada via terminal (stdin) com readline](#2-entrada-via-terminal-stdin-com-readline)
- [3) Código comentado linha a linha: `src/io.ts`](#3-código-comentado-linha-a-linha-srciots)
- [4) Validando a entrada (string → number, obrigatório, faixa etc.)](#4-validando-a-entrada-string--number-obrigatório-faixa-etc)
- [5) Código comentado linha a linha: `src/validators.ts`](#5-código-comentado-linha-a-linha-srcvalidatorsts)
- [6) Como executar os exemplos](#6-como-executar-os-exemplos)
- [Resumo para estudo](#resumo-para-estudo)

---

## 1) O que significa “entrada de dados”?

Em programas, **entrada de dados** é qualquer informação que vem de fora do código-fonte e passa a ser usada pelo programa durante a execução.

Exemplos comuns:

- **Teclado/terminal**: o usuário digita algo.
- **Argumentos de execução**: por exemplo, `node app.js --nome=Ana`.
- **Variáveis de ambiente**: por exemplo, `process.env.API_URL`.
- **Arquivos**: leitura de `.txt`, `.csv`, `.json` etc.
- **Requisições HTTP**: dados enviados para uma API.

Nesta aula, o foco será a forma mais comum para começar a estudar entrada de dados: a **CLI (Command Line Interface)**, ou seja, a entrada pelo terminal.

---

## 2) Entrada via terminal (stdin) com readline

No ambiente Node.js, uma forma clássica de ler dados digitados no terminal é utilizar o módulo **`readline`**.

Ele permite:

- mostrar uma pergunta para o usuário;
- esperar a resposta digitada;
- capturar essa resposta como texto;
- continuar o fluxo do programa com esse valor.

No exemplo a seguir, o arquivo `src/io.ts` cria uma pequena estrutura reutilizável para:

- abrir a interface de leitura apenas quando necessário;
- fazer perguntas no terminal;
- fechar corretamente a interface ao final.

---

## 3) Código comentado linha a linha: `src/io.ts`

### Código original

**Arquivo:** `src/io.ts`

```ts
import * as readline from "readline";

let rl: readline.Interface | null = null;

function getRL(): readline.Interface {
  if (!rl) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
  return rl;
}

export function perguntar(texto: string): Promise<string> {
  return new Promise((resolve) => {
    getRL().question(texto, (resposta: string) => resolve(resposta));
  });
}

export function fecharIO(): void {
  rl?.close();
  rl = null;
}


async function main() {
  try {
    console.log("=== Demo: Entrada de dados (io.ts) ===");
    const nome = (await perguntar("Digite seu nome: ")).trim();
    const idadeStr = (await perguntar("Digite sua idade: ")).trim();

    const idade = Number(idadeStr);
    if (Number.isNaN(idade)) {
      console.log("\nIdade inválida:", idadeStr);
    } else {
      console.log("\nResultado:");
      console.log({ nome: nome || "(vazio)", idade });
    }
  } finally {
    fecharIO();
  }
}

// CommonJS: executa somente se este arquivo for o principal
if (require.main === module) {
  main().catch((err) => {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Erro:", msg);
    process.exitCode = 1;
  });
}
```

### Explicação linha a linha

```ts
import * as readline from "readline";
```
Importa todo o módulo `readline` do Node.js e o disponibiliza no objeto `readline`.

```ts
let rl: readline.Interface | null = null;
```
Declara a variável `rl`, que armazenará a interface de leitura do terminal. Inicialmente ela recebe `null`, indicando que ainda não foi criada.

```ts
function getRL(): readline.Interface {
```
Declara a função `getRL`, responsável por devolver a interface de leitura já existente ou criar uma nova quando necessário.

```ts
  if (!rl) {
```
Verifica se `rl` ainda não foi criada. Como `null` é considerado falsy, essa condição será verdadeira na primeira chamada.

```ts
    rl = readline.createInterface({
```
Cria a interface de leitura do terminal e a guarda na variável `rl`.

```ts
      input: process.stdin,
```
Define que a entrada virá do teclado/terminal padrão do Node.js.

```ts
      output: process.stdout,
```
Define que a saída será exibida no terminal padrão.

```ts
    });
```
Finaliza a criação da interface.

```ts
  }
```
Fecha o bloco do `if`.

```ts
  return rl;
```
Retorna a interface `rl`. Nesse ponto, ela certamente já existe.

```ts
}
```
Fecha a função `getRL`.

```ts
export function perguntar(texto: string): Promise<string> {
```
Declara e exporta a função `perguntar`, que recebe um texto e retorna uma `Promise<string>`, ou seja, uma promessa de que no futuro entregará uma string digitada pelo usuário.

```ts
  return new Promise((resolve) => {
```
Cria uma nova `Promise`. O parâmetro `resolve` será usado para devolver a resposta digitada.

```ts
    getRL().question(texto, (resposta: string) => resolve(resposta));
```
Chama o método `question` da interface de leitura. Ele mostra o texto no terminal, espera o usuário digitar e, quando a resposta chega, executa a função callback, resolvendo a `Promise` com a string informada.

```ts
  });
```
Fecha a criação da `Promise`.

```ts
}
```
Fecha a função `perguntar`.

```ts
export function fecharIO(): void {
```
Declara e exporta a função `fecharIO`, usada para encerrar a interface de leitura ao final do programa.

```ts
  rl?.close();
```
Usa encadeamento opcional (`?.`) para chamar `close()` apenas se `rl` existir. Isso evita erro caso a interface ainda não tenha sido criada.

```ts
  rl = null;
```
Depois de fechar a interface, redefine `rl` para `null`, indicando que não há mais interface ativa.

```ts
}
```
Fecha a função `fecharIO`.

```ts
async function main() {
```
Declara a função assíncrona `main`, que servirá como ponto de entrada do exemplo.

```ts
  try {
```
Inicia um bloco `try`, permitindo executar o código principal e garantir limpeza no `finally`.

```ts
    console.log("=== Demo: Entrada de dados (io.ts) ===");
```
Exibe um título no terminal para identificar o exemplo.

```ts
    const nome = (await perguntar("Digite seu nome: ")).trim();
```
Faz a pergunta sobre o nome, espera a resposta com `await` e remove espaços extras do começo e do fim usando `trim()`.

```ts
    const idadeStr = (await perguntar("Digite sua idade: ")).trim();
```
Faz a pergunta sobre a idade, espera a resposta e também remove espaços extras. Aqui o valor ainda é uma string.

```ts
    const idade = Number(idadeStr);
```
Converte a string digitada para número usando `Number(...)`.

```ts
    if (Number.isNaN(idade)) {
```
Verifica se a conversão falhou. Isso acontece quando o usuário digita algo que não pode ser interpretado como número.

```ts
      console.log("\nIdade inválida:", idadeStr);
```
Se o valor for inválido, exibe uma mensagem informando a entrada recebida.

```ts
    } else {
```
Caso a idade seja válida, entra no bloco alternativo.

```ts
      console.log("\nResultado:");
```
Mostra um título para o resultado final.

```ts
      console.log({ nome: nome || "(vazio)", idade });
```
Exibe um objeto com `nome` e `idade`. Se o nome estiver vazio, usa `"(vazio)"` como valor padrão.

```ts
    }
```
Fecha o bloco do `if/else`.

```ts
  } finally {
```
Inicia o bloco `finally`, que será executado independentemente de erro ou sucesso.

```ts
    fecharIO();
```
Fecha a interface de leitura, liberando o terminal corretamente.

```ts
  }
```
Fecha o bloco `try/finally`.

```ts
}
```
Fecha a função `main`.

```ts
// CommonJS: executa somente se este arquivo for o principal
```
Comentário explicando que o trecho seguinte só executará `main()` quando este arquivo for o arquivo principal da execução.

```ts
if (require.main === module) {
```
Verifica se o arquivo atual é o módulo principal executado pelo Node.js.

```ts
  main().catch((err) => {
```
Executa `main()` e captura qualquer erro assíncrono que não tenha sido tratado internamente.

```ts
    const msg = err instanceof Error ? err.message : String(err);
```
Converte o erro para uma mensagem legível. Se for um objeto `Error`, usa `err.message`; caso contrário, converte para string.

```ts
    console.error("Erro:", msg);
```
Exibe a mensagem de erro no terminal usando a saída de erro.

```ts
    process.exitCode = 1;
```
Define o código de saída do processo como `1`, sinalizando que a execução terminou com erro.

```ts
  });
```
Fecha o bloco do `catch`.

```ts
}
```
Fecha a verificação final do módulo principal.

---

## 4) Validando a entrada (string → number, obrigatório, faixa etc.)

Ler dados é apenas a primeira parte. Em programas reais, também é necessário **validar** as informações recebidas.

Validar significa conferir se o valor informado atende às regras esperadas, por exemplo:

- se um campo obrigatório foi preenchido;
- se um número realmente é numérico;
- se um valor inteiro foi informado corretamente;
- se o valor está dentro de um intervalo permitido.

No arquivo `src/validators.ts`, essas regras são organizadas em funções reutilizáveis.

Isso é importante porque:

- deixa o código mais limpo;
- evita repetição;
- melhora a manutenção;
- centraliza as regras de validação.

---

## 5) Código comentado linha a linha: `src/validators.ts`

### Código original

**Arquivo:** `src/validators.ts`

```ts
import * as readline from "readline";

export function obrigatorio(valor: string, nomeCampo: string): string {
  const v = valor.trim();
  if (v.length === 0) {
    throw new Error(`Campo obrigatório: ${nomeCampo}`);
  }
  return v;
}

export function parseNumeroInteiro(valor: string, nomeCampo: string): number {
  const v = obrigatorio(valor, nomeCampo);
  const n = Number(v);

  if (!Number.isInteger(n)) {
    throw new Error(`"${nomeCampo}" deve ser um número inteiro. Você informou: ${valor}`);
  }

  return n;
}

export function entre(n: number, min: number, max: number, nomeCampo: string): number {
  if (n < min || n > max) {
    throw new Error(`"${nomeCampo}" deve estar entre ${min} e ${max}. Valor: ${n}`);
  }
  return n;
}


async function main() {
  // IO local só para o demo (não afeta quem importa este módulo)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const perguntar = (texto: string): Promise<string> =>
    new Promise((resolve) => rl.question(texto, (resposta: string) => resolve(resposta)));

  try {
    console.log("=== Demo: validators.ts (validação de entrada) ===");

    const nome = obrigatorio(await perguntar("Digite seu nome: "), "nome");

    const idadeStr = await perguntar("Digite sua idade (0–120): ");
    const idade = entre(parseNumeroInteiro(idadeStr, "idade"), 0, 120, "idade");

    console.log("\n✅ Dados válidos!");
    console.log({ nome, idade });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("\n❌ Erro de validação:", msg);
  } finally {
    rl.close();
  }
}


if (require.main === module) {
  main().catch((err) => {
    console.error("Erro inesperado:", err);
    process.exitCode = 1;
  });
}
```

### Explicação linha a linha

```ts
import * as readline from "readline";
```
Importa o módulo `readline`, que será usado no exemplo executável ao final do arquivo.

```ts
export function obrigatorio(valor: string, nomeCampo: string): string {
```
Declara e exporta a função `obrigatorio`, que recebe o valor informado e o nome do campo, retornando uma string válida.

```ts
  const v = valor.trim();
```
Remove espaços em branco desnecessários no começo e no fim da string.

```ts
  if (v.length === 0) {
```
Verifica se, depois de remover espaços, a string ficou vazia.

```ts
    throw new Error(`Campo obrigatório: ${nomeCampo}`);
```
Se estiver vazia, lança um erro informando que aquele campo é obrigatório.

```ts
  }
```
Fecha o bloco do `if`.

```ts
  return v;
```
Retorna o valor tratado, já sem espaços extras.

```ts
}
```
Fecha a função `obrigatorio`.

```ts
export function parseNumeroInteiro(valor: string, nomeCampo: string): number {
```
Declara e exporta a função `parseNumeroInteiro`, que converte uma string para número inteiro.

```ts
  const v = obrigatorio(valor, nomeCampo);
```
Primeiro, reaproveita a função `obrigatorio` para garantir que o campo não está vazio.

```ts
  const n = Number(v);
```
Converte a string para número.

```ts
  if (!Number.isInteger(n)) {
```
Verifica se o valor convertido é realmente um número inteiro.

```ts
    throw new Error(`"${nomeCampo}" deve ser um número inteiro. Você informou: ${valor}`);
```
Se não for inteiro, lança um erro com uma mensagem explicativa.

```ts
  }
```
Fecha o bloco do `if`.

```ts
  return n;
```
Retorna o número inteiro validado.

```ts
}
```
Fecha a função `parseNumeroInteiro`.

```ts
export function entre(n: number, min: number, max: number, nomeCampo: string): number {
```
Declara e exporta a função `entre`, usada para verificar se um número está dentro de uma faixa permitida.

```ts
  if (n < min || n > max) {
```
Verifica se `n` é menor que o mínimo ou maior que o máximo.

```ts
    throw new Error(`"${nomeCampo}" deve estar entre ${min} e ${max}. Valor: ${n}`);
```
Se estiver fora da faixa, lança um erro com uma mensagem detalhada.

```ts
  }
```
Fecha o bloco do `if`.

```ts
  return n;
```
Retorna o número quando ele está dentro da faixa válida.

```ts
}
```
Fecha a função `entre`.

```ts
async function main() {
```
Declara a função assíncrona `main`, que servirá como demonstração prática de uso das validações.

```ts
  // IO local só para o demo (não afeta quem importa este módulo)
```
Comentário explicando que a interface de entrada criada aqui será usada apenas para o exemplo local.

```ts
  const rl = readline.createInterface({
```
Cria uma interface de leitura diretamente dentro do exemplo.

```ts
    input: process.stdin,
```
Define o terminal como origem dos dados digitados.

```ts
    output: process.stdout,
```
Define o terminal como destino das mensagens exibidas.

```ts
  });
```
Finaliza a criação da interface de leitura.

```ts
  const perguntar = (texto: string): Promise<string> =>
```
Declara uma função local chamada `perguntar`, que recebe um texto e retorna uma promessa de resposta.

```ts
    new Promise((resolve) => rl.question(texto, (resposta: string) => resolve(resposta)));
```
Implementa a função usando `rl.question(...)`: mostra o texto, espera a resposta do usuário e resolve a `Promise` com a string digitada.

```ts
  try {
```
Inicia um bloco `try` para tratar os possíveis erros de validação.

```ts
    console.log("=== Demo: validators.ts (validação de entrada) ===");
```
Exibe um cabeçalho identificando o exemplo.

```ts
    const nome = obrigatorio(await perguntar("Digite seu nome: "), "nome");
```
Pergunta o nome do usuário e já valida se o campo foi preenchido.

```ts
    const idadeStr = await perguntar("Digite sua idade (0–120): ");
```
Pergunta a idade e guarda a resposta como string.

```ts
    const idade = entre(parseNumeroInteiro(idadeStr, "idade"), 0, 120, "idade");
```
Executa duas validações encadeadas: primeiro converte e valida se é inteiro; depois verifica se o número está entre 0 e 120.

```ts
    console.log("\n✅ Dados válidos!");
```
Se todas as validações passaram, exibe a mensagem de sucesso.

```ts
    console.log({ nome, idade });
```
Mostra no terminal os dados válidos coletados.

```ts
  } catch (err) {
```
Captura os erros lançados pelas funções de validação.

```ts
    const msg = err instanceof Error ? err.message : String(err);
```
Transforma o erro em uma mensagem legível.

```ts
    console.error("\n❌ Erro de validação:", msg);
```
Exibe a mensagem de erro de validação no terminal.

```ts
  } finally {
```
Inicia o bloco `finally`, que sempre será executado.

```ts
    rl.close();
```
Fecha a interface de leitura para encerrar corretamente a entrada de dados.

```ts
  }
```
Fecha o bloco `try/catch/finally`.

```ts
}
```
Fecha a função `main`.

```ts
if (require.main === module) {
```
Verifica se este arquivo está sendo executado diretamente.

```ts
  main().catch((err) => {
```
Executa `main()` e trata erros assíncronos inesperados.

```ts
    console.error("Erro inesperado:", err);
```
Mostra o erro inesperado no terminal.

```ts
    process.exitCode = 1;
```
Define o código de saída como erro.

```ts
  });
```
Fecha o bloco do `catch`.

```ts
}
```
Fecha a verificação do módulo principal.

---

## 6) Como executar os exemplos

Considerando um projeto TypeScript configurado com `typescript`, `ts-node` e `@types/node`, você pode executar os arquivos diretamente no terminal.

### Executar `io.ts`

```bash
npx ts-node src/io.ts
```

### Executar `validators.ts`

```bash
npx ts-node src/validators.ts
```

### Exemplo de fluxo esperado

```text
=== Demo: Entrada de dados (io.ts) ===
Digite seu nome: Ana
Digite sua idade: 20

Resultado:
{ nome: 'Ana', idade: 20 }
```

### Exemplo com erro de validação

```text
=== Demo: validators.ts (validação de entrada) ===
Digite seu nome: Ana
Digite sua idade (0–120): abc

❌ Erro de validação: "idade" deve ser um número inteiro. Você informou: abc
```

---

## Resumo para estudo

- **Entrada de dados** é toda informação que vem de fora do programa.
- No terminal, o módulo **`readline`** permite perguntar e receber respostas do usuário.
- A função **`perguntar`** encapsula o uso de `question(...)` com `Promise`, facilitando o uso com `async/await`.
- A função **`fecharIO`** encerra a interface de leitura para evitar que o terminal fique preso.
- **Validação** é essencial para garantir que os dados recebidos estejam corretos.
- Funções como **`obrigatorio`**, **`parseNumeroInteiro`** e **`entre`** ajudam a reaproveitar regras de negócio e manter o código organizado.
- Separar **entrada** e **validação** melhora a clareza, a manutenção e a reutilização do código.
