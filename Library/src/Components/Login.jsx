import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

function Login({ setAuthUser }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setServerError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
      });

      const payload = await response.json();

      if (!response.ok) {
        setServerError(payload.message || "Login failed");
        toast.error(payload.message || "Login failed");
        return;
      }

      localStorage.setItem("token", "authenticated");
      localStorage.setItem("user", JSON.stringify(payload.user));
      setAuthUser?.(payload.user);
      toast.success("Login successful");
      navigate("/books", { replace: true });
    } catch (error) {
      setServerError(error.message || "Login failed");
      toast.error(error.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="bg-white border border-green-100 shadow-md rounded-xl p-8 w-full max-w-sm">

        <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">Welcome Back</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-green-900">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              {...register("username", { required: true })}
              className="border border-green-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            {errors.username && <span className="text-red-500 text-xs">Username is required</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-green-900">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password", { required: true })}
              className="border border-green-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            {errors.password && <span className="text-red-500 text-xs">Password is required</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-700 text-orange-50 py-2 rounded-md font-medium hover:bg-green-600 transition-colors mt-2"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          {serverError && (
            <p className="text-sm text-red-600 text-center">{serverError}</p>
          )}

        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-green-700 font-medium hover:underline">
            Register
          </NavLink>
        </p>

      </div>
    </div>
  );
}

export default Login;