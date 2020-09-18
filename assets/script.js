var movieDisplay = $("#view-movie-display");
var selectionHistory = localStorage.getItem("selectionHistory");
var choice = [];

if (selectionHistory === null) {
  selectionHistory = [];
} else {
  selectionHistory = JSON.parse(selectionHistory);
}

$(document).ready(function () {
  console.log("Hello World");
  //Populate User's movie choice to final page
  $(".finalMovie").html(localStorage.getItem("movie"));
  //Event Listeners
  $("#movie-input-group").change(function () {
    console.log("You selected: " + this.value);
    var genreChoice = this.value;
    var settings = {
      async: true,
      crossDomain: true,
      url:
        "https://ott-details.p.rapidapi.com/advancedsearch?end_year=2020&start_year=2019&min_imdb=6&page=1&genre=" +
        genreChoice +
        "&type=movie&language=english&sort=highestrated",
      method: "GET",
      headers: {
        "x-rapidapi-host": "ott-details.p.rapidapi.com",
        "x-rapidapi-key": "51e195c5admsh789132d4252bb28p1f13fajsn58f45623a2aa",
      },
    };
    function topMovies() {
      $.ajax(settings).done(function (response) {
        for (var i = 0; i < 5; i++) {
          console.log(response.results[i]);
          console.log("Movie Title: " + response.results[i].title);
          console.log("IMDB Rating: " + response.results[i].imdbrating);
          console.log("Synopsis: " + response.results[i].synopsis);
          console.log("Image URL: " + response.results[i].imageurl[i]);
          //Create Elements and Add Content
          var movieName = "";
          var movieSynopsis = "";
          var movieImage = "";
          movieName = response.results[i].title;
          movieSynopsis = response.results[i].synopsis;
          movieImage = response.results[i].imageurl;
          // console.log(movieImage);
          var movieCard = $("<div>")
            .addClass("card text-center")
            .attr("style", "height: 400px;");
          var cardBody = $("<div>")
            .addClass("card-body")
            .attr("style", "overflow: scroll");
          var cardTitle = $("<h6>").addClass("card-title").text(movieName);
          var cardFooter = $("<div>").addClass("card-footer sticky");
          var cardImage = $("<img>")
            .addClass("rounded")
            .attr("src", movieImage)
            .attr("style", "width: 200px");
          var synopsis = $("<p>")
            .addClass("card-detail-text")
            .text(movieSynopsis);
          var chooseButton = $("<button>")
            .addClass("btn btn-sm submit-button chooseMovie")
            .text("Choose Movie");
          //Display to Page
          //Append title, image synopsis and choose button to card body
          cardBody.append(cardTitle, cardImage, synopsis);
          //Append Button to footer
          cardFooter.append(chooseButton);
          //Append cardBody and card footer to movieCard
          movieCard.append(cardBody, cardFooter);
          //Append movieCard to movieDisplay
          movieDisplay.append(movieCard);
        }
      });
    }
    $("#generate-movie-button").on("click", function () {
      console.log("I've been clicked");
      //Function Calls
      topMovies();
    });

    //Saves movie selection to local storage
    $(document).on("click", ".chooseMovie", function (Event) {
      event.preventDefault();
      console.log($(this).parent().parent().html());
      localStorage.setItem("movie", $(this).parent().parent().html());
    });

    //button to move user to final page
    $("#submit-movie").on("click", function () {
      window.location.href = "./final.html";
    });
  });
});
