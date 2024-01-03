import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublishFeed from "@components/PublishFeed";
import "./style.css";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<PublishFeed />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
