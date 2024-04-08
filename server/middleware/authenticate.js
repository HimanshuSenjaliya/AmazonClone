const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const secretKey = process.env.JWT_KEY;

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.Amazon;
    // console.log(token);

    const verifyToken = jwt.verify(token, secretKey);
    // console.log(verifyToken);

    const rootUser = await USER.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    // console.log(rootUser);

    if (!rootUser) {
      throw new Error("User Not Found!!");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();
  } catch (error) {
    res.status(401).send("Unauthorized User : NO Token Provide");
    console.log(error);
  }
};

module.exports = authenticate;
