import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import About from "./pages/About";
import Tours from "./pages/Tours";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import TourDetail from "./pages/TourDetail";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import TourCart from "./pages/TourCart";
import HotelCart from "./pages/HotelCart";
import HotelCheckout from "./pages/HotelCheckout";
import TourCheckout from "./pages/TourCheckout";
import Event from "./pages/Event";
import AuthContext from "./contexts/auth";
import Profile from "./pages/Profile";
import authApi from "./api/authApi";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";

import { ToastContainer, toast } from "react-toastify";

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

  // console.log({user})

  return (
    <>
      <Router>
        <AuthContext.Provider
          value={{
            user: user,
            setUser: setUser,
          }}
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/contact-us" component={Contact} />
            <Route exact path="/about" component={About} />
            <Route exact path="/tours" component={Tours} />
            <Route exact path="/tours/:id" component={TourDetail} />
            <Route exact path="/blogs" component={Blogs} />
            <Route exact path="/blogs/:slug" component={BlogDetail} />
            <Route exact path="/hotels" component={Hotels} />
            <Route exact path="/hotels/:id" component={HotelDetail} />
            <Route exact path="/destinations" component={Destinations} />
            <Route
              exact
              path="/destinations/:id"
              component={DestinationDetail}
            />
            <Route
              exact
              path={user._id ? "/tour-cart" : "/"}
              component={TourCart}
            />
            <Route
              exact
              path={user._id ? "/hotel-cart" : "/"}
              component={HotelCart}
            />
            {/* <Route exact path="/hotel-checkout" component={HotelCheckout} /> */}
            <Route
              exact
              path={user._id ? "/checkout" : "/"}
              component={TourCheckout}
            />
            <Route
              exact
              path={user._id ? "/profile" : "/"}
              component={Profile}
            />
            <Route exact path="/events" component={Event} />
            <Route exact path="/page-not-found" component={NotFound} />
            <Route
              exact
              path={user._id ? "/payment-success" : "/"}
              component={PaymentSuccess}
            />
            <Route path="*" exact={true} component={NotFound} />
          </Switch>
        </AuthContext.Provider>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
