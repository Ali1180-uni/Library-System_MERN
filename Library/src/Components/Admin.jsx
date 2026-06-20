import BookCard from "./BookCard";
import { useState } from "react";

function Admin(props) {
  const availableBooks = props.AvailableBooks ?? [];
  const [selectedBook, setSelectedBook] = useState(null);
  return (
    <div className="Admin">
      <h1 className="text-2xl font-bold text-green-900 mb-4">Admin Panel</h1>
      <div className="AvailableBooks">
        <h2 className="text-xl font-bold text-green-900 mb-2">
          Available Books
        </h2>
        <ul className="list-disc list-inside text-green-700">
          {availableBooks.length > 0 ? (
            availableBooks.map((book, index) => (
              <li key={index} className="text-green-700">
                <BookCard
                  key={book.id}
                  Title={book.title}
                  ImgLink={book.image}
                  Author={book.authors?.[0]?.name || "Unknown Author"}
                  onClick={() => setSelectedBook(book)}
                />
                {selectedBook && selectedBook.id === book.id && (
                  <div className="flex space-x-2 mt-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <p className="text-green-500">No books currently available.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Admin;
