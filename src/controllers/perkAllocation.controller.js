const PerkAllocation = require("../models/perkAllocation.model");
// src/controllers/perkAllocation.controller.js
exports.allocatePerk = async (req, res) => {
  try {
    const allocation = await PerkAllocation.create({
      user_id: req.body.user_id,
      perk_id: req.body.perk_id,
    });

    res.status(201).json(allocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserPerks = async (req, res) => {
  try {
    const perks = await PerkAllocation.findAll({
      where: { user_id: req.user.id },
    });

    res.json(perks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
