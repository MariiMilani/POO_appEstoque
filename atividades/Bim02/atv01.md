# Exercício — Que a Herança esteja com você

Atividade baseada no conteúdo da **Aula 06 — Herança em Orientação a Objetos com TypeScript**, especialmente nos conceitos de **superclasse**, **subclasse**, `extends`, `super`, modificadores de acesso e sobrescrita de métodos.

---

# Atividade: Sistema de Personagens Star Wars em TypeScript

## 1. Objetivo

Criar um pequeno sistema em **TypeScript** utilizando **herança** para representar personagens do universo Star Wars.

O aluno deverá aplicar os seguintes conceitos:

- criação de uma **superclasse**;
- criação de **subclasses** com `extends`;
- uso de `super(...)` no construtor;
- uso de atributos `protected` e `private`;
- sobrescrita de métodos;
- criação de objetos e chamada de métodos.

---

## 2. Contexto da atividade

No universo Star Wars existem diferentes tipos de personagens, como Jedi, Sith e Droides.

Todos possuem algumas características em comum, como:

- nome;
- planeta de origem;
- nível de energia.

Porém, cada tipo de personagem também possui características próprias.

Por exemplo:

- um **Jedi** possui um sabre de luz e pode usar a Força;
- um **Sith** também usa a Força, mas de forma sombria;
- um **Droide** possui uma função específica, como tradução, batalha ou navegação.

---

## 3. Classes que devem ser criadas

### Classe `Personagem`

Crie uma classe chamada `Personagem`.

Ela será a **superclasse**.

Atributos:

```ts
protected nome: string;
protected planeta: string;
protected energia: number;
```

Métodos:

```ts
constructor(nome: string, planeta: string, energia: number)

apresentar(): void

usarHabilidade(): void
```

O método `apresentar()` deve exibir os dados básicos do personagem.

O método `usarHabilidade()` deve exibir uma mensagem genérica:

```text
O personagem usou uma habilidade.
```

---

### Classe `Jedi`

Crie uma classe `Jedi` que herda de `Personagem`.

Atributo próprio:

```ts
private corSabre: string;
```

Métodos:

```ts
constructor(nome: string, planeta: string, energia: number, corSabre: string)

usarHabilidade(): void
```

O método `usarHabilidade()` deve sobrescrever o método da superclasse e exibir:

```text
O Jedi [nome] usou a Força para proteger a galáxia.
```

Também deve exibir a cor do sabre de luz.

---

### Classe `Sith`

Crie uma classe `Sith` que herda de `Personagem`.

Atributo próprio:

```ts
private nivelRaiva: number;
```

Métodos:

```ts
constructor(nome: string, planeta: string, energia: number, nivelRaiva: number)

usarHabilidade(): void
```

O método `usarHabilidade()` deve sobrescrever o método da superclasse e exibir:

```text
O Sith [nome] usou o lado sombrio da Força.
```

Também deve exibir o nível de raiva.

---

### Classe `Droide`

Crie uma classe `Droide` que herda de `Personagem`.

Atributo próprio:

```ts
private funcao: string;
```

Métodos:

```ts
constructor(nome: string, planeta: string, energia: number, funcao: string)

usarHabilidade(): void
```

O método `usarHabilidade()` deve sobrescrever o método da superclasse e exibir:

```text
O droide [nome] executou sua função: [funcao].
```

---

## 4. Tarefas do aluno

O aluno deverá:

1. Criar o projeto TypeScript ou utilizar o projeto já usado em aula.
2. Criar um arquivo chamado:

```text
exercicio-star-wars.ts
```

3. Implementar as classes:

```ts
Personagem
Jedi
Sith
Droide
```

4. Usar herança com `extends`.
5. Usar `super(...)` nos construtores das subclasses.
6. Usar pelo menos um atributo `protected` na superclasse.
7. Usar atributos `private` nas subclasses.
8. Sobrescrever o método `usarHabilidade()` em cada subclasse.
9. Criar pelo menos um objeto de cada tipo.
10. Exibir os dados no terminal.

---

## 5. Saída esperada aproximada

```text
=== Jedi ===
Nome: Obi-Wan Kenobi
Planeta: Stewjon
Energia: 95
O Jedi Obi-Wan Kenobi usou a Força para proteger a galáxia.
Cor do sabre de luz: Azul

=== Sith ===
Nome: Darth Vader
Planeta: Tatooine
Energia: 100
O Sith Darth Vader usou o lado sombrio da Força.
Nível de raiva: 98

=== Droide ===
Nome: R2-D2
Planeta: Naboo
Energia: 80
O droide R2-D2 executou sua função: Navegação e reparos.
```

---

## 6. Desafio extra

Crie uma nova subclasse chamada `Mandaloriano`.

Ela deve herdar de `Personagem`.

Atributo próprio:

```ts
private armaPrincipal: string;
```

O método `usarHabilidade()` deve exibir:

```text
O Mandaloriano [nome] atacou usando [armaPrincipal].
```

Depois, crie um objeto:

```ts
const mandaloriano1 = new Mandaloriano("Din Djarin", "Aq Vetina", 90, "blaster");
```

E exiba seus dados no terminal.

---

## 7. Critérios de avaliação

| Critério | Descrição |
|---|---|
| Herança | Usou corretamente `extends` |
| Construtores | Usou corretamente `super(...)` |
| Modificadores de acesso | Aplicou `protected` e `private` adequadamente |
| Sobrescrita | Sobrescreveu o método `usarHabilidade()` |
| Organização | Código limpo, indentado e legível |
| Execução | Programa executa sem erros |
| Criatividade | Personalizou personagens, mensagens ou habilidades |

---

## 8. Questões para responder

Ao final do código, responda em comentários:

```ts
// 1. Qual classe é a superclasse do exercício?

// 2. Quais classes são subclasses?

// 3. Por que usamos super(...) no construtor das subclasses?

// 4. Qual a diferença entre private e protected?

// 5. O que é sobrescrita de método?
```

---

## 9. Entrega

O aluno deverá entregar:

- o arquivo `.ts` com o exercício implementado;
- o código deve estar funcionando;
- o arquivo deve estar sem a pasta `node_modules`;
- o envio deve ser feito por link do GitHub na atividade postada no Google Classroom.

---

## 10. Observação para o aluno

A atividade utiliza a temática de Star Wars apenas como contexto didático.

O objetivo principal é praticar o conceito de **herança em Orientação a Objetos com TypeScript**, entendendo como uma classe mais geral pode ser especializada em classes mais específicas.
