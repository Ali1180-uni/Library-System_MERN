import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // on submit the post request to the backend server to create a new user
  const onSubmit = async (data) => {
    setServerMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
      });

      const payload = await response.json();

      if (!response.ok) {
        setMessageType("error");
        setServerMessage(payload.message || "Failed to create account");
        toast.error(payload.message || "Failed to create account");
        return;
      }

      setMessageType("success");
      setServerMessage("Account created successfully");
      toast.success("Account created successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      setMessageType("error");
      setServerMessage(error.message || "Failed to create account");
      toast.error(error.message || "Failed to create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white border border-green-100 shadow-md rounded-xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-green-800 text-center">
          Create Account
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Fill in details to register
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-green-900">
              First Name
            </label>
            <input
              type="text"
              placeholder="First"
              {...register("firstName", { required: true })}
              className="border border-green-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            {errors.firstName && <span className="text-red-500 text-xs">First name is required</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-green-900">
              Email
            </label>
            <input
              type="email"
              placeholder="email"
              {...register("email", { required: true })}
              className="border border-green-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-green-900">
              Student ID
            </label>
            <input
              type="text"
              placeholder="Student ID"
              {...register("StudentID", { required: true })}
              className="border border-green-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            {errors.StudentID && <span className="text-red-500 text-xs">Student ID is required</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-green-900">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
              className="border border-green-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            {errors.username && <span className="text-red-500 text-xs">Username is required</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-green-900">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
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
            {isSubmitting ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {serverMessage && (
          <p className={`mt-4 text-sm text-center ${messageType === "success" ? "text-green-700" : "text-red-600"}`}>
            {serverMessage}
          </p>
        )}

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-green-700 font-medium hover:underline"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Signup;
