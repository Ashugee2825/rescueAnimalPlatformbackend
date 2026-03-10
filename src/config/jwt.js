// config/jwt.js
module.exports = {
  accessSecret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  accessExpiry: "15m",
  refreshExpiry: "1d",
};
