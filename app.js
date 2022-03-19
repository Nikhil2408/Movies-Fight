async function getMoviesData(search_str)
{
    dropdownContent.innerHTML = "";
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "dc83f487",
            s : `${search_str}`
        }
    });
    if(response.data.Error)
        return [];
    return response.data.Search;
}

function debounce(callback)
{
    let timeoutId;
    return () => {
        if(timeoutId)
            clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback();
        }, 500);
    };
}

const autocompleteWidget = document.querySelector(".autocomplete");
autocompleteWidget.innerHTML = `
    <label><b> Search first movie </b> </label>
    <input id = "first_movie_input" class="input">
    <div class = "dropdown">
        <div class="dropdown-menu">
            <div class = "dropdown-content results">
            </div>
        </div>
    </div>
`;
const first_movie_input = document.querySelector(".input");
const dropdown = document.querySelector(".dropdown");
const dropdownContent = document.querySelector(".dropdown-content");
let items;
const onInput = async (eventObj) => {
    // Since async functions always returns a promise
    const allMovies = await getMoviesData(first_movie_input.value);
    if(allMovies.length === 0)
    {
        dropdown.classList.remove("is-active");
        return;
    }

    for(let movie of allMovies)
    {
        let poster = movie.Poster;
        let title = movie.Title;
        let year = movie.Year;
        const a = document.createElement("a");
        a.innerHTML = `
                <img src = "${poster}"> 
                <h3> <b> ${title} ${year} </b> <h3>`;
        dropdownContent.appendChild(a);
        a.classList.add("dropdown-item");
        dropdown.classList.add("is-active");
    }

    items = document.querySelectorAll(".dropdown-item");
    for(let item of items)
    {
        item.addEventListener("click", function()
        {
            first_movie_input.value = item.innerText;
            dropdown.classList.remove("is-active");
        })
    }
}

first_movie_input.addEventListener("input", debounce(onInput));
document.addEventListener("click", function(eventObj){
    if(!autocompleteWidget.contains(eventObj.target))
        dropdown.classList.remove("is-active");
});


