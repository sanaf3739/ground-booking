const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const validateData = require("../middlewares/validationMiddleware");
const { userRegistrationSchema } = require("../schemas/user.schemas");

const authRouter = Router();

/*
@/register 
@/login 
@/logout
@/me
@/refresh
*/

authRouter.get(
  "/register",
  validateData(userRegistrationSchema),
  authController.registerUser
);

module.exports = authRouter;
