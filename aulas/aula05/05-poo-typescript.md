# Aula 05 — Programação Orientada a Objetos em TypeScript

## Introdução


Embora muitos conceitos sejam os mesmos vistos em Java, a sintaxe e alguns comportamentos mudam em TypeScript. Isso acontece porque o TypeScript é uma linguagem que adiciona recursos de tipagem e orientação a objetos sobre o JavaScript.


---

## Projeto com exemplos

Os arquivos de exemplo desta aula estão disponíveis na pasta [`exemplo`](./exemploAula05/). Nessa pasta você encontrará um projeto TypeScript pronto, com `package.json`, `tsconfig.json` e os códigos utilizados ao longo da aula.

---

## 1. Métodos

Os **métodos** são funções declaradas dentro de uma classe.

Eles representam os **comportamentos** dos objetos, ou seja, as ações que um objeto pode executar.

Em uma classe, os atributos representam o **estado** do objeto e os métodos representam o seu **comportamento**.

### Exemplo de ideia

Uma classe `Televisao` pode ter:

- atributos: `canal`, `volume`, `ligada`;
- métodos: `ligar()`, `desligar()`, `aumentarVolume()`, `trocarCanal()`.

---

## 2. Sintaxe de métodos em TypeScript

Em Java, normalmente escrevemos métodos assim:

```java
public int somar(int a, int b) {
    return a + b;
}
```

Em TypeScript, a sintaxe é diferente:

```ts
public somar(a: number, b: number): number {
  return a + b;
}
```

### Estrutura geral

```ts
<especificadorDeAcesso> nomeMetodo(listaDeParametros): tipoDeRetorno {
  // corpo do método
}
```

### Observações importantes

- Em TypeScript, o tipo do parâmetro vem **depois do nome**: `a: number`.
- O tipo de retorno vem **depois dos parênteses**: `): number`.
- O modificador `public` é opcional. Se nada for informado, o membro é público.
- Métodos que não retornam valor usam `void`.

### Exemplo

```ts
class Calculadora {
  public somar(a: number, b: number): number {
    return a + b;
  }

  public exibirMensagem(): void {
    console.log("Executando cálculo...");
  }
}

const calc = new Calculadora();
calc.exibirMensagem();
console.log(calc.somar(10, 5));
```

---

## 3. Parâmetros e argumentos

Um **parâmetro** é uma variável declarada na assinatura do método.

Um **argumento** é o valor real passado ao método no momento da chamada.

### Exemplo

```ts
class Saudacao {
  public falar(nome: string): void {
    console.log(`Olá, ${nome}!`);
  }
}

const s = new Saudacao();
s.falar("Nelson");
```

### Explicação

- `nome: string` é o **parâmetro**;
- `"Nelson"` é o **argumento**.

### Mais exemplos

```ts
class ExemploParametros {
  public par(n: number): boolean {
    return n % 2 === 0;
  }

  public maximo(a: number, b: number): number {
    return a > b ? a : b;
  }

  public coordenada(n: number, x: number, y: number, descricao: string): void {
    console.log(`Ponto ${n}: (${x}, ${y}) - ${descricao}`);
  }
}
```

---

## 4. Assinatura de método

A **assinatura** de um método é formada pelo:

- nome do método;
- quantidade e tipos dos parâmetros.

O **tipo de retorno** não faz parte da assinatura conceitual do método.

### Exemplo

```ts
class Operacoes {
  public somar(a: number, b: number): number {
    return a + b;
  }
}
```

A assinatura conceitual do método acima é:

```ts
somar(number, number)
```

### 4.1 Sobrecarga de métodos

A **sobrecarga de métodos** acontece quando usamos o **mesmo nome de método**, mas com **assinaturas diferentes**.

Em Java, normalmente escrevemos vários métodos com o mesmo nome e implementações separadas.

Em TypeScript, o funcionamento é um pouco diferente:

- podemos declarar **várias assinaturas** para o mesmo método;
- porém, deve existir **apenas uma única implementação real**.

### Exemplo

```ts
class Saudacao {
  public exibir(nome: string): void;
  public exibir(nome: string, titulo: string): void;

  public exibir(nome: string, titulo?: string): void {
    if (titulo) {
      console.log(`Olá, ${titulo} ${nome}!`);
    } else {
      console.log(`Olá, ${nome}!`);
    }
  }
}

const s = new Saudacao();
s.exibir("Nelson");
s.exibir("Nelson", "Professor");
```

