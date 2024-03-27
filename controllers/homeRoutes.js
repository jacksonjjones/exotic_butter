// Importing required modules and middleware
const router = require("express").Router(); // Importing Express Router
const { BlogPost, User, Comment } = require("../models"); // Importing models
const withAuth = require("../utils/auth"); // Importing authentication middleware

// Route to render the homepage
router.get("/", async (req, res) => {
  try {
    // Fetching all blog post data with associated user and comments
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["comment_body"],
        },
      ],
    });

    // Mapping blog post data to plain objects
    const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );

    // Rendering the homepage template with fetched data
    res.render("homepage", {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to render a single blog post page with associated user and comments
router.get("/blogPost/:id", withAuth, async (req, res) => {
  try {
    // Fetching blog post data by primary key with associated user and comments
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    // Converting blog post data to a plain object
    const blogPost = blogPostData.get({ plain: true });

    // Rendering the blog post template with fetched data
    res.render("blogPost", {
      ...blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to render the dashboard page with user's blog posts and comments
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Fetching user data by primary key with associated blog posts and comments
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: BlogPost,
          include: [User],
        },
        {
          model: Comment,
        },
      ],
    });

    // Converting user data to a plain object
    const user = userData.get({ plain: true });

    // Rendering the dashboard template with fetched data
    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to render the create post page
router.get("/create", async (req, res) => {
  try {
    // Checking if user is logged in and rendering the create post template accordingly
    if (req.session.logged_in) {
      res.render("create", {
        logged_in: req.session.logged_in,
        userId: req.session.user_id,
      });
      return;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to render the edit post page for a specific post
router.get("/create/:id", async (req, res) => {
  try {
    // Fetching specific blog post data by primary key with associated user and comments
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    // Converting blog post data to a plain object
    const blogPost = blogPostData.get({ plain: true });

    // Checking if user is logged in and rendering the edit post template accordingly
    if (req.session.logged_in) {
      res.render("edit", {
        ...blogPost,
        logged_in: req.session.logged_in,
        userId: req.session.user_id,
      });
      return;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to render the login page
router.all("/login", (req, res) => {
  // Redirecting to the dashboard page if user is already logged in, otherwise rendering the login page
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// Exporting the router module
module.exports = router;
