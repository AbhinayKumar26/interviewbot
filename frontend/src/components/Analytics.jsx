import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
} from "recharts";

function Analytics({ history }) {

  // ================= TOTAL =================
  const totalInterviews =
    history.length;

  // ================= AVERAGE =================
  const averageScore =
    totalInterviews > 0
      ? Math.floor(
          history.reduce(
            (acc, item) =>
              acc + item.score,
            0
          ) / totalInterviews
        )
      : 0;

  // ================= HIGHEST =================
  const highestScore =
    totalInterviews > 0
      ? Math.max(
          ...history.map(
            (item) => item.score
          )
        )
      : 0;

  // ================= ROLE DATA =================
  const roleMap = {};

  history.forEach((item) => {

    roleMap[item.role] =
      (roleMap[item.role] || 0) + 1;
  });

  const roleData = Object.keys(roleMap).map(
    (role) => ({
      name: role,
      value: roleMap[role],
    })
  );

  // ================= SCORE DATA =================
  const scoreData = history.map(
    (item, index) => ({
      name: `#${index + 1}`,
      score: item.score,
    })
  );

  const COLORS = [
    "#6366f1",
    "#06b6d4",
    "#8b5cf6",
    "#0ea5e9",
    "#14b8a6",
  ];

  return (

    <div className="mb-16">

      {/* TOP CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        {/* TOTAL */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">

          <p className="text-slate-400 mb-2">
            Total Interviews
          </p>

          <h2 className="text-5xl font-black text-white">

            {totalInterviews}

          </h2>

        </div>

        {/* AVG */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">

          <p className="text-slate-400 mb-2">
            Average Score
          </p>

          <h2 className="text-5xl font-black text-cyan-400">

            {averageScore}%

          </h2>

        </div>

        {/* HIGH */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">

          <p className="text-slate-400 mb-2">
            Highest Score
          </p>

          <h2 className="text-5xl font-black text-indigo-400">

            {highestScore}%

          </h2>

        </div>

      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* PIE CHART */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">

          <h2 className="text-2xl font-bold mb-6 text-white">

            Role Wise Interviews

          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={roleData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >

                  {roleData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">

          <h2 className="text-2xl font-bold mb-6 text-white">

            Interview Scores

          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart data={scoreData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="score"
                  radius={[10, 10, 0, 0]}
                  fill="#06b6d4"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;