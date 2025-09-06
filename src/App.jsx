import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

const MainPage = lazy(() => import("./components/Maingb"));
const PptPage = lazy(() => import("./components/PPT"));
const Error = lazy(() => import("./components/Errorpage"));

function App() {
  const userEmail = sessionStorage.getItem("userEmail");
  const isAllowed = !!userEmail;

  return (
    <Suspense fallback={<LoadingSpinner />}>
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
    </Suspense>
  );
}
const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      <p className="loading-text">페이지를 불러오는 중...</p>
    </div>
  );
};


export default App;
