class Pessoa {
  protected nome: string;
  protected idade: number;

  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }

  public apresentar(): void {
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

  public exibirDadosAluno(): void {
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

  public apresentar(): void {
    console.log(`Professor: ${this.nome}`);
    console.log(`Idade: ${this.idade}`);
    console.log(`Disciplina: ${this.disciplina}`);
  }
}

console.log("\n=== 04 - Pessoa, Aluno e Professor ===");

const aluno1 = new Aluno(
  "Igor",
  18,
  "2026001",
  "Análise e Desenvolvimento de Sistemas"
);

const professor1 = new Professor(
  "Nelson",
  40,
  "Programação Orientada a Objetos"
);

console.log("\n--- Aluno ---");
aluno1.exibirDadosAluno();

console.log("\n--- Professor ---");
professor1.apresentar();

export {};