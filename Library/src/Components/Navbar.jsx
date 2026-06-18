import { NavLink as Navlink } from 'react-router-dom';

function Navbar(props) {
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-green-700">
      <div className="flex items-center gap-3">
        <img src={props.logo} alt="Logo" className="h-9 w-9 object-contain" />
        <p className="text-orange-50 font-semibold text-lg tracking-wide">
          Library Management System
        </p>
      </div>

      <ul className="flex items-center gap-6 text-orange-50">
        <li className="cursor-pointer hover:text-green-200 transition-colors"><Navlink to="/">Home</Navlink></li>
        <li className="cursor-pointer hover:text-green-200 transition-colors"><Navlink to="/books">Books</Navlink></li>
        <li className="cursor-pointer hover:text-green-200 transition-colors"><Navlink to="/about">About</Navlink></li>
        <li>
          <input
            type="text"
            placeholder="Search..."
            className="bg-green-800 text-orange-50 placeholder-green-300 text-sm px-3 py-1.5 rounded-md outline-none focus:ring-1 focus:ring-orange-50"
          />
        </li>
        <li className="cursor-pointer bg-orange-50 text-green-800 text-sm font-medium px-4 py-1.5 rounded-md hover:bg-green-100 transition-colors">
          <Navlink to="/login">{props.Auth ? `Welcome, ${props.User}` : "Login"}</Navlink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;