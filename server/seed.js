import dotenv from "dotenv";
import Product from "./models/product.js";
import connectDB from "./config/db.js";

dotenv.config();

const products = [
  {
    name: "iPhone 15 Pro",
    description: "Latest iPhone with advanced features",
    price: 999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
  },
  {
    name: "MacBook Air M3",
    description: "Powerful laptop for professionals",
    price: 1299,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
  },
  {
    name: "Premium T-Shirt",
    description: "Comfortable cotton t-shirt",
    price: 29,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes",
    price: 120,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
  },
  {
    name: "Novel: The Alchemist",
    description: "Bestselling book by Paulo Coelho",
    price: 15,
    category: "Books",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400",
  },
];

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products Imported!");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

importData();
