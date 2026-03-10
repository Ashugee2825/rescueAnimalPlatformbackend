const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Meeting = sequelize.define(
  "Meeting",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    pet_id: DataTypes.UUID,
    foster_id: DataTypes.UUID,
    adopter_id: DataTypes.UUID,
    venue_id: DataTypes.UUID,
    status: {
      type: DataTypes.STRING,
      defaultValue: "PENDING",
    },
    meeting_time: DataTypes.DATE,
  },
  {
    timestamps: true,
  },
);

module.exports = Meeting;
