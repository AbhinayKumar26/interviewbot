function HistoryCard({ item }) {

  const percentage = item.score;

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-[1.02] transition-all duration-300">

      {/* TOP */}
      <div className="flex justify-between items-center mb-5">

        <div>

          <h2 className="text-2xl font-bold text-white">
            {item.role}
          </h2>

          <p className="text-slate-400 text-sm">
            AI Mock Interview
          </p>

        </div>

        <div className="bg-indigo-500/20 px-4 py-2 rounded-xl">

          <span className="text-cyan-400 font-bold">
            {item.score}%
          </span>

        </div>

      </div>

      {/* PROGRESS */}
      <div className="mb-5">

        <div className="flex justify-between mb-2">

          <span className="text-slate-300">
            Performance
          </span>

          <span className="text-cyan-400 font-semibold">
            {percentage}%
          </span>

        </div>

        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">

          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

      </div>

      {/* FEEDBACK */}
      <div className="bg-slate-800/80 p-4 rounded-2xl mb-5">

        <p className="text-slate-300">

          {item.score >= 8
            ? "Excellent performance. Keep it up!"
            : item.score >= 6
            ? "Good answer, improve confidence."
            : "Need more practice."}

        </p>

      </div>

      {/* DATE */}
      <div className="flex justify-between text-sm text-slate-400">

        <span>
          Completed On
        </span>

        <span>
          {new Date(item.createdAt).toLocaleString()}
        </span>

      </div>

    </div>
  );
}

export default HistoryCard;