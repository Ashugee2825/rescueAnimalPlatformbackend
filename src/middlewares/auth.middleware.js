const jwt = require("jsonwebtoken");

// src/middlewares/auth.middleware.js
exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Token missing and NO Token Provided" });
    }

    // Remove Bearer
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token, 
      process.env.JWT_ACCESS_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).json({ message: "Unauthorized & Invalid Token" });
  }
};

// // Role-based access control middleware
// exports.authorizeRoles = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!allowedRoles.includes(req.user.role)) {  
//       return res.status(403).json({ message: "Forbidden: Insufficient Permissions" });
//     }
//     next();
//   }
// };

// // Middleware to authenticate and authorize users based on JWT tokens and roles
// exports.authenticate = (req, res, next) => {
//   exports.verifyToken(req, res, (err) => {  
//     if (err) {
//       return res.status(401).json({ message: "Unauthorized: Invalid Token" });
//     }
//     next();
//   });
// };


// // MAIN AUTH MIDDLEWARE
exports.authenticate = (req, res, next) => { //
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


