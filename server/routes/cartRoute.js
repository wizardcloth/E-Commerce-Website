import express from "express";
import protect from "../middleware/authMiddleware.js";
import Cart from "../models/cart.js";

const router = express.Router();

// Get user cart
router.get("/", protect, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate("items.product");
  res.json(cart || { items: [] });
});

// Add item
router.post("/add", protect, async (req, res) => {
  const { productId, quantity } = req.body
  let cart = await Cart.findOne({ userId: req.user._id })
  if (!cart) cart = new Cart({ userId: req.user._id, items: [] })

  const item = cart.items.find((i) =>
    i.product.toString() === productId
  )

  if (item) {
    item.quantity = quantity   
  } else {
    cart.items.push({ product: productId, quantity })
  }

  await cart.save()
  cart = await cart.populate("items.product")
  res.json(cart)
})


// Remove item
router.delete("/:productId", protect, async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user._id }).populate("items.product")
  if (!cart) return res.json({ items: [] })

  cart.items = cart.items.filter((i) => {
    const prodId = i.product?._id ? i.product._id.toString() : i.product?.toString()
    return prodId !== req.params.productId
  })

  await cart.save()
  cart = await cart.populate("items.product") // repopulate after save
  res.json(cart)
})

export default router;
