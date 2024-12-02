let nomes = []; // Lista de nomes adicionados

// Adiciona um nome à lista
document.getElementById("adicionar").addEventListener("click", () => {
  const input = document.getElementById("nome");
  const nome = input.value.trim();

  if (nome) {
    if (!nomes.includes(nome)) {
      nomes.push(nome);
      atualizarListaNomes();
      input.value = ""; // Limpa o campo de entrada
    } else {
      alert("Este nome já foi adicionado.");
    }
  } else {
    alert("Por favor, insira um nome válido.");
  }
});

// Atualiza a lista de nomes na tela
function atualizarListaNomes() {
  const listaUl = document.getElementById("lista-nomes");
  listaUl.innerHTML = ""; // Limpa a lista antes de atualizar

  nomes.forEach((nome) => {
    const li = document.createElement("li");
    li.textContent = nome;
    listaUl.appendChild(li);
  });
}

// Realiza o sorteio
document.getElementById("sortear").addEventListener("click", () => {
  if (nomes.length < 2) {
    alert("Adicione pelo menos 2 nomes para realizar o sorteio.");
    return;
  }

  const sorteados = [...nomes];
  const pares = new Map();

  for (let nome of nomes) {
    const opcoesValidas = sorteados.filter(
      (n) => n !== nome && pares.get(n) !== nome
    );

    if (opcoesValidas.length === 0) {
      alert("Não foi possível realizar o sorteio sem pares inválidos. Tente novamente.");
      return;
    }

    const sorteado = opcoesValidas[Math.floor(Math.random() * opcoesValidas.length)];
    pares.set(nome, sorteado);

    // Remove o sorteado da lista para evitar duplicações
    const index = sorteados.indexOf(sorteado);
    if (index > -1) sorteados.splice(index, 1);
  }

  exibirResultado(pares);
});

// Exibe o resultado do sorteio
function exibirResultado(pares) {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "<h3>Resultado do Sorteio:</h3>";
  pares.forEach((valor, chave) => {
    const par = document.createElement("p");
    par.textContent = `${chave} tirou ${valor}`;
    resultadoDiv.appendChild(par);
  });
}
