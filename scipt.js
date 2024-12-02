let nomes = []; // Lista de nomes adicionados

// Função para adicionar nomes
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

// Atualizar lista de nomes na tela
function atualizarListaNomes() {
  const listaUl = document.getElementById("lista-nomes");
  listaUl.innerHTML = ""; // Limpa a lista

  nomes.forEach((nome) => {
    const li = document.createElement("li");
    li.textContent = nome;
    listaUl.appendChild(li);
  });
}

// Função para sortear nomes
document.getElementById("sortear").addEventListener("click", () => {
  if (nomes.length < 2) {
    alert("Adicione pelo menos 2 nomes para realizar o sorteio.");
    return;
  }

  const sorteio = realizarSorteio();
  if (!sorteio) {
    alert("Não foi possível realizar o sorteio sem pares inválidos. Tente novamente.");
    return;
  }

  exibirResultado(sorteio);
});

// Função para realizar o sorteio
function realizarSorteio() {
  const sorteados = [...nomes];
  const pares = new Map();

  for (let nome of nomes) {
    const opcoesValidas = sorteados.filter(
      (n) => n !== nome && pares.get(n) !== nome
    );

    if (opcoesValidas.length === 0) {
      return null; // Sorteio inválido
    }

    const sorteado = opcoesValidas[Math.floor(Math.random() * opcoesValidas.length)];
    pares.set(nome, sorteado);

    // Remove o sorteado da lista
    const index = sorteados.indexOf(sorteado);
    if (index > -1) sorteados.splice(index, 1);
  }

  return Object.fromEntries(pares);
}

// Exibir o resultado do sorteio
function exibirResultado(pares) {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "<h3>Resultado do Sorteio:</h3>";

  for (const [nome, sorteado] of Object.entries(pares)) {
    const p = document.createElement("p");
    p.textContent = `${nome} tirou ${sorteado}`;
    resultadoDiv.appendChild(p);
  }
}
