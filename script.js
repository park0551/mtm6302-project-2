// https://api.nasa.gov/planetary/apod?api_key=sqgvtmeEfAFGcqCbIoed3UvvMlKGIn2vnwzlxUvF

const favs = document.getElementById('favs')
const form = document.getElementById('form')
const savePicture = document.getElementById('save')
const apodContainer = document.getElementById('apod-container')
const api_key = 'sqgvtmeEfAFGcqCbIoed3UvvMlKGIn2vnwzlxUvF'
const formBtn = document.getElementById('form-btn')


const apiRequest = async date => {
    const inputVal = document.querySelector('input').value
    const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${inputVal}`
    );
    const data = await response.json();
    // define 'json'
    console.log('Response', response);
    console.log('JSON data', data);
    useApiData(data);
    
//    document.write(JSON.stringify(json))
// localStorage.setItem('JSON data', JSON.stringify(json))

    currentItem = data;

    function useApiData(data){
        apodContainer.innerHTML = `
        <h3 id="title">${data.title}</h3>
            <p id="date">${data.date}</p>
            <section class="picture-explanation-container">
                <img class="image w-100" src="${data.url}" id="picture" alt="astronomy image by NASA" data-large="${data.hdurl}">
                <p id="explanation">${data.explanation}</p>
                <button class="btn btn-primary" id="save" type="submit">Save to Favourites</button>
            </section>
        `
    }
    
    
}


// addEventListener to form button to make fetch request to API
form.addEventListener('submit',
function (e){
    e.preventDefault()
    apiRequest()
})


// -------------------------------------- favourites -----------------------

// array for favourites
// each object is a new favourite
let favourites = []

// favourites
function buildFavourites(){
    // use for loop to get each favourite from the array
    for (let i = 0; i <= favourites.length; i++){
    // create template for each fav: favourites[i]
    const favourite = favourites[i]
    favourites.push(`
    <div class="card">
        <img class="card-img-top" src="${favourite.url}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${favourite.title}</h5>
            </div>
            <button class="btn btn-secondary" data-index="${i}">Remove</button>
    </div>
    `)}
    localStorage.setItem('favourite', JSON.stringify(favourites))
    favs.innerHTML = '';

}


// save to favourites button
if(document.getElementById('form-btn').clicked == true){
savePicture.addEventListener("click", function(){
    buildFavourites()
});

}



// apodContainer.addEventListener("click", function(){
//     const clickedImage = document.createElement("img");
//     clickedImage.src = ${data.hdurl};
// });






