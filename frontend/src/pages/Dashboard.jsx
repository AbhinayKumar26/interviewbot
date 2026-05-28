import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import HistoryCard from "../components/HistoryCard";

import Leaderboard from "../components/Leaderboard";



import Analytics from "../components/Analytics";

import {
  startInterview,
  getHistory
} from "../services/api";

function Dashboard() {

  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [history, setHistory] = useState([]);

  const token = localStorage.getItem("token");

  // ================= FETCH HISTORY =================
useEffect(() => {

  fetchHistory();

}, []);

  const fetchHistory = async () => {

    try {

      const data = await getHistory(token);

      setHistory([...data]);

    } catch (error) {

      console.log(error);

    }
  };

  // ================= START INTERVIEW =================
  const handleStart = async () => {

    if (!role) {
      alert("Please select role");
      return;
    }

    try {

      const data = await startInterview(
        { role },
        token
      );

      navigate("/interview", {
        state: {
          role,
          question: data.question,
        },
      });

    } catch (error) {

      console.log(error);

      alert("Failed to start interview");

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      {/* NAVBAR */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HERO */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>

            <div className="inline-block px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm mb-6">
              AI Interview Platform
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-tight">

              Crack Your

              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Dream Job
              </span>

            </h1>

            <p className="text-slate-400 mt-6 text-lg leading-relaxed">

              Practice AI-powered mock interviews with real-time
              evaluation, scoring, and interview history tracking.

            </p>

            <div className="flex gap-6 mt-8">

              <div className="bg-slate-900 border border-slate-800 px-6 py-4 rounded-2xl">
                <h3 className="text-3xl font-bold text-indigo-400">
                  {history.length}
                </h3>
                <p className="text-slate-400 text-sm">
                  Interviews
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 px-6 py-4 rounded-2xl">
                <h3 className="text-3xl font-bold text-cyan-400">
                  AI
                </h3>
                <p className="text-slate-400 text-sm">
                  Powered
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT CARD */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-[0_0_40px_rgba(99,102,241,0.2)]">

            <h2 className="text-3xl font-bold mb-2">
              Start Interview
            </h2>

            <p className="text-slate-400 mb-8">
              Select your role and begin your AI interview.
            </p>

            {/* SELECT */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl mb-6 text-white outline-none focus:border-indigo-500"
            >

              <option value="">
                Select Interview Role
              </option>

              <option>
                Frontend Developer
              </option>

              <option>
                Backend Developer
              </option>

              <option>
                Java Developer
              </option>

              <option>
                React Developer
              </option>

              <option>
                HR Interview
              </option>

            </select>

            {/* BUTTON */}
              {/* INTERVIEW TYPE */}
              <div className="grid grid-cols-2 gap-4 mb-6">

                <button
                  onClick={() => {

                    if (!role) {
                      alert("Please select role");
                      return;
                    }

                    navigate("/interview-mode", {
                      state: { role },
                    });
                  }}
                  className="bg-indigo-500 hover:bg-indigo-600 py-4 rounded-2xl font-bold text-lg"
                >

                  ✍ Text Interview

                </button>

                <button
                  onClick={() => {

                    if (!role) {
                      alert("Please select role");
                      return;
                    }

                    navigate("/voice-interview", {
                      state: {
                        role,
                        type: "voice",
                      },
                    });
                  }}
                  className="bg-cyan-500 hover:bg-cyan-600 py-4 rounded-2xl font-bold text-lg"
                >

                  🎤 Voice Interview

                </button>

              </div>

            <button
              onClick={() =>
                navigate("/resume")
              }
              className="w-full mt-4 bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all py-4 rounded-2xl font-bold text-lg"
            >

              Upload Resume 📄

            </button>

          </div>

        </div>

        {/* HISTORY */}
        <Analytics history={history} />
        <Leaderboard history={history} />
        <div className="mt-20">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-4xl font-bold">
                Interview History
              </h2>

              <p className="text-slate-400 mt-2">
                View all your previous interview performances
              </p>

            </div>

            <div className="bg-slate-900 border border-slate-800 px-5 py-3 rounded-2xl">

              <span className="text-indigo-400 font-bold text-lg">
                {history.length}
              </span>

              <span className="text-slate-400 ml-2">
                Records
              </span>

            </div>

          </div>

          {/* EMPTY */}
          {history.length === 0 ? (

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-14 text-center">

              <h3 className="text-3xl font-bold mb-3">
                No Interview History
              </h3>

              <p className="text-slate-400 text-lg">
                Start your first interview now 🚀
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-3 gap-6 mt-10">

            {history.map((item, index) => (

                <div
                  key={index}
                  className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-cyan-400 rounded-3xl p-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]"
                >

                  {/* GLOW EFFECT */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10"></div>

                  {/* TOP SECTION */}
                  <div className="relative z-10 flex items-start justify-between">

                    <div>

                      <h2 className="text-2xl font-extrabold text-white mb-2">

                        {item.role}

                      </h2>

                      <p className="text-slate-400 text-sm">

                        {new Date(
                          item.createdAt
                        ).toLocaleString()}

                      </p>

                    </div>

                    <div className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-2xl text-sm font-bold border border-cyan-500/30">

                      #{index + 1}

                    </div>

                  </div>

                  {/* SCORE */}
                  <div className="relative z-10 mt-8 flex items-end justify-between">

                    <div>

                      <p className="text-slate-400 text-sm mb-1">

                        Interview Score

                      </p>

                      <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">

                        {item.score}%

                      </h1>

                    </div>

                    {/* STATUS */}
                    <div>

                      {item.score >= 80 ? (

                        <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl text-sm font-bold border border-green-500/30">

                          Excellent

                        </div>

                      ) : item.score >= 50 ? (

                        <div className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-xl text-sm font-bold border border-yellow-500/30">

                          Average

                        </div>

                      ) : (

                        <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm font-bold border border-red-500/30">

                          Improve

                        </div>

                      )}

                    </div>

                  </div>

                  {/* BOTTOM LINE */}
                  <div className="relative z-10 mt-8 h-2 rounded-full bg-slate-700 overflow-hidden">

                    <div
                      style={{
                        width: `${item.score}%`,
                      }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                    ></div>

                  </div>

                </div>

              ))}

            </div>

            

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;