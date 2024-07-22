const ContactModel = require("../model/contactModel");

const SendMessage = async (req, res) => {
  try {
    await ContactModel.create(req.body);
    res.status(200).json({ message: "Message send successfully" });
  } catch (error) {
    res.status(500).json({ message: "Message not send" });
    console.log("error in sending message:", error);
  }
};

const GetMessages = async (req, res) => {
  try {
    const messages = await ContactModel.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(404).json({ message: "No messages found" });
    console.log("Error in finding the messages: ", error);
  }
};

module.exports = { SendMessage, GetMessages };
