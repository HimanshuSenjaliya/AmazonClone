/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import "./signup.css";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { LoginContext } from "../context/ContextProvider";

const SignIn = () => {
  const [logdata, setData] = useState({
    email: "",
    password: "",
  });

  const { account, setAccount } = useContext(LoginContext);

  const addData = (e) => {
    const { name, value } = e.target;

    setData(() => {
      return {
        ...logdata,
        [name]: value,
      };
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { email, password } = logdata;

    try {
      const response = await axios.post(
        "http://localhost:8004/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const data = response.data; // Extracting data from the response

      if (response.status === 422 || !data) {
        toast.warning("Invalid Details!😒😒");
      } else {
        setAccount(data);
        toast.success("Successfully Login!😊😊");
        setData({ ...logdata, email: "", password: "" });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "An error occurred while logging in. Please try again later."
      );
    }
  };

  return (
    <div>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="amazon logo" />
          </div>
          <div className="sign_form">
            <form action="POST">
              <h1>Sign In</h1>
              <div className="form_data">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  value={logdata.email}
                  onChange={addData}
                />
              </div>
              <div className="form_data">
                <label htmlFor="pwd">Password</label>
                <input
                  type="password"
                  name="password"
                  id="pwd"
                  placeholder="Enter Password"
                  value={logdata.password}
                  onChange={addData}
                />
              </div>
              <button className="signin_btn" onClick={sendData}>
                Continue
              </button>
            </form>
          </div>

          <div className="create_accountinfo">
            <p>New To Amazon</p>
            <NavLink to="/register">
              <button>Create Your Amazon Account</button>
            </NavLink>
          </div>
          <ToastContainer position="top-center" />
        </div>
      </section>
    </div>
  );
};

export default SignIn;
