async function getMoviesData(search_str)
{
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

async function getMovieDetails(movieId)
{
    const response = await axios.get("http://www.omdbapi.com/", {
       params: {
           apikey: "dc83f487",
           i : `${movieId}`
       }
    });

    return response.data;
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


const createAutoCompleteConfig = {
    renderOption : function(movie){
        return `<img src = "${movie.Poster}"> 
                <h3> <b> ${movie.Title} ${movie.Year} </b> <h3>`;
    },
    onOptionSelect : async function(movie){
        return await getMovieDetails(movie.imdbID);
    }
}

createAutoComplete({
    root : document.querySelector("#left-autocomplete"),
    detail : document.querySelector("#left-details"),
    ...createAutoCompleteConfig
});

createAutoComplete({
    root : document.querySelector("#right-autocomplete"),
    detail : document.querySelector("#right-details"),
    ...createAutoCompleteConfig
});


