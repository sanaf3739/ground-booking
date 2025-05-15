const express = require("express");
const cors = require("cors");
const app = express();

// ROUTER IMPORTS
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");

// MIDDLEWARES
app.use(cors());
app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true}));

// ROUTES
app.use("/api/v1/users", userRouter)
app.use("/api/v1/auth", authRouter)

module.exports = app;
