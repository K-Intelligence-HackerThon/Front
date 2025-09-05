import { Navigate } from "react-router-dom";

function ProtectedRoute({ allowed, children }) {
  if (!allowed) {
    return <Navigate to="/" replace />; 
  }
  return children;
}

export default ProtectedRoute;
