function Leaderboard({ history }) {

  const sortedUsers = [...history]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-10">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold text-white">
            🏆 Leaderboard
          </h2>

          <p className="text-slate-400 mt-1">
            Top interview performances
          </p>

        </div>

      </div>

      <div className="space-y-5">

        {sortedUsers.map(
          (item, index) => (

            <div
              key={index}
              className="flex items-center justify-between bg-slate-800 p-5 rounded-2xl hover:scale-[1.02] transition-all duration-300"
            >

              <div className="flex items-center gap-5">

                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-lg">

                  #{index + 1}

                </div>

                <div>

                  <h3 className="font-bold text-lg text-white">

                    {item.role}

                  </h3>

                  <p className="text-slate-400 text-sm">

                    {new Date(
                      item.createdAt
                    ).toLocaleString()}

                  </p>

                </div>

              </div>

              <div className="text-right">

                <h2 className="text-3xl font-black text-cyan-400">

                  {item.score}

                </h2>

                <p className="text-slate-400 text-sm">
                  Score
                </p>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default Leaderboard;