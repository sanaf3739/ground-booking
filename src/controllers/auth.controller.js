const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const registerUser = async (req, res) => {
  // get the data from req body
  const { firstName, lastName, email, password } = req.body;

  // check if user is already exists
  const user = await User.findOne({ email });

  // return if user already exists
  if (user) {
    return res
      .status(400)
      .json({ success: false, message: "user already exists" });
  }

  // create user and save to the db
  const createdUser = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  return res.status(201).json({
    success: true,
    message: "user created succesfully",
    user: createdUser,
  });
};

const generateAccessAndRefreshTokens = async (user) => {
  try {
    const accessToken = await user.generateAccessToken();
    // const refreshToken = await user.generateRefreshToken()
    return { accessToken };
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  // get credentials
  // check if the user exists or not
  // check if the provided password is true
  // if credentials matches then create tokens and send in response

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found!",
      });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const { accessToken } = await generateAccessAndRefreshTokens(user);
    console.log("access token", accessToken);
    if (!accessToken) {
      return res.status(500).json({
        success: false,
        message: "could not generate access token",
      });
    }
    res.status(200).json({
      success: true,
      message: "logged in successfully",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
