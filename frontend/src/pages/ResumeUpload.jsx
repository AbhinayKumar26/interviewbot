import { useState } from "react";

import Navbar from "../components/Navbar";

import {
  analyzeResume,
  uploadResume,
} from "../services/api";

function ResumeUpload() {

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [atsScore, setAtsScore] =
    useState(null);

  const [feedback, setFeedback] =
    useState("");

  const token =
    localStorage.getItem("token");

  // ================= UPLOAD =================
  const handleUpload =
    async () => {

      if (!file) {

        alert("Select resume");

        return;
      }

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "resume",
          file
        );

        await uploadResume(
          formData,
          token
        );

        alert(
          "Resume Uploaded Successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Upload Failed"
        );

      } finally {

        setLoading(false);

      }
    };

  // ================= ANALYZE =================
  const handleAnalyze =
    async () => {

      try {

        setLoading(true);

        const text =
          "Frontend Developer React Node MongoDB JavaScript Tailwind CSS";

        const data =
          await analyzeResume(text);

        setAtsScore(
          data.atsScore
        );

        setFeedback(
          data.feedback
        );

      } catch (error) {

        console.log(error);

        alert(
          "AI Analysis Failed"
        );

      } finally {

        setLoading(false);

      }
    };

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="max-w-3xl mx-auto py-20 px-6">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

          <h1 className="text-4xl font-black mb-3">

            Upload Resume

          </h1>

          <p className="text-slate-400 mb-8">

            Upload your resume for AI analysis

          </p>

          {/* FILE INPUT */}
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
            className="w-full bg-slate-800 p-5 rounded-2xl mb-6"
          />

          {/* UPLOAD BUTTON */}
          <button
            onClick={
              handleUpload
            }
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 py-4 rounded-2xl font-bold text-lg"
          >

            {loading
              ? "Uploading..."
              : "Upload Resume"}

          </button>

          {/* ANALYZE BUTTON */}
          <button
            onClick={
              handleAnalyze
            }
            disabled={loading}
            className="w-full mt-4 bg-cyan-500 py-4 rounded-2xl font-bold text-lg"
          >

            {loading
              ? "Analyzing..."
              : "Analyze Resume With AI 🤖"}

          </button>

          {/* ATS SCORE */}
          {atsScore && (

            <div className="mt-8 bg-gradient-to-r from-indigo-500 to-cyan-500 p-8 rounded-3xl text-center">

              <h2 className="text-3xl font-bold mb-3">

                ATS Score

              </h2>

              <p className="text-6xl font-black">

                {atsScore}%

              </p>

            </div>

          )}

          {/* FEEDBACK */}
          {feedback && (

            <div className="mt-8 bg-slate-800 p-6 rounded-2xl">

              <h2 className="text-2xl font-bold mb-4">

                AI Resume Feedback

              </h2>

              <div className="space-y-3">

                {Array.isArray(feedback)
                  ? feedback.map(
                      (
                        item,
                        index
                      ) => (

                        <div
                          key={index}
                          className="bg-slate-700 p-4 rounded-xl"
                        >

                          ✅ {item}

                        </div>
                      )
                    )
                  : (
                    <p className="text-slate-300">
                      {feedback}
                    </p>
                  )}

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default ResumeUpload;