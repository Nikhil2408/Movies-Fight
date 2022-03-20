async function getMoviesData(search_str)
{
    const response = await axios.get("https://www.omdbapi.com/", {
        params: {
            apikey: "dc83f487",
            s : `${search_str}`
        }
    });
    if(response.data.Error)
        return [];
    return response.data.Search;
}

let leftMovieDetails;
let rightMovieDetails;
async function getMovieDetails(movieId, detail, side)
{
    const response = await axios.get("https://www.omdbapi.com/", {
       params: {
           apikey: "dc83f487",
           i : `${movieId}`
       }
    });
    
    detail.innerHTML = displayMovieData(response.data);
    if(side === "left")
        leftMovieDetails = response.data;
    else
        rightMovieDetails = response.data;

    if(leftMovieDetails && rightMovieDetails)
        compare();
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
    
}

createAutoComplete({
    root : document.querySelector("#left-autocomplete"),
    onOptionSelect : async function(movie){
        return await getMovieDetails(movie.imdbID, document.querySelector("#left-details"), "left");
    },
    ...createAutoCompleteConfig
});

createAutoComplete({
    root : document.querySelector("#right-autocomplete"),
    onOptionSelect : async function(movie){
        return await getMovieDetails(movie.imdbID, document.querySelector("#right-details"), "right");
    },
    ...createAutoCompleteConfig
});


function compare()
{
    const leftDetailList = document.querySelectorAll("#left-details .notification");
    const rightDetailList = document.querySelectorAll("#right-details .notification");
    let leftdetail;
    let rightdetail;
    for(detail in leftDetailList)
    {
        if(detail === '0')
            continue;
        leftdetail = parseInt(leftDetailList[detail].getAttribute("data-value"));
        rightdetail = parseInt(rightDetailList[detail].getAttribute("data-value"));
        if(leftdetail > rightdetail)
        {
            rightDetailList[detail].classList.add("is-warning");
            rightDetailList[detail].classList.remove("is-primary");
        }
            
        else{
            leftDetailList[detail].classList.add("is-warning");
            leftDetailList[detail].classList.remove("is-primary")
        }
            
    }
}
