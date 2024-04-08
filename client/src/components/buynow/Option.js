/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import "./buynow.css";
import axios from "axios";
import { LoginContext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Option = ({ deleteData, get }) => {
  const { account, setAccount } = useContext(LoginContext);

  const removeData = async (req, res) => {
    try {
      const res = await axios.delete(
        `http://localhost:8004/removeItem/${deleteData}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;

      if (res.status === 400 || !data) {
        console.log("error");
      } else {
        setAccount(data)
        toast.success("Remove Item Successfully!!🎉");
        get();
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="add_remove_select">
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p style={{ cursor: "pointer" }} onClick={() => removeData(deleteData)}>
        Delete
      </p>
      <span>|</span>
      <p className="forremovemedia">Save Or Later</p>
      <span>|</span>
      <p className="forremovemedia">See More like this</p>
      <ToastContainer position="top-center"/>
    </div>
  );
};

export default Option;
