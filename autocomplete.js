const createAutoComplete = ({root, detail, renderOption, onOptionSelect}) => {
    root.innerHTML = `
    <label><b> Search a movie </b> </label>
    <input class="input">
    <div class = "dropdown">
        <div class="dropdown-menu">
            <div class = "dropdown-content results">
            </div>
        </div>
    </div>
    `;

    const movie_input = root.querySelector(".input");
    const dropdown = root.querySelector(".dropdown");
    const dropdownContent = root.querySelector(".dropdown-content");

    const onInput = async (eventObj) => {

        document.querySelector(".tutorial").style.display = "none";
        // Since async functions always returns a promise
        const allMovies = await getMoviesData(movie_input.value);
        dropdownContent.innerHTML = "";
        if(allMovies.length === 0)
        {
            dropdown.classList.remove("is-active");
            return;
        }

        for(let movie of allMovies)
        {
            const a = document.createElement("a");
            a.innerHTML = renderOption(movie);
            dropdownContent.appendChild(a);
            a.classList.add("dropdown-item");
            dropdown.classList.add("is-active");

            a.addEventListener("click", async () => {
                movie_input.value = movie.Title;
                dropdown.classList.remove("is-active");
                detail.innerHTML = displayMovieData(await onOptionSelect(movie));
            });
        }
    }

    movie_input.addEventListener("input", debounce(onInput));

    document.addEventListener("click", function(eventObj){
        if(!root.contains(eventObj.target))
        dropdown.classList.remove("is-active");
    });
}