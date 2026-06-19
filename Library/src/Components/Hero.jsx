import { NavLink } from 'react-router-dom';
function Hero() {
  return (
    <div
      className="relative w-full h-[90vh] overflow-hidden"
      style={{
        backgroundImage: "url('/hero-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "none",
      }}
    >
      {/* Blur layer */}
      <div
        className="absolute inset-0 scale-105"
        style={{
          backgroundImage: "url('/hero-image.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
          transform: "scale(1.05)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-orange-50 text-5xl font-bold mb-4 drop-shadow-lg">
          Library Management System
        </h1>
        <p className="text-orange-100 text-lg max-w-xl mb-8 drop-shadow-md">
          Books are the best friends you can have; they inform you, and entertain you, and they don't talk back.
        </p>
        <button className="bg-green-700 text-orange-50 px-8 py-3 rounded-md font-medium hover:bg-green-600 transition-colors shadow-lg">
          <NavLink to="/books" className="hover:underline">
            Explore Books
          </NavLink>
        </button>
      </div>
    </div>
  );
}

export default Hero;