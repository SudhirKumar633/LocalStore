const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const shopTypeRoutes = require("./routes/shopTypeRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

dotenv.config(); // Load environment variables

const app = express(); // ✅ Initialize app FIRST


app.use(express.json()); // Parse incoming JSON
app.use(cors({
  origin: "http://localhost:5173", // Updated to match frontend port
  credentials: true
}));
connectDB(); // Connect to MongoDB

// Serve uploads folder for logo access
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/users", userRoutes); // User routes
app.use("/api/products", productRoutes); // Use product routes
app.use("/api/shop-types", shopTypeRoutes); // Shop type routes

app.use(errorHandler); // Error handler middleware (should be last)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
2

