const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  monthly_goal: {
    type: "Number",
    required: true,
  },
  saving_target: {
    type: "Number",
    required: true,
  },
  month_year: {
    type: "String",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Budget", budgetSchema);
