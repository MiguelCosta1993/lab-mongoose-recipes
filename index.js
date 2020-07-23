const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//RECIPES *****
const newRecipe = {
  title: 'Spaghetti Carbonara',
  level: 'Easy Peasy',
  ingredients: [
    'Spaghetti',
    'Pancetta',
    'Pecorino cheese',
    'Parmesan cheese',
    'Eggs',
    'Garlic',
    'Unsalted butter',
    'Black pepper',
    'Sea salt'
  ],
  cuisine: 'Italian',
  dishType: 'main_course',
  image:
    'https://www.romeing.it/wp-content/uploads/2017/06/la-carbonara-Eggs-770x577.jpg',
  duration: 35
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Recipe.create(newRecipe);
  })
  .then(data => {
    console.log('created new Recipe', data);
    return Recipe.find({ title: 'Spaghetti Carbonara' });
  })
  .then(recipes => {
    console.log('found this new Recipe', recipes);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(recipes => {
    recipes.map(recipe => console.log(recipe.title));
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
