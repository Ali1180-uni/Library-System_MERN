function Result(props) {
  const isDone = props.message === "Done";

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-sm w-fit animate-fade-in1
      ${isDone ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
    >

      {isDone ? (
        <svg className="tick w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="tick__circle" cx="26" cy="26" r="25" fill="none" stroke="#16a34a" strokeWidth="2" />
          <path className="tick__check" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
      ) : (
        <svg className="cross w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="cross__circle" cx="26" cy="26" r="25" fill="none" stroke="#dc2626" strokeWidth="2" />
          <path className="cross__x" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" d="M14.1 14.1l23.8 23.8 M37.9 14.1L14.1 37.9" />
        </svg>
      )}
    
      <p className={`text-sm font-medium ${isDone ? "text-green-800" : "text-red-700"}`}>
        {props.message}
      </p>

    </div>
  );
}

export default Result;
