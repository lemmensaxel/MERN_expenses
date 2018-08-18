const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Import random secret key for token generation
const secretKey = require("./../../config/keys").secretKey;

// Import middelware
const middleware = require("./../../middleware/middleware");

// Import expense model
const Expense = require("../../models/Expense");

// @route GET api/expenses
// @desc Get all expenses
// @access Users
router.get("/", middleware.verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Expense.find()
        .sort({ date: -1 })
        .then(expenses => res.json(expenses));
    }
  });
});

// @route POST api/expenses
// @desc Add an expense
// @access Users
router.post("/", middleware.verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const newExpense = new Expense({
        name: req.body.name,
        payedBy: req.body.payedBy,
        amount: req.body.amount
      });
      newExpense
        .save()
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(404));
    }
  });
});

// @route DELETE api/expenses/:id
// @desc Delete an expense
// @access Users with level >= 2
router.delete("/:id", middleware.verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err || authData.user.level < 2) {
      res.sendStatus(403);
    } else {
      Expense.findById(req.params.id)
        .then(expense =>
          expense.remove().then(() => res.json({ success: true }))
        )
        .catch(err => res.status(404).json({ success: false }));
    }
  });
});

// @route PATCH api/expenses/:id
// @desc Update a field in an Expense object
// @access Users with level >= 2
router.patch("/:id", middleware.verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err || authData.user.level < 2) {
      res.sendStatus(403);
    } else {
      Expense.findById(req.params.id)
        .then(expense => {
          if (req.body.name) {
            expense.name = req.body.name;
          }
          if (req.body.payedBy) {
            expense.payedBy = req.body.payedBy;
          }
          if (req.body.amount) {
            expense.amount = req.body.amount;
          }
          expense
            .save()
            .then(expense => res.json(expense))
            .catch(() => res.status(404).json({ success: false }));
        })
        .catch(err => res.status(404).json({ success: false }));
    }
  });
});

module.exports = router;
