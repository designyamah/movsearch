const form = document.querySelector('form')
const input = document.querySelector('input')
const grid = document.querySelector("section.result");
const searchicon = document.querySelector('.iconsearch')

let apikey = '79a920cab3fa8c3793a934d27beb01b5';

let fristserach = "https://api.themoviedb.org/3/movie/popular?api_key=79a920cab3fa8c3793a934d27beb01b5&language=en-US&page=1";


//function to search for list of movies first
const searchmovieFirst = async function(term){
    try {
    const response = await fetch(fristserach);
    const data = await response.json();
    // format the data to suit us
    //we used the map method to get the movie id and made a fetch reuest usind the movie id
    const formatedata = data.results.map(async (m) => {
        let mresponse = await fetch(`https://api.themoviedb.org/3/movie/${m.id}?api_key=79a920cab3fa8c3793a934d27beb01b5`)
        let mdata = await mresponse.json();
        return mdata
    })

    //call the function to create the divconentent in the html
    createUIContent(formatedata);
    // console.log(formatedata)
    } catch (error) {
        console.log(error.message)
    }
}

//onload
searchmovieFirst()

//function to serach the movies
const searchmoviedb = async function(term){
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${term}`);
        const data = await response.json();
        // format the data to suit us
        //we used the map method to get the movie id and made a fetch reuest usind the movie id
        const formatedata = data.results.map(async (m) => {
            let mresponse = await fetch(`https://api.themoviedb.org/3/movie/${m.id}?api_key=79a920cab3fa8c3793a934d27beb01b5`)
            let mdata = await mresponse.json();
            return mdata
        })
       //call the function to create the divconentent in the html
      createUIContent(formatedata)
 
    console.log(data)
    } catch (error) {
        console.log(error.message)
    }
}

function createUIContent(formatedata) {
    //remove the previoous element inside the SECTION GRID tag
    grid.innerHTML = "";
    //loop throught the formateddata and create html content
    formatedata.forEach(async (mo) => {
        let movie = await mo;

        let ui = `
       <div class="single-result">
       <button>${movie.status}</button>
       <div class="image floatbg">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">
        </div>
        <div class="image ">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">
        </div>
            <div class="text">
                <h3 class="movietitle">${movie.original_title}</h3>
                <p class="moviegenre">${getgenre(movie.genres)}</p>
                <div class="moviewrappers">
                    <p class="movieruntime"><span>Runtime:</span> <br><span class="round">${movie.runtime}min</span></p>
                    <p class="movieyear"><span>Year:</span> <br><span class="round">${movie.release_date.slice(0,4)}</span></p>
                    <p class="movieruntime"><span>Companie:</span> <br><span class="round">${movie.production_companies[0].name}</span></p>
                    <p class="movieruntime"><span>Lang:</span> <br><span class="round">${movie.original_language.toUpperCase()}</span></p>
                </div>
                <p class="moviestory"><span class="round">Storyline</span></p>
                <p class="movieplot">${movie.overview}</p>
               

                
            </div>
            </div>`;
        //insert them[div] inside the section tag
        // <button>${movie.status}</button>
        grid.insertAdjacentHTML('beforeend', ui);
        // console.log(movie);
    });
}


//when we sumbit the form get the value from the form
form.addEventListener('submit', function(e){

    //stop the form from goig to the usual next page
    e.preventDefault()
    // get the valur from the input
    const searchTerm = input.value

    // call the serachUnsplash function
    searchmoviedb(searchTerm)

})

//when we click the search icon get the value ftom the form and make an api request
searchicon.addEventListener('click',function(){
    // get the valur from the input
    const searchTerm = input.value
    if(searchTerm === ''){
        input.focus()
    }else{
        // call the serachUnsplash function
        searchmoviedb(searchTerm)
    }

})

//   let genre = [
//     {
//         "id": 28,
//         "name": "Action"
//     },
//     {
//         "id": 12,
//         "name": "Adventure"
//     },
//     {
//         "id": 878,
//         "name": "Science Fiction"
//     }
// ]

// let gg =genre.map(gen => {
//     return gen.name
// }).join(',')

// console.log(gg)

// a function to get the genre
function getgenre(genre){
 return genre.map(gen => {
    return gen.name
}).join(', ')
}


// when i scroll down the page, at a certain point,
// add a class to make the form fixed 

const formTag = document.querySelector("form")

const toggleform = function () {
  const pixels = window.pageYOffset
  
  if (pixels > 400) {
    formTag.classList.add("scrolled")
  } else {
    formTag.classList.remove("scrolled")
  }
}


document.addEventListener("scroll", function () {
    toggleform()
  })
  

