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
// @access Users with level >= 2
router.get("/", middleware.verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err || authData.user.level < 2) {
      res.sendStatus(403);
    } else {
      User.find().then(users => res.json(users));
    }
  });
});

// @route POST api/users
// @desc Add a new user
// @access Users with level >= 2
router.post("/", middleware.verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err || authData.user.level < 2) {
      res.sendStatus(403);
    } else {
      var salt = crypto.randomBytes(128).toString("base64");
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: crypto.pbkdf2Sync(
          req.body.password,
          salt,
          10000,
          64,
          "sha512"
        ),
        level: req.body.level,
        salt: salt
      });
      newUser.save().then(user => res.json(user));
    }
  });
});

// @route DELETE api/users/:id
// @desc Delete a user
// @access Users with level >= 2
router.delete("/:id", middleware.verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err || authData.user.level < 2) {
      res.sendStatus(403);
    } else {
      User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({ success: true })))
        .catch(err => res.sendStatus(404));
    }
  });
});

// @route PATCH api/users/:id
// @desc Update a field in a user object
// @access Users with level >= 2 or the user itself. If level < 2, level can only be set lower then current level.
router.patch("/:id", middleware.verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (
      err ||
      (authData.user.level < 2 && authData.user._id !== req.params.id)
    ) {
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
          if (req.body.level) {
            if (authData.user.level < 2) {
              if (user.level > req.body.level) {
                user.level = req.body.level;
              }
            } else {
              user.level = req.body.level;
            }
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
        .catch(() => res.sendStatus(404));
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
