import { useParams, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchBooks, fetchProfile, borrowBook } from "../api/api.js";

function Borrow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: books = [], isLoading: booksLoading } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const book = books.find((b) => b._id === id);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    values: { name: profile?.name || "", email: profile?.email || "" },
  });

  // watch live input values
const watchedName = useWatch({ control, name: "name" });
const watchedEmail = useWatch({ control, name: "email" });

  // true if user edited values away from actual DB profile
  const isEdited =
    profile &&
    (watchedName !== profile.name || watchedEmail !== profile.email);

  const mutation = useMutation({
    mutationFn: () => borrowBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate("/books");
    },
  });

  const onSubmit = () => {
    toast.promise(mutation.mutateAsync(), {
      loading: "Borrowing book...",
      success: "Book borrowed successfully!",
      error: (err) => err.response?.data?.message || "Failed to borrow book",
    });
  };

  if (booksLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <p className="text-green-800 font-medium">Loading details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white border border-green-100 rounded-xl shadow-sm w-full max-w-md p-8 animate-fade-in">
        <div className="mb-6 pb-5 border-b border-green-100">
          <p className="text-xs text-green-600 uppercase tracking-widest mb-1">
            Borrowing
          </p>
          <h1 className="text-xl font-bold text-green-900">
            {book?.title || "Book Not Found"}
          </h1>
          <p className="text-sm text-gray-400 mt-1">{book?.author}</p>
        </div>

        <h2 className="text-sm font-semibold text-green-800 uppercase tracking-wide mb-4">
          Your Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-green-900">Name</label>
            <input
              type="text"
              placeholder="Your name"
              {...register("name", { required: true })}
              className="border border-green-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            />
            {errors.name && (
              <span className="text-red-500 text-xs">Name is required</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-green-900">Email</label>
            <input
              type="email"
              placeholder="Your email"
              {...register("email", { required: true })}
              className="border border-green-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">Email is required</span>
            )}
          </div>

          {isEdited && (
            <span className="text-red-500 text-xs">
              Name/Email must match your account details
            </span>
          )}

          <button
            type="submit"
            disabled={mutation.isPending || isEdited}
            className="mt-2 bg-green-700 text-orange-50 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-600 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "Borrowing..." : "Borrow Book"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Borrow;