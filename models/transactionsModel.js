const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: {
    type: "String",
    enum: ["income", "expense"],
    required: true,
  },
  category: {
    type: "String",
    required: true,
    trim: true,
  },
  amount: {
    type: "Number",
    required: true,
  },
  date: {
    type: "Date",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);


