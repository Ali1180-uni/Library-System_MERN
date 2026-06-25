import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ErrorGif from "../../public/error.gif";

function ErrorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("404 - Page Not Found");
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-orange-50">

      {/* Blurred bg */}
      <div
        className="absolute inset-0 scale-105"
        style={{
          backgroundImage: `url(${ErrorGif})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(6px)",
          opacity: 0.15,
        }}
      />

      {/* Card */}
      <div className="relative z-10 bg-white border border-green-100 rounded-xl shadow-md p-10 max-w-md w-full text-center animate-fade-in">
        <img src={ErrorGif} alt="Error" className="w-40 h-40 mx-auto rounded-lg object-cover mb-6" />
        <h1 className="text-5xl font-bold text-green-900 mb-2">404</h1>
        <p className="text-gray-500 text-sm mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-700 text-orange-50 px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
        >
          Return to Homepage
        </button>
      </div>

    </div>
  );
}

export default ErrorPage;