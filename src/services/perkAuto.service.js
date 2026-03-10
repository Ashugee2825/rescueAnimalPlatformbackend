const Perk = require("../models/perk.model");
const PerkAllocation = require("../models/perkAllocation.model");
const User = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");


// src/services/perkAuto.service.js PERK AUTO ALLOCATION ENGINE
exports.autoAllocate = async () => {
  try {
    console.log("Running Auto Allocation");

    const perks = await Perk.findAll({ where: { is_active: true } });

    const fosters = await User.findAll({ where: { role: "FOSTER" } });

    for (let perk of perks) {
      for (let foster of fosters) {
        await PerkAllocation.create({
          id: uuidv4(),
          perk_id: perk.id,
          assigned_to: foster.id,
          allocation_type: "AUTO",
        });
      }
    }
  } catch (error) {
    console.error("Auto Allocation Error:", error.message);
  }
};
