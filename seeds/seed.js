// Importing required modules
const sequelize = require('../config/connection'); 
const { User, Comment, BlogPost } = require('../models'); 

// Importing JSON data files
const userData = require('./userData.json'); 
const blogData = require('./blogPostData.json'); 
const commentData = require('./commentData.json'); 

// Function to seed the database with data
const seedDatabase = async () => {
  // Syncing Sequelize with the database and dropping existing tables
  await sequelize.sync({ force: true });

  // Creating users and storing the returned data
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Creating blog posts with random user IDs
  for (const blog of blogData) {
    await BlogPost.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // Creating comments and storing the returned data
  const comments = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  // Exiting the process after seeding the database
  process.exit(0);
};

// Calling the function to seed the database
seedDatabase();

