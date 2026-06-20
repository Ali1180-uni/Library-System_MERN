import {useForm} from 'react-hook-form';

function EditBook() {
  const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => console.log(data);

  return (
    <div className = "EditBook" >
        <h1 className="text-2xl font-bold text-green-900 mb-4">Edit Book</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-green-900">Title</label>
            <input
              type="text"
              placeholder="Enter book title"
              {...register("title", { required: true })}
              className="border border-green-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            {errors.title && <span className="text-red-500 text-xs">Title is required</span>}
            <label className="text-sm font-medium text-green-900">Author</label>
            <input
              type="text"
              placeholder="Enter author name"
              {...register("author", { required: true })}
              className="border border-green-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            {errors.author && <span className="text-red-500 text-xs">Author is required</span>}
            <label className="text-sm font-medium text-green-900">Description</label>
            <input
              type="text"
              placeholder="Enter book description"
              {...register("description", { required: true })}
              className="border border-green-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            {errors.description && <span className="text-red-500 text-xs">Description is required</span>}
          </div>
        </form>
      </div>
  )
}

export default EditBook