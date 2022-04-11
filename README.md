# GA PROJECT 3- FACECOOK

## BRIEF
My first full-stack project, as part of a group of 3, was to create an application using the full MERN stack. FaceCook is a social media app where you can share recipes and plan your meals. I thoroughly enjoyed this project and learnt a lot from the time spent working on it, including the importance of planning and what kind of pitfalls to look out for when designing your own back-end as well as developing productive ways to share and organise the workload using Trello and having daily meetings.

I adopted a role as team leader in this project and developed the initial idea and wire framing and plan for the back-end data structure. We as a team decided to code the entire backend together and I also went on to code the home page and search page as well as the profile pages, my recipes page, shopping list and navigation bar.

My newly learnt technologies for this project were Express, Node.js, MongoDB and React Calendar. 

## TIMEFRAME

7 Days

## TECHNOLOGIES
* JavaScript
* HTML
* CSS
* SASS
* React
* React Calendar
* Node.js
* Express
* Mongoose
* MongoDB

## [OPEN IN BROWER](https://gafacecook.herokuapp.com/)
Without logging in you can enjoy searching and browsing through recipes and view other faceCook users' profile pages. Please create an account and log in to experience additional features such as creating and editing a recipe, leaving comments, liking recipes and following fellow faceCook users, customising your own profile page, creating a meal plan and generate shopping lists for your selected periods. 

## OUTLINE
FaceCook is a social media application with the main purpose of being able to share your own recipes with other users. 

Users can find recipes on the home page in 3 ways: 
* Our featured recipes bar- These recipes are specially selected by the faceCook team to show on the homepage for a limited amount of time. 
* Our discover recipes bar- these recipes are randomly selected from all the recipes that have been uploaded to our site. This bar will refresh on every page visit. 
* Our search bar- use our search bar to find specific recipes based on your search criteria. The search function will run through the recipe names, ingredients and tags to try find all suitible matches. 

Once the user has found an interesting recipe they can click into that recipe to view a full detailed page including cooking time, meal type, the user who posted the recipe to the site, the average rating given by faceCook users, a description of the dish, the cooking method, ingredients, tags and reviews. If the user is logged in on this page, they can also save the recipe to their favourites or leave a review. 

If they like the dish and are interested to see what else the owner of this recipe has posted, they can click onto their profile page where they can see a profile card containing a self-written bio, a brief statistic of the quantity of their recipes, favourited recipes, followers and followings next to a more detailed list view of all their recipes and favourited recipes. If the user is logged in on this page, they can also follow or unfollow the user which gives them the benifit of their newly posted recipes showing up on their own profile page.

Additionally when the user is logged in and views their own profile page, they have the ability to update their name, bio and profile image as well as using another one of the sites main features- the meal plan calendar. To use the meal plan calendar, simply click on the date you want to plan your meals for, use the drop downs to select the meals and serving quantities you want and click confirm. Please note that the meal drop down consists only of your own meals or meals you have favourited. Also please note that not all the recipes have ingredients uploaded for each serving quantity so to get the best use of this feature and the shopping list feature, please ensure the meals you are selecting have the correct serving quantities for your needs.

To use the shopping list feature, once you have completed your meal plan for the time period you want, simply navigate to the shopping list page, select the dates for that time period and click 'Go'. This will generate a run down of your meal plan for this time period and a shopping list which condenses all the ingredients for each meal into one simple list.  

To view your own recipes and favourited recipes, you can navigate to the my recipes page where you are also prompted to the add recipe form. This is a simple and self explanitory form where you can upload your own recipes to the site.

## PLANNING
As this was our first project working in a group of more than two, we all felt that planning was going to be an important step in the project in order to all be behind a shared vision of what we want the final outcome to look like as well as giving us the ability to seperate the work into different tasks that can be done by us individually. 

During our first meeting which was to brainstorm ideas and decide on a general concept in which to run with, my idea was selected in addition to me adopting a team leader role. That night I spent time wireframing the front-end of the application to demonstrate the user experience and to help my project co-workers and I get behind a shared vision. Once I had the general front-end planned out I spent time creating a first draft data structure that we would need in the back-end in order to make it work.  

