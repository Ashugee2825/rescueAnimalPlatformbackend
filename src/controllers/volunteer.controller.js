const PerkAllocation = require("../models/perkAllocation.model");

exports.viewPerks = async (req, res) => {
  try {
    console.log("Volunteer View Perks");

    const perks = await PerkAllocation.findAll({
      where: { assigned_to: req.user.id },
    });

    res.json(perks);
  } catch (error) {
    console.error("Volunteer Perk Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};


// Volunteer can: View perks ,View assigned pets , update profile