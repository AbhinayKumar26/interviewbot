import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import Webcam from "react-webcam";

import axios from "axios";
// import axios from "axios";

import Navbar from "../components/Navbar";

function Interview() {

  const location = useLocation();
  const navigate = useNavigate();

  const role = location.state?.role;

  // ================= RANDOM QUESTIONS =================
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

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answer, setAnswer] = useState("");

  const [answers, setAnswers] = useState([]);

  const [score, setScore] = useState(0);

  
  const [time, setTime] = useState(60);

  const [timerStarted, setTimerStarted] =useState(false);

  const [isListening, setIsListening] = useState(false);

  const [showResult, setShowResult] = useState(false);

  const [loading, setLoading] = useState(false);

  const [cameraOn, setCameraOn] =useState(false);

  const [cameraError, setCameraError] =useState("");

  const [feedback, setFeedback] =useState(null);

  // const [cameraError, setCameraError] =useState("");

  // ================= TIMER =================
  useEffect(() => {

    if (!timerStarted || showResult)
      return;

    if (time <= 0) {

      handleNext();

      return;
    }

    const timer = setInterval(() => {

      setTime((prev) => prev - 1);

    }, 1000);

    return () => clearInterval(timer);

  }, [time, timerStarted]);



  useEffect(() => {

    if (cameraOn) {

      speakQuestion();

    }

  }, [currentQuestion, cameraOn]);

  // ================= TEXT TO SPEECH =================
  const speakQuestion = () => {

    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(
        questions[currentQuestion]
      );

    speech.lang = "en-US";

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    window.speechSynthesis.speak(speech);
  };

  // ================= SPEECH TO TEXT =================
  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Speech Recognition not supported"
      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.start();

    setIsListening(true);

    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0].transcript;

      setAnswer(transcript);

      setIsListening(false);

    };

    recognition.onerror = () => {

      setIsListening(false);

    };

    recognition.onend = () => {

      setIsListening(false);

    };
  };

 

// ================= NEXT QUESTION =================
const handleNext = () => {

  if (!cameraOn) {

    alert(
      "Please turn on camera to attend interview."
    );

    return;
  }

 
  // ANSWER REQUIRED
  if (!answer) {

    alert("Please answer the question");

    return;
  }

  if (!answer) {

    alert("Please answer the question");

    return;
  }

  const updatedAnswers = [
    ...answers,
    {
      question: questions[currentQuestion],
      answer,
    },
  ];

  setAnswers(updatedAnswers);

  // SCORE
    let answerScore = 0;

    if (answer.length > 20) {
      answerScore += 2;
    }

    if (answer.length > 50) {
      answerScore += 2;
    }

    if (answer.length > 100) {
      answerScore += 2;
    }

    if (
      answer.toLowerCase().includes("react") ||
      answer.toLowerCase().includes("api") ||
      answer.toLowerCase().includes("javascript") ||
      answer.toLowerCase().includes("database")
    ) {
      answerScore += 2;
    }

    if (answer.split(" ").length > 15) {
      answerScore += 2;
    }

    const updatedScore =
      score + answerScore;

  setScore(updatedScore);

  setAnswer("");

  // NEXT QUESTION  
  if (
    currentQuestion < questions.length - 1
  ) {

    setCurrentQuestion(
      currentQuestion + 1
    );

    setTime(60);

  }

  // FINAL SUBMIT
  else {

    setShowResult(true);

    submitInterview(
      updatedAnswers,
      updatedScore
    );
  }
};


