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
    console.log(mealResponse);
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
    console.log(randomNums);
    // iterate through random number array to present us with 5 random meals
    for (var i = 0; i < 5; i++) {
      console.log(mealResponse.meals[randomNums[i]]);
    }
    
  });
});
