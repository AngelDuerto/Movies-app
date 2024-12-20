
const request = require("request")

//Fetch movie data from an external API
function getMovie(movieSearch, callback) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieSearch)}&include_adult=false&language=en-US&page=1`;
    //API request options
const options = {
    url,
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTUxN2Q4NjA4MzdmMjdjMGNiZWM0NDM5OTI2ZTQ0YiIsIm5iZiI6MTczNDQ2MDExOS40MTgsInN1YiI6IjY3NjFjMmQ3NTNiM2IxMzhlODI1NDlmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tBmdzbD9FZwYGq6zTXVxMxeeaASXv-3Cc4bc89z614M'
},
    json: true, //auto parse the JSON response
};
    //API request
    request(options, (error, response) => {
        if(error) {
            callback("Unable to connect to location services!", undefined);
        } else if (response.statusCode !== 200){
            callback("Something went wrong!", undefined);
        } else {
            callback(undefined, response);
        }
    });
}

//export get movie
module.exports = getMovie
