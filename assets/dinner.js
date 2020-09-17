$(document).ready(function () {
  // different meal categories: Beef, Chicken, Lamb, Pork, Seafood, Goat, Vegetarian
  //later set this to $("#foodChoice").val()
  var mealType = "Chicken";
  var mealURL =
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + mealType;

  $.ajax({
    url: mealURL,
    method: "GET",
  }).then(function (mealResponse) {
    console.log(mealResponse);
    var num = mealResponse.meals.length;
    var randomNums = [];
    while (randomNums.length < 5) {
      var newRandom = Math.floor(Math.random() * num);
      if (!randomNums.includes(newRandom)) {
        randomNums.push(newRandom);
      }
    }
    console.log(randomNums);
    for (var i = 0; i < 5; i++) {
      console.log(mealResponse.meals[randomNums[i]]);
    }
  });
});
