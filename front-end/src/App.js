import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import About from "./pages/About";
import Tours from "./pages/Tours";
import Blogs from "./pages/Blogs";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/contact-us" component={Contact} />
        <Route exact path="/about" component={About} />
        <Route exact path="/tours" component={Tours} />
        <Route exact path="/blogs" component={Blogs} />
      </Switch>
    </Router>
  );
}

export default App;
