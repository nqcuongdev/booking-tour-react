import React from "react";
import MainLayout from "../layouts/MainLayout";
import background from "../assets/images/background-1.jpg";
import BreadcrumbBanner from "../components/BreadcrumbBanner/BreadcrumbBanner";
import SearchForm from "../components/SearchForm/SearchForm";

const Tours = (props) => {
  return (
    <MainLayout>
      <BreadcrumbBanner pageName="Tours" backgroundImage={background} />
      <SearchForm />
    </MainLayout>
  );
};

export default Tours;
