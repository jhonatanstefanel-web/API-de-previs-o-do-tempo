// 1) Encontra o botão que possui id="buscar"
const botaoBuscar = document.getElementById("buscar");
// ============================================
// CONFIGURAÇÃO DA API — Open-Meteo (não exige chave)
// ============================================
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const CLIMA_URL = "https://api.open-meteo.com/v1/forecast";


// 2) Liga o clique do botão à função buscarClima
botaoBuscar.addEventListener("click", buscarClima);

// 3) Esta função será executada a cada clique
function buscarClima() {
  console.log("O botão foi clicado!");

  // Encontra o input com id="cidade"
  const campoCidade = document.getElementById("cidade");

  // .value pega o que o usuário digitou
  // .trim() remove espaços extras no início/fim
  const cidade = campoCidade.value.trim();

  console.log("Cidade digitada:", cidade);

  fetch(url)
  .then(resposta => {

    // Verifica se o servidor respondeu com sucesso
    if (!resposta.ok) {
      throw new Error("Não foi possível consultar a cidade.");
    }

    // Converte o corpo da resposta para JSON
    return resposta.json();
  })
  .then(dados => {

    // Por enquanto, apenas observe o JSON
    console.log(dados);
  })
  .catch(erro => {

    console.error(erro);
  });

  
}
if (cidade === "") {
  alert("Digite o nome de uma cidade.");
  
}
