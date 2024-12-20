// Select the form element
const formElm = document.querySelector("#mainForm");
const searchInput = document.querySelector("#searchInput")
const submitElm = document.querySelector("#submitBtn");
const resultContainer = document.querySelector(".resultContainer");
const resetBtn = document.getElementById("resetBtn");

//async function to fetch movie data based on input
async function getMovie(movieName) {
    try {
        const response = await fetch(`/movie?search=${movieName}`); //fetch request to server with movie name as query parameter
        //check if response is not okay
    if (!response.ok) {
        alert("There was a problem");
        return;
    }
        //Parse response JSON and return the data
        const data = await response.json();
        return data;
    } catch {
        console.error("There was a problem");
    }
}
//Add a submit event listener to the form
formElm.addEventListener("submit", async (event) => {
    event.preventDefault(); //Prevent default submission 
    //Fetch movie data based on the search input value
    const data = await getMovie(searchInput.value);

    // console.log(data.body.results); check results on console
    //Iterate over the list of movies in the response 
    data.body.results.forEach((movie) => { 
        //Append movie datails to the result container as HTML
        resultContainer.innerHTML += `
            <div>
                <img src=https://image.tmdb.org/t/p/w200${movie.poster_path}/>
                <p class="movieTitle">${movie.title}</p>
                <p class="movieDate">${movie.release_date}</p>
                <p class="movieOverview">${movie.overview}</p>
            </div>
        `;
    });
});

//Add a click event listener to reset button
resetBtn.addEventListener("click", function () {
    searchInput.value = "";
    resultContainer.innerHTML = "";
});



