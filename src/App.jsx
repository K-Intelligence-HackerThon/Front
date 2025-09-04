import { Route, Routes } from "react-router-dom";
import MainPage from "./components/Maingb";
import PptPage from "./components/PPT";
import "./App.css"; 
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/main" element={<PptPage />} />
    </Routes>
  );
}

export default App;
