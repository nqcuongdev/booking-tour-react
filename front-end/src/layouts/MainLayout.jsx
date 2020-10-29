import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import TopHeader from "../components/TopHeader/TopHeader";

const MainLayout = (props) => {
  return (
    <React.Fragment>
      <TopHeader />
      <Header />
      {props.children}
      <Footer />
    </React.Fragment>
  );
};

export default MainLayout;
