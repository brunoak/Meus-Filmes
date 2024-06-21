import config from './config.js';

const apiKey = config.apiKey;
const baseUrl = 'https://image.tmdb.org/t/p/w154'
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`;
let favoritesMovies =[];

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
        let movieFav = false
        const movieDescription = movies.overview
        const moveisId = movies.id


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
        
        spanFav.addEventListener("click",()=>{
            
            if(movieFav){
                movieFav= false;
                spanFav.innerHTML = `<img src="img/Heart.svg" alt="Favoritos"> Favoritar`;
                remove(moveisId,1)
            }else{
                movieFav= true;
                spanFav.innerHTML = `<img src="img/Heart-preenchido.svg" alt="Favoritos"> Favoritar`;
                save(moveisId)
            }
        })

        /*
        for(let i = 0; i <= favoritesMovies.length; i++){
            console.log(favoritesMovies[i])
        }
        */
        
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

/**
 * quando o usuário clicar no ícone do coração (que fica abaixo do nome do filme), 
 * este coração deverá ser preenchido (ou seja, trocar a imagem do coração “vazio” para o ícone com coração “preenchido”)
 * 
 * Além disso, esse filme precisará ser salvo no Local Storage.

    Claro, quando o usuário clicar novamente no coração, a imagem precisará voltar a ser o coração sem preenchimento, 
    e o filme deverá ser removido do Local Storage.
 





*/

function save(id){
    favoritesMovies.push(id)
    return favoritesMovies;
    show(favoritesMovies)
    //localStorage.setItem('moveis',JSON.stringify(movie))
    //favoritesMovies.forEach(ids =>{ })
}

function remove(id){
    //favoritesMovies.splice(id,1)
    favoritesMovies = favoritesMovies.filter(elementoId => elementoId != id)
    //return favoritesMovies;
    //show(favoritesMovies)
    console.log(` removi o id ${id}`)
    show(favoritesMovies)
}

function show(movies){
    /*for (const ids in favoritesMovies) {
        console.log(favoritesMovies[ids])
    }
    */

    console.log(favoritesMovies.length)
}


console.log(favoritesMovies.length)