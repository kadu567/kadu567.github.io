let nomes = []; // Lista de nomes adicionados

// Adicionar nomes à lista
document.getElementById("adicionar").addEventListener("click", () => {
  const input = document.getElementById("nomes");
  const nomesEntrada = input.value.trim();

  if (nomesEntrada) {
    const novosNomes = nomesEntrada
      .split(",")
      .map((nome) => nome.trim())
      .filter((nome) => nome && !nomes.includes(nome)); // Remove duplicados e valores inválidos

    if (novosNomes.length > 0) {
      nomes = [...nomes, ...novosNomes];
      atualizarListaNomes();
      input.value = ""; // Limpa o campo de entrada
    } else {
      alert("Todos os nomes inseridos já foram adicionados ou são inválidos.");
    }
  } else {
    alert("Por favor, insira nomes separados por vírgula.");
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

// Realizar o sorteio
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

// Exibir o resultado do sorteio
function exibirResultado(pares) {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "<h3>Resultado do Sorteio:</h3>";
  pares.forEach((valor, chave) => {
    const par = document.createElement("p");
    par.textContent = `${chave} tirou ${valor}`;
    resultadoDiv.appendChild(par);
  });
}
