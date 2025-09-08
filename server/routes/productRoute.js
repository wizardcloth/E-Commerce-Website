import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// Create product
router.post("/", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// Get products with filters
router.get("/", async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;
  let filter = {};
  if (category) filter.category = category;
  if (minPrice || maxPrice) filter.price = { $gte: minPrice || 0, $lte: maxPrice || 99999 };

  const products = await Product.find(filter);
  res.json(products);
});

export default router;
