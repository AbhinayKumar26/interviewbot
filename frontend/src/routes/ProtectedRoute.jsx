import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  // If token not found
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists
  return children;
}

export default ProtectedRoute;