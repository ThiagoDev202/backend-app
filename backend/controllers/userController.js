const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const todoModels = require("../models/todoModels");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// RegisterUser
// const registerUser = (req, res) => {
//     res.json({ message: "Register User" });
// };

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add al fields");
  }

  // check if user exists
  const userExists = await User.findOne ({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // create hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email:user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// const loginUser = (req, res) => {
//     res.json({ message: "Login User" });
// };

// Authentication for registered user - verifying the user's identity by comparing their provided email and password
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add al fields");
  }

  // check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))){
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid crednetials");
  }
});

// const getLoggedInUser = (req, res) => {
//     res.json({ message: "Logged In User data" });
// };

const getLoggedInUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req,user.id);

  const user = await User.findById(req.user.id);

  if (!user) {
    throw new Error("User not found");
  }

  if (todoModels.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json({
    id: id,
    name,
    email,
  });
});
  
module.exports = {
    registerUser,
    loginUser,
    getLoggedInUser,
};