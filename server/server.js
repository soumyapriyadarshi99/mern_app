// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const transactionRoutes = require("./routes/transactionRoutes"); // Import the correct route file
// const statsRoutes = require("./routes/statsRoutes"); // Assuming you have this route as well

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // To handle JSON requests

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Use the transaction routes (ensure the correct import)
app.use("/api/transactions", transactionRoutes); // This will work if the route file is correct
// app.use("/api/statistics", statsRoutes); // If you have other stats routes

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) =>
  res.status(200).json({ message: "server is working fine" })
);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
