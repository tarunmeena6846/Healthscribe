import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashbaord/Dashboard";
import Questionnaire from "./components/Dashbaord/Questionnaire";

function App() {
  return (
    <>
      {/* <Recoil> */}
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
        </Routes>
        {/* </RecoilRoot> */}
      </Router>
    </>
  );
}

export default App;
