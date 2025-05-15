require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./app");
const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });
    app.listen(PORT, () => {
      console.log(`server is lintening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
