const db = require("../models");
const Member = db.members;
const Post = db.posts;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Create and Save a new Member
exports.signup = (req, res) => {
    // Validate request
    let validated =  true;
    let message = '';
  
    if (!/.+@.+\..+/.test(req.body.email)) {
      validated = false;
      message = "This field must match standard email requirements";
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(req.body.password)) {
      validated = false;
      message = "The password must be at least 8 characters long, must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and can contain special characters";
    }
    if (!validated) {
      res.status(403).json({ message : message }) ;
    }else {

      const member = ({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        isAdmin: req.body.isAdmin ? req.body.isAdmin : false
      });
      
      Member.beforeCreate((member, options) => {
        return bcrypt.hash(member.password, 10)
            .then(hash => {
                member.password = hash;
            })
            .catch(err => { 
                throw new Error(); 
            });
      });

      Member.create(member)
      .then(() => res.status(201).json({ message: 'Member created' }))
      .catch(error => res.status(400).json({ message : error }));
    };
};

// Login
exports.login = (req, res, next) => {
  Member.findOne({ where: {username : req.body.username} })
    .then(member => {
      if (!member) {
        return res.status(401).json({ error: 'member not found' });
      }
        const valid = bcrypt.compare(req.body.password, member.password)
        
          if (!valid) {
            return res.status(401).json({ error: 'Invalid password' });
          }
          res.status(200).json({
            token: jwt.sign(
              { 
                id: member.id,
                isAdmin: member.isAdmin 
              },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
    })
    .catch(error => res.status(500).json({ error }));
};

// Retrieve all Members from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { [Op.username]: `%${username}%` } } : null;
  
    Member.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving members."
        });
      });
};

// Retrieve all posts from the given member.
exports.findAllPosts = (req, res) => {

  Post.findAll({ 
    where: {
      MemberId: req.params.id
    },
    include: [{
      model: Member,
      attributes: ['username']
    }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    });
};

// Find a single Member with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Member.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Member with id=" + id
        });
      });
};

// Update a Member by the id in the request
exports.update = (req, res) => {

    Member.update(req.body, {
      where: { id: req.params.id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Member was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Member with id=${id}. Maybe Member was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Member with id=" + id
        });
      });
};

// Delete a Member with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Member.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Member was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Member with id=${id}. Maybe Member was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Member with id=" + id
        });
      });
  };

// Delete all Members from the database.
exports.deleteAll = (req, res) => {
    Member.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Members were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all members."
        });
      });
  };