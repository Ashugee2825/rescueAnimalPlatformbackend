
// src/middlewares/error.middleware.js
exports.errorHandler = (err, req, res, next) => {
  console.error("ERROR Handler:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
