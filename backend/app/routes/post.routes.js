module.exports = app => {
    const posts = require("../controllers/post.controller.js");
    const auth = require('../middlewares/auth');
    var router = require("express").Router();
  
    // Create a new Post
    router.post("/", auth, posts.create);
  
    // Retrieve all Post
    router.get("/", auth, posts.findAll);
  
    // Retrieve a single Post with id
    router.get("/:id", auth, posts.findOne);

    // Retrieve all comments from a single post
    router.get("/:id/comments", auth, posts.findAllComments);
  
    // Update a Post with id
    // router.put("/:id", posts.update);
  
    // Delete a Post with id
    router.delete("/:id", auth, posts.delete);
  
    // Delete all Post
    // router.delete("/", posts.deleteAll);
  
    app.use('/api/posts', router);
  };