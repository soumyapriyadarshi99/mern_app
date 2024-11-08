// backend/models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  dateOfSale: { type: Date, required: true },
  sold: { type: Boolean, required: true },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
