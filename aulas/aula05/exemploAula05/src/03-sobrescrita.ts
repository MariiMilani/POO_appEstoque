class Animal {
  public emitirSom(): void {
    console.log("O animal fez um som.");
  }
}

class Cachorro extends Animal {
  public emitirSom(): void {
    console.log("O cachorro latiu.");
  }
}

class Gato extends Animal {
  public emitirSom(): void {
    console.log("O gato miou.");
  }
}

console.log("\n=== 03 - Sobrescrita de métodos ===");

const a1 = new Animal();
const a2 = new Cachorro();
const a3 = new Gato();

a1.emitirSom();
a2.emitirSom();
a3.emitirSom();
