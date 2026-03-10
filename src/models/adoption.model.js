const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// models/adoption.model.js
const Adoption = sequelize.define(
  "Adoption",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: DataTypes.UUID,
    pet_id: DataTypes.UUID,
    adopter_id: DataTypes.UUID,
    shelter_id: DataTypes.UUID,

    status: {
      type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED", "CANCELLED"),
      defaultValue: "PENDING",
    },

    meeting_date: DataTypes.DATE,
    payment_status: {
      type: DataTypes.ENUM("UNPAID", "PAID"),
      defaultValue: "UNPAID",
    },
  },
  { timestamps: true },
);

module.exports = Adoption;


// Adopter -- Request Adoption 
// Foster/Shelter -- Approve
// Pet status becomes ADOPTED
//