import data from "../../api/data.json";
import { NavLink } from "react-router-dom";
import {useState} from "react";
import BookCard from "./BookCard";

function Books() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-orange-50 px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-900 mb-1">
          Book Collection
        </h1>
        <p className="text-gray-500 text-sm mb-4">
          Browse our collection of books available in the library.
        </p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search books..."
          className="w-full max-w-sm bg-white border border-green-300 text-green-900 placeholder-gray-400 text-sm px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-500 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Count */}
      <p className="text-xs text-gray-400 mb-4 uppercase tracking-wide">
        {searchTerm ? data.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase())).length : data.length} Books Available
      </p>

      {/* Grid */}
      <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {searchTerm.length > 0 ? (
          data.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase())).map((book) => (
            <NavLink key={book.id} to={`/books/${book.id}`}>
              <BookCard
                Title={book.title}
                ImgLink={book.image}
                Author={book.authors[0]?.name || "Unknown Author"}
              />
            </NavLink>
          ))
        ) : (
          data.map((book) => (
            <NavLink key={book.id} to={`/books/${book.id}`}>
              <BookCard
                Title={book.title}
                ImgLink={book.image}
                Author={book.authors[0]?.name || "Unknown Author"}
              />
            </NavLink>
          ))
        )}
      </div>
    </div>
  );
}

export default Books;