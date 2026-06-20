function Profile(props) {
  const time = new Date().getHours();
  const greeting =
    time < 12
      ? "Good Morning"
      : time < 17
        ? "Good Afternoon"
        : time < 21
          ? "Good Evening"
          : "Good Night";

  return (
    <div className="Profile">
      <h1 className="text-2xl font-bold text-green-900 mb-4">
        {greeting}, {props.UserName}!
      </h1>
      <div className="ProfileSection">
        <img src={props.UserImage} alt="User" className="h-32 w-32 rounded-full object-cover" />
        <h3 className="text-lg font-semibold text-green-800 mt-2">Name: {props.UserName}</h3>
        <h3 className="text-lg font-semibold text-green-800 mt-2">Username: {props.Username}</h3>
        <h3 className="text-lg font-semibold text-green-800 mt-2">Student ID: {props.StudentId}</h3>
        <h3 className="text-lg font-semibold text-green-800 mt-2">Member Since: {props.MemberSince}</h3>
      </div>
      <div className="BorrowBookSection">
        <h2 className="text-xl font-bold text-green-900 mb-2">Borrowed Books</h2>
        <ul className="list-disc list-inside text-green-700">
          {(props.BorrowedBooks.length > 0) ? props.BorrowedBooks.map((book, index) => (
            <li key={index} className="text-green-700">{book.title} by {book.author}</li>
          )) : <p className="text-green-500">No books currently borrowed.</p>}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
