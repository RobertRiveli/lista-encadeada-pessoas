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

export { atualizarCampos, exibirAviso, limparErrosModal };
