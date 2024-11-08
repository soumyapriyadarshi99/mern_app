// backend/seed.js
// const fetch = require("node-fetch");
const mongoose = require("mongoose");
const axios = require("axios");
const Transaction = require("./models/Transaction");
const dotenv = require("dotenv");

dotenv.config();

async function seedData() {
  try {
    // Fetch data from third-party API
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    // console.log(response, "resp");
    const data = response.data;

    // Prepare data for insertion
    const transactions = data.map((item) => ({
      productId: item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      price: item.price,
      image: item.image,
      dateOfSale: new Date(item.dateOfSale),
      sold: item.sold,
    }));

    // Insert data into MongoDB
    await Transaction.insertMany(transactions);
    console.log("Database seeded successfully");
    process.exit();
  } catch (error) {
    console.log("Error seeding data:", error);
  }
}

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    seedData();
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });
