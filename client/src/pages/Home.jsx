import React from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import Categories from "../components/Categories.jsx";
import HomeCarousel from "../components/HomeCarousel.jsx";
import ProductsCarousel from "../components/ProductsCarousel.jsx";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Categories />
      <HomeCarousel />
      <ProductsCarousel
        title="Suggested for you"
        showRating={false}
        showStrikePrice={true}
        showDiscount={false}
      />
      <ProductsCarousel
        title="Recommanded"
        showRating={false}
        showStrikePrice={false}
        showDiscount={true}
      />
    </div>
  );
};

export default Home;
