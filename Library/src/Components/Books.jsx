import { useState } from "react";
import BookCard from "./BookCard";
import BookDetail from "./BookDetail";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../api/api.js";

function Books({ role }) {
  const { data: books = [] } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const filteredBooks = books.filter((book) =>
    book.isAvailable && book.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-orange-50 px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-900 mb-1">
          Book Collection
        </h1>
        <p className="text-gray-500 text-sm mb-4">
          Browse our collection of books available in the library.
        </p>

        <input
          type="text"
          placeholder="Search books..."
          className="w-full max-w-sm bg-white border border-green-300 text-green-900 placeholder-gray-400 text-sm px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-500 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <p className="text-xs text-gray-400 mb-4 uppercase tracking-wide">
        {filteredBooks.length} Books Available
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredBooks.map((book) => (
          <BookCard
            key={book._id}
            Title={book.title}
            ImgLink={book.Image}
            Author={book.author || "Unknown Author"}
            onClick={() => setSelectedBook(book)}
          />
        ))}
      </div>

      {selectedBook && role !== "Admin" && (
        <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}

export default Books;
