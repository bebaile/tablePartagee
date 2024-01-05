import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublishFeed from "@components/PublishFeed";
import Connexion from "@pages/Connexion";
import Login from "@pages/login";
import "./style.css";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<PublishFeed />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
