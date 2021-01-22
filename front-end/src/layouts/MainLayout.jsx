import React, { useContext } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import TopHeader from "../components/TopHeader/TopHeader";
import AuthContext from "../contexts/auth";

const MainLayout = (props) => {
  const user = useContext(AuthContext)

  return (
    <React.Fragment>
      <AuthContext.Consumer>
        {(user) => <TopHeader user={user} />}
      </AuthContext.Consumer>
      <Header />
        {props.children}
      <Footer />
    </React.Fragment>
  );
};

export default MainLayout;
