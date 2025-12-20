class Pessoa {
  nome;
  #cpf;
  #endereco;

  constructor(nome, cpf, endereco) {
    this.nome = nome;
    this.#cpf = cpf;
    this.#endereco = endereco;
  }

  get cpf() {
    return this.#cpf;
  }

  set cpf(cpf) {
    if (!this.verificarCPF(cpf)) {
      throw new Error("CPF inválido");
    }

    this.#cpf = cpf;
  }

  get endereco() {
    return this.#endereco;
  }

  set endereco(endereco) {
    this.#endereco = endereco;
  }

  verificarCPF(cpf) {
    if (cpf.length !== 11) return false;
    if (typeof cpf !== "string") return false;

    if (!this.calcularDigitosCpf(cpf)) return false;
    return true;
  }

  calcularDigitosCpf(cpf) {
    for (let i = 0; i < 2; i++) {
      let index = 0 + i;
      let somaDigitos = 0;
      const tamanhoCPF = cpf.length;

      const arrayCpf = [...cpf];

      for (let j = 10; j >= 2; j--) {
        const multiplicacao = Number(arrayCpf[index]) * j;
        somaDigitos += multiplicacao;

        index++;
      }

      const restoDivisao = somaDigitos % tamanhoCPF;

      let digitoCPF = null;
      if (restoDivisao === 0 || restoDivisao === 1) {
        digitoCPF = 0;
      } else {
        digitoCPF = tamanhoCPF - restoDivisao;
      }

      if (digitoCPF != cpf[9 + i]) {
        return false;
      }
    }

    return true;
  }
}

export default Pessoa;
