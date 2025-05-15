const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const validateData = require("../middlewares/validationMiddleware");
const { userRegistrationSchema, userLoginSchema } = require("../schemas/user.schemas");

const authRouter = Router();

/*
@/register 
@/login 
@/logout
@/me
@/refresh
*/

authRouter
  .post(
    "/register",
    validateData(userRegistrationSchema),
    authController.registerUser
  )
  .post(
    "/login",
    validateData(userLoginSchema),
    authController.loginUser
  );

module.exports = authRouter;
