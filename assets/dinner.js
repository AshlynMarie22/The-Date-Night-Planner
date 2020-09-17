var dinnerContainer = $("#dinnerContainer");

$(document).ready(function () {
  // different meal categories: Beef, Chicken, Lamb, Pork, Seafood, Goat, Vegetarian
  //later set this to $("#foodChoice").val()
  var mealType = "Chicken";
  var mealURL =
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + mealType;
  // ajax call to get 5 meals based on mealType
  $.ajax({
    url: mealURL,
    method: "GET",
  }).then(function (mealResponse) {
    //the length of possible meals
    var num = mealResponse.meals.length;
    //empty array to store random numbers
    var randomNums = [];
    //create random array of 5 numbers
    while (randomNums.length < 5) {
      var newRandom = Math.floor(Math.random() * num);
      if (!randomNums.includes(newRandom)) {
        randomNums.push(newRandom);
      }
    }
    // iterate through random number array to present us with 5 random meals
    var mealTitle = "";
    var mealImage = "";
    var mealId = "";
    var recipeURL = "";
    for (var i = 0; i < 5; i++) {
        console.log(randomNums);

      mealId = mealResponse.meals[randomNums[i]].idMeal;
      //generate url with meal id
      recipeURL =
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId;
      $.ajax({
        url: recipeURL,
        method: "GET",
      }).then(function (response) {
          mealTitle = response.meals[0].strMeal;
          mealImage = response.meals[0].strMealThumb;
          mealRecipe = response.meals[0].strInstructions;
          mealYoutube = response.meals[0].strYoutube;
          dinnerCard = $("<div>").addClass("card text-center");
          cardBody = $("<div>").addClass("card-body");
          cardTitle = $("<h6>").text(mealTitle);
          cardImage = $("<img>").addClass("rounded float-left").attr("src", mealImage);
          cardRecipe = $("<p>").addClass("card-detail-text").text(mealRecipe);
        cardYoutube = $("<a>").attr("href", mealYoutube).text("Youtube Link");
          cardButton = $("<button>").addClass("btn btn-sm submit-button").text("Choose Meal");
          cardRecipe.append(cardYoutube)
          cardBody.append(cardTitle, cardImage, cardRecipe, cardButton);
          dinnerCard.append(cardBody);
          dinnerContainer.append(dinnerCard);

          console.log(dinnerCard);
          console.log(cardBody);
          console.log(cardTitle);

        // console.log(mealTitle);
        // console.log(mealImage);
        // console.log(mealRecipe);
        // console.log(mealYoutube);
      });
    }
  });
});


// Event Listeners

$("#titleButton").on("click", function(event){
    window.location.href = "./dinner.html";
})