### Explicação

Nas duas primeiras declarações, temos as **assinaturas** do método:

```ts
public exibir(nome: string): void;
public exibir(nome: string, titulo: string): void;
```

Essas linhas informam ao TypeScript que o método `exibir` pode ser chamado de duas formas:

- com apenas `nome`;
- com `nome` e `titulo`.

Depois disso, escrevemos a **implementação única**:

```ts
public exibir(nome: string, titulo?: string): void {
  if (titulo) {
    console.log(`Olá, ${titulo} ${nome}!`);
  } else {
    console.log(`Olá, ${nome}!`);
  }
}
```

Nessa implementação:

- `titulo?: string` indica que o segundo parâmetro é opcional;
- o método decide internamente qual comportamento executar.

### Saída esperada

```ts
Olá, Nelson!
Olá, Professor Nelson!
```

### Importante

Em TypeScript, isto **não é permitido**:

```ts
class Exemplo {
  public teste(nome: string): void {
    console.log(nome);
  }

  public teste(nome: string, idade: number): void {
    console.log(nome, idade);
  }
}
```

Isso acontece porque o TypeScript não permite **duas implementações reais** do mesmo método na classe.

O correto é declarar várias assinaturas e manter **um único corpo de método**.

### Relação com a assinatura

A sobrecarga depende justamente da **assinatura do método**.

Ou seja, mudamos:

- a quantidade de parâmetros;
- ou os tipos dos parâmetros.

Apenas mudar o tipo de retorno **não caracteriza** uma nova sobrecarga.

Por exemplo, isso não seria uma sobrecarga válida conceitualmente:

```ts
metodo(valor: number): string
metodo(valor: number): boolean
```

Perceba que os parâmetros continuam os mesmos.

---

## 5. Tipos de métodos

### 5.1 Métodos de alteração (mutação)

Alteram o estado do objeto.

```ts
class Lampada {
  private ligada: boolean = false;

  public ligar(): void {
    this.ligada = true;
  }

  public desligar(): void {
    this.ligada = false;
  }
}
```

### 5.2 Métodos de observação

Apenas retornam informações, sem alterar o estado do objeto.

```ts
class Lampada {
  private ligada: boolean = false;

  public estaLigada(): boolean {
    return this.ligada;
  }
}
```

### 5.3 Métodos de produção

Retornam outro objeto.

```ts
class Pessoa {
  constructor(private nome: string, private idade: number) {}

  public copiar(): Pessoa {
    return new Pessoa(this.nome, this.idade);
  }
}
```

### 5.4 Métodos de criação

São métodos que criam novos objetos. Em muitos casos, o próprio `constructor` cumpre esse papel.

```ts
class Usuario {
  constructor(private nome: string) {}

  public static criarPadrao(): Usuario {
    return new Usuario("Visitante");
  }
}

const u = Usuario.criarPadrao();
```

### 5.5 Métodos de destruição

Em Java era comum falar sobre destruição de objetos de forma conceitual. Em TypeScript/JavaScript, o gerenciamento de memória é feito automaticamente pelo **garbage collector**.

Portanto, normalmente não criamos métodos para destruir objetos da memória. O mais comum é criar métodos para **limpar estado**, **encerrar recursos** ou **desconectar serviços**.

```ts
class Conexao {
  private ativa: boolean = true;

  public fechar(): void {
    this.ativa = false;
    console.log("Conexão encerrada.");
  }
}
```

---

## 6. Operador seletor (`.`)

O operador `.` permite acessar atributos e métodos de um objeto.

### Exemplo

```ts
class Relogio {
  public hora: number = 0;

  public exibir(): string {
    return `${this.hora}h`;
  }
}

const inicio = new Relogio();
inicio.hora = 12;
console.log(inicio.exibir());
```

### Atenção

Embora seja possível acessar atributos públicos diretamente, isso nem sempre é uma boa prática.

Veja este exemplo:

```ts
class Horario {
  public hora: number = 0;
  public minuto: number = 0;
  public segundo: number = 0;
}

const horario = new Horario();
horario.hora = 44;
horario.minuto = 1023;
horario.segundo = -23;

console.log(horario);
```

O código compila, mas os valores são logicamente inválidos.

