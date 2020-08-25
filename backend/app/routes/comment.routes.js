module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
    const auth = require('../middlewares/auth');
    var router = require("express").Router();
  
    // Create a new Comment
    router.post("/", auth, comments.create);
  
    // Retrieve all comments from database
    // router.get("/", comments.findAll);
  
    // Retrieve a single Comment with id
    // router.get("/:id", comments.findOne);
  
    // Update a Comment with id
    // router.put("/:id", comments.update);
  
    // Delete a Comment with id
    router.delete("/:id", auth, comments.delete);
  
    // Delete all Comment
    // router.delete("/", comments.deleteAll);
  
    app.use('/api/comments', router);
  };