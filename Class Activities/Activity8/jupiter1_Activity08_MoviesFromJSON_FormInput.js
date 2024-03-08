/*Author: Juan Figueroa
ISU Netid : jupiter1@iastate.edu
Date : February 27, 2024
*/

function getInputValue() {
    let movieName = document.forms["my_form"]["inputMovieName"];
    let inputMovieName = movieName.value;
    fetch("./jupiter1_Activity08_MoviesFromJSON.json")
        .then(response => response.json())
        .then(myMovies => loadMovies(myMovies));
    function loadMovies(myMovies) {
        var mainContainer = document.getElementById("goodmovies");
        for (var i = 0; i < myMovies.movies.length; i++) {
            if (myMovies.movies[i].title === inputMovieName) {
                let title = myMovies.movies[i].title;
                let year = myMovies.movies[i].year;
                let url = myMovies.movies[i].url;
                let div = document.createElement("div");
                div.innerHTML = `
                        <h3>${title}</h3> <br>
                        ${year} <br>
                        <img src=${url} width="200"> <br> <br>
                    `;
                mainContainer.appendChild(div);
            }
        }
    }
}
