//DOM variables
var dinnerContainer = $("#dinnerContainer");
var drinkContainer = $("#drinkContainer");
var generateDinnerButton = $("#generateDinnerButton");

$(document).ready(function () {
  //populate user choices from local storage to final page
  $(".finalDinner").html(localStorage.getItem("Dinner"));
  $(".finalDrink").html(localStorage.getItem("Drink"));
  // different meal categories: Beef, Chicken, Lamb, Pork, Seafood, Goat, Vegetarian
  //click event
  generateDinnerButton.on("click", function (event) {
    event.preventDefault();
    //clear out old cards
    clearCards();
    //empty array to store random numbers
    var randomNums = [];
    mealType = $("#foodChoice").val();
    var mealURL =
      "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + mealType;
    // ajax call to get 5 meals based on mealType
    $.ajax({
      url: mealURL,
      method: "GET",
    }).then(function (mealResponse) {
      //the length of possible meals
      var num = mealResponse.meals.length;
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
          //create dinner cards and append them to the page
          mealTitle = response.meals[0].strMeal;
          mealImage = response.meals[0].strMealThumb;
          mealRecipe = response.meals[0].strInstructions;
          mealYoutube = response.meals[0].strYoutube;
          dinnerCard = $("<div>")
            .addClass("card text-center mb-4")
            .attr("style", "height: 400px");
          cardBody = $("<div>")
            .addClass("card-body")
            .attr("style", "overflow: scroll");
          cardFooter = $("<div>").addClass("card-footer sticky");
          cardTitle = $("<h6>").text(mealTitle);
          cardImage = $("<img>")
            .addClass("rounded float-left")
            .attr("src", mealImage)
            .attr("style", "width: 200px");
          cardRecipe = $("<p>").addClass("card-detail-text").text(mealRecipe);
          cardYoutube = $("<a>")
            .attr({ href: mealYoutube, target: "nw" })
            .text("Youtube Link");
          cardButton = $("<button>")
            .addClass("btn btn-sm submit-button chooseDinner")
            .text("CHOOSE MEAL");
          cardRecipe.append(cardYoutube);
          cardBody.append(cardTitle, cardImage, cardRecipe);
          cardFooter.append(cardButton);
          dinnerCard.append(cardBody, cardFooter);
          dinnerContainer.append(dinnerCard);
        });
      }
    });
    // code to determine drink option
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
      drink = "Tequila";
    }
    //drink ajax call
    // var drink = "Bourbon";
    var drinkURL =
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drink;
    // ajax call to get 5 drinks based on mealType
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
          //iterate through possible ingredient properties of drink object.
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
          //create drink card elements
          drinkCard = $("<div>")
            .addClass("card text-center mb-4")
            .attr("style", "height: 400px");
          cardBody = $("<div>")
            .addClass("card-body")
            .attr("style", "overflow: scroll");
          cardFooter = $("<div>").addClass("card-footer sticky");
          cardTitle = $("<h6>").text(drinkTitle);
          cardImage = $("<img>")
            .addClass("rounded float-left")
            .attr("src", drinkImage)
            .attr("style", "width: 200px");
          cardRecipe = $("<p>")
            .addClass("card-detail-text")
            .text(drinkIngredients + drinkRecipe);
          cardButton = $("<button>")
            .addClass("btn btn-sm submit-button chooseDrink")
            .text("CHOOSE DRINK");
          //ammend elements to the HTML
          cardBody.append(cardTitle, cardImage, cardRecipe);
          cardFooter.append(cardButton);
          drinkCard.append(cardBody, cardFooter);
          drinkContainer.append(drinkCard);
        });
      }
    });
  });
  //clear out dinner and drink choices
  var clearCards = function () {
    drinkContainer.empty();
    dinnerContainer.empty();
    //append h5 to the page
    drinkContainer.append($("<h5>").text(" VIEW YOUR DRINK MENU:"));
    dinnerContainer.append($("<h5>").text(" VIEW YOUR DINNER MENU:"));
  };
  // Event Listeners
  $(document).on("click", ".chooseDinner", function (event) {
    event.preventDefault();
    //save whole card to local storage
    localStorage.setItem("Dinner", $(this).parent().parent().html());
    // empty dinner container
    dinnerContainer.empty();
    //show h5
    dinnerContainer.append(
      $("<h5>").text("Thank you for submitting your dinner option!")
    );
  });
  $(document).on("click", ".chooseDrink", function (event) {
    event.preventDefault();
    //save whole card to local storage
    localStorage.setItem("Drink", $(this).parent().parent().html());
    // empty dinner container
    drinkContainer.empty();
    //show h5
    drinkContainer.append(
      $("<h5>").text("Thank you for submitting your drink option!")
    );
  });
  // button to move user to dinner page
  $("#titleButton").on("click", function (event) {
    window.location.href = "./dinner.html";
  });
  // button to move user to movie page
  $("#submitDinner").on("click", function (event) {
    window.location.href = "./movie.html";
  });
  // button to move user to final page
  $("#submitMovie").on("click", function (event) {
    window.location.href = "./final.html";
  });
  // button to move user to starting page
  $("#returnButton").on("click", function (event) {
    window.location.href = "./index.html";
  });
});
