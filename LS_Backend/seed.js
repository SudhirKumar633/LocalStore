const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const products = require("./data/products");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB Connected for Seeding"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

const importData = async () => {
  try {
    await Product.deleteMany(); // optional: clears previous products
    await Product.insertMany(products);
    console.log("✅ Dummy Products Added!");
    process.exit();
  } catch (error) {
    console.error("❌ Error Seeding Data:", error);
    process.exit(1);
  }
};

importData();