{detailed wireframe}

The next day, we as a team reviewed the initial wireframe I made in order to develop and integrate ideas from all the team members. Once we had the idea fully formated between us, we then went on to develop the branding in which we came up with a name, logo and general colour scheme and design we wanted to use on our front-end. This helped us formulate the final wireframe together. The final wireframe was extremely useful during the rest of production as it was easy to stick to and it meant that all the primary desicion making was done, leaving us to code through each component and limited any kind of major revisions that would arise from inconsistancies between each of our work.   

{final wireframe}

Having the final wireframe was also useful to then revise the initial back-end data structure I had come up with in which we pseudo coded most parts of the font-end functionality. This really helped us understand the best way to structure our database and also list the controllers that we would need to code on the back-end to make it work. We all decided that it would be the most optimal if we had no cross over between the front-end and back-end production, i.e. we wanted to fully complete the back-end before moving on to the front-end to again, avoid any need for major revisions.

We also took this opportunity of working in a group of 3 to utilise Trello. Once we had finalised planning everything that needs to be produced we then broke down the entire project into bitesize steps which we created a card for and added to the ToDo list on our Trello board. We also assigned each card a colour code to help us easily identify which part of the project that task is in and during production moved the card from the ToDo list to the WIP list and assigned our names to it so we can each keep track of who is working on what and when before then moving the card to the Done list. We also had extra lists for stretch goals, and cards we wanted to revisit or review as a team as well as a seperate list to list key information such as a link to our final wireframe or an example recipe to showcase the data structure that we decided upon.

{trello board}

During production we had daily stand up meetings first thing in the morning in which we talked about any issues we were having and what we were aiming to acheive that day. For the rest of the day we typically remained on a shared Zoom call where we can ask each other for guidance or opinions as and when we needed it.  

## EXPRESS

Learning Express as a framework was a great introduction to developing our own back-end and introducing Node.js. We used Mongoose as the ODM to interact with our MongoDB database.

As mentioned above, the data structure was well planned out during the plannning stage. We coded two models. One for the Users and one for the Recipes. Below is the code for the Recipe model in which, aswell as the main Recipe schema, we included a sub schema for the reviews and also an average rating virtual field before calling them in the Mongoose model.

[recipe model]

We wanted to demonstrate all CRUD operations within our controllers. You can see all 4 operations coded to be used on the Recipe collection below. All 4 of the routes where these controllers are called, except the getOneRecipe controller, has a secure route middleware called before the controller (demonstrated below). This means that the user needs to be logged in or, if using an API client like insomnia, have a valid bearer token. However for the delete and edit controllers we wanted to impliment an additional check so that only the owner of the recipe can delete or edit their recipe. We also implimented in this check that a faceCook admin user can also delete or edit a recipe. This is so we can safe guard against unwanted content on our site.

[recipe CRUD controllers]

As mentioned above we included a secure route middleware. In this function we used the jwt.verify method in order to verify the token before using it to see if it matches a user in our database and only then will the controller pass. 

{securerRoute}
{Routes}


## CONCLUSION AND KEY LEARNING




## FUTURE IMPROVEMENTS

#### KNOWN BUGS
We use the cloud-based image service, Cloudinary to upload the users' recipe and profile images and then on display, link them to the Cloudinary URL. Since deployment, the images upload to cloudinary fine but our site is showing the default place holder.

If you follow one user, all users then show an 'Unfollow' button on their profile even if you do not follow them. To follow any additional user after the first one you have to press the 'unfollow' button and then the 'follow' button.  


## CONTACT
I would love to receive any feedback or hear about any of your similar projects. Please get in touch!

tonyhaunschmidt@gmail.com

[tonyhaunschmidt.com](https://www.tonyhaunschmidt.com/)

[LinkedIn/tonyhaunschmidt](https://www.linkedin.com/in/tony-haunschmidt/)

[My GitHub Profile and Other Projects](https://github.com/tonyhaunschmidt)
