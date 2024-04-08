/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import { Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { LoginContext } from "../context/ContextProvider";
import CircularProgress from "@mui/material/CircularProgress";

const Cart = () => {
  const { id } = useParams("");

  const { account, setAccount } = useContext(LoginContext);

  const navigateTo = useNavigate();

  const [individualData, setIndividualData] = useState("");
  // console.log(individualData)

  const getIndividualData = async () => {
    const res = await axios.get(`http://localhost:8004/getproductsone/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    const data = res.data;

    if (res.status !== 201) {
      console.log("No Data Available");
    } else {
      // console.log("getData");
      setIndividualData(data);
    }
  };

  useEffect(() => {
    setTimeout(getIndividualData, 2000);
  }, [id]);

  // add Cart
  const addtocart = async (id) => {
    const checkres = await axios.post(
      `http://localhost:8004/addcart/${id}`,
      individualData,
      {
        headers: {
          // Accept : "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    // const checkres = await fetch(`http://localhost:8004/addcart/${id}`, {
    //   method: "POST",
    //   headers: {
    //     // Accept : "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   withCredentials: true,
    //   body: JSON.stringify({
    //     individualData,
    //   }),
    //   credentials: "include",
    // });

    const data1 = checkres.data;
    console.log(data1);

    if (checkres.status === 401 || !data1) {
      toast.warning("User Invalid");
    } else {
      setAccount(data1);
      toast.success("Data Added In your cart!!!🎉🎉");
      navigateTo("/buynow");
    }
  };

  return (
    <div className="cart_section">
      {individualData && Object.keys(individualData).length && (
        <div className="cart_container">
          <div className="left_cart">
            <img src={individualData.detailUrl} alt="" />
            <div className="cart_btn">
              <button
                className="cart_btn1"
                onClick={() => addtocart(individualData.id)}
              >
                Add to Cart
              </button>
              <button className="cart_btn2">Buy Now</button>
            </div>
          </div>
          <div className="right_cart">
            <h3>{individualData.title.shortTitle}</h3>
            <h4>{individualData.title.longTitle}</h4>
            <Divider />
            <p className="mrp">M.R.P. : &#8377;{individualData.price.mrp}</p>
            <p>
              Deal Of the Day :{" "}
              <span style={{ color: "#B12704" }}>
                &#8377;{individualData.price.cost}
              </span>
            </p>
            <p>
              You Save :{" "}
              <span style={{ color: "#B12704" }}>
                &#8377;{individualData.price.mrp - individualData.price.cost} (
                {individualData.price.discount})
              </span>{" "}
            </p>

            <div className="discount_box">
              <h5>
                Discount :{" "}
                <span style={{ color: "#111" }}>{individualData.discount}</span>
              </h5>
              <h4>
                Free Delivery :{" "}
                <span style={{ color: "#111", fontWeight: 600 }}>
                  April 8 - 10
                </span>
                Details
              </h4>
              <p>
                Fastest Delivery :
                <span style={{ color: "#111", fontWeight: 600 }}>
                  Tomorrow 11AM
                </span>
              </p>
            </div>
            <p className="description">
              About the Item :
              <span
                style={{
                  color: "#565959",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.4px",
                }}
              >
                {individualData.description}
              </span>
            </p>
          </div>
        </div>
      )}
      <ToastContainer position="top-center" />
      {!individualData ? (
        <div className="circle">
          <CircularProgress />
          <h2>Loading.....</h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
