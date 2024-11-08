// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
// const transactionRoutes = require("./routes/transactionRoutes");
// const statsRoutes = require("./routes/statsRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // to handle JSON requests

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Use Routes
// app.use("/api/transactions", transactionRoutes);
// app.use("/api/statistics", statsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
