const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Invite = sequelize.define(
  "Invite",
  {
    email: DataTypes.STRING,
    role: DataTypes.STRING, // SHELTER / FOSTER / VOLUNTEER
    token: DataTypes.STRING,
    is_used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true },
);

module.exports = Invite;

// RRAdmin → Invite Shelter/Foster/Volunteer , Invite link sent via email
//User registers using invite token

