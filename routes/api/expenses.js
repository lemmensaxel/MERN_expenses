const express = require("express");
const router = express.Router();

// Import expense model
const Expense = require("../../models/Expense");

// @route GET api/expenses
// @desc Get all expenses
// @access Public
router.get("/", (req, res) => {
  Expense.find()
    .sort({ date: -1 })
    .then(expenses => res.json(expenses));
});

// @route POST api/expenses
// @desc Add an expense
// @access Public
router.post("/", (req, res) => {
  const newExpense = new Expense({
    name: req.body.name,
    payedBy: req.body.payedBy,
    amount: req.body.amount
  });
  newExpense
    .save()
    .then(expense => res.json(expense))
    .catch(res.status(404).json({ success: false }));
});

// @route DELETE api/expenses/:id
// @desc Delete an expense
// @access Public
router.delete("/:id", (req, res) => {
  Expense.findById(req.params.id)
    .then(expense => expense.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route PATCH api/expenses/:id
// @desc Update a field in an Expense object
// @access Public
router.patch("/:id", (req, res) => {
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
        .catch(res.status(404).json({ success: false }));
    })
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
