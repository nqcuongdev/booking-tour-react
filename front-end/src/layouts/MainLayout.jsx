import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import TopHeader from "../components/TopHeader/TopHeader";
import AuthContext from "../contexts/auth";

const MainLayout = (props) => {
  const context = useContext(AuthContext)

  return ( 
    <React.Fragment> 
      <AuthContext.Consumer> 
        {/* {(user) => <TopHeader user={user} />} */}
        {() => <TopHeader user={context.user} setUser={context.setUser} />}
      </AuthContext.Consumer>
      <Header />
        {props.children}
      <Footer />
    </React.Fragment>
  );
};

export default MainLayout;
