import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import About from "./Components/About";
import Books from "./Components/Books";
import ErrorPage from "./Components/ErrorPage.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Borrow from "./Components/BorrowBook.jsx";
import Profile from "./Components/Profile.jsx";
import Admin from "./Components/Admin.jsx";
import GuestRoute from "./Components/GuestRoute.jsx";
import EditBook from "./Components/EditBook.jsx";
import logo from "/Title Icon.png";
import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient();

export function Root() {
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // fetch(`${import.meta.env.VITE_API_URL}/books/auth-check`, { credentials: "include" })
    axios
      .get("http://localhost:3000/books/auth-check", { withCredentials: true })
      .then((response) => {
        const data = response.data;
        if (data.IsAuthenticated) {
          setAuthUser({
            name: data.UserName,
            id: data.UserId,
            role: data.Role,
          });
        } else {
          setAuthUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
        setAuthLoading(false);
      })
      .catch(() => {
        setAuthUser(null);
        setAuthLoading(false);
      });
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <div className="min-h-screen flex flex-col">
        <Navbar logo={logo} authUser={authUser} setAuthUser={setAuthUser} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<App />} />
            <Route
              element={
                <GuestRoute authUser={authUser} authLoading={authLoading} />
              }
            >
              <Route
                path="/login"
                element={<Login setAuthUser={setAuthUser} />}
              />
              <Route path="/register" element={<Signup />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={<Login setAuthUser={setAuthUser} />}
            />
            <Route path="/register" element={<Signup />} />
            <Route
              element={
                <ProtectedRoute authUser={authUser} authLoading={authLoading} />
              }
            >
              <Route path="/books">
                <Route index element={<Books />} />
                <Route path="borrow/:id" element={<Borrow />} />
              </Route>
              <Route path="/profile/:id" element={<Profile />} />
              <Route
                element={
                  <ProtectedRoute
                    authUser={authUser}
                    authLoading={authLoading}
                    requiredRole="Admin"
                  />
                }
              >
                <Route path="/books/admin" element={<Admin />} />
                <Route path="/books/admin/edit/:id" element={<EditBook />} />
              </Route>
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {" "}
      {/* ← wrap here */}
      <Root />
    </QueryClientProvider>
  </StrictMode>,
);
