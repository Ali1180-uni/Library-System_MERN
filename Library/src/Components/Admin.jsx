import BookCard from "./BookCard";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBooks, deleteBook } from "../api/api";

function Admin() {
  const queryClient = useQueryClient();
  const { data: books = [] } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const { mutate: handleDelete } = useMutation({
    mutationFn: (id) => deleteBook(id),
    onSuccess: () => queryClient.invalidateQueries(["books"]),
  });

  const [selectedBook, setSelectedBook] = useState(null);
  const availableBooks = books;

  return (
    <div className="min-h-screen bg-orange-50 px-8 py-10">
      {/* Header */}
      <div className="mb-8 p-6 bg-green-700 rounded-xl shadow-sm flex items-center justify-between gap-6">
        <div>
          <p className="text-green-200 text-xs uppercase tracking-widest mb-1">
            Library System
          </p>
          <h1 className="text-3xl font-bold text-orange-50">Admin Dashboard</h1>
        </div>

        <div className="flex gap-4">
          <div className="bg-green-800/60 border border-green-600/40 text-orange-50 px-6 py-3 rounded-lg text-center min-w-25">
            <p className="text-2xl font-bold">{availableBooks.length}</p>
            <p className="text-xs text-green-200 uppercase tracking-wide mt-0.5">
              Total Books
            </p>
          </div>

          <div className="bg-green-800/60 border border-green-600/40 text-orange-50 px-6 py-3 rounded-lg text-center min-w-25">
            <p className="text-2xl font-bold text-orange-50">
              {availableBooks.filter((book) => book.isAvailable).length}
            </p>
            <p className="text-xs text-green-200 uppercase tracking-wide mt-0.5">
              Available
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      {availableBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {availableBooks.map((book) => (
            <div key={book._id ?? book.id} className="flex flex-col gap-2">
              {/* Card — highlight if selected */}
              <div
                onClick={() =>
                  setSelectedBook(
                    (selectedBook?._id ?? selectedBook?.id) ===
                      (book._id ?? book.id)
                      ? null
                      : book,
                  )
                }
                className={`cursor-pointer rounded-xl transition-all duration-200 ${
                  (selectedBook?._id ?? selectedBook?.id) ===
                  (book._id ?? book.id)
                    ? "ring-2 ring-green-500 shadow-md"
                    : "hover:shadow-sm"
                }`}
              >
                <BookCard
                  Title={book.title}
                  ImgLink={book.Image} // ← Image not image
                  Author={book.author} // ← author not authors[0].name
                />
              </div>

              {/* Action Buttons */}
              {(selectedBook?._id ?? selectedBook?.id) ===
                (book._id ?? book.id) && (
                <div className="flex gap-2 animate-fade-in">
                  <NavLink
                    to={`/books/admin/edit/${book._id}`}
                    className="flex-1 bg-green-700 text-orange-50 text-xs font-medium py-2 rounded-lg hover:bg-green-600 transition-colors text-center"
                  >
                    Edit
                  </NavLink>
                  <button
                    onClick={() => handleDelete(book._id)}
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
