// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PollList from "./pages/PollList";
import PollDetail from "./pages/PollDetail";
import PollCreate from "./pages/PollCreate";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected app routes */}
        <Route
          path="/"
          element={
            <Layout>
              <PollList />
            </Layout>
          }
        />
        <Route
          path="/polls/:id"
          element={
            <Layout>
              <PollDetail />
            </Layout>
          }
        />
        <Route
          path="/create"
          element={
            <Layout>
              <PollCreate />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
