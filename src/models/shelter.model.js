// models/shelter.model.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Shelter = sequelize.define(
  "Shelter",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    user_id: DataTypes.UUID,

    shelter_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: DataTypes.TEXT,

    phone: DataTypes.STRING,
    email: DataTypes.STRING,

    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    pincode: DataTypes.STRING,

    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,

    logo: DataTypes.STRING,
    website: DataTypes.STRING,

    license_number: DataTypes.STRING,

    capacity: DataTypes.INTEGER,

    rating_avg: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    total_reviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  },
  {
    timestamps: true,
    paranoid: true,
  },
);

module.exports = Shelter;
