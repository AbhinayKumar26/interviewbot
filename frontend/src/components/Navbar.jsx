import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    navigate("/login");

  };

  return (

    <div className="bg-slate-900 border-b border-slate-800">

      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">

        <h1 className="text-3xl font-bold text-white">
          InterviewBot
        </h1>

        <button
          onClick={() => {

            localStorage.removeItem(
              "token"
            );

            navigate("/login");

          }}

          className="bg-red-500 px-5 py-2 rounded-xl font-bold"
        >

          Logout

        </button>

      </div>

    </div>
  );
}

export default Navbar;