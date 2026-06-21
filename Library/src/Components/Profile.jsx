import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile(props) {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const borrowedBooks = profile?.borrowedBooks || props.BorrowedBooks || [];

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch("http://localhost:3000/books/me", { credentials: "include" });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "Failed to load profile");
        setProfile(payload);
      } catch (err) {
        setError(err.message || "Failed to load profile");
      }
    };
    loadProfile();
  }, []);

  const time = new Date().getHours();
  const greeting = time < 12 ? "Good Morning" : time < 17 ? "Good Afternoon" : time < 21 ? "Good Evening" : "Good Night";

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Greeting */}
        <h1 className="text-2xl font-bold text-green-900">
          {greeting}, {profile?.name || props.UserName || "User"}!
        </h1>

        {/* Profile Card */}
        <div className="bg-white border border-green-100 rounded-xl shadow-sm p-6 flex items-center gap-6">

          {/* Avatar */}
          {props.UserImage ? (
            <img src={props.UserImage} alt="User" className="h-24 w-24 rounded-full object-cover border-2 border-green-200 flex-shrink-0" />
          ) : (
            <div className="h-24 w-24 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            </div>
          )}

          {/* Info */}
          <div className="flex flex-col gap-2 text-sm">
            {[
              ["Name",       profile?.name       || props.UserName],
              ["Username",   profile?.username   || props.Username],
              ["Student ID", profile?.StudentID  || props.StudentId],
              ["Profile ID", profile?._id        || id],
              ["Role",       profile?.role       || "Student"],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-2">
                <span className="text-gray-400 w-24 flex-shrink-0">{label}</span>
                <span className="text-green-900 font-medium">{value}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Borrowed Books */}
        <div className="bg-white border border-green-100 rounded-xl shadow-sm p-6">
          <h2 className="text-base font-bold text-green-900 mb-4">Borrowed Books</h2>
          {borrowedBooks.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {borrowedBooks.map((book, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-green-800 border-b border-green-50 pb-2 last:border-0">
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  <span>{book.title}</span>
                  <span className="text-gray-400">by {book.author}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No books currently borrowed.</p>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

      </div>
    </div>
  );
}

export default Profile;