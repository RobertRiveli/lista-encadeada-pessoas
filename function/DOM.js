function atualizarCampos(pessoa, campoNome, campoCpf, campoEndereco) {
  campoNome.innerHTML = pessoa.dados.nome;
  campoEndereco.innerHTML = pessoa.dados.endereco;
  campoCpf.innerHTML = pessoa.dados.cpf;
}

function exibirAviso(avisoElemento, tipoAviso, textoAviso) {
  avisoElemento.classList.add("exibir");
  avisoElemento.classList.add(tipoAviso);
  avisoElemento.innerHTML = textoAviso;

  setTimeout(() => {
    avisoElemento.classList.remove("exibir");
    avisoElemento.classList.remove(tipoAviso);
  }, 3000);
}

function limparErrosModal(modal) {
  modal.querySelectorAll("input").forEach((input) => {
    if (input.nextElementSibling?.classList.contains("aviso-erro")) {
      input.nextElementSibling.remove();
    }
  });
}

function formatarCPF(inputCPF) {
  inputCPF.addEventListener("input", function () {
    let tamanhoCampo = this.value.length;

    this.value = this.value.replace(/[^0-9]/g, "");

    if (tamanhoCampo > 3 && tamanhoCampo <= 6) {
      this.value = this.value.replace(/(\d{3})(\d+)/, "$1.$2");
    }

    if (tamanhoCampo > 6 && tamanhoCampo <= 9) {
      this.value = this.value.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    }

    if (tamanhoCampo > 9) {
      this.value = this.value.replace(
        /(\d{3})(\d{3})(\d{3})(\d+)/,
        "$1.$2.$3-$4"
      );
    }
  });
}

export { atualizarCampos, exibirAviso, limparErrosModal, formatarCPF };
