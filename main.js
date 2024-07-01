
import config from './config.js';

const apiKey = config.apiKey;
const baseUrl = 'https://image.tmdb.org/t/p/w154';
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`;
let favoritesMovies = JSON.parse(localStorage.getItem('favoritesMovies')) || [];
let checkbox = document.querySelector('.pesquisa__check');
let allMovies = []; // Armazenar todos os filmes carregados

async function getFilmes() {
    const api = await fetch(apiUrl);
    const json = await api.json();
    allMovies = json.results; // Armazena todos os filmes carregados
    renderMovie(json.results); // Passa apenas a lista de filmes
}

function renderMovie(movies) { // Altere o parâmetro para aceitar uma lista de filmes
    const filmes = document.querySelector('.filmes');
    filmes.innerHTML = "";

    movies.forEach(movie => { // Altere json.results para movies
        const movieImage = movie.poster_path;
        const movieName = movie.title;
        const movieVotes = movie.vote_average;
        let movieFav = false;
        const movieDescription = movie.overview;
        const movieId = movie.id; // Corrigir a variável moveisId para movieId

        const filme__dados = document.createElement('div');
        filme__dados.classList.add('filme__dados');

        const filme__dados_direito = document.createElement('div');
        filme__dados_direito.classList.add('filme__dados-direito');

        const img = document.createElement('img');
        img.classList.add('imagem-capa');
        img.src = baseUrl + movieImage;

        const filme__dados_direito_info = document.createElement('div');
        filme__dados_direito_info.classList.add('filme__dados-direito-info');

        const titulo = document.createElement('h2');
        titulo.classList.add('titulo');
        titulo.textContent = movieName;

        const div = document.createElement('div');

        const span = document.createElement('span');
        span.classList.add('nota');
        span.innerHTML = `<img src="img/Star.png" alt="nota"> ${movieVotes.toFixed(1)}`;

        const spanFav = document.createElement('span');
        spanFav.classList.add('favoritos');

        if (favoritesMovies.includes(movieId)) { // Corrigir moveisId para movieId
            movieFav = true;
            spanFav.innerHTML = `<img src="img/Heart-preenchido.svg" alt="Favoritos"> Favoritar`;
        } else {
            spanFav.innerHTML = `<img src="img/Heart.svg" alt="Favoritos"> Favoritar`;
        }

        spanFav.addEventListener("click", () => {
            if (movieFav) {
                movieFav = false;
                spanFav.innerHTML = `<img src="img/Heart.svg" alt="Favoritos"> Favoritar`;
                remove(movieId); // Corrigir moveisId para movieId
            } else {
                movieFav = true;
                spanFav.innerHTML = `<img src="img/Heart-preenchido.svg" alt="Favoritos"> Favoritar`;
                save(movieId); // Corrigir moveisId para movieId
            }
        });

        const filme__dados_esquerdo = document.createElement('div');
        filme__dados_esquerdo.classList.add('filme__dados-esquerdo');

        const texto = document.createElement('p');
        texto.textContent = movieDescription;

        filme__dados.append(filme__dados_direito);
        filme__dados_direito.append(img);
        filme__dados_direito.append(filme__dados_direito_info);
        filme__dados_direito_info.append(titulo);
        filme__dados_direito_info.append(div);

        div.append(span);
        div.append(spanFav);

        filme__dados.append(filme__dados_esquerdo);
        filme__dados_esquerdo.append(texto);
        filmes.append(filme__dados);
    });
}

async function searchMovies(query) {
    const searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=pt-BR`;
    const api = await fetch(searchAPI);
    const json = await api.json();
    renderMovie(json.results); // Passa apenas a lista de filmes
}

let search = document.querySelector('.pesquisa__texto');
search.addEventListener('input', (event) => {
    let query = event.target.value;
    query ? searchMovies(query) : getFilmes();
});

document.addEventListener("DOMContentLoaded", () => {
    getFilmes();
});

function save(id) {
    if (!favoritesMovies.includes(id)) {
        favoritesMovies.push(id);
        localStorage.setItem('favoritesMovies', JSON.stringify(favoritesMovies));
    }
}

function remove(id) {
    favoritesMovies = favoritesMovies.filter(elementoId => elementoId !== id);
    localStorage.setItem('favoritesMovies', JSON.stringify(favoritesMovies));
}

function renderFavoriteMovies() {
    const favoriteMovieDetails = allMovies.filter(movie => favoritesMovies.includes(movie.id));
    renderMovie(favoriteMovieDetails); // Renderiza os filmes favoritos filtrados
}

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        renderFavoriteMovies();
    } else {
        getFilmes();
    }
});
