import axios from "axios";

//production
const api = axios.create({
  baseURL: "https://e-commerce-website-liard-eta.vercel.app/",
});

//deployment

// const api = axios.create({
//   baseURL: "http://localhost:3000/api",
// });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
