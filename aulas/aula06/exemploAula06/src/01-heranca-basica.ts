class Pessoa {
  public nome: string;
  public idade: number;

  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }

  public apresentar(): void {
    console.log(`Olá! Meu nome é ${this.nome} e tenho ${this.idade} anos.`);
  }
}

class Aluno extends Pessoa {
  public matricula: string;

  constructor(nome: string, idade: number, matricula: string) {
    super(nome, idade);
    this.matricula = matricula;
  }

  public exibirMatricula(): void {
    console.log(`Matrícula: ${this.matricula}`);
  }
}

console.log("\n=== 01 - Herança básica ===");

const aluno1 = new Aluno("Igor", 18, "2026001");
aluno1.apresentar();
aluno1.exibirMatricula();

export {};