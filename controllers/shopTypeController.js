const asyncHandler = require("express-async-handler");
const ShopType = require("../models/ShopType");

// @desc    Get all active shop types
// @route   GET /api/shop-types
// @access  Public
const getShopTypes = asyncHandler(async (req, res) => {
  const types = await ShopType.find({ isActive: true }).select("name description");
  res.json(types);
});

// @desc    Add a new shop type
// @route   POST /api/shop-types
// @access  Public (should be protected in real app)
const addShopType = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const exists = await ShopType.findOne({ name });
  if (exists) {
    res.status(400);
    throw new Error("Shop type already exists");
  }
  const type = await ShopType.create({ name, description });
  res.status(201).json(type);
});

module.exports = { getShopTypes, addShopType };
