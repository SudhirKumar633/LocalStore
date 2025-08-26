const express = require("express");
const router = express.Router();
const { getShopTypes, addShopType } = require("../controllers/shopTypeController");

router.get("/", getShopTypes);
router.post("/", addShopType); // In production, protect this route

module.exports = router;
