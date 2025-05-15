const registerUser = async (req, res) => {
  // get the data from req body
  const { firstName, lastName, email, password } = req.body;

  // check if user is already exists
  const user = await User.findOne({ email });

  // return if user already exists
  if (user) {
    return res.status(400).json({ success: false, message: "user already exists" });
  }

  // create user and save to the db
  const createdUser = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  return res
    .status(201)
    .json({ success: true, message: "user created succesfully", user: createdUser });
};


module.exports = {
    registerUser
}