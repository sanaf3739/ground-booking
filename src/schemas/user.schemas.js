const z = require("zod");

const userRegistrationSchema = z.object({
  firstName: z.string().min(3, "Name must be at least 3 characters long"),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const userLoginSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});

module.exports = {
  userRegistrationSchema,
  userLoginSchema,
};
