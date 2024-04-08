import React, { useEffect, useState } from "react";
import "./buynow.css";
import { Divider } from "@mui/material";
import Option from "./Option";
import Subtotal from "./Subtotal";
import Right from "./Right";
import axios from "axios";

const Buynow = () => {
  const [cartData, setCartData] = useState("");
  // console.log(cartData);

  const getDataBuy = async () => {
    const res = await axios.get("http://localhost:8004/cartDetails", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = res.data;

    if (res.status !== 201) {
      console.log("error");
    } else {
      setCartData(data.carts);
    }
  };

  useEffect(() => {
    getDataBuy();
  }, []);

  return (
    <div>
      {cartData.length ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping Cart</h1>
              <p>Select all Items</p>
              <span className="leftbuyprice">Price</span>
              <Divider />
              {cartData.map((e, k) => {
                return (
                  <div>
                    <div className="item_containert">
                      <img src={e.detailUrl} alt="Img" />
                      <div className="item_details">
                        <h3>{e.title.longTitle}</h3>
                        <h3>{e.title.shortTitle}</h3>
                        <h3 className="diffrentprice">&#8377;5000</h3>
                        <p className="unusuall">
                          Usually dispatched in 8 days.
                        </p>
                        <p>Eligible for FREE Shipping</p>
                        <img
                          src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
                          alt="logo"
                        />
                        <Option deleteData={e.id} get={getDataBuy}/>
                      </div>
                      <h3 className="item_price">&#8377;{e.price.cost}</h3>
                    </div>
                    <Divider />
                  </div>
                );
              })}

              <Subtotal item={cartData}/>
            </div>

            <Right item={cartData}/>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Buynow;
