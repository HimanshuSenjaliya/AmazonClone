const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_KEY;

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not Valid Email Address😊😊");
      }
    },
  },
  mobile: {
    type: String,
    required: true,
    maxLength: 10,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password Must Contain Atleast 6 Character!😊😊"],
  },
  cpassword: {
    type: String,
    required: true,
    minLength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  carts: Array,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.cpassword = await bcrypt.hash(this.cpassword, 10);
  }
  next();
});

// token generate Process
userSchema.methods.generateToken = async function () {
  try {
    // const user = this;
    let token = jwt.sign({ _id:this._id }, secretKey, {
      expiresIn: process.env.JWT_EXPIRES,
    });
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

// Add to Cart Data
userSchema.methods.addcartData = async function (cart) {
  try {
    this.carts = this.carts.concat(cart);
    await this.save();
    return this.carts;
  } catch (error) {
    console.log(error);
  }
};

const USER = new mongoose.model("USER", userSchema);

module.exports = USER;
