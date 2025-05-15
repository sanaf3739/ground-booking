const { Router } = require("express");
const {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  getUser,
  loginUser,
} = require("../controllers/user.controller");
const validateData = require("../middlewares/validationMiddleware");
const { userRegistrationSchema, userLoginSchema } = require("../schemas/user.schemas");

const userRouter = Router();

userRouter
  .get("/", getUsers)
  .get("/:id", getUser)
  // .post("/register", validateData(userRegistrationSchema), registerUser)
  // .post("/login", validateData(userLoginSchema), loginUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);

module.exports = userRouter;
