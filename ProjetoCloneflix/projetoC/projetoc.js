const API_KEY = '588e4aafbbb5abdbfa7211f19c306fc5';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

// Função para buscar filmes populares
async function buscarFilmesPopulares() {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`);
        const data = await response.json();
        exibirFilmes(data.results, document.getElementById('populares-container'));
    } catch (error) {
        console.error('Erro ao buscar filmes populares:', error);
    }
}

// Função para buscar filmes por gênero
async function buscarFilmesPorGenero(generoId, container) {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${generoId}&language=pt-BR&page=1`);
        const data = await response.json();
        exibirFilmes(data.results, container);
    } catch (error) {
        console.error('Erro ao buscar filmes por gênero:', error);
    }
}

// Função para exibir os filmes
function exibirFilmes(filmes, container) {
    container.innerHTML = ''; 
    filmes.forEach(filme => {
        const filmeItem = document.createElement('div');
        filmeItem.classList.add('grid-item');
        
        // Imagem do filme
        const img = document.createElement('img');
        const imgUrl = filme.poster_path 
            ? `${IMG_URL}${filme.poster_path}` 
            : 'https://image.tmdb.org/t/p/w500/null';
        img.src = imgUrl;
        img.alt = filme.title;
        img.onerror = function() {
            this.src = 'https://image.tmdb.org/t/p/w500/null';
        };

        // Título do filme
        const titulo = document.createElement('h3');
        titulo.textContent = filme.title;
        
        // Montagem do item do filme
        filmeItem.appendChild(img);
        filmeItem.appendChild(titulo);
        container.appendChild(filmeItem);
    });
}

// Função para buscar filmes pelo nome
async function buscarFilmesPorNome(query) {
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR&page=1`);
        const data = await response.json();
        exibirFilmes(data.results, document.getElementById('populares-container'));
    } catch (error) {
        console.error('Erro ao buscar filmes por nome:', error);
    }
}

// Funções para rolar a lista de filmes para esquerda e direita
function rolarParaDireita(containerSeletor) {
    const container = document.querySelector(containerSeletor);
    if (container) {
        container.scrollLeft += 300;
    }
}

function rolarParaEsquerda(containerSeletor) {
    const container = document.querySelector(containerSeletor);
    if (container) {
        container.scrollLeft -= 300;
    }
}

// Evento de busca para o input de pesquisa
document.getElementById('search').addEventListener('keyup', (event) => {
    const query = event.target.value;
    if (query.length > 2) {
        buscarFilmesPorNome(query);
    } else {
        buscarFilmesPopulares();
    }
});

// Inicializar a busca de filmes ao carregar a página
buscarFilmesPopulares();
const comediaContainer = document.getElementById('comedia-container');
const acaoContainer = document.getElementById('acao-container');
buscarFilmesPorGenero(35, comediaContainer); // Gênero comédia
buscarFilmesPorGenero(28, acaoContainer); // Gênero ação
