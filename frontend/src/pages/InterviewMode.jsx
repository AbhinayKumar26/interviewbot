import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function InterviewMode() {

  const navigate = useNavigate();

  const location = useLocation();

  const role = location.state?.role;

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white">

      <Navbar />

      <div className="max-w-5xl mx-auto py-20 px-6">

        <h1 className="text-5xl font-black text-center mb-4">

          Choose Interview Type

        </h1>

        <p className="text-center text-slate-400 mb-16 text-lg">

          Select your preferred interview mode

        </p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* TEXT INTERVIEW */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-xl hover:scale-105 transition-all duration-300">

            <div className="text-6xl mb-6">
              💻
            </div>

            <h2 className="text-3xl font-black mb-4">

              Text Interview

            </h2>

            <p className="text-slate-400 mb-8 leading-relaxed">

              Answer interview questions by typing.

              Includes:

              camera monitoring,
              timer,
              AI questions,
              speech-to-text,
              and ATS-style scoring.

            </p>

            <button
              onClick={() =>
                navigate("/interview", {
                  state: { role },
                })
              }
              className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 py-4 rounded-2xl font-bold text-lg"
            >

              Start Text Interview

            </button>

          </div>

          {/* VOICE INTERVIEW */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-xl hover:scale-105 transition-all duration-300">

            <div className="text-6xl mb-6">
              🎤
            </div>

            <h2 className="text-3xl font-black mb-4">

              Voice Interview

            </h2>

            <p className="text-slate-400 mb-8 leading-relaxed">

              AI asks questions by voice.

              User answers using microphone.

              Includes:

              speech recognition,
              camera monitoring,
              auto next question,
              and real interview simulation.

            </p>

            <button
              onClick={() =>
                navigate("/voice-interview", {
                  state: { role },
                })
              }
              className="w-full bg-gradient-to-r from-pink-500 to-orange-500 py-4 rounded-2xl font-bold text-lg"
            >

              Start Voice Interview

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default InterviewMode;