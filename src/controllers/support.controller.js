const { v4: uuidv4 } = require("uuid");
const SupportTicket = require("../models/supportTicket.model");

exports.createTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.create({
      id: uuidv4(),
      user_id: req.user.id,
      category: req.body.category,
      message: req.body.message
    });

    res.status(201).json(ticket);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.findAll();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.findByPk(req.params.id);

    ticket.status = req.body.status;
    ticket.response = req.body.response;

    await ticket.save();

    res.json(ticket);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    await SupportTicket.destroy({ where: { id: req.params.id } });
    res.json({ message: "Ticket deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};