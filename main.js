import config from './config.js';

const apiKey = config.apiKey;
const baseUrl = 'https://image.tmdb.org/t/p/w154'
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`;

async function getFilmes(){
    const api = await fetch(apiUrl)
    const json = await api.json()
    renderMovie(json)

}

function renderMovie(json){

    const filmes = document.querySelector('.filmes');
    filmes.innerHTML=""

    json.results.forEach(movies => {
        const movieImage = movies.poster_path
        const movieName = movies.title
        const movieVotes = movies.vote_average
        const movieFav = false
        const movieDescription = movies.overview

        const filme__dados = document.createElement('div');
        filme__dados.classList.add('filme__dados');

        const filme__dados_direito = document.createElement('div');
        filme__dados_direito.classList.add('filme__dados-direito');

        const img = document.createElement('img');
        img.classList.add('imagem-capa')
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
        spanFav.innerHTML = `<img src="img/Heart.svg" alt="Favoritos"> Favoritar`;

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
    })
}

async function searchMovies(query){
    const searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=pt-BR`;
    const api = await fetch(searchAPI)
    const json = await api.json();
    renderMovie(json) 
}

let search = document.querySelector('.pesquisa__texto')
search.addEventListener('input',(event)=>{
    let query = event.target.value
    query ? searchMovies(query) : getFilmes()
})

getFilmes()