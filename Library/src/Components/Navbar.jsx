import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar({ logo, authUser, setAuthUser }) {
  const navigate = useNavigate();
  const displayUser = authUser?.name || "";

  const handleLogout = async () => {
    await fetch("http://localhost:3000/books/logout", { credentials: "include" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthUser(null);
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-8 py-4 bg-green-700">
      <NavLink to="/" className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-9 w-9 object-contain" />
        <p className="text-orange-50 font-semibold text-lg tracking-wide">
          Library Management System
        </p>
      </NavLink>

      <ul className="flex items-center gap-6 text-orange-50">
        <li className="hover:text-green-200 transition-colors"><NavLink to="/">Home</NavLink></li>
        <li className="hover:text-green-200 transition-colors"><NavLink to="/books">Books</NavLink></li>
        <li className="hover:text-green-200 transition-colors"><NavLink to="/about">About</NavLink></li>

        {authUser ? (
          <>
            <li className="hover:text-green-200 transition-colors text-sm">
              <NavLink to={`/profile/${authUser.id}`}>
                Welcome, {displayUser}
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-orange-50 text-green-800 text-sm font-medium px-4 py-1.5 rounded-md hover:bg-green-100 transition-colors"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li className="bg-orange-50 text-green-800 text-sm font-medium px-4 py-1.5 rounded-md hover:bg-green-100 transition-colors">
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;