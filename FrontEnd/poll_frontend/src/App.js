import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PollList from "./pages/PollList";
import PollDetail from "./pages/PollDetail";
import PollCreate from "./pages/PollCreate";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PollList />} />
        <Route path="/polls/:id" element={<PollDetail />} />
         <Route path="/create" element={<PollCreate />} />

      </Routes>
    </Router>
  );
}

export default App;