
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";

// import Home from "./pages/Home";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import Interview from "./pages/Interview";
// import ResumeUpload from "./pages/ResumeUpload";
// import InterviewMode from "./pages/InterviewMode";

// import VoiceInterview from "./pages/VoiceInterview";

// function App() {

//   return (

//     <BrowserRouter>

//       <Routes>

//         <Route path="/" element={<Home />} />

//         <Route path="/login" element={<Login />} />

//         <Route path="/signup" element={<Signup />} />

//         <Route path="/dashboard" element={<Dashboard />} />

//         <Route path="/interview" element={<Interview />} />

//         <Route
//           path="/resume"
//           element={<ResumeUpload />}
//         />

//         <Route
//           path="/voice-interview"
//           element={<VoiceInterview />}
//         />

//         <Route
//           path="/interview-mode"
//           element={<InterviewMode />}
//         />

//       </Routes>

//     </BrowserRouter>
//   );
// }

// export default App;



import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import VoiceInterview from "./pages/VoiceInterview";
import InterviewMode from "./pages/InterviewMode";

import ResumeUpload from "./pages/ResumeUpload";

// import { Navigate } from "react-router-dom";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* DIRECT LOGIN PAGE */}
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* SIGNUP */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* INTERVIEW MODE */}
        <Route
          path="/interview-mode"
          element={<InterviewMode />}
        />

        {/* TEXT INTERVIEW */}
        <Route
          path="/interview"
          element={<Interview />}
        />

        {/* VOICE INTERVIEW */}
        <Route
          path="/voice-interview"
          element={<VoiceInterview />}
        />

        <Route
          path="/resume"
          element={<ResumeUpload />}
        />



      </Routes>

    </BrowserRouter>
  );
}

export default App;