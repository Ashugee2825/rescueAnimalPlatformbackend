const Chat = require("../models/chat.model");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");


exports.sendMessage = async (req, res) => {
  try {
    const { receiver_id, message } = req.body;

    const chat = await Chat.create({
      id: uuidv4(),
      sender_id: req.user.id,
      receiver_id,
      message,
    });

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const { userId } = req.params;

    const chats = await Chat.findAll({
      where: {
  [Op.or]: [
    { sender_id: req.user.id, receiver_id: userId },
    { sender_id: userId, receiver_id: req.user.id }
  ]
},
      order: [["createdAt", "ASC"]],
    });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
