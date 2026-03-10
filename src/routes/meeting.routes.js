const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meeting.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/", verifyToken, meetingController.createMeeting);
router.get("/", verifyToken, meetingController.getMeetings);
router.put("/:id/status", verifyToken, meetingController.updateMeetingStatus);
router.delete("/:id", verifyToken, meetingController.deleteMeeting);

module.exports = router;
