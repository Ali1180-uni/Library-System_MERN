import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import About from "./Components/About";
import Books from "./Components/Books";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Borrow from "./Components/BorrowBook.jsx";
import Profile from "./Components/Profile.jsx";
import Admin from "./Components/Admin.jsx";
import logo from "/Title Icon.png";
import App from "./App.jsx";
import data from "../api/data.json";
import "./index.css";

const storedUser = JSON.parse(localStorage.getItem("user") || "null");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar
          logo={logo}
          Auth={Boolean(localStorage.getItem("token"))}
          User={storedUser?.name}
          UserId={storedUser?.id}
        />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/books">
                <Route index element={<Books />} />
                <Route path="borrow/:id" element={<Borrow />} />
              </Route>
              <Route path="/profile/:id" element={<Profile />} />
              <Route element={<ProtectedRoute requiredRole="Admin" />}>
                <Route path="/books/admin" element={<Admin AvailableBooks={data} />} />
              </Route>
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>,
);
