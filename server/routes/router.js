const express = require("express");
const router = express.Router();
const Products = require("../models/productSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

// GET ALL PRODUCTS DATA
router.get("/getproducts", async (req, res) => {
  try {
    const productsData = await Products.find();
    // console.log(productsData)
    res.status(201).json(productsData);
  } catch (error) {
    console.log("error" + error.message);
  }
});

// GET INDIVIDUAL DATA
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const individualData = await Products.findOne({ id: id });

    // console.log(individualData)

    res.status(201).json(individualData);
  } catch (error) {
    console.log("error" + error.message);
  }
});

// USER SIGN-UP (REGISTER DATA)
router.post("/register", async (req, res) => {
  // console.log(req.body)
  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(422).json({
      error: "Please Fill All Data!🙏🙏",
    });
  }

  try {
    const preUser = await USER.findOne({ email: email });

    if (preUser) {
      res.status(422).json({
        error: "User Already Exists!🎉🎉",
      });
    } else if (password !== cpassword) {
      res.status(422).json({
        error: "Password and Confirm Password Not Match",
      });
    } else {
      const newUser = new USER({ fname, email, mobile, password, cpassword });

      // Password Hashing

      const storeData = await newUser.save();
      // console.log(storeData)

      res.status(201).json({
        success: true,
        storeData,
      });
    }
  } catch (error) {}
});

// USER SIGN-IN (LOGIN)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      error: "Please the All Data!!😊😊",
    });
  }

  try {
    const userLogin = await USER.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      // // token Generate
      // const token = await userLogin.generateToken();

      // // generate Cookie
      // res.cookie("Amazon", token, {
      //   httpOnly: true,
      //   expires: new Date(Date.now() + 86400000),
      //   secure: true,
      //   // sameSite: "strict",
      // });

      // console.log("Cookie set successfully");

      if (!isMatch) {
        res.status(400).json({
          error: "Invalid Details😊😊",
        });
      } else {
        // token Generate
        const token = await userLogin.generateToken();

        // generate Cookie
        res.cookie("Amazon", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 86400000),
          secure: true,
          // sameSite: "strict",
        });

        res.status(201).json(userLogin);
      }
    } else {
      res.status(400).json({
        error: "Invalid Details😊😊",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Invalid Details!!😊😊",
    });
  }
});

// adding the data into cart
router.post("/addcart/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Products.findOne({ id: id });
    // console.log(cart);

    const UserContact = await USER.findOne({ _id: req.userId });
    // console.log(UserContact);

    if (UserContact) {
      const cartData = await UserContact.addcartData(cart);
      await UserContact.save();
      // console.log(cartData);
      res.status(201).json(UserContact);
    } else {
      res.status(401).json({ error: "Invalid User" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid User..." });
  }
});

// get carts Details
router.get("/cartDetails", authenticate, async (req, res) => {
  try {
    const buyUser = await USER.findOne({ _id: req.userId });
    res.status(201).json(buyUser);
  } catch (error) {
    console.log(error);
  }
});

// Get Valid User
router.get("/validUser", authenticate, async (req, res) => {
  try {
    const validUser = await USER.findOne({ _id: req.userId });
    res.status(201).json(validUser);
  } catch (error) {
    console.log(error);
  }
});

// Remove Items For Carts
router.delete("/removeItem/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    req.rootUser.carts = req.rootUser.carts.filter((currentValue) => {
      return currentValue.id != id;
    });

    req.rootUser.save();
    res.status(201).json(req.rootUser);
  } catch (error) {
    console.log("error" + error);
    res.status(400).json(req.rootUser);
  }
});

// User Logout
router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((currentElement) => {
      return currentElement.token !== req.token;
    });

    res.clearCookie("Amazon", { path: "/" });

    req.rootUser.save();
    res.status(201).json(req.rootUser.tokens);
    // console.log("User Logout Successfully!!");
  } catch (error) {
    console.log("error For User Logout!!");
  }
});

module.exports = router;
