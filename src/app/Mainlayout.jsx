import Footer from "@/Components/Footer";
import Header from "@/Components/Header/Header";
import Discount from "@/Components/Home/Discount/Discount";
import Featured from "@/Components/Home/Featured/Featured";
import Hero from "@/Components/Home/Hero/Hero";
import React from "react";

const Mainlayout = () => {
  return (
    <div className="">
      <Header />
      <div className="px-8">
        {/* <Hero /> */}
        <Featured />
        <Discount />
      </div>
      <Footer />
    </div>
  );
};

export default Mainlayout;
