const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

// src/utils/generateTokens.js


const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.ACCESS_EXPIRES },
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_EXPIRES },
  );

  return { accessToken, refreshToken };
};

module.exports = generateTokens;
