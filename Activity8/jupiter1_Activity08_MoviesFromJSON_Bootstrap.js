/*Author: Juan Figueroa
ISU Netid : jupiter1@iastate.edu
Date : February 27, 2024
*/

fetch("./jupiter1_Activity08_MoviesFromJSON.json")
    .then(response => response.json())
    .then(myMovies => loadMovies(myMovies));
function loadMovies(myMovies) {
    var CardMovie = document.getElementById("col");
    
    var checkboxes = [];
    var cards = [];

    for (var i = 0; i < myMovies.movies.length; i++) {

        let title = myMovies.movies[i].title;
        let year = myMovies.movies[i].year;
        let url = myMovies.movies[i].url;

        let AddCardMovie = document.createElement("div");

        let checkbox = "checkbox" + i.toString();
        let card = "card" + i.toString();

        AddCardMovie.classList.add("col");

        AddCardMovie.innerHTML = `
                <input type="checkbox" id=${checkbox} class="form-check-input" checked>
                <label for=${checkbox} class="form-check-label">Show Image ${i}</label>
                <div id=${card} class="card shadow-sm">
                    <img src=${url} class="card-img-top" alt="..."></img>
                        <div class="card-body">
                            <p class="card-text"> <strong>${title}</strong>, ${year}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                            </div>
                        </div>
                    </div>
                </div>
                 `;

        CardMovie.appendChild(AddCardMovie);

        let cbox = document.getElementById(checkbox);
        checkboxes.push(cbox);
        let ccard = document.getElementById(card);
        cards.push(ccard);

        console.log(checkbox);
        console.log(card);
    }

    console.log(checkboxes);
    console.log(cards); 

    checkboxes.forEach((checkboxParam, index) => {
        console.log(index);
        checkboxParam.addEventListener('change', () => {
            if (checkboxParam.checked) {
                cards[index].style.display = 'block'; // Show the card
            } 
            else {
                cards[index].style.display = 'none'; // Hide the card
            }
        });
    });
}