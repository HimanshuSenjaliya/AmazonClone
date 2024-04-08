import React, { useState } from "react";
import "./signup.css";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SignUp = () => {
  const [userData, setUserData] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const addData = (e) => {
    const { name, value } = e.target;

    setUserData(() => {
      return {
        ...userData,
        [name]: value,
      };
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { fname, email, mobile, password, cpassword } = userData;

    const res = await axios.post("http://localhost:8004/register", {fname , email , mobile , password , cpassword} ,{
      
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      // body: JSON.stringify({
      //   fname,
      //   email,
      //   mobile,
      //   password,
      //   cpassword,
      // }),
    });

    // const res = await fetch("http://localhost:8004/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   withCredentials: true,
    //   body: JSON.stringify({
    //     fname,
    //     email,
    //     mobile,
    //     password,
    //     cpassword,
    //   }),
    // });
    // const data = await res.json();
    // console.log(data)

    const data = res.data

    if (res.status === 422 || !data) {
      toast.warning("Invalid Details!😒😒");
    } else {
      toast.success("Data Successfully Added!😊😊");
      setUserData({
        ...userData,
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: "",
      });
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
              <h1>Create An Account</h1>
              <div className="form_data">
                <label htmlFor="fname">Your Name</label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  // placeholder="Enter Your Name"
                  value={userData.fname}
                  onChange={addData}
                />
              </div>
              <div className="form_data">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  // placeholder="Enter Email"
                  value={userData.email}
                  onChange={addData}
                />
              </div>
              <div className="form_data">
                <label htmlFor="number">Mobile No</label>
                <input
                  type="text"
                  name="mobile"
                  id="number"
                  // placeholder="Enter Email"
                  value={userData.mobile}
                  onChange={addData}
                />
              </div>
              <div className="form_data">
                <label htmlFor="pwd">Password</label>
                <input
                  type="password"
                  name="password"
                  id="pwd"
                  // placeholder="Enter Password"
                  value={userData.password}
                  onChange={addData}
                />
              </div>
              <div className="form_data">
                <label htmlFor="cpwd">Confirm Password</label>
                <input
                  type="password"
                  name="cpassword"
                  id="cpwd"
                  // placeholder="Enter Confirm Password"
                  value={userData.cpassword}
                  onChange={addData}
                />
              </div>
              <button className="signin_btn" onClick={sendData}>
                Continue
              </button>

              <div className="signin_info">
                <p>
                  Already have an Account?{" "}
                  <NavLink to="/login" style={{ textDecoration: "none" }}>
                    Sign In
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
          <ToastContainer position="top-center" />
        </div>
      </section>
    </div>
  );
};

export default SignUp;
