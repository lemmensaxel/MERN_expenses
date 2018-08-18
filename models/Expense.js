const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ExpenseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  payedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Expense = mongoose.model("Expense", ExpenseSchema);
