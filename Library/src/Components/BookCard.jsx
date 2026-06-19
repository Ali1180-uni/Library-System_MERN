function BookCard(props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden w-56 flex flex-col">

      <h3 className="text-sm font-semibold text-green-900 px-4 pt-4 pb-2 truncate">
        {props.Title}
      </h3>

      <img
        src={props.ImgLink}
        alt="Book"
        className="w-full h-48 object-cover"
      />

      <div className="border-t border-green-100 px-4 py-3">
        <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Author</p>
        <p className="text-sm text-green-800 font-semibold">{props.Author}</p>
      </div>

    </div>
  );
}

export default BookCard;