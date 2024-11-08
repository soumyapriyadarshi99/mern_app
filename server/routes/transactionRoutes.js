const express = require("express");
const { getTransactions } = require("../controllers/transactionController"); // Ensure correct import
const router = express.Router();

// Define the route for fetching transactions
router.get("/", getTransactions);

module.exports = router; // Correctly exporting the router
