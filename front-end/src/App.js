import React from "react";
<<<<<<< HEAD
import TopHeader from "./components/TopHeader/TopHeader";

function App() {
  return (
    <div className="App">
      <TopHeader />
<<<<<<< HEAD
      <Footer />
=======
>>>>>>> b756abbd618c814d3769ed2d2f366385f7e5d851
    </div>
=======
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import TopHeader from "./components/TopHeader/TopHeader";

import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <TopHeader />
        <Header />
        <HeroBanner />
        <Footer></Footer>
      </div>
    </Router>
>>>>>>> 6c75fd696a711b0b8c547ef7451f475424ad6581
  );
}

export default App;
