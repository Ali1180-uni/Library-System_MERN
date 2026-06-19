import data from "../../api/data.json";
import { useParams, NavLink } from "react-router-dom";

function BookDetail() {
  const { id } = useParams();
  const book = data.find((b) => b.id === parseInt(id));

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-8 py-10">
      <div className="bg-white border border-green-100 rounded-xl shadow-sm max-w-2xl w-full p-8 flex gap-8">
        <button className="absolute left-4 bg-green-700 text-orange-50 p-2 rounded-lg hover:bg-green-600 transition-colors">
          <NavLink to="/books" className="text-sm font-medium">&larr;</NavLink>
        </button>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-green-900 mb-2">{book.title}</h1>
            <p className="text-xs text-green-600 font-medium mb-4">{book.authors?.[0]?.name}</p>
            <p className="text-sm text-gray-500 leading-relaxed">{book.description}</p>
          </div>

          <button className="self-start bg-green-700 text-orange-50 px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors mt-6">
            Borrow Book
          </button>
        </div>

      </div>
    </div>
  );
}

export default BookDetail;