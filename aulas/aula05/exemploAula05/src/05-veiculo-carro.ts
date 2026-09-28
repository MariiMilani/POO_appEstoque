class Veiculo {
  protected marca: string;
  protected modelo: string;

  constructor(marca: string, modelo: string) {
    this.marca = marca;
    this.modelo = modelo;
  }

  public exibirDados(): void {
    console.log(`Marca: ${this.marca}`);
    console.log(`Modelo: ${this.modelo}`);
  }
}

class Carro extends Veiculo {
  private portas: number;

  constructor(marca: string, modelo: string, portas: number) {
    super(marca, modelo);
    this.portas = portas;
  }

  public exibirDados(): void {
    super.exibirDados();
    console.log(`Portas: ${this.portas}`);
  }
}

console.log("\n=== 05 - Veículo e Carro ===");

const carro1 = new Carro("Toyota", "Corolla", 4);
carro1.exibirDados();
