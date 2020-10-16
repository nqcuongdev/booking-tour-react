import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import TopHeader from "./components/TopHeader/TopHeader";

function App() {
  return (
    <Router>
      <div className="App">
        <TopHeader />
        <Header />
        <HeroBanner />
      </div>
    </Router>
  );
}

export default App;
