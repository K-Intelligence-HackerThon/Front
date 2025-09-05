import { Route, Routes } from "react-router-dom";
import "./App.css";
import Error from "./components/Errorpage";
import MainPage from "./components/Maingb";
import PptPage from "./components/PPT";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const userEmail = localStorage.getItem("userEmail");
  const isAllowed = !!userEmail;
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/main"
        element={
          <ProtectedRoute allowed={isAllowed}>
            <PptPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
