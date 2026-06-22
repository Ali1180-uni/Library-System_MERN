import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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

export function Root() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/books/auth-check", { credentials: "include" })
      .then(r => r.json())
      .then(data => {
        if (data.IsAuthenticated) {
          setAuthUser({ name: data.UserName, id: data.UserId, role: data.Role });
        } else {
          setAuthUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      })
      .catch(() => setAuthUser(null));
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <div className="min-h-screen flex flex-col">
        <Navbar logo={logo} authUser={authUser} setAuthUser={setAuthUser} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login setAuthUser={setAuthUser} />} />
            <Route path="/register" element={<Signup />} />
            <Route element={<ProtectedRoute authUser={authUser} />}>
              <Route path="/books">
                <Route index element={<Books />} />
                <Route path="borrow/:id" element={<Borrow />} />
              </Route>
              <Route path="/profile/:id" element={<Profile />} />
              <Route element={<ProtectedRoute authUser={authUser} requiredRole="Admin" />}>
                <Route path="/books/admin" element={<Admin AvailableBooks={data} />} />
              </Route>
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode><Root /></StrictMode>
);