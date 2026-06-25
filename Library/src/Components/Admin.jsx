import BookCard from "./BookCard";
import { useState } from "react";

function Admin(props) {
  const availableBooks = props.AvailableBooks ?? [];
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="min-h-screen bg-orange-50 px-8 py-10">

      {/* Header */}
      <div className="mb-8 pb-4 border-b border-green-200">
        <h1 className="text-2xl font-bold text-green-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">{availableBooks.length} books in system</p>
      </div>

      {/* Grid */}
      {availableBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {availableBooks.map((book) => (
            <div key={book.id} className="flex flex-col gap-2">

              {/* Card — highlight if selected */}
              <div
                onClick={() => setSelectedBook(selectedBook?.id === book.id ? null : book)}
                className={`cursor-pointer rounded-xl transition-all duration-200 ${
                  selectedBook?.id === book.id
                    ? "ring-2 ring-green-500 shadow-md"
                    : "hover:shadow-sm"
                }`}
              >
                <BookCard
                  Title={book.title}
                  ImgLink={book.image}
                  Author={book.authors?.[0]?.name || "Unknown Author"}
                />
              </div>

              {/* Action Buttons */}
              {selectedBook?.id === book.id && (
                <div className="flex gap-2 animate-fade-in">
                  <button
                    onClick={() => console.log("Edit", book)}
                    className="flex-1 bg-green-700 text-orange-50 text-xs font-medium py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => console.log("Delete", book)}
                    className="flex-1 bg-red-500 text-white text-xs font-medium py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No books currently available.</p>
      )}

    </div>
  );
}

export default Admin;