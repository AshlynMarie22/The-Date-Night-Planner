$(document).ready(function () {
    console.log("Hello World")

    //Create Settings Variable to pass into Ajax Function
    var genre = "";
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ott-details.p.rapidapi.com/advancedsearch?end_year=2020&start_year=2019&min_imdb=6&page=1&genre=action&type=movie&language=english&sort=highestrated",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "ott-details.p.rapidapi.com",
            "x-rapidapi-key": "18270a6435mshc7de6892f83a3d1p10f31ejsn44394324a00e"
        }
    }
    
    $.ajax(settings).done(function (response) {
        for (var i = 0; i < 5; i++) {
            console.log(response.results[i]);
            console.log("Movie Title: " + response.results[i].title);
            console.log("IMDB Rating: " + response.results[i].imdbrating);
            console.log("Synopsis: " + response.results[i].synopsis);
            console.log(response.results[0].imageurl[i]);
    
            //Display elements to page
            //Create elements
            // var movieDiv = $("<div>");
            var movieName = $("<div>");
            var movieRating = $("<div>");
            var movieSynopsis = $("<div>");
            var movieImage = $("<img>");
    
            //Add content
            movieName.text("Movie Title: " + response.results[i].title)
            movieRating.text("Movie Rating: " + response.results[i].imdbrating)
            movieSynopsis.text("Movie Synopsis: " + response.results[i].synopsis)
            movieImage.attr("src", "response.results[i].imageurl[i]");
            console.log(movieImage);
    
            //Display to Page
            $("#here").append(movieName);
            $("#here").append(movieRating);
            $("#here").append(movieSynopsis);
            $("#here").append("<img src='" + response.results[i].imageurl[0] + "'/>");
        }
    });
});
