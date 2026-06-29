import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchBook, updateBook } from "../api/api";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const { data: book, isLoading, isError } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBook(id),
    enabled: !!id,
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // pre-fill form once book loads
  useEffect(() => {
    if (book) {
      reset({
        title: book.title || "",
        author: book.author || "",
        Description: book.Description || "",
        Image: book.Image || "",
      });
    }
  }, [book, reset]);

  const onSubmit = async (data) => {
    const payload = {
      id: book.id,
      title: data.title,
      author: data.author,
      Description: data.Description,
      Image: data.Image,
      isAvailable: book.isAvailable,
    };

    const promise = updateBook(id, payload);

    toast.promise(promise, {
      loading: "Saving changes...",
      success: "Book updated!",
      error:   "Failed to update book",
    });

    await promise;
    navigate("/books/admin");
  };

  if (isLoading) return <p className="text-center py-10 text-green-700">Loading book...</p>;
  if (isError)   return <p className="text-center py-10 text-red-500">Failed to load book.</p>;

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white border border-green-100 rounded-xl shadow-sm w-full max-w-md p-8">

        <h1 className="text-2xl font-bold text-green-900 mb-6">Edit Book</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-green-900">Title</label>
            <input
              type="text"
              placeholder={book.title}
              {...register("title", { required: true })}
              className="border border-green-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            {errors.title && <span className="text-red-500 text-xs">Title is required</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-green-900">Author</label>
            <input
              type="text"
              placeholder={book.author}
              {...register("author", { required: true })}
              className="border border-green-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            {errors.author && <span className="text-red-500 text-xs">Author is required</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-green-900">Description</label>
            <textarea
              rows={3}
              placeholder={book.Description}
              {...register("Description", { required: true })}
              className="border border-green-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
            />
            {errors.Description && <span className="text-red-500 text-xs">Description is required</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-green-900">Image Link</label>
            {(preview || book.Image) && (
              <img src={preview || book.Image} alt="Preview" className="w-24 h-32 object-cover rounded-md border border-green-200 mb-1" />
            )}
            {(() => {
              const imageField = register("Image", { required: true });

              return (
                <input
                  type="url"
                  placeholder={book.Image}
                  {...imageField}
                  onChange={(e) => {
                    imageField.onChange(e);
                    setPreview(e.target.value);
                  }}
                  className="border border-green-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition"
                />
              );
            })()}
            {errors.Image && <span className="text-red-500 text-xs">Image is required</span>}
          </div>

          <button
            type="submit"
            className="bg-green-700 text-orange-50 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors mt-2"
          >
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditBook;