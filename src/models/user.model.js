const { mongoose, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

module.exports = mongoose.model("User", userSchema);
