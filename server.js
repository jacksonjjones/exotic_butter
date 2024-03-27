// Importing required modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers'); // Importing routes from controllers
const helpers = require('./utils/helpers'); // Importing helper functions

// Importing database connection and session storage
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initializing express app
const app = express();
const PORT = process.env.PORT || 3001; // Setting the port

// Setting up Handlebars engine
const hbs = exphbs.create({ helpers }); // Creating Handlebars instance with helpers

// Session configuration
const sess = {
  secret: 'Super secret secret', // Secret key for session
  cookie: {}, // Cookie configuration
  resave: false, // Prevents re-saving unchanged session data
  saveUninitialized: true, // Saves uninitialized sessions
  store: new SequelizeStore({ // Using Sequelize to store session data in the database
    db: sequelize
  })
};

// Setting up session middleware
app.use(session(sess));

// Setting up Handlebars engine and views directory
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Parsing incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Using defined routes
app.use(routes);

// Syncing Sequelize models and starting the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening')); // Listening on the specified port
});
