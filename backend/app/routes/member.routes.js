module.exports = app => {
    const members = require("../controllers/member.controller.js");
    const auth = require('../middlewares/auth');
    var router = require("express").Router();
  
    // Create a new Member
    router.post("/signup", members.signup);

    // Login
    router.post("/login", members.login);
  
    // Retrieve all Member
    router.get("/", auth, members.findAll);

    // Retrieve all Posts from a given Member
    router.get("/:id/posts", auth, members.findAllPosts);
  
    // Retrieve a single Member with id
    router.get("/:id", auth, members.findOne);
  
    // Update a Member with id
    // router.put("/:id", members.update);
  
    // Delete a Member with id
    router.delete("/:id", auth, members.delete);
  
    // Delete all members
    // router.delete("/", members.deleteAll);
  
    app.use('/api/members', router);
};