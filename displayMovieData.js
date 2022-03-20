function displayMovieData(movieData)
{
    if(movieData.BoxOffice === undefined)
        movieData.BoxOffice = "N/A";
    if(movieData.Metascore === undefined)
        movieData.Metascore = "N/A";
    if(movieData.imdbRating === undefined)
        movieData.imdbRating = "N/A"
    if(movieData.imdbVotes === undefined)
        movieData.imdbVotes = "N/A";
    const boxOffice = parseInt(movieData.BoxOffice.replace("$", '').replaceAll(",", ""));
    const metaScore = parseInt(movieData.Metascore);
    const imdbRating = parseFloat(movieData.imdbRating);
    const imdbVotes = parseInt(movieData.imdbVotes.replaceAll(",", ""));
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src = "${movieData.Poster}" />
                </p>
            </figure>
            <div class = "media-content">
                <div class = "content">
                    <h1>${movieData.Title}</h1>
                    <h4>${movieData.Genre}</h4>
                    <p>${movieData.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieData.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value = ${boxOffice} class="notification is-primary">
            <p class="title">${movieData.BoxOffice}</p>
            <p class="subtitle">BoxOffice</p>
        </article>
        <article data-value = ${metaScore} class="notification is-primary">
            <p class="title">${movieData.Metascore}</p>
            <p class="subtitle">MetaScore</p>
        </article>
        <article data-value = ${imdbRating} class="notification is-primary">
            <p class="title">${movieData.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article data-value = ${imdbVotes} class="notification is-primary">
            <p class="title">${movieData.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `
}