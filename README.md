# GA PROJECT 3- FACECOOK

## BRIEF
My first full-stack project, as part of a group of 3, was to create an application using the full MERN stack. FaceCook is a social media app where you can share recipes and plan your meals. I thoroughly enjoyed this project and learnt a lot from the time spent working on it. 

My newly learnt technologies for this project were Express, Node.js, MongoDB and React Calendar. 

Made in collaboration with [Ryan Arnold](https://github.com/RY44) and [Ayo Afolabi](https://github.com/A-Afolabi).

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

## [OPEN IN BROWSER](https://gafacecook.herokuapp.com/)
Without logging in you can enjoy searching and browsing through recipes and view other faceCook users' profile pages. Please create an account and log in to experience additional features such as creating and editing a recipe, leaving comments, liking recipes and following fellow faceCook users, customising your own profile page, creating a meal plan and generating shopping lists for your selected periods. 

## OUTLINE
FaceCook is a social media application with the main purpose of being able to share your own recipes with other users. 

Users can find recipes on the home page in 3 ways: 
* Our featured recipes bar- These recipes are specially selected by the faceCook team to show on the homepage for a limited amount of time. 
* Our discover recipes bar- These recipes are randomly selected from all the recipes that have been uploaded to our site. This bar will refresh on every page visit. 
* Our search bar- Use our search bar to find specific recipes based on your search criteria. The search function will run through the recipe names, ingredients and tags to try to find all suitable matches. 

Once the user has found an interesting recipe they can click into that recipe to view a full detailed page including cooking time, meal type, the user who posted the recipe to the site, the average rating given by faceCook users, a description of the dish, the cooking method, ingredients, tags and reviews. If the user is logged in on this page, they can also save the recipe to their favourites or leave a review. 

If they like the dish and are interested to see what else the owner of this recipe has posted, they can click onto their profile page where they can see a profile card containing a self-written bio, a brief statistic of the quantity of their recipes, favourited recipes, followers and followings next to a more detailed list view of all their recipes and favourited recipes. If the user is logged in on this page, they can also follow or unfollow the user which gives them the benefit of their newly posted recipes showing up on their own profile page.

Additionally when the user is logged in and views their own profile page, they have the ability to update their name, bio and profile image as well as using another one of the site's main features- the meal plan calendar. To use the meal plan calendar, simply click on the date you want to plan your meals for, use the drop downs to select the meals and serving quantities you want and click confirm. Please note that the meal drop down consists only of your own meals or meals you have favourited. Also please note that not all the recipes have ingredients uploaded for each serving quantity so to get the best use of this feature and the shopping list feature, please ensure the meals you are selecting have the correct serving quantities for your needs.

To use the shopping list feature, once you have completed your meal plan for the time period you want, simply navigate to the shopping list page, select the dates for that time period and click 'Go'. This will generate a run down of your meal plan for this time period and a shopping list which condenses all the ingredients for each meal into one simple list.  

To view your own recipes and favourited recipes, you can navigate to the my recipes page where you are also prompted to the add recipe form. This is a simple and self explanatory form where you can upload your own recipes to the site.

## PLANNING
As this was our first project working in a group of more than two, we all felt that planning was going to be an important step in the project in order to all be behind a shared vision of what we want the final outcome to look like as well as giving us the ability to separate the work into different tasks that can be done by us individually. 

During our first meeting which was to pitch ideas to each other and decide on a general concept in which to run with, my idea was selected in addition to me adopting a team leader role. That night I spent time wireframing the front-end of the application to demonstrate the user experience and to help my project co-workers and I get behind a shared vision. Once I had the general front-end planned out I spent time creating a first draft data structure that we would need in the back-end in order to make it work.  

![initial wireframe](readme_assets/initial_wireframe.png)

The next day, we as a team reviewed the initial wireframe I made in order to develop and integrate ideas from all the team members. Once we had the idea fully formatted between us, we then went on to develop the branding in which we came up with a name, logo and general colour scheme and design we wanted to use on our front-end. This helped us formulate the final wireframe together. The final wireframe was extremely useful during the rest of production as it was easy to stick to and it meant that all the primary decision making was done, leaving us to code through each component and limited any kind of major revisions that would arise from inconsistencies between each of our work.   

![final wireframe](readme_assets/final_wireframe.png)

Having the final wireframe was also useful to then revise the initial back-end data structure I had come up with in which we pseudo-coded most parts of the front-end functionality. This really helped us understand the best way to structure our database and also list the controllers that we would need to code on the back-end to make it work. We all felt it was best to fully complete the back-end before moving on to the front-end to avoid any need for major revisions so it was important for us to be rigorous in this step.

We also took this opportunity of working in a group of 3 to utilise Trello. Once we had finalised planning everything that needed to be produced we then broke down the entire project into bitesize steps which we created a card for and added to the ToDo list on our Trello board. We also assigned each card a colour code to help us easily identify which part of the project that task is in and during production moved the card from the ToDo list to the WIP list and assigned our names to it so we can each keep track of who is working on what and when before then moving the card to the Complete list. We also had extra lists for stretch goals, and cards we wanted to revisit or review as a team as well as a separate list to list key information such as a link to our final wireframe or an example recipe to showcase the data structure that we decided upon.

![trello board](readme_assets/trello.png)

During production we had daily stand up meetings first thing in the morning in which we talked about any issues we were having and what we were aiming to achieve that day. For the rest of the day we typically remained on a shared Zoom call where we can ask each other for guidance or opinions as and when we needed it.  

We as a team decided to code the entire backend together and I also went on to code the home page and search page as well as the profile pages, my recipes page, shopping list and navigation bar.

## EXPRESS

Learning Express as a framework was a great introduction to developing our own back-end and introducing Node.js. We used Mongoose as the ODM to interact with our MongoDB database.

As mentioned above, the data structure was well planned out during the planning stage. We coded two models. One for the Users and one for the Recipes. Below is the code for the Recipe model in which, as well as the main Recipe schema, we included a sub schema for the reviews and also an average rating virtual field before calling them in the Mongoose model.

![recipe model](readme_assets/recipe_model.png)

We wanted to demonstrate all CRUD operations within our controllers. You can see all 4 operations coded to be used on the Recipe collection below. All 4 of the routes where these controllers are called, except the getOneRecipe controller, have a secure route middleware called before the controller (demonstrated below). This means that the user needs to be logged in when making these requests. However for the delete and edit controllers we wanted to implement an additional check so that only the owner of the recipe can delete or edit their recipe. We also implemented in this check that a faceCook admin user can also delete or edit a recipe. This is so we can safeguard against unwanted content on our site.

![CRUD](readme_assets/CRUD.png)

As mentioned above we included a secure route middleware. In this function we used the jwt.verify method in order to verify the token before using it to see if it matches a user in our database and only then will the controller pass. 

![secure route](readme_assets/secure_route.png)

![routes](readme_assets/routes.png)


## CONCLUSION AND KEY LEARNING

There was a lot to get our head around with this introduction to creating our own back-end. There was the general concept of the MERN stack and how each of these interacted with each other as well as understanding individual elements like JSON Web Tokens, authentication, what controllers are and how they interact with the models and database and building the routes so clients can make requests to our API.

This project really emphasised to me the importance of documentation and gave me a lot of opportunity to practise finding the information I needed and the confidence to implement my findings in my own code.  

It was great working in a team with Ryan and Ayo and I feel like we did well to keep organised and thoroughly plan through the project before diving into the code. We worked efficiently and complemented each other's strengths and helped each other when needed. I am looking forward to working in a team with other software professionals moving forward in my career. 

#### CHALLENGES
* Devising the best UX in which to implement the meal plan MVP. 

#### WINS
* Carrying out very detailed planning that helped us structure the backend and agree on a clear conception for the front end.
* Getting to grips with the full MERN stack and further developing my React skills.
* Working well in a team.

## FUTURE IMPROVEMENTS

Incorporate nutritional information in the recipes similar to MyFitnessPal. This would be an awesome feature in the meal plan and shopping list so that you can see a breakdown of your nutritional information across any given period. 

At the moment the shopping list functionality is not optimal in that often it will have 2 or more of the same ingredient that doesn't compile (i.e. '10 grams' & '30 g' will show as 2 different item lists rather than combining to show '40 g'). Having dropdowns for the measurements and suggested items in the add recipe form would be a good step or to write code that can recognise the common similar measurements and items.

Currently the user needs to be aware of how many servings are in each recipe whilst building their meal plan. It would be good to code the drop down list so that the serving quantities that the recipe owner did not input are blocked out from the options. 

I would love to develop the search function much more but due to the limited time for this project it only searches for the string inputted in the search bar to an exact match in either the recipe names, ingredients or tags. An example improvement would be if you typed in 'Onions' rather than 'Onion' it would find you the same results.  

#### KNOWN BUGS
We use the cloud-based image service, Cloudinary to upload the users' recipe and profile images and then on display, link them to the Cloudinary URL. Since deployment, the images upload to cloudinary fine but our site is showing the default placeholder.

If you follow one user, all users then show an 'Unfollow' button on their profile even if you do not follow them. To follow any additional user after the first one you have to press the 'unfollow' button and then the 'follow' button.  


## CONTACT
I would love to receive any feedback or hear about any of your similar projects. Please get in touch!

tonyhaunschmidt@gmail.com

[tonyhaunschmidt.com](https://www.tonyhaunschmidt.com/)

[LinkedIn/tonyhaunschmidt](https://www.linkedin.com/in/tony-haunschmidt/)

[My GitHub Profile and Other Projects](https://github.com/tonyhaunschmidt)


![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)
​
# Deployment of MERN app on Heroku
​
## 1. Create an account with Heroku
​
We will use Heroku to deploy both our Django and Node applications. If you have already set up a Heroku account with a previous project you can skip this step.
​
- Sign up for an account [Heroku | Sign up](https://signup.heroku.com/)
​
- Add a payment method to your account, we will use a free database tier in this guide which will not charge you, you need a fair amount of traffic before any costs will be incurred.
​
- Install the Heroku Command Line Tools with Homebrew `brew tap heroku/brew && brew install heroku`
<br><br>
## Mongo Atlas
​
​We need to setup an account with Mongo Atlas so that we can have a working database once we deploy to Heroku.</br>
​
### Make an account
​
Create MongoDB Atlas account at mongodb.com
​
### Create a Database & Cluster
​
1. When you have signed up and you are on your dashboard you should see a big green button labelled "Build a Database". Click it.
​
2. From here, select the "Shared" tier and click "Create"
​
3. Next you will see the "Create a Shared Cluster" screen. Here we want to select the following options. The provider should be AWS, and under the europe region, select "Ireland (eu-west-1)"
​
4. Finally click "Create Cluster". This may take a while so just wait until it's complete.​
​
### Getting connected
​
5. When the cluster is complete, you should see a form in which you can create a username and password. Make sure you make a note of the user and the password. The password should be strong, so you could use the "autogenerate secure password" option. Don't forget to click the "Create User" button once you've filled out the username and password fields. Once you've done this, you should see the user that's been created appear below.
​
6. Below the "Where would you like to connect from?" section, leave the option as My Local Environment, and we will allow access from everywhere. To do this, click the blue "Network Access Page" link which will take you to another page. On this page click "Add IP Address" which will open a popup. Click "ALLOW ACCESS FROM ANYWHERE" and click "Confirm".
​
7. Click 'Finish and Close". Click "Go to Database". On your newly created cluster, click Connect -> Connect your application and then copy the mongodb URI string in the code block on the page.
​
8. The final page will present you with a connection string, but will have placeholder values in it, **you should make a copy of this**. It will look something like:
​
```
mongodb+srv://<username>:<password>@cluster0.tzyg4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```
​
The <username> and <password> will need to be replaced with your username and password you created previously. Don't leave in the <>.
​
To sum up, make sure you’ve made a note of:
​
- Your username
- Your password
- Your connection string
​
​<br>
## Preparing for deployment
​
#### Make sure your main/master branch is checked out in your terminal and up to date. Heroku always used the main/master despite whether you run all the below from development or a feature branch
​
### Setup
​
- **All of the below is in relation to your server directory (root directory). cd into it.**
​
- In your `package.json` (server directory) add the following commands to your scripts. If you already have commands in there, just add these to the end:
​
  ```json
  "scripts": {
    "start": "node index.js",
    "heroku-postbuild": "cd client && npm install --only=dev && npm install && npm run build"
  }
  ```
​
- If you haven't been using a .env file to store your environment variables, in the root, add the “dotenv” package by running `yarn add dotenv`, this will allow our application to read values from a `.env` file.
​
- The app now needs to be prepared to serve your backend. Update `index.js` to be like the following.
​
- Below your existing imports, add:
```js
import 'dotenv/config' // only needs to be added if it doesn't already exist
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
​
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
​
```
​
- Then below your router in your startServer function, add **IN ORDER**:
```js
// Router
app.use('/api', router)
​
// ** New lines **
app.use(express.static(path.join(__dirname, 'client', 'build')))
​
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})
```
​
- If the above aren't in order, then it could break the routing.
​
<br>
​
## Deployment to Heroku
​
- Run all of the commands from the **server(root) directory** of the project.
​
- Login to Heroku through the Heroku CLI `heroku login`
​
- Create a new Heroku project, replacing project name with one of your choice `heroku create —-region=eu project-name` _ensure there is a double dash before region_ (if there is an error regarding the project name not being a valid command, omit the --region flag)
​
- Heroku doesn't have your .env file so we need to create environment variables so it can create one for us. We'll do this now. Heroku takes specific names for things, so your config variables should be named in all caps in the way we do it below, and also wherever you reference the PORT, DB_URI & SECRET in your code, you need to change that to `process.env.PORT`, `process.env.DB_URI` & `process.env.SECRET` (usually /index.js, /seeds/seeds.js, /config/secureRoute.js & /controllers/auth.js). This is a vital step.
​
- **PORT variable**: `heroku config:set PORT=4000`
​
- It's important that you set it as PORT not port, as this is what heroku looks for. 
​
- **DB_URI variable** (you should have this written down from when we created the cluster on MongoAtlas. Remember to pass in your username, password & db name in place of the placeholder - there is a full example how this should look below the next header in the code block): `heroku config:set DB_URI="mongodb+srv://<username>:<password>@cluster0.8y00m.mongodb.net/<database_name>?retryWrites=true&w=majority"`
​
- **SECRET variable**: `SECRET='your secret goes here'`
​
- You can check all of your set environment variables by running the command `heroku config` and should get an output that looks something like this:
​
  ```sh
  === sei-3-test Config Vars
  DB_URI:    mongodb://heroku_825rmnpr:ehe8i1d871jv4tqp49lbvqh1i0@ds235078.mlab.com:35078/heroku_825rmnpr
  PORT:      4000
  SECRET:    jgoirejfoijeriof
  ```
​
- now git add and git commit as you would usually with your git repos, but don't push yet.
​
- Once you've added and commited, you can push to heroku: `git push heroku main`
​
- If the deployment does not produce and error, test with `heroku open`. This should open your browser at your website. Take note of the production URL.
​
- To run your seeds command on your production site, from your project root run `heroku run npm run seed`
​
<br>
​
## Redeployment to Heroku
​
- If you need to redeploy (in case of an error etc) then it's the same process as deployment. There needs to be a fresh commit though, so you need to make sure you update something in the files, add and commit it, before running `git push heroku main` again. Even if this is just adding/removing a comment to force it.
​
- If you get a message saying it failed to start, then you can run `heroku logs --tail` to see a log of any errors that have occurred.
​
### Common Errors
​
#### ECONNREFUSED 
- this is to do with mongodb not being able to connect but there could be many reasons. Common ones are that you've not set up the config variable correctly. Remember you need to replace the `<username>`, `<password>` & `<database_name>` with the actual username, password and db name you set up. If in doubt, go to Atlas, and on your cluster click connect->connect your application -> and copy the uri string, replacing the password.
- Another cause for this error could be that you haven't correctly replaced the variables in the code. Remember everywhere we use these variables should now be written: `process.env.PORT`, `process.env.DB_URI` & `process.env.SECRET`
​
#### 'start' or "heroku-postbuild" script not found
- This is when you haven't added the commands to the scripts key in the package.json in the root directory. Remember it has to be inside the scripts key like:
```json
"scripts": {
  "start": "node index.js",
  "heroku-postbuild": "cd client && npm install --only=dev && npm install && npm run build"
}
```
​
#### It's up but it's empty
- This may be because you haven't seeded yet. To run your seeds command on your production site, from your project root run `heroku run npm run seed`
​
#### Make sure you are making your changes on the main/master branch
- Remember that if you make changes on your development branch and push changes from there, it will still use your main/master branch. Make sure you've checked out your main/master before doing all of the above.
​
<br>
​
## Fin
​
At this point, your app should be live. Both servers will be hosted on the same url, with your express server statically serving your React files, rather than proxying. Test your site and make sure everything is working as expected, if it's not you can check for errors by running the following command from your project root: `heroku logs --tail`