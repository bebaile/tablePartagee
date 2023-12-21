import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsFeed from "@components/NewsFeed";
import "./style.css";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<NewsFeed />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
