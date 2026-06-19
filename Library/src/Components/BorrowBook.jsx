import data from "../../api/data.json";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function Borrow() {
  const { id } = useParams();
  const book = data.find((book) => book.id === parseInt(id));
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white border border-green-100 rounded-xl shadow-sm w-full max-w-md p-8 animate-fade-in">

        {/* Book Info */}
        <div className="mb-6 pb-5 border-b border-green-100">
          <p className="text-xs text-green-600 uppercase tracking-widest mb-1">Borrowing</p>
          <h1 className="text-xl font-bold text-green-900">{book?.title}</h1>
          <p className="text-sm text-gray-400 mt-1">{book?.authors?.[0]?.name}</p>
        </div>

        {/* Form */}
        <h2 className="text-sm font-semibold text-green-800 uppercase tracking-wide mb-4">Your Details</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-green-900">Name</label>
            <input
              type="text"
              placeholder="Your name"
              {...register("name", { required: true })}
              className="border border-green-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            />
            {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-green-900">Email</label>
            <input
              type="email"
              placeholder="Your email"
              {...register("email", { required: true })}
              className="border border-green-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            />
            {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
          </div>

          <button
            type="submit"
            className="mt-2 bg-green-700 text-orange-50 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-600 active:scale-95 transition-all duration-200"
          >
            Borrow Book
          </button>

        </form>
      </div>
    </div>
  );
}

export default Borrow;