//Make movie Display Variable to display movie cards on screen
var movieDisplay = $("#view-movie-display");

$(document).ready(function () {
  //Populate User's movie choice to final page
  $(".finalMovie").html(localStorage.getItem("movie"));

  //Creating function that will generate 5 random, high rated movies, based on the users genre choice
  function topMovies() {
    //Variable that holds users choice
    var genreChoice = $("#movie-input-group").val();
    //Settings that go into the ajax call
    var settings = {
      async: true,
      crossDomain: true,
      url:
        "https://ott-details.p.rapidapi.com/advancedsearch?end_year=2020&start_year=1960&min_imdb=8.5&page=1&genre=" +
        genreChoice +
        "&type=movie&language=english&sort=highestrated",
      method: "GET",
      headers: {
        "x-rapidapi-host": "ott-details.p.rapidapi.com",
        "x-rapidapi-key": "18270a6435mshc7de6892f83a3d1p10f31ejsn44394324a00e",
      },
    };
    //Ajax Call
    $.ajax(settings).done(function (response) {
      //Generate random number
      var randomNums = [];
      var num = response.results.length;
      while (randomNums.length < 5) {
        var newRandom = Math.floor(Math.random() * num);
        if (!randomNums.includes(newRandom)) {
          randomNums.push(newRandom);
        }
      }
      for (var i = 0; i < 5; i++) {
        //Create Elements and Add Content

        //Variables that will hold content to dispaly on page
        var movieName = "";
        var movieSynopsis = "";
        var movieImage = "";
        var releaseDate = "";
        var movieRating = "";
        var movieId = "";
        //Adding ajax response to variables
        movieName = response.results[randomNums[i]].title;
        movieSynopsis = response.results[randomNums[i]].synopsis;
        //If movie synopsis is blank, display this message instead
        if (!movieSynopsis) {
          movieSynopsis =
            "This film must be truly fantastic because it has a great rating on IMDB. For one reason or another, OTT details api does not include a synopsis for this film, but I recommend you take a chance and give this movie a shot.";
        }
        //If movie image is blank, display placeholder image
        movieImage = response.results[randomNums[i]].imageurl;
        if (!movieImage[0]) {
          movieImage = "./assets/images/placeholder.jpg";
        }
        releaseDate = response.results[randomNums[i]].released;
        movieRating = response.results[randomNums[i]].imdbrating;
        movieId = response.results[randomNums[i]].imdbid;
        //Making elements that will appear on the DOM
        var movieCard = $("<div>")
          .addClass("card text-center mb-4")
          .attr("style", "height: 400px;");
        var cardBody = $("<div>")
          .addClass("card-body")
          .attr("style", "overflow: scroll");
        var cardTitle = $("<h6>").addClass("card-title").text(movieName);
        var cardFooter = $("<div>").addClass("card-footer sticky");
        var cardImage = $("<img>")
          .addClass("rounded float-left")
          .attr("src", movieImage)
          .attr("style", "width: 200px");
        var cardDate = $("<p>")
          .addClass("card-detail-text")
          .text("Year Released: " + releaseDate);
        var synopsis = $("<p>")
          .addClass("card-detail-text")
          .text("Plot: " + movieSynopsis);
        var cardRating = $("<p>")
          .addClass("card-detail-text")
          .text("IMDb Rating: " + movieRating);
        var cardId = $("<p>")
          .addClass("card-detail-text")
          .text("View movie details: ");
        var imdbLink = $("<a>").text("IMDB Link").attr({"href":"https://m.imdb.com/title/" + movieId, "target":"nw"});
        cardId.append(imdbLink);
        var chooseButton = $("<button>")
          .addClass("btn btn-sm submit-button chooseMovie")
          .text("CHOOSE MOVIE");
        //Display to Elements on the DOM

        //Append title, image synopsis and choose button to card body
        cardBody.append(
          cardTitle,
          cardImage,
          cardDate,
          cardRating,
          synopsis,
          cardId
        );
        //Append Button to footer
        cardFooter.append(chooseButton);
        //Append cardBody and card footer to movieCard
        movieCard.append(cardBody, cardFooter);
        //Append movieCard to movieDisplay
        movieDisplay.append(movieCard);
      }
    });
  }

  //Event Listeners

  //Button that will generate random movies 
  $("#generate-movie-button").on("click", function () {
    //Empty Container
    $("#view-movie-display").empty();
    //Function Calls
    topMovies();
  });

  //Saves movie selection to local storage
  $(document).on("click", ".chooseMovie", function (event) {
    event.preventDefault();
    localStorage.setItem("movie", $(this).parent().parent().html());
    // empty dinner container
    $("#view-your-movies").empty();
    //show h5
    $("#view-your-movies").append(
      $("<h5>").text("Thank you for submitting your movie option!")
    );
  });

  //button to move user to final page
  $("#submit-movie").on("click", function () {
    window.location.href = "./final.html";
  });
});
