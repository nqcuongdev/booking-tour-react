import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import About from "./pages/About";
import Tours from "./pages/Tours";
import Blogs from "./pages/Blogs";
import TourDetail from "./pages/TourDetail";
import AuthContext from "./contexts/auth";
import authApi from "./api/authApi";

// Get jwt token form local storage
let token = localStorage.getItem("jwtKey");

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserFromToken = async () => {
      try {
        if (token) {
          let headers = "Bearer " + token;
          const response = await authApi.me(headers);
          if (response.success) {
            setUser(response.data);
          }
        }
      } catch (error) {
        console.log("An error occur", error);
      }
    };

    fetchUserFromToken();
  }, []);

  return (
    <Router>
      <AuthContext.Provider value={user}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contact-us" component={Contact} />
          <Route exact path="/about" component={About} />
          <Route exact path="/tours" component={Tours} />
          <Route exact path="/tours/:slug" component={TourDetail} />
          <Route exact path="/blogs" component={Blogs} />
        </Switch>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
