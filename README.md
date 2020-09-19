# The-Date-Night-Planner

The Date Night Planner is a web application created to assist individuals who can’t go out for a date night and are running out of ideas for date nights at home. This application reduces the pressure of finding new food, cocktails, and movies.

Our team accomplished this using HTML, CSS, JavaScript and Jquery, as well asThe Meal Db api, The Cocktail Db api, and Details Ott api.

We began with a wireframe to outline the desired appearance our web application:

[The Date Night Planner_01.pdf](https://github.com/erinleecrocker/Erin-my-responsive-portfolio/files/5248802/The.Date.Night.Planner_01.pdf)


This application starts with the Date Night planner home page, where the user is instructed to click the "Start your date" button. The user is taken to a page where they are able to choose the food base for their type of meal (chicken, seafood, vegitarian, etc.). After they lock in their decision by clicking the  "gennerate dinner" button their randomly generated recipie cards appear as well as suggested cocktail pairings. This is achieved through ajax queries to the theMealDb api, and theCocktailDb api, from where our suggestions originate and they are dynamically populated under their appropriate headings on the page. The user is then given a "choose meal" and "choose drink" option that adds the respective choice to local storage to be displayed on the final page. Then the user can click the "to movie choice", which will migrate them to the movie page. On the movie page the user is allowed to choose the genre of movie and after clicking the "generate movie" button, by using the ott details api and our code, random movies with a 8.5 imdb rating or above are randomly dynamically populated under the movie choices heading. The user again can select a movie and click the "see your date" button, and is brought to the final page. On the final page, under the heading "its a date" the user can view their selected date options that are dynamically populated from local storage. If they wish to choose again they can click the "new date" button and redo the process or choose meal, movie, or your date to change a specific aspect of their selection and return to the final page. 

to see the deployed site visit: https://cgriffin332.github.io/The-Date-Night-Planner/



