
/*
const filmes = document.querySelector('.filmes');

const filme__dados = document.createElement('div').classList.add('filme__dados');
const filme__dados_direito = document.createElement('div').classList.add('filme__dados-direito');
const img = document.createElement('img');
img.innerHTML =`${img/Image.png}`;
const filme__dados_direito_info = document.createElement('div').classList.add('filme__dados-direito-info');
const titulo = document.createElement('h2').classList.add('titulo').textContent = "Avengers Endgame (2019)"

const div = document.createElement('div')

const span = document.createElement('span').classList.add('nota').textContent="9.2"
const imgStar = document.createElement('img').innerHTML = `${img/Star.png}`

const spanFav = document.createElement('span').classList.add('favoritos')
const imgFav = document.createElement('img').innerHTML = `${img/Heart.svg}`

const filme__dados_esquerdo = document.createElement('div').classList.add('filme__dados-esquerdo');
const texto = filme__dados_esquerdo.createElement('p').textContent="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."

filme__dados.append(filme__dados_direito)
filme__dados_direito.append(img)
filme__dados_direito.append(filme__dados_direito_info)
filme__dados_direito_info.append(titulo)
filme__dados_direito_info.append(div)
div.append(span)
span.append(imgStar)
div.append(spanFav)
spanFav.append(imgFav)
filme__dados.append(filme__dados_esquerdo)
filmes.append(filme__dados)
*/

const apiKey = "6560efb47058bc8922dffa6c91ca6f5e"
const baseUrl = 'https://image.tmdb.org/t/p/w154'
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`;

async function getFilmes(){
    const api = await fetch(apiUrl)
    const json = await api.json()
    console.log(json)

    json.results.forEach(movies => {
        const movieImage = movies.poster_path
        const movieName = movies.title
        const movieVotes = movies.vote_average
        const movieFav = false
        const movieDescription = movies.overview

        console.log(movieImage)
        console.log(movieName)
        console.log(movieVotes)
        console.log(movieDescription)

        const filmes = document.querySelector('.filmes');

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

getFilmes()

