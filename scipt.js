const nomes = [];

function adicionarNome() {
  const input = document.getElementById("nome");
  const nome = input.value.trim();
  if (nome) {
    nomes.push(nome);
    alert(`${nome} adicionado à lista!`);
    input.value = "";
  } else {
    alert("Por favor, digite um nome.");
  }
}

function sortear() {
  if (nomes.length < 2) {
    alert("É necessário pelo menos 2 nomes para realizar o sorteio!");
    return;
  }

  const sorteados = [...nomes]; // Cópia dos nomes
  const paresSorteio = new Map();

  // Realiza o sorteio
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

  // Exibe o resultado
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "<h3>Resultado do Sorteio:</h3>";
  paresSorteio.forEach((valor, chave) => {
    const par = document.createElement("p");
    par.textContent = `${chave} tirou ${valor}`;
    resultadoDiv.appendChild(par);
  });
}
