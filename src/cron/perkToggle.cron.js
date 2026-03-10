const cron = require("node-cron");
const { Op } = require("sequelize");

const Perk = require("../models/perk.model");
const Adoption = require("../models/adoption.model");
const stripeService = require("../services/stripe.service");
const Meeting = require("../models/meeting.model");


/*
Runs daily midnight
*/

// src/perkToggle.cron.js
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Running Daily Perk Toggle Cron");
    console.log("Running daily system maintenance");


    // Disable expired perks toggle
    await Perk.update(
      { is_active: false },
      {
        where: {
          toggle_off_date: {
            [Op.lte]: new Date(),
          },
        },
      },
    );

    console.log("Checking expired adoptions...");

    // Cancel expired adoption meetings
    await Adoption.update(
      { status: "CANCELLED" },
      {
        where: {
          meeting_date: { [Op.lt]: new Date() },
          status: "PENDING",
        },
      },
    );

    console.log("Checking expired meetings...");
    await Meeting.update(
      { status: "EXPIRED" },
      {
        where: {
          meeting_date: { [Op.lt]: new Date() },
          status: "SCHEDULED",
        },
      },
    );
    console.log("Cron job completed successfully");
  } catch (error) {
    console.error("Cron Error:", error.message);
  }
});
