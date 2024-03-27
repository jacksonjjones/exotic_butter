// Importing Sequelize models
const User = require("./user"); 
const BlogPost = require("./blogPost"); 
const Comment = require("./comment"); 

// Defining relationships between tables for database queries
User.hasMany(BlogPost, { // A User can have many BlogPosts
  foreignKey: "user_id", // Foreign key used for the association
  onDelete: "CASCADE", // Deleting a User will also delete associated BlogPosts
});

BlogPost.belongsTo(User, { // A BlogPost belongs to a User
  foreignKey: "user_id", // Foreign key used for the association
});

User.hasMany(Comment, { // A User can have many Comments
  foreignKey: "user_id", // Foreign key used for the association
  onDelete: "CASCADE", // Deleting a User will also delete associated Comments
});

Comment.belongsTo(User, { // A Comment belongs to a User
  foreignKey: "user_id", // Foreign key used for the association
});

Comment.belongsTo(BlogPost, { // A Comment belongs to a BlogPost
  foreignKey: "blogPost_id", // Foreign key used for the association
  onDelete: "CASCADE", // Deleting a BlogPost will also delete associated Comments
});

BlogPost.hasMany(Comment, { // A BlogPost can have many Comments
  foreignKey: "blogPost_id", // Foreign key used for the association
  onDelete: "CASCADE", // Deleting a BlogPost will also delete associated Comments
});

// Exporting models for use in other modules
module.exports = { User, BlogPost, Comment };