Por isso, em POO, preferimos **encapsular** os atributos e controlar as alterações por meio de métodos.

---

## 7. Encapsulamento

O **encapsulamento** é o mecanismo que permite controlar o acesso aos atributos e métodos de uma classe.

Ele ajuda a proteger o estado interno do objeto e evita alterações indevidas.

### Vantagens do encapsulamento

- torna o código mais organizado;
- reduz erros de programação;
- protege os dados do objeto;
- facilita manutenção e evolução do sistema;
- permite validar valores antes de alterá-los.

---

## 8. Níveis de acesso em TypeScript

Em TypeScript, os principais modificadores de acesso são:

### `public`

O membro pode ser acessado de qualquer lugar.

```ts
class Pessoa {
  public nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }
}
```

### `private`

O membro só pode ser acessado dentro da própria classe.

```ts
class ContaBancaria {
  private saldo: number = 0;

  public depositar(valor: number): void {
    if (valor > 0) {
      this.saldo += valor;
    }
  }

  public consultarSaldo(): number {
    return this.saldo;
  }
}
```

### `protected`

O membro pode ser acessado pela própria classe e por suas subclasses.

```ts
class Animal {
  protected nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }
}

class Cachorro extends Animal {
  public latir(): void {
    console.log(`${this.nome} está latindo.`);
  }
}
```

### Observação importante

Em Java existe também o acesso por **pacote** (`package-private`).

Em TypeScript, **não existe** esse modificador equivalente.

---

## 9. Getters e setters

Uma prática comum em POO é deixar os atributos privados e disponibilizar métodos controlados para leitura e escrita.

### Exemplo com métodos `get` e `set`

```ts
class Produto {
  private nome: string;
  private preco: number;

  constructor(nome: string, preco: number) {
    this.nome = nome;
    this.preco = preco;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getPreco(): number {
    return this.preco;
  }

  public setPreco(preco: number): void {
    if (preco >= 0) {
      this.preco = preco;
    }
  }
}
```

### Uso

```ts
const p = new Produto("Teclado", 150);
console.log(p.getNome());
p.setPreco(200);
console.log(p.getPreco());
```

### Exemplo com `get` e `set` do TypeScript

Além dos métodos tradicionais, o TypeScript também permite usar **accessors**, deixando o acesso mais natural.

```ts
class Temperatura {
  private _celsius: number = 0;

  public get celsius(): number {
    return this._celsius;
  }

  public set celsius(valor: number) {
    if (valor >= -273.15) {
      this._celsius = valor;
    }
  }
}

const t = new Temperatura();
t.celsius = 25;
console.log(t.celsius);
```

Nesse caso, usamos `t.celsius` como se fosse um atributo, mas na prática estamos executando métodos de leitura e escrita.

---

## 10. Uso da palavra reservada `this`

A palavra reservada `this` faz referência ao **objeto atual**, isto é, ao objeto que está executando o método naquele momento.

Ela é muito importante para diferenciar:

- atributos da classe;
- parâmetros locais do método.

### Exemplo sem conflito de nomes

```ts
class Televisao {
  private canal: number = 1;

  public alterarCanal(c: number): void {
    this.canal = c;
  }

  public mostrarCanal(): void {
    console.log(`Canal atual: ${this.canal}`);
  }
}
```

### Exemplo com conflito de nomes

```ts
class Televisao {
  private canal: number = 1;

  public setCanal(canal: number): void {
    this.canal = canal;
  }

  public getCanal(): number {
    return this.canal;
  }
}

const tv = new Televisao();
tv.setCanal(10);
console.log(tv.getCanal());
```

### Explicação

No método `setCanal(canal: number)`, existem duas referências com o nome `canal`:

- o parâmetro local `canal`;
- o atributo da classe `canal`.

Quando escrevemos:

```ts
this.canal = canal;
```

- `this.canal` se refere ao atributo do objeto;
- `canal` se refere ao parâmetro recebido pelo método.

Sem `this`, o TypeScript não estaria acessando corretamente o atributo da instância.

---

## 11. Construtores

Os **construtores** são métodos especiais usados para inicializar objetos no momento da criação.

Em Java, o construtor tem o mesmo nome da classe.

Em TypeScript, o nome do construtor é sempre:

```ts
constructor
```

### Exemplo

