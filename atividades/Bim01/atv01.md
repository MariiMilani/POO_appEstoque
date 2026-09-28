# Atividade em sala — TypeScript CLI: Entrada de dados + Validação (Aula 03)

## Contexto
Nesta atividade, você irá construir um pequeno programa **executado no terminal (CLI)**, em TypeScript, que cadastra alunos, validando as entradas digitadas pelo usuário.

A proposta é praticar:
- Leitura de dados com **readline** (`io.ts`)
- Conversão de tipos (`string → number`)
- **Validação** e tratamento de erro (`validators.ts`)
- Organização do código em módulos (`exports/imports`)
- Execução com `ts-node`

---

## Objetivo
Ao final, você deve conseguir executar no terminal:

```bash
npx ts-node src/index.ts
```

E o programa deve:
1. Perguntar os dados do aluno
2. Validar as entradas
3. Exibir o objeto cadastrado (ou um erro claro)

---

## Pré-requisitos (projeto TypeScript)
Dentro da pasta do projeto:

```bash
npm init -y
npm i -D typescript ts-node @types/node
npx tsc --init
```

No `tsconfig.json`, garanta:
- `"types": ["node"]`
- `verbatimModuleSyntax` como `false` (ou removido)

---

## Estrutura obrigatória do projeto

```text
aula03-cli/
  src/
    io.ts
    validators.ts
    index.ts
  package.json
  tsconfig.json
```

---

## Parte 1 — Implementar IO (entrada via terminal)

### Arquivo: `src/io.ts`
Implemente as funções:

- `perguntar(texto: string): Promise<string>`
- `fecharIO(): void`

**Regras**
- Use `readline`
- `perguntar()` deve retornar uma Promise com a resposta
- `fecharIO()` deve fechar o `readline` para o terminal voltar ao normal

**Teste obrigatório (demo)**
O arquivo `io.ts` deve ter um **modo demo** (quando rodar diretamente) perguntando **nome** e **idade** e exibindo o resultado.

Rodar teste:
```bash
npx ts-node src/io.ts
```

---

## Parte 2 — Implementar validadores (tratamento de entrada)

### Arquivo: `src/validators.ts`
Implemente as funções:

- `obrigatorio(valor: string, nomeCampo: string): string`
  - retorna `valor.trim()` se não for vazio
  - se for vazio, lança erro: `Campo obrigatório: <nomeCampo>`

- `parseNumeroInteiro(valor: string, nomeCampo: string): number`
  - usa `obrigatorio`
  - converte para `Number`
  - verifica se é inteiro (`Number.isInteger`)
  - se falhar, lança erro com mensagem explicativa

- `entre(n: number, min: number, max: number, nomeCampo: string): number`
  - se `n` estiver fora da faixa, lança erro
  - caso contrário, retorna `n`

**Teste obrigatório (demo)**
O arquivo `validators.ts` também deve ter **modo demo**: pedir nome e idade, validar e exibir resultado.

Rodar teste:
```bash
npx ts-node src/validators.ts
```

---

## Parte 3 — Programa principal (cadastro)

### Arquivo: `src/index.ts`

#### Modelo de dados obrigatório
```ts
type Turma = "1TADS" | "2TADS" | "3TADS";

interface Aluno {
  nome: string;
  idade: number;
  turma: Turma;
}
```

#### Fluxo obrigatório
O programa deve:

1) Mostrar um título no console:
```text
=== Cadastro de Aluno (CLI) ===
```

2) Perguntar:
- Nome
- Idade (0 a 120)
- Turma (`1TADS`, `2TADS` ou `3TADS`)

3) Validar:
- nome obrigatório
- idade: número inteiro e entre 0 e 120
- turma: deve ser uma das 3 opções

4) Se estiver tudo ok, exibir:
```text
Aluno cadastrado com sucesso:
{ nome: "Ana", idade: 20, turma: "2TADS" }
```

5) Se der erro, mostrar:
```text
Erro: <mensagem do erro>
```

6) Sempre fechar o IO no final (use `try/catch/finally`).

---

## Critérios de avaliação (checklist)
- [ ] Projeto roda com `npx ts-node src/index.ts`
- [ ] `io.ts` funciona e possui modo demo
- [ ] `validators.ts` funciona e possui modo demo
- [ ] Validações corretas (obrigatório, inteiro, faixa, turma)
- [ ] Mensagens claras para o usuário
- [ ] Código organizado (imports/exports, funções em arquivos separados)
- [ ] Tratamento de erro com `try/catch` e fechamento do IO com `finally`

---

## Testes que o professor vai fazer
1. Nome vazio → deve dar erro de obrigatório  
2. Idade “abc” → deve dar erro de número  
3. Idade “20.5” → deve dar erro (não inteiro)  
4. Idade “200” → deve dar erro (fora da faixa)  
5. Turma “4TADS” → deve dar erro  
6. Entrada correta → deve cadastrar e imprimir o objeto  

---

## Apresentação no dia da entrega (obrigatório)
No dia da entrega do trabalho, **cada aluno deverá apresentar o código**, explicando:
- Como o projeto está organizado (`io.ts`, `validators.ts`, `index.ts`)
- Como funciona a leitura de dados via CLI (`readline`, `perguntar`, `fecharIO`)
- Como as validações foram implementadas e por quê (regras, mensagens, `throw new Error`)
- Como o programa trata erros (`try/catch/finally`) e garante o fechamento do IO

---

## Entrega
- Demonstrar o programa funcionando no terminal
- Apresentar e explicar o código no dia da entrega (conforme seção acima)
- Enviar a pasta `src/` (ou um repositório Git com commit final)