// ================= SAVE INTERVIEW =================
// ================= SAVE INTERVIEW =================
// ================= SAVE INTERVIEW =================
const submitInterview = async (
  finalAnswers,
  finalScore
) => {

  try {

    setLoading(true);

    const token =
      localStorage.getItem("token");

    // SAVE RESULT
    await axios.post(
      `${API}/interview/submit`,
      {
        role: role || "React Developer",
        answers: finalAnswers,
        score: finalScore,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const aiFeedback = {

      communication: Math.floor(
        Math.random() * 20
      ) + 80,

      technical: Math.floor(
        Math.random() * 20
      ) + 75,

      confidence: Math.floor(
        Math.random() * 20
      ) + 70,

      hrRound: Math.floor(
        Math.random() * 20
      ) + 78,

      strengths: [

        "Good communication",

        "Strong technical basics",

        "Confident answers",

      ],

      improvements: [

        "Improve project explanation",

        "Give shorter answers",

        "Practice system design",

      ],

      finalFeedback:

        "Excellent performance overall. Candidate has strong technical understanding and communication skills.",

    };

    setFeedback(aiFeedback);

    setScore(finalScore);

    setShowResult(true);

  } catch (error) {

    console.log(error);

    alert("Failed to save interview");

  } finally {

    setLoading(false);

  }
};

  // ================= PROGRESS =================
  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;




    const downloadCertificate = async () => {

    const input =
      document.getElementById(
        "certificate"
      );

    const canvas =
      await html2canvas(input);

    const imgData =
      canvas.toDataURL("image/png");

    const pdf = new jsPDF(
      "landscape",
      "px",
      "a4"
    );

    pdf.addImage(
      imgData,
      "PNG",
      20,
      20,
      800,
      500
    );

    pdf.save(
      "Interview_Certificate.pdf"
    );
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* TOP */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-10">

          <div>

            <h1 className="text-5xl font-black">
              {role}
            </h1>

            <p className="text-slate-400 mt-2">
              AI Mock Interview Session
            </p>

          </div>

          {/* TIMER */}
          <div className="bg-slate-900 border border-slate-800 px-8 py-5 rounded-3xl shadow-xl">

            <p className="text-slate-400 text-sm">
              Time Left
            </p>

            <h2 className="text-4xl font-black text-indigo-400">
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
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-4 rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            ></div>

          </div>

        </div>

        {/* QUESTION */}
        {!showResult && (

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-[0_0_40px_rgba(99,102,241,0.2)] animate-fadeIn">

            {/* CAMERA REQUIRED MESSAGE */}
            {!cameraOn && (

              <div className="bg-red-500/20 border border-red-500 text-red-300 p-5 rounded-2xl mb-6">

                <h2 className="text-2xl font-bold mb-2">
                  Camera Access Required
                </h2>

                <p className="text-lg">
                  You must enable camera access before starting the AI interview.
                </p>

              </div>

            )}

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-3xl font-bold">
                Interview Question
              </h2>

              <button
                onClick={speakQuestion}
                disabled={!cameraOn}
                className={`px-5 py-3 rounded-2xl font-semibold
                ${
                  cameraOn
                    ? "bg-indigo-500 hover:bg-indigo-600"
                    : "bg-slate-700 cursor-not-allowed"
                }`}
              >
                🔊 Listen
              </button>

            </div>

            <div className="bg-slate-800 p-6 rounded-2xl mb-8">

              <p className="text-2xl leading-relaxed">
                {questions[currentQuestion]}
              </p>

            </div>

            {/* WEBCAM */}
            <div className="mb-6">

              <div className="flex justify-between items-center mb-4">

                <h3 className="text-xl font-bold">
                  Live Interview Camera
                </h3>

                <button
                  onClick={async () => {

                    try {

                      await navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: true,
                      });

                      setCameraOn(true);

                      setTimerStarted(true);

                      setCameraError("");

                    } catch (error) {

                      setCameraError(
                        "Camera access is compulsory for attending the interview."
                      );

                      setCameraOn(false);

                    }
                  }}

                  className="bg-cyan-500 px-5 py-2 rounded-xl font-bold"
                >

                  {cameraOn
                    ? "Camera Enabled"
                    : "Start Camera"}

                </button>

              </div>

              {/* CAMERA ERROR */}
              {
                cameraError && (

                  <p className="text-red-400 mb-4 font-semibold">
                    {cameraError}
                  </p>

                )
              }

              {/* SMALL CAMERA BOX */}
              {cameraOn && (

                <div className="fixed bottom-6 right-6 z-50">

                  <div className="bg-slate-900 border border-slate-700 rounded-2xl p-3 shadow-2xl">

                    {/* LIVE LABEL */}
                    <div className="flex items-center gap-2 mb-2">

                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>

                      <p className="text-sm font-semibold">
                        Live
                      </p>

                    </div>

                    {/* CAMERA */}
                    <Webcam
                      audio={true}
                      mirrored={true}
                      className="w-52 h-52 object-cover rounded-xl"
                    />

                  </div>

                </div>

              )}

            </div>

            {/* ANSWER */}
            <textarea
              rows="8"
              value={answer}
              disabled={!cameraOn}
              onChange={(e) =>
                setAnswer(e.target.value)
              }
              placeholder={
                cameraOn
                  ? "Write your answer..."
                  : "Enable camera first to attend interview"
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-5 outline-none focus:border-indigo-500 resize-none"
            />

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-6">

              <button
                onClick={handleNext}
                disabled={!cameraOn || loading}
                className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300
                ${
                  cameraOn
                    ? "bg-gradient-to-r from-indigo-500 to-cyan-500 hover:scale-105"
                    : "bg-slate-700 cursor-not-allowed"
                }`}
              >

                {loading
                  ? "Submitting..."
                  : "Next Question →"}

              </button>

              <button
                onClick={startListening}
                disabled={!cameraOn}
                className={`px-8 py-4 rounded-2xl font-bold
                ${
                  cameraOn
                    ? "bg-slate-800 border border-slate-700 hover:bg-slate-700"
                    : "bg-slate-700 cursor-not-allowed"
                }`}
              >

                {isListening
                  ? "🎙 Listening..."
                  : "🎤 Answer By Voice"}

              </button>

            </div>

          </div>

        )}

        {/* RESULT */}
        {showResult && (

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 text-center overflow-hidden break-words">

            <h2 className="text-3xl md:text-5xl font-black mb-5 break-words">
              Interview Completed 🎉
            </h2>

            <p className="text-slate-400 text-lg mb-10">
              Great job completing your AI interview.
            </p>

            {/* SCORE */}
            <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 w-52 h-52 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl overflow-hidden break-words">

              <div>

                <h3 className="text-4xl md:text-6xl font-black break-words">
                  {score}
                </h3>

                <p className="font-semibold">
                  Final Score
                </p>

                {/* AI FEEDBACK */}
                {
                  feedback && (

                    <div className="mt-12 text-left">

                      <h2 className="text-3xl md:text-4xl font-black mb-10 text-center break-words">

                        AI Interview Feedback 🤖

                      </h2>

                      {/* SCORES */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                        <div className="bg-slate-800 p-6 rounded-3xl text-center">

                          <h3 className="text-lg mb-2">
                            Communication
                          </h3>

                          <p className="text-4xl font-black text-cyan-400">

                            {feedback.communication}%

                          </p>

                        </div>

                        <div className="bg-slate-800 p-6 rounded-3xl text-center">

                          <h3 className="text-lg mb-2">
                            Technical
                          </h3>

                          <p className="text-4xl font-black text-indigo-400">

                            {feedback.technical}%

                          </p>

                        </div>

                        <div className="bg-slate-800 p-6 rounded-3xl text-center">

                          <h3 className="text-lg mb-2">
                            Confidence
                          </h3>

                          <p className="text-4xl font-black text-green-400">

                            {feedback.confidence}%

                          </p>

                        </div>

                        <div className="bg-slate-800 p-6 rounded-3xl text-center">

                          <h3 className="text-lg mb-2">
                            HR Round
                          </h3>

                          <p className="text-4xl font-black text-pink-400">

                            {feedback.hrRound}%

                          </p>

                        </div>

                      </div>

                      {/* STRENGTHS */}
                      <div className="bg-slate-800 p-8 rounded-3xl mb-8 overflow-hidden break-words">

                        <h3 className="text-2xl font-bold mb-5 text-green-400">

                          Strengths

                        </h3>

                        <div className="space-y-4">

                          {
                            feedback.strengths.map(
                              (item, index) => (

                                <div
                                  key={index}
                                  className="bg-slate-700 p-4 rounded-2xl overflow-hidden break-words"
                                >

                                  ✅ {item}

                                </div>

                              )
                            )
                          }

                        </div>

                      </div>

                      {/* IMPROVEMENTS */}
                      <div className="bg-slate-800 p-8 rounded-3xl mb-8 overflow-hidden break-words">

                        <h3 className="text-2xl font-bold mb-5 text-yellow-400">

                          Improvements

                        </h3>

                        <div className="space-y-4">

                          {
                            feedback.improvements.map(
                              (item, index) => (

                                <div
                                  key={index}
                                  className="bg-slate-700 p-4 rounded-2xl overflow-hidden break-words"
                                >

                                  ⚠️ {item}

                                </div>

                              )
                            )
                          }

                        </div>

                      </div>

                      {/* FINAL FEEDBACK */}
                      <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 p-6 md:p-8 rounded-3xl w-full overflow-hidden break-words">

                        <h3 className="text-2xl font-black mb-4 break-words">

                          Final AI Feedback

                        </h3>

                        <p className="text-lg leading-relaxed break-words">

                          {feedback.finalFeedback}

                        </p>

                      </div>

                    </div>

                  )
                }

              </div>

            </div>

            {/* ANSWERS */}
            <div className="text-left max-w-4xl mx-auto overflow-hidden break-words">

              <h3 className="text-3xl font-bold mb-8 break-words">
                Interview Summary
              </h3>

              <div className="space-y-6">

                {answers.map((item, index) => (

                  <div
                    key={index}
                    className="bg-slate-800 p-6 rounded-2xl overflow-hidden break-words"
                  >

                    <h4 className="font-bold text-xl mb-3 text-cyan-400 break-words">

                      Q{index + 1}. {item.question}

                    </h4>

                    <p className="text-slate-300 break-words">
                      {item.answer}
                    </p>

                  </div>

                ))}

              </div>

            </div>

            {/* CERTIFICATE */}
            <div
              id="certificate"
              className="bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-3xl p-6 md:p-10 text-center overflow-hidden break-words mt-10 mb-10"
            >

              <h2 className="text-3xl md:text-5xl font-black mb-5 break-words">

                Certificate of Completion

              </h2>

              <p className="text-lg md:text-2xl mb-4 break-words">

                This certifies that

              </p>

              <h1 className="text-3xl md:text-6xl font-black mb-6 break-words">

                Candidate

              </h1>

              <p className="text-lg md:text-2xl break-words">

                has successfully completed the AI Mock Interview for

              </p>

              <h3 className="text-2xl md:text-4xl font-bold mt-4 break-words">

                {role}

              </h3>

              <p className="mt-6 text-xl break-words">

                Final Score: {score}

              </p>

            </div>

            <button
              onClick={downloadCertificate}
              className="bg-green-500 hover:bg-green-600 px-10 py-4 rounded-2xl font-bold text-lg mr-5"
            >

              📄 Download Certificate

            </button>

            {/* BUTTON */}
            <button
              onClick={() =>
                navigate("/dashboard")
              }
              className="mt-10 bg-indigo-500 hover:bg-indigo-600 px-10 py-4 rounded-2xl font-bold text-lg"
            >
              Back To Dashboard
            </button>

          </div>

        )}
      </div>

    </div>
  );
}

export default Interview;