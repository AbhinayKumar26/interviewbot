import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Invalid Credentials");

    }
  };

  return (

    <div className="w-full min-h-screen bg-slate-950 overflow-x-hidden">

      {/* CENTER CONTAINER */}
      <div className="flex justify-center items-center min-h-screen px-4 py-8">

        {/* CARD */}
        <div
          className="
            w-full
            max-w-md
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            shadow-2xl
            p-6
            sm:p-8
          "
        >

          {/* LOGO */}
          <div className="text-center mb-8">

            <h1 className="text-3xl sm:text-4xl font-bold text-indigo-400 break-words">
              InterviewBot
            </h1>

            <p className="text-slate-400 mt-3 text-sm sm:text-base">
              AI Powered Mock Interview Platform
            </p>

          </div>

          {/* TITLE */}
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Login
          </h2>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}
            <div>

              <label className="block text-slate-300 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="
                  w-full
                  p-4
                  rounded-xl
                  bg-slate-800
                  border
                  border-slate-700
                  text-white
                  outline-none
                  focus:border-indigo-500
                  text-base
                "
              />

            </div>

            {/* PASSWORD */}
            <div>

              <label className="block text-slate-300 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="
                  w-full
                  p-4
                  rounded-xl
                  bg-slate-800
                  border
                  border-slate-700
                  text-white
                  outline-none
                  focus:border-indigo-500
                  text-base
                "
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="
                w-full
                bg-indigo-500
                hover:bg-indigo-600
                transition-all
                duration-300
                text-white
                py-4
                rounded-xl
                font-semibold
                text-lg
              "
            >
              Login
            </button>

          </form>

          {/* FOOTER */}
          <p className="text-center text-slate-400 mt-6 text-sm sm:text-base">

            Don't have an account?

            <Link
              to="/signup"
              className="text-indigo-400 ml-2 hover:underline"
            >
              Signup
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;