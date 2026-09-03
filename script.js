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


  // Validação do campo

  if (cidade === "") {

    alert("Digite o nome de uma cidade.");

    return;

  }


  // Monta a URL para buscar a cidade

  const url =
    `${GEO_URL}?name=${encodeURIComponent(cidade)}` +
    `&count=1&language=pt&format=json`;


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


    // Verifica se a cidade foi encontrada

    if (!dados.results) {

      throw new Error("Cidade não encontrada.");

    }


    // Pega a latitude e longitude da cidade

    const latitude = dados.results[0].latitude;

    const longitude = dados.results[0].longitude;


    // Monta a URL para consultar o clima

    const urlClima =
      `${CLIMA_URL}?latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;


    // Faz a segunda requisição para buscar o clima

    return fetch(urlClima);

  })

  .then(resposta => {

    // Verifica se o servidor respondeu com sucesso

    if (!resposta.ok) {

      throw new Error("Não foi possível consultar o clima.");

    }

    // Converte o corpo da resposta para JSON

    return resposta.json();

  })

  .then(dados => {

    // Mostra os dados recebidos no Console

    console.log(dados);


    // PASSO 7 - Descubra onde estão os dados dentro do JSON

    const temperatura = dados.current.temperature_2m;

    const umidade = dados.current.relative_humidity_2m;

    const vento = dados.current.wind_speed_10m;

    const codigoClima = dados.current.weather_code;


    // Mostra os dados no Console

    console.log("Temperatura:", temperatura);

    console.log("Umidade:", umidade);

    console.log("Vento:", vento);

    console.log("Código do clima:", codigoClima);

    document.getElementById("resultado").
    innerHTML = `
            <h2>Resultado</h2>
            <p>🌡️ Temperatura: ${temperatura}°C</p>   
            <p>💦 Umidade: ${umidade}%</p>
            <p>💨 Vento: ${vento} km/h</p>`;       

  })

  .catch(erro => {

    console.error(erro);

  });

}
