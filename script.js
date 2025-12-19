import ListaEncadeada from "./classes/ListaEncadeada.js";
import {
  atualizarCampos,
  exibirAviso,
  limparErrosModal,
} from "./function/DOM.js";

const lista = new ListaEncadeada();
lista.adicionarPessoa("Roberto", 123123, "Fortaleza");

// Botões Card
const btnProximo = document.getElementById("btn-proximo");
const btnAnterior = document.getElementById("btn-anterior");
const btnExcluir = document.getElementById("btn-excluir");
const btnEditar = document.getElementById("btn-editar");

// Dados do Card
const infoPessoa = document.getElementById("info-pessoa");
const campoNome = document.getElementById("campo-nome");
const campoCpf = document.getElementById("campo-cpf");
const campoEndereco = document.getElementById("campo-endereco");

// Modal
const modal = document.getElementById("modal");
const btnSalvar = modal.querySelector("#btn-modal-salvar");
const btnCancelar = modal.querySelector("#btn-modal-cancelar");

// Seção Aviso
const secaoAviso = document.getElementById("secao-aviso");

atualizarCampos(lista.retornarAtual(), campoNome, campoCpf, campoEndereco);

// EVENTOS DO CARD

btnProximo.addEventListener("click", () => {
  if (lista.estaVazia()) {
    exibirAviso(
      secaoAviso,
      "erro",
      "Não há pessoas na lista. Adicione uma para navegar"
    );
    return;
  }

  lista.retornarProxima();

  atualizarCampos(lista.retornarAtual(), campoNome, campoCpf, campoEndereco);
});

btnAnterior.addEventListener("click", () => {
  if (lista.estaVazia()) {
    exibirAviso(
      secaoAviso,
      "erro",
      "Não há pessoas na lista. Adicione uma para navegar"
    );
    return;
  }

  lista.retornarAnterior();

  atualizarCampos(lista.retornarAtual(), campoNome, campoCpf, campoEndereco);
});

document.getElementById("btn-nova-pessoa").addEventListener("click", () => {
  modal.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
  modal.querySelector(".titulo-modal").innerHTML = "Criar";

  modal.dataset.acao = "criar";

  modal.showModal();
});

btnEditar.addEventListener("click", () => {
  modal.querySelector(".titulo-modal").innerHTML = "Editar";

  modal.dataset.acao = "editar";

  let pessoaAtual = lista.retornarAtual();

  modal.querySelector("#input-nome").value = pessoaAtual.nome;
  modal.querySelector("#input-cpf").value = pessoaAtual.cpf;
  modal.querySelector("#input-endereco").value = pessoaAtual.endereco;

  modal.showModal();
});

btnExcluir.addEventListener("click", () => {
  lista.removerAtual();
  const msgVazia = document.getElementById("mensagem-vazia");

  const pessoa = lista.retornarAtual();

  if (pessoa) {
    atualizarCampos(pessoa, campoNome, campoCpf, campoEndereco);
    msgVazia.style.display = "none";
  } else {
    campoNome.textContent = "";
    campoCpf.textContent = "";
    campoEndereco.textContent = "";

    msgVazia.style.display = "block";
    infoPessoa.style.display = "none";
  }

  exibirAviso(secaoAviso, "sucesso", "Pessoa removida com sucesso");
});

// EVENTOS DO MODAL

document.getElementById("form-cadastro").addEventListener("submit", (e) => {
  e.preventDefault();
});

btnSalvar.addEventListener("click", () => {
  const nome = modal.querySelector("#input-nome").value;
  const cpf = modal.querySelector("#input-cpf").value;
  const endereco = modal.querySelector("#input-endereco").value;

  if (!nome || !cpf || !endereco) {
    modal.querySelectorAll("input").forEach((input) => {
      if (input.nextElementSibling?.classList.contains("aviso-erro")) {
        input.nextElementSibling.remove();
      }

      if (input.value === "") {
        const aviso = document.createElement("p");
        aviso.textContent = `O campo ${input.placeholder} é obrigatório`;
        aviso.classList.add("aviso-erro");
        input.insertAdjacentElement("afterend", aviso);
      }
    });

    return;
  }

  if (modal.dataset.acao === "criar") {
    lista.adicionarPessoa(nome, cpf, endereco);

    const pessoaAtual = lista.retornarAtual();

    atualizarCampos(pessoaAtual, campoNome, campoCpf, campoEndereco);

    const msgVazia = document.getElementById("mensagem-vazia");
    infoPessoa.style.display = "block";
    msgVazia.style.display = "none";

    modal.close();
    limparErrosModal(modal);
    exibirAviso(secaoAviso, "sucesso", "Pessoa cadastrada com sucesso");

    return;
  }

  const pessoaAtual = lista.retornarAtual();

  pessoaAtual.nome = nome;
  pessoaAtual.cpf = cpf;
  pessoaAtual.endereco = endereco;

  atualizarCampos(pessoaAtual, campoNome, campoCpf, campoEndereco);

  modal.close();
  limparErrosModal(modal);

  exibirAviso(secaoAviso, "sucesso", "Dados atualizados com sucesso");
});

btnCancelar.addEventListener("click", () => {
  limparErrosModal(modal);

  modal.close();
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    limparErrosModal(modal);

    modal.close();
  }
});
