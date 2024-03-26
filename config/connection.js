// Importing the Sequelize library
const Sequelize = require('sequelize');

// Importing the dotenv library to load environment variables from a .env file
require('dotenv').config();

// Declaring a variable to hold the Sequelize instance
let sequelize;

// Checking if a JawsDB URL environment variable is set (for deployment on Heroku)
if (process.env.JAWSDB_URL) {
  // Creating a Sequelize instance using the JawsDB URL
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Creating a Sequelize instance using local database credentials
  sequelize = new Sequelize(
    process.env.DB_NAME,     // Database name
    process.env.DB_USER,     // Database username
    process.env.DB_PASSWORD, // Database password
    {
      host: 'localhost',     // Database host
      dialect: 'mysql',      // Database dialect (MySQL)
      port: 3306             // Database port
    }
  );
}

// Exporting the Sequelize instance
module.exports = sequelize;
