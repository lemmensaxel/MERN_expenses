const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Import random secret key for token generation
const secretKey = require("./../../config/keys").secretKey;

// Import middelware
const middleware = require("./../../middleware/middleware");

// Import expense model
const User = require("../../models/User");

// @route GET api/users
// @desc Get all users
// @access Public
router.get("/", (req, res) => {
  User.find().then(users => res.json(users));
});

// @route POST api/users
// @desc Add a new user
// @access Public
router.post("/", (req, res) => {
  var salt = crypto.randomBytes(128).toString("base64");
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: pbkdf2(req.body.password, salt, 10000),
    salt: salt
  });
  newUser.save().then(user => res.json(user));
});

// @route DELETE api/users/:id
// @desc Delete a user
// @access Public
router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.sendStatus(404));
});

// @route PATCH api/users/:id
// @desc Update a field in a user object
// @access Private
router.patch("/:id", middleware.verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findById(req.params.id)
        .then(user => {
          if (req.body.name) {
            user.name = req.body.name;
          }
          if (req.body.email) {
            user.email = req.body.email;
          }
          if (req.body.username) {
            user.username = req.body.username;
          }
          if (req.body.password) {
            var salt = crypto.randomBytes(128).toString("base64");
            user.salt = salt;
            user.password = crypto.pbkdf2Sync(
              req.body.password,
              salt,
              10000,
              64,
              "sha512"
            );
          }
          user.save().then(user => res.json(user));
        })
        .catch(err => res.sendStatus(404));
    }
  });
});

// @route POST api/users/login
// @desc Post login details to get JWT token
// @access Public
router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (
        user.password ==
        crypto.pbkdf2Sync(req.body.password, user.salt, 10000, 64, "sha512")
      ) {
        jwt.sign({ user }, secretKey, { expiresIn: "1d" }, (err, token) => {
          res.json({
            token
          });
        });
      } else {
        res.sendStatus(403);
      }
    })
    .catch(err => res.sendStatus(404));
});

module.exports = router;
