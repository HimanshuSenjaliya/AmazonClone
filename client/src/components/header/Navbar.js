/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import RightHeader from "./RightHeader";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);

  const navigateTo = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [text, setText] = useState("");
  // console.log(text)
  const [listOpen, setListOpen] = useState(true);

  const { products } = useSelector((state) => state.getproductData);

  const getDetailValidUser = async () => {
    const res = await axios.get("http://localhost:8004/validUser", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = res.data;
    // console.log(data)
    if (res.status !== 201) {
      console.log("error");
    } else {
      // console.log("Data Valid");
      setAccount(data);
    }
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const getText = (items) => {
    setText(items);
    setListOpen(false);
  };

  useEffect(() => {
    getDetailValidUser();
  }, []);

  const logoutUser = async () => {
    const res2 = await axios.get("http://localhost:8004/logout", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data2 = res2.data;
    // console.log(data)
    if (res2.status !== 201) {
      console.log("error");
    } else {
      console.log("Data Valid");
      toast.success("Logout Successfully!!🎉🎉");
      setAccount(false);
      navigateTo("/");
    }
  };

  const cartCount = account && account.carts ? account.carts.length : 0;

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handleDrawerOpen}>
            <MenuIcon style={{ color: "white" }} />
          </IconButton>
          <Drawer open={drawerOpen} onClose={handleDrawerClose}>
            <RightHeader logClose={handleDrawerClose} logoutuser={logoutUser} />
          </Drawer>
          <div className="navlogo">
            <NavLink to="/">
              <img src="./amazon_PNG25.png" alt="" />
            </NavLink>
          </div>
          <div className="nav_searchbar">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search for Products..."
              onChange={(e) => getText(e.target.value)}
            />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>
            {/* search Filter */}
            {text && (
              <List className="extrasearch" hidden={listOpen}>
                {products
                  .filter((product) =>
                    product.title.longTitle
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map((product) => (
                    <ListItem>
                      <NavLink
                        to={`/getproductsone/${product.id}`}
                        onClick={() => setListOpen(true)}
                      >
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <NavLink to="/login">Sign In</NavLink>
          </div>

          <div className="cart_btn">
            {account ? (
              <NavLink to="/buynow">
                <Badge badgeContent={cartCount} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}
            <ToastContainer position="top-center" />
            <p>Cart</p>
          </div>
          {account ? (
            <Avatar
              className="avtar2"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              className="avtar"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            ></Avatar>
          )}

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {account ? (
              <MenuItem onClick={handleClose} onClick={logoutUser}>
                Logout &nbsp;
                <LogoutIcon style={{ fontSize: "20px" }} />
              </MenuItem>
            ) : (
              ""
            )}
          </Menu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
