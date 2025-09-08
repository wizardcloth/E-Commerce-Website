import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Products from "@/pages/Products";
import Cart from "@/pages/Cart";
import api from "./api";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    const { data } = await api.get("/products");
    setProducts(data);
  };

  const fetchCart = async () => {
    if (!localStorage.getItem("token")) return;
    const { data } = await api.get("/cart");
    setCart(data.items || []);
  };

  const handleLogin = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    fetchCart();
  };

  const handleRegister = async (
    email: string,
    password: string,
    confirm: string
  ) => {
    const { data } = await api.post("/auth/register", {
      email,
      password,
      confirmPassword: confirm,
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    fetchCart();
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setCart([]);
  };

  const handleAddToCart = async (product: any) => {
    const { data } = await api.post("/cart/add", {
      productId: product._id,
      quantity: 1,
    });
    setCart(data.items);
  };

  const handleUpdateQuantity = async (id: string, qty: number) => {
    if (qty <= 0) return handleRemoveFromCart(id);
    const { data } = await api.post("/cart/add", {
      productId: id,
      quantity: qty,
    });
    // console.log("Updated cart from API:", data); 
    setCart(data.items || []); 
  };

  const handleRemoveFromCart = async (id: string) => {
    const { data } = await api.delete(`/cart/${id}`);
    setCart(data.items);
  };

  return (
    <>
      {user && (
        <Header user={user} cartCount={cart.length} onLogout={handleLogout} />
      )}
      <Routes>
        {!user ? (
          <>
            <Route
              path="/login"
              element={
                <Login
                  onLogin={handleLogin}
                  onSwitch={() => (window.location.href = "/register")}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  onRegister={handleRegister}
                  onSwitch={() => (window.location.href = "/login")}
                />
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route
              path="/products"
              element={
                <Products products={products} onAddToCart={handleAddToCart} />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              }
            />
            <Route path="*" element={<Navigate to="/products" />} />
          </>
        )}
      </Routes>
    </>
  );
}
