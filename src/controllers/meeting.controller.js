const { v4: uuidv4 } = require("uuid");
const Meeting = require("../models/meeting.model");
const { ConnectParticipant } = require("aws-sdk");

exports.createMeeting = async (req, res) => {
  try {
    console.log("Create Meeting API");

    const { pet_id, foster_id, venue_id, meeting_time } = req.body;

    const meeting = await Meeting.create({
      id: uuidv4(), //  Only generate primary key
      pet_id,      //  Must exist in pets table
      foster_id,
      adopter_id: req.user.id,
      venue_id,
      //status: "PENDING",
      meeting_time,
      //duration: 45, // default 45 mins
      
      meeting_time
    });

    res.status(201).json({ message: "Meeting Requested", meeting });
  } catch (error) {
    console.error("Meeting Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.findAll({
      where: { adopter_id: req.user.id },
    });

    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.updateMeetingStatus = async (req, res) => {
  try {
    console.log("Update Meeting Status");

    const meeting = await Meeting.findByPk(req.params.id);
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    meeting.status = req.body.status;
    await meeting.save();

    res.json({ message: "Meeting Updated", meeting });
  } catch (error) {
    console.error("Meeting Update Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMeeting = async (req, res) => {
  try {
    await Meeting.destroy({ where: { id: req.params.id } });
    res.json({ message: "Meeting deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 