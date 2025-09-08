import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<h1>Login</h1>} />
    </Routes>
  )
}

export default App
