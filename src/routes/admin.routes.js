const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { checkRole } = require("../middlewares/role.middleware");

//src/routes/perk.routes.js
// Only RRADMIN allowed

router.put(
  "/adopter/approve/:id",
  verifyToken,
  checkRole(["RRADMIN"]),
  adminController.approveAdopter,
);

router.put(
  "/adopter/reject/:id",
  verifyToken,
  checkRole(["RRADMIN"]),
  adminController.rejectAdopter,
);

  //Correct Role Guard Usage
router.post(
  "/invite",
  verifyToken,
  checkRole(["RRADMIN"]),
  adminController.sendInvite,
);

router.get(
  "/analytics",
  verifyToken,
  checkRole(["RRADMIN"]),
  adminController.getAnalytics,
);


// router.post(
//   "/api/admin/invite",
//   authenticate,
//   checkRole(["ADMIN", "RRADMIN"]),
//   adminController.inviteVolunteer,
// );

// router.get(
//   "/analytics",
//   authenticate,
//   verifyToken,
//   checkRole(["ADMIN", "RRADMIN"]),
//   adminController.getAnalytics,
// );

module.exports = router;
