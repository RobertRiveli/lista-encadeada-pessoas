import No from "./No.js";

class ListaEncadeada {
  lista;

  adicionarPessoa(pessoa) {
    if (this.lista === undefined) {
      const no = new No(pessoa);
      this.lista = no;
      return;
    }

    const no = new No(pessoa);
    let ultimoNo = this.lista;

    while (ultimoNo.proximo !== undefined) {
      ultimoNo = ultimoNo.proximo;
    }

    ultimoNo.proximo = no;
    no.anterior = ultimoNo;
  }

  retornarProxima() {
    if (this.lista.proximo !== undefined) {
      this.lista = this.lista.proximo;
    }
  }

  retornarAnterior() {
    if (this.lista.anterior !== undefined) {
      this.lista = this.lista.anterior;
    }
  }

  retornarAtual() {
    return this.lista;
  }

  removerAtual() {
    if (!this.lista) return;

    const atual = this.lista;
    const anterior = atual.anterior;
    const proximo = atual.proximo;

    if (!anterior && !proximo) {
      this.lista = undefined;
      return;
    }

    if (!anterior) {
      proximo.anterior = undefined;
      this.lista = proximo;
      return;
    }

    if (!proximo) {
      anterior.proximo = undefined;
      this.lista = anterior;
      return;
    }

    anterior.proximo = proximo;
    proximo.anterior = anterior;

    this.lista = proximo;
  }

  estaVazia() {
    if (this.lista === undefined) return true;

    return false;
  }
}

export default ListaEncadeada;
