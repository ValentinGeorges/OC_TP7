const db = require("../models");
const Comment = db.comments;
const Post = db.posts;
const Member = db.members;
const Op = db.Sequelize.Op;

// Create and Save a new Comment
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Comment
    const comment = {
      content: req.body.content,
      MemberId: req.body.MemberId,
      PostId: req.body.PostId
    };
  
    // Save Comment in the database
    Comment.create(comment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Comment."
        });
      });
};

// Retrieve all Comments from the database.
exports.findAll = (req, res) => {
    const content = req.query.content;
    var condition = content ? { content: { [Op.content]: `%${content}%` } } : null;
  
    Comment.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving comments."
        });
      });
};

// Find a single Comment with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Comment.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Comment with id=" + id
        });
      });
};

// Update a Comment by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Comment.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Comment was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating PCommentost with id=" + id
        });
      });
};

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Comment.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Comment was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Comment with id=" + id
        });
      });
  };

// Delete all Comments from the database.
exports.deleteAll = (req, res) => {
    Comment.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Comments were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Comments."
        });
      });
  };