import { NavLink } from "react-router-dom";

function Navbar(props) {
  const authLink = props.Auth ? `/profile/${props.UserId}` : "/login";

  return (
    <div className="flex items-center justify-between px-8 py-4 bg-green-700">
      <div className="flex items-center gap-3">
        <NavLink to="/" className="flex items-center gap-2">
          <img src={props.logo} alt="Logo" className="h-9 w-9 object-contain" />
          <p className="text-orange-50 font-semibold text-lg tracking-wide">
            Library Management System
          </p>
        </NavLink>
      </div>

      <ul className="flex items-center gap-6 text-orange-50">
        <li className="cursor-pointer hover:text-green-200 transition-colors">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="cursor-pointer hover:text-green-200 transition-colors">
          <NavLink to="/books">Books</NavLink>
        </li>
        <li className="cursor-pointer hover:text-green-200 transition-colors">
          <NavLink to="/about">About</NavLink>
        </li>
        <li className="cursor-pointer bg-orange-50 text-green-800 text-sm font-medium px-4 py-1.5 rounded-md hover:bg-green-100 transition-colors">
          <NavLink to={authLink}>
            {props.Auth ? `Welcome, ${props.User}` : "Login"}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
