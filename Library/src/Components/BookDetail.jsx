function BookDetail(props) {
  const authorName = props.book?.authors?.[0]?.name || "Unknown Author";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      onClick={props.onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={props.onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
        >
          ×
        </button>

        <p className="text-xs font-semibold uppercase tracking-widest text-green-600">
          Book Details
        </p>

        <h1 className="mt-2 text-2xl font-bold text-green-950">
          {props.book?.title}
        </h1>

        <p className="mt-1 text-sm font-medium text-green-700">
          {authorName}
        </p>

        <p className="mt-4 text-sm leading-7 text-gray-500">
          {props.book?.description || "No description available."}
        </p>

        <div className="mt-6 flex gap-3">
          <button className="rounded-lg bg-green-700 px-5 py-2 text-sm font-semibold text-orange-50 hover:bg-green-600">
            Borrow
          </button>
          <button
            onClick={props.onClose}
            className="rounded-lg border border-green-200 px-5 py-2 text-sm font-semibold text-green-800 hover:bg-green-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;