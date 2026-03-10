

// src/middlewares/role.middleware.js
exports.checkRole = (roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Forbidden: Access denied",
        });
      }
      next();
    } catch (error) {
      console.error("Role Middleware Error:", error.message);
      res.status(500).json({ message: error.message });
    }
  };
};