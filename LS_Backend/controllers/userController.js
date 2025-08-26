const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc    Register new user (Customer, Shopkeeper, or Admin)
// @route   POST /api/users/signup
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const {
      shopName,
      ownerName,
      phone,
      email,
      password,
      address,
      city,
      state,
      pincode,
      shopType,
      gstin,
      openingHours,
      closingHours
    } = req.body;
    // Handle logo file if present
    let logo = req.body.logo;
    if (req.file) {
      logo = `/uploads/logos/${req.file.filename}`;
    }

    const user = await User.create({
      shopName,
      ownerName,
      phone,
      email,
      password,
      address,
      city,
      state,
      pincode,
      shopType,
      gstin,
      openingHours,
      closingHours,
      logo,
      isAdmin: false,
      isShopkeeper: true
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        shopName: user.shopName,
        ownerName: user.ownerName,
        phone: user.phone,
        email: user.email,
        address: user.address,
        city: user.city,
        state: user.state,
        pincode: user.pincode,
        shopType: user.shopType,
        gstin: user.gstin,
        openingHours: user.openingHours,
        closingHours: user.closingHours,
        logo: user.logo,
        isAdmin: user.isAdmin,
        isShopkeeper: user.isShopkeeper,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    console.error("Registration error:", err);
    throw err;
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      isAdmin: user.isAdmin,
      isShopkeeper: user.isShopkeeper,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid phone or password");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
};

