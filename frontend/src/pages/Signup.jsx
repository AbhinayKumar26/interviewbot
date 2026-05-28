import { useState } from "react";
import { registerUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      const res = await registerUser(form);

      alert(res.message);

      if (
        res.message ===
        "User registered successfully"
      ) {

        navigate("/login");

      }

    } catch (error) {

      console.log(error);
      alert("Server error");

    }
  };

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10 overflow-y-auto">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8">

        {/* LOGO */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-indigo-400">
            InterviewBot
          </h1>

          <p className="text-slate-400 mt-2">
            AI Powered Mock Interviews
          </p>

        </div>

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Create Account
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <div className="mb-5">

            <label className="text-slate-300 block mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-indigo-500"
            />

          </div>

          {/* EMAIL */}
          <div className="mb-5">

            <label className="text-slate-300 block mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-indigo-500"
            />

          </div>

          {/* PASSWORD */}
          <div className="mb-6">

            <label className="text-slate-300 block mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-indigo-500"
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 text-white py-4 rounded-xl font-semibold text-lg"
          >

            Create Account

          </button>

        </form>

        {/* LOGIN */}
        <p className="text-center text-slate-400 mt-8">

          Already have an account?

          <Link
            to="/login"
            className="text-indigo-400 ml-2 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;