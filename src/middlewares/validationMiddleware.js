// src/middleware/validationMiddleware.ts
const { ZodError } = require("zod");
function formatZodErrors(error) {
  return error.errors.reduce((acc, err) => {
    // console.log(err.path.join("."))
    const field = err.path.join(".");
    acc[field] = err.message;
    return acc;
  }, {});
}

function validateData(schema) {
  return (req, res, next) => {
    // console.log(req.body)
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // console.log(error.errors)
        const formattedErrors = formatZodErrors(error);
        res.status(400).json({
          success: false,
          message: "Validation Error!",
          errors: formattedErrors,
        });
      } else {
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    }
  };
}

module.exports = validateData;
