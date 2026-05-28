import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function VoiceInterview() {

  const location = useLocation();

  const navigate = useNavigate();

  const role = location.state?.role;

  // QUESTIONS
    const questions = [

    "Tell me about yourself.",

    "Why should we hire you?",

    "Explain React useEffect hook.",

    "Difference between state and props?",

    "What is Virtual DOM in React?",

    "Explain REST API.",

    "What is JWT authentication?",

    "Difference between SQL and MongoDB?",

    "Explain JavaScript closures.",

    "What is asynchronous programming?",

    "Explain promises in JavaScript.",

    "What is Node.js event loop?",

    "Explain middleware in Express.js.",

    "What is API integration?",

    "Explain OOP concepts.",

    "Difference between interface and abstract class in Java?",

    "What is multithreading?",

    "Explain exception handling.",

    "What is database normalization?",

    "Difference between GET and POST method?",

    "Explain Tailwind CSS.",

    "What is responsive web design?",

    "Explain component lifecycle.",

    "What are React hooks?",

    "What is Redux?",

    "Explain Git and GitHub workflow.",

    "Describe a challenging project you worked on.",

    "How do you handle deadlines?",

    "What are your strengths and weaknesses?",

    "Where do you see yourself in 5 years?"

    ];

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answer, setAnswer] =
    useState("");

  const [answers, setAnswers] =
    useState([]);

  const [score, setScore] =
    useState(0);

  const [time, setTime] =
    useState(60);

  const [isListening, setIsListening] =
    useState(false);

  const [showResult, setShowResult] =
    useState(false);

    const [feedback, setFeedback] =useState(null);

  // ================= TIMER =================
    useEffect(() => {

    if (showResult) return;

    if (time <= 0) {

        handleNext();

        return;
    }

    const timer = setInterval(() => {

        setTime((prev) => prev - 1);

    }, 1000);

    return () => clearInterval(timer);

    }, [time]);

  // ================= SPEAK QUESTION =================
  const speakQuestion = () => {

    const speech =
      new SpeechSynthesisUtterance(
        questions[currentQuestion]
      );

    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);
  };

  // ================= SPEECH TO TEXT =================
  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert("Speech Recognition not supported");

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    setIsListening(true);

    recognition.onresult = (event) => {

      setAnswer(
        event.results[0][0].transcript
      );

      setIsListening(false);
    };

    recognition.onerror = () => {

      setIsListening(false);
    };
  };

  // ================= NEXT QUESTION =================
  const handleNext = () => {

    if (!answer) {

      alert("Please speak your answer");

      return;
    }

    const updatedAnswers = [

      ...answers,

      {
        question:
          questions[currentQuestion],

        answer,
      },
    ];

    setAnswers(updatedAnswers);

    const updatedScore =
      score +
      Math.floor(
        100 / questions.length
      );

    setScore(updatedScore);

    setAnswer("");

    // NEXT QUESTION
    if (
      currentQuestion <
      questions.length - 1
    ) {

      setCurrentQuestion(
        currentQuestion + 1
      );

      setTime(60);
    }

    // FINAL RESULT
    else {

      setShowResult(true);
    }
  };

  // ================= PROGRESS =================
  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-6">

        {/* TOP */}
        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-black">

              🎤 Voice Interview

            </h1>

            <p className="text-slate-400 mt-2">

              {role}

            </p>

          </div>

          {/* TIMER */}
          <div className="bg-slate-900 border border-slate-800 px-8 py-5 rounded-3xl">

            <p className="text-slate-400 text-sm">

              Time Left

            </p>

            <h2 className="text-4xl font-black text-cyan-400">

              {time}s

            </h2>

          </div>

        </div>

        {/* PROGRESS */}
        <div className="mb-10">

          <div className="flex justify-between mb-3">

            <span>

              Question {currentQuestion + 1}
              / {questions.length}

            </span>

            <span>

              {Math.floor(progress)}%

            </span>

          </div>

          <div className="w-full bg-slate-800 h-4 rounded-full">

            <div
              className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-4 rounded-full"
              style={{
                width: `${progress}%`,
              }}
            ></div>

          </div>

        </div>

        {/* INTERVIEW */}
        {!showResult && (

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

            {/* QUESTION */}
            <div className="bg-slate-800 p-8 rounded-3xl mb-8">

              <h2 className="text-4xl font-bold mb-6">

                {questions[currentQuestion]}

              </h2>

              <button
                onClick={speakQuestion}
                className="bg-indigo-500 px-6 py-3 rounded-2xl font-bold"
              >

                🔊 Listen Question

              </button>

            </div>

            {/* SPEECH BUTTON */}
            <button
              onClick={startListening}
              className="bg-cyan-500 px-8 py-4 rounded-2xl font-bold mb-8"
            >

              {isListening
                ? "🎙 Listening..."
                : "🎤 Start Speaking"}

            </button>

            {/* ANSWER */}
            <div className="bg-slate-800 p-6 rounded-3xl mb-8">

              <h3 className="text-2xl font-bold mb-4">

                Your Answer

              </h3>

              <p className="text-slate-300 text-lg">

                {answer ||
                  "No answer yet..."}

              </p>

            </div>

            {/* NEXT BUTTON */}
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-indigo-500 to-cyan-500 px-10 py-4 rounded-2xl font-bold text-lg"
            >

              Next Question →

            </button>

          </div>

        )}

        {/* RESULT */}
        {showResult && (

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">

            <h1 className="text-5xl font-black mb-5">

              Interview Completed 🎉

            </h1>

            <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 w-52 h-52 rounded-full flex items-center justify-center mx-auto my-10">

              <div>

                <h2 className="text-6xl font-black">

                  {score}

                </h2>

                <p className="font-semibold">

                  Final Score

                </p>

              </div>

            </div>

            <button
              onClick={() =>
                navigate("/dashboard")
              }
              className="bg-indigo-500 px-10 py-4 rounded-2xl font-bold"
            >

              Back To Dashboard

            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default VoiceInterview;