```ts
class Aluno {
  private nome: string;
  private idade: number;

  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }

  public apresentar(): void {
    console.log(`Aluno: ${this.nome}, idade: ${this.idade}`);
  }
}

const aluno1 = new Aluno("Igor", 6);
aluno1.apresentar();
```

### Observações importantes

- o construtor é executado automaticamente quando usamos `new`;
- uma classe pode ter um construtor;
- em TypeScript, não existe sobrecarga real de construtores como em Java do mesmo modo tradicional. Em geral, usamos parâmetros opcionais ou lógica interna.

### Exemplo com parâmetro opcional

```ts
class Usuario {
  private nome: string;
  private perfil: string;

  constructor(nome: string, perfil: string = "aluno") {
    this.nome = nome;
    this.perfil = perfil;
  }

  public exibir(): void {
    console.log(`${this.nome} - ${this.perfil}`);
  }
}

const u1 = new Usuario("Ana");
const u2 = new Usuario("Carlos", "professor");

u1.exibir();
u2.exibir();
```

---

## 12. Propriedades de construtor

O TypeScript oferece um recurso muito prático chamado **parameter properties**.

Com ele, podemos declarar e inicializar atributos diretamente nos parâmetros do construtor.

### Exemplo tradicional

```ts
class Livro {
  private titulo: string;
  private autor: string;

  constructor(titulo: string, autor: string) {
    this.titulo = titulo;
    this.autor = autor;
  }
}
```

### Exemplo reduzido em TypeScript

```ts
class Livro {
  constructor(private titulo: string, private autor: string) {}

  public exibir(): void {
    console.log(`${this.titulo} - ${this.autor}`);
  }
}
```

Esse recurso é específico do TypeScript e ajuda a reduzir código repetitivo.

---

## 13. Exemplo completo: classe `ContaBancaria`


```ts
class ContaBancaria {
  private titular: string;
  private saldo: number;

  constructor(titular: string, saldoInicial: number = 0) {
    this.titular = titular;
    this.saldo = saldoInicial >= 0 ? saldoInicial : 0;
  }

  public depositar(valor: number): void {
    if (valor <= 0) {
      console.log("Valor de depósito inválido.");
      return;
    }

    this.saldo += valor;
    console.log(`Depósito de R$ ${valor.toFixed(2)} realizado com sucesso.`);
  }

  public sacar(valor: number): void {
    if (valor <= 0) {
      console.log("Valor de saque inválido.");
      return;
    }

    if (valor > this.saldo) {
      console.log("Saldo insuficiente.");
      return;
    }

    this.saldo -= valor;
    console.log(`Saque de R$ ${valor.toFixed(2)} realizado com sucesso.`);
  }

  public consultarSaldo(): number {
    return this.saldo;
  }

  public exibirDados(): void {
    console.log(`Titular: ${this.titular}`);
    console.log(`Saldo: R$ ${this.saldo.toFixed(2)}`);
  }
}

const conta = new ContaBancaria("Nelson", 1000);
conta.exibirDados();
conta.depositar(250);
conta.sacar(100);
console.log(`Saldo atual: R$ ${conta.consultarSaldo().toFixed(2)}`);
```

### O que esse exemplo mostra

- uso de atributos privados;
- uso de construtor;
- encapsulamento;
- validação de valores;
- métodos de alteração;
- método de observação;
- uso de `this`.

---

## 14. Exemplo completo: classe `Televisao`

```ts
class Televisao {
  private canal: number;
  private volume: number;
  private ligada: boolean;

  constructor() {
    this.canal = 1;
    this.volume = 10;
    this.ligada = false;
  }

  public ligar(): void {
    this.ligada = true;
  }

  public desligar(): void {
    this.ligada = false;
  }

  public setCanal(canal: number): void {
    if (canal >= 1 && canal <= 999) {
      this.canal = canal;
    }
  }

  public aumentarVolume(): void {
    if (this.volume < 100) {
      this.volume++;
    }
  }

  public diminuirVolume(): void {
    if (this.volume > 0) {
      this.volume--;
    }
  }

  public exibirStatus(): void {
    console.log(`Ligada: ${this.ligada}`);
    console.log(`Canal: ${this.canal}`);
    console.log(`Volume: ${this.volume}`);
  }
}

const tv = new Televisao();
tv.ligar();
tv.setCanal(12);
tv.aumentarVolume();
tv.exibirStatus();
```

---