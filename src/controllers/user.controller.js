const User = require("../models/user.model.js");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      message: "user fetched successfully",
      users: users,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "user fetched successfully",
      user: user,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

const updateUser = (req, res) => {
  // get the user data from req.body
  const { firstName, lastName, email, password } = req.body;

  // get the user by user id
  const user = User.findOneAndUpdate(
    { id: req.params.id },
    {
      firstName,
      lastName,
      email,
      password,
    }
  );
};
const deleteUser = (req, res) => {};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
