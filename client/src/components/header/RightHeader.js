/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import "./rightheader.css";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../context/ContextProvider";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const RightHeader = ({ logClose, logoutuser }) => {
  const { account, setAccount } = useContext(LoginContext);

  return (
    <div>
      <div className="rightheader">
        <div className="right_nav">
          {account ? (
            <Avatar className="avtar2">{account.fname[0].toUpperCase()}</Avatar>
          ) : (
            <Avatar className="avtar"></Avatar>
          )}
          {account ? <h5>Hello , {account.fname.toUpperCase()}</h5> : ""}
        </div>
        <div className="nav_btn" onClick={() => logClose()}>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/"}>Shop By Category</NavLink>
          <Divider style={{ width: "100%", marginLeft: "-20px" }} />
          <NavLink to={"/"}>Today's Deal</NavLink>
          {account ? (
            <NavLink to={"/buynow"}>Your Orders</NavLink>
          ) : (
            <NavLink to={"/login"}></NavLink>
          )}
          <Divider style={{ width: "100%", marginLeft: "-20px" }} />
          <div className="flag">
            <NavLink to={"/"}>Settings</NavLink>
            <img
              src="./india.png"
              style={{ width: 35, marginLeft: 10, marginTop: 0 }}
              alt=""
            />
          </div>
          {account ? (
            <div className="flag">
              <h3
                style={{ cursor: "pointer", fontWeight: 500 }}
                onClick={() => logoutuser()}
              >
                Logout
              </h3>{" "}
              &nbsp;
              <LogoutIcon style={{ fontSize: "18px", marginRight: "4px" }} />
            </div>
          ) : (
            <NavLink to={"/login"}>Sign In</NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightHeader;
