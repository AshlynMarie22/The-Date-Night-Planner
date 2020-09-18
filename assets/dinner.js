var dinnerContainer = $("#dinnerContainer");
var drinkContainer = $("#drinkContainer");

var generateDinnerButton = $("#generateDinnerButton");

$(document).ready(function () {
  // different meal categories: Beef, Chicken, Lamb, Pork, Seafood, Goat, Vegetarian
  //click event
  generateDinnerButton.on("click", function (event) {
    event.preventDefault();
    //clear out old cards
    clearCards();
    //later set this to $("#foodChoice").val()
    var randomNums = [];
    mealType = $("#foodChoice").val();
    console.log(mealType);
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
          dinnerCard = $("<div>")
            .addClass("card text-center mb-4")
            .attr("style", "height: 400px; overflow: scroll");
          cardBody = $("<div>").addClass("card-body");
          cardTitle = $("<h6>").text(mealTitle);
          cardImage = $("<img>")
            .addClass("rounded float-left")
            .attr("src", mealImage)
            .attr("style", "width: 200px");
          cardRecipe = $("<p>").addClass("card-detail-text").text(mealRecipe);
          cardYoutube = $("<a>").attr("href", mealYoutube).text("Youtube Link");
          cardButton = $("<button>")
            .addClass("btn btn-sm submit-button")
            .text("Choose Meal");
          cardRecipe.append(cardYoutube);
          cardBody.append(cardTitle, cardImage, cardRecipe, cardButton);
          dinnerCard.append(cardBody);
          dinnerContainer.append(dinnerCard);
        });
      }
    });
    // code to determine drink option
    // later set "choice" to $("#foodChoice").val()

    if (mealType === "Beef") {
      drink = "Scotch";
    } else if (mealType === "Seafood") {
      drink = "Rum";
    } else if (mealType === "Pork") {
      drink = "Bourbon";
    } else if (mealType === "Lamb") {
      drink = "Gin";
    } else if (mealType === "Chicken") {
      drink = "Vodka";
    } else {
      drink = "Tequila";}

    //drink ajax call
    // var drink = "Bourbon";
    var drinkURL =
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drink;
    // ajax call to get 5 meals based on mealType
    $.ajax({
      url: drinkURL,
      method: "GET",
    }).then(function (drinkResponse) {
      //the length of possible drinks
      var drinkNum = drinkResponse.drinks.length;
      //empty array to store random numbers
      var randomNums2 = [];
      //create random array of 5 numbers
      while (randomNums2.length < 5) {
        var newRandom2 = Math.floor(Math.random() * drinkNum);
        if (!randomNums2.includes(newRandom2)) {
          randomNums2.push(newRandom2);
        }
      }
      //generate 5 different drink id's
      for (var i = 0; i < 5; i++) {
        var drinkId = drinkResponse.drinks[randomNums2[i]].idDrink;
        console.log(drinkId);
        //use the drink id's to generate info for 5 different cocktails url's
        drinkInfoURL =
          "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;
        //make the ajax call
        $.ajax({
          url: drinkInfoURL,
          method: "GET",
        }).then(function (response) {
          //create drink variables
          drinkTitle = response.drinks[0].strDrink;
          drinkImage = response.drinks[0].strDrinkThumb;
          drinkRecipe = response.drinks[0].strInstructions;
          //iterate through possible ingredient properties of drink object
          drinkIngredients = "Ingredients: ";
          if (response.drinks[0].strIngredient1) {
            drinkIngredients += response.drinks[0].strIngredient1 + ", ";
          }
          if (response.drinks[0].strIngredient2) {
            drinkIngredients += response.drinks[0].strIngredient2 + ", ";
          }
          if (response.drinks[0].strIngredient3) {
            drinkIngredients += response.drinks[0].strIngredient3 + ", ";
          }
          if (response.drinks[0].strIngredient4) {
            drinkIngredients += response.drinks[0].strIngredient4 + ", ";
          }
          if (response.drinks[0].strIngredient5) {
            drinkIngredients += response.drinks[0].strIngredient5 + ", ";
          }
          if (response.drinks[0].strIngredient6) {
            drinkIngredients += response.drinks[0].strIngredient6 + ", ";
          }
          if (response.drinks[0].strIngredient7) {
            drinkIngredients += response.drinks[0].strIngredient7 + ", ";
          }
          if (response.drinks[0].strIngredient8) {
            drinkIngredients += response.drinks[0].strIngredient8 + ", ";
          }
          //create DOM elements
          drinkCard = $("<div>")
            .addClass("card text-center mb-4")
            .attr("style", "height: 400px; overflow: scroll");
          cardBody = $("<div>").addClass("card-body");
          cardTitle = $("<h6>").text(drinkTitle);
          cardImage = $("<img>")
            .addClass("rounded float-left")
            .attr("src", drinkImage)
            .attr("style", "width: 200px");
          cardRecipe = $("<p>")
            .addClass("card-detail-text")
            .text(drinkIngredients + drinkRecipe);
          cardButton = $("<button>")
            .addClass("btn btn-sm submit-button")
            .text("Choose Drink");
          //ammend elements to the HTML
          cardBody.append(cardTitle, cardImage, cardRecipe, cardButton);
          drinkCard.append(cardBody);
          drinkContainer.append(drinkCard);
        });
      }
    });
  });
  //clear out dinner and drink choices
  var clearCards = function(){
      drinkContainer.empty();
      dinnerContainer.empty();
      drinkContainer.append($("<h5>").text(" VIEW YOUR DRINK MENU:"))
      dinnerContainer.append($("<h5>").text(" VIEW YOUR DINNER MENU:"))
  }
  // Event Listeners

  $("#titleButton").on("click", function (event) {
    window.location.href = "./dinner.html";
  });
});
