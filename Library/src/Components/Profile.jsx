import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchProfile } from "../api/api";

function Profile() {
  const { id } = useParams();

  const { data: profile, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const borrowedBooks = profile?.borrowedBooks || [];
  const time = new Date().getHours();
  const greeting = time < 12 ? "Good Morning" : time < 17 ? "Good Afternoon" : time < 21 ? "Good Evening" : "Good Night";

  if (isLoading) return <p className="text-center py-10 text-green-700">Loading profile...</p>;
  if (isError)   return <p className="text-center py-10 text-red-500">{error?.message || "Failed to load profile"}</p>;

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        <h1 className="text-2xl font-bold text-green-900">
          {greeting}, {profile?.name || "User"}!
        </h1>

        <div className="bg-white border border-green-100 rounded-xl shadow-sm p-6 flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            {[
              ["Name",       profile?.name],
              ["Username",   profile?.username],
              ["Student ID", profile?.StudentID],
              ["Profile ID", profile?._id || id],
              ["Role",       profile?.role],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-2">
                <span className="text-gray-400 w-24 shrink-0">{label}</span>
                <span className="text-green-900 font-medium">{value || "—"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-green-100 rounded-xl shadow-sm p-6">
          <h2 className="text-base font-bold text-green-900 mb-4">Borrowed Books</h2>
          {borrowedBooks.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {borrowedBooks.map((book, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-green-800 border-b border-green-50 pb-2 last:border-0">
                  <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  <span>{book.title}</span>
                  <span className="text-gray-400">by {book.author}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No books currently borrowed.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Profile;