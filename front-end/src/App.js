import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import TopHeader from "./components/TopHeader/TopHeader";
import Testimonial from "./components/Testimonial/Testimonial";
import HomePost from "./components/HomePost/HomePost";
import Subscribe from "./components/Subscribe/Subscribe";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <TopHeader />
        <Header />
        <HeroBanner />
        <Testimonial />
        <HomePost />
        <Subscribe />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
