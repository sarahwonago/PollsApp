import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PollList from "./pages/PollList";
import PollDetail from "./pages/PollDetail";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PollList />} />
        <Route path="/polls/:id" element={<PollDetail />} />

      </Routes>
    </Router>
  );
}

export default App;