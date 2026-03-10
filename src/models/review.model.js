const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  user_id: DataTypes.UUID,

  shelter_id: DataTypes.UUID,

  pet_id: DataTypes.UUID,

  rating: {
    type: DataTypes.INTEGER,
    validate: { min: 1, max: 5 },
  },

  comment: DataTypes.TEXT,
});

module.exports = Review;
