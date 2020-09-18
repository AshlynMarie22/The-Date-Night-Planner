


$(document).ready(function () {
  console.log("Hello World");

  //Create Settings Variable to pass into Ajax Function
  var genre = "action";
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://ott-details.p.rapidapi.com/advancedsearch?end_year=2020&start_year=2019&min_imdb=6&page=1&genre=action&type=movie&language=english&sort=highestrated",
    method: "GET",
    headers: {
      "x-rapidapi-host": "ott-details.p.rapidapi.com",
      "x-rapidapi-key": "18270a6435mshc7de6892f83a3d1p10f31ejsn44394324a00e",
    },
  };

        //Create elements
        // var movieDiv = $("<div>");
        // var movieRating = $("<div>");
        //Add content
        // movieRating.text(response.results[i].imdbrating)
                // $("#here").append(movieName);
        // $("#here").append(movieRating);
        // $("#here").append(movieSynopsis);
        // $("#here").append(
        //   "<img src='" + response.results[i].imageurl[0] + "'/>"

  function topMovies() {
    $.ajax(settings).done(function (response) {
      for (var i = 0; i < 5; i++) {
        console.log(response.results[i]);
        console.log("Movie Title: " + response.results[i].title);
        console.log("IMDB Rating: " + response.results[i].imdbrating);
        console.log("Synopsis: " + response.results[i].synopsis);
        console.log(response.results[0].imageurl[i]);

        //Create Elements and Add Content
        var movieName = "";
        var movieSynopsis = "";
        var movieImage = "";
        movieName = response.results[i].title;
        movieSynopsis = response.results[i].synopsis;
        movieImage = response.results[i].imageurl[i];
        console.log(movieImage);
        var movieCard = $("<div>")
          .addClass("card text-center")
          .attr("style", "height: 400px; overflow: scroll");
        var cardBody = $("<div>").addClass("card-body");
        var cardTitle = $("<h6>").addClass("card-title").text(movieName);
        var cardImage = $("<img>")
          .addClass("rounded")
          .attr("src", movieImage)
          .attr("style", "width: 200px");
        var synopsis = $("<p>")
          .addClass("card-detail-text")
          .text(movieSynopsis);
        var chooseButton = $("<button>")
          .addClass("btn btn-sm submit-button")
          .text("Choose Movie");

        //Display to Page
        //Append title, image synopsis and choose button to card body
        cardBody.append(cardTitle, cardImage, synopsis, chooseButton);

        //Append cardBody to movieCard
        movieCard.append(cardBody);
        //Append movieCard to 
        // );
      }
    });
  }

  //Function Calls
  topMovies();

  //Event Listeners
});
