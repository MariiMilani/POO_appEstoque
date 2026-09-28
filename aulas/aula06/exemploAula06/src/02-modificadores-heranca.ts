class Animal {
  protected nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }
}

class Gato extends Animal {
  public miar(): void {
    console.log(`${this.nome} está miando.`);
  }
}

class Conta {
  private saldo: number;

  constructor(saldo: number) {
    this.saldo = saldo;
  }

  public consultarSaldo(): number {
    return this.saldo;
  }
}

class ContaEspecial extends Conta {
  public exibirMensagem(): void {
    console.log("A subclasse não acessa diretamente um atributo private da superclasse.");
  }
}

console.log("\n=== 02 - Protected e private na herança ===");

const gato = new Gato("Mingau");
gato.miar();

const conta = new ContaEspecial(1000);
conta.exibirMensagem();
console.log(`Saldo consultado por método público: R$ ${conta.consultarSaldo().toFixed(2)}`);

export {};