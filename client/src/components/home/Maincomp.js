/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Banner from "./Banner";
import Slide from "./Slide";
import "./home.css";
import { getProducts } from "../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";

const Maincomp = () => {
  const { products } = useSelector((state) => state.getproductData);
  // console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="home_section">
      <div className="banner_part">
        <Banner />
      </div>
      <div className="slide_part">
        <div className="left_slide">
          <Slide title="Deal of the Day" products={products} />
        </div>
        <div className="right_slide">
          <h4>Festival latest launches</h4>
          <img
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg"
            alt="rightimg"
          />
          <a href="/">See More</a>
        </div>
      </div>

      <Slide title="Today's Deal" products={products} />
      <div className="center_img">
        <img
          src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg"
          alt="center Img"
        />
      </div>
      <Slide title="Best Seller" products={products} />
      <Slide title="Upto 80% off" products={products} />
    </div>
  );
};

export default Maincomp;
