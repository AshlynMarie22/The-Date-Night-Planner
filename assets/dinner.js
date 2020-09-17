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
    for (var i = 0; i < 5; i++) {
      var mealTitle = mealResponse.meals[randomNums[i]].strMeal;
      var mealImage = mealResponse.meals[randomNums[i]].strMealThumb;
      var mealId = mealResponse.meals[randomNums[i]].idMeal;
      var recipeURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId;
      $.ajax({
          url: recipeURL,
          method: "GET",
      }).then(function(response){
        console.log(response.meals[0].strInstructions);
      })
    }
  });
});
