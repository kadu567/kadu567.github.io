let nomes = [];

// Adicionar nome à lista
function adicionarNome() {
  const input = document.getElementById("nome");
  const nome = input.value.trim();

  if (nome) {
    if (!nomes.includes(nome)) {
      nomes.push(nome);
      atualizarListaNomes();
      alert(`${nome} foi adicionado à lista!`);
      input.value = "";
    } else {
      alert("Esse nome já foi adicionado.");
    }
  } else {
    alert("Por favor, insira um nome válido.");
  }
}

// Atualizar exibição da lista de nomes
function atualizarListaNomes() {
  const listaDiv = document.getElementById("nomes-adicionados");
  listaDiv.textContent = `Nomes adicionados: ${nomes.join(", ") || "Nenhum ainda."}`;
}

// Sortear pares de amigo secreto
function sortear() {
  if (nomes.length < 2) {
    alert("Adicione pelo menos 2 nomes para realizar o sorteio.");
    return;
  }

  const sorteados = [...nomes];
  const paresSorteio = new Map();

  for (let nome of nomes) {
    const opcoesValidas = sorteados.filter(
      (n) => n !== nome && paresSorteio.get(n) !== nome
    );

    if (opcoesValidas.length === 0) {
      alert("Não foi possível realizar o sorteio sem repetições. Tente novamente.");
      return;
    }

    const sorteado = opcoesValidas[Math.floor(Math.random() * opcoesValidas.length)];
    paresSorteio.set(nome, sorteado);

    // Remove o sorteado da lista para evitar duplicações
    const index = sorteados.indexOf(sorteado);
    if (index > -1) sorteados.splice(index, 1);
  }

  exibirResultado(paresSorteio);
}

// Exibir resultado do sorteio
function exibirResultado(paresSorteio) {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "<h3>Resultado do Sorteio:</h3>";
  paresSorteio.forEach((valor, chave) => {
    const par = document.createElement("p");
    par.textContent = `${chave} tirou ${valor}`;
    resultadoDiv.appendChild(par);
  });
}
