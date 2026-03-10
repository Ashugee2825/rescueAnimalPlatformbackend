const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING, // RRADMIN, SHELTER, FOSTER, VOLUNTEER, ADOPTER, VENUE
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    adopter_id: DataTypes.STRING,
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    one_time_pin: DataTypes.STRING,
    otp_expiry: DataTypes.DATE,
    refreshToken: {
      type: DataTypes.TEXT,
    },

    accessToken: {
      type: DataTypes.TEXT,
    },
    onboarding_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = User;
