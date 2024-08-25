const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/authMiddleware");
const { Contact, Message, User } = require("../models"); // Import models

// Route to get user contacts
router.get("/contacts", authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the JWT payload
    console.log("userrrr", userId);

    const contacts = await Contact.findAll({
      where: { userId },
      include: [{ model: User, attributes: ["id", "name", "email"] }], // Adjust as needed
    });
    console.log("contacts", contacts);

    res.json(contacts);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Error fetching contacts" });
  }
});

// Route to add a contact
router.post("/contacts/add", authenticateJWT, async (req, res) => {
  try {
    const { contactEmail } = req.body;
    const userId = req.user.id; // Get user ID from the JWT payload

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Find contact by email
    const contact = await User.findOne({ where: { email: contactEmail } });
    if (!contact) return res.status(404).json({ error: "Contact not found" });

    const existingContact = await Contact.findOne({
      where: { userId: userId, contactId: contact.id },
    });
    if (existingContact)
      return res.status(400).json({ error: "Contact already added" });

    const reverseExistingContact = await Contact.findOne({
      where: { userId: contact.id, contactId: userId },
    });

    // Add contact for both users if not already added
    await Contact.create({ userId: userId, contactId: contact.id });
    if (!reverseExistingContact) {
      await Contact.create({ userId: contact.id, contactId: userId });
    }

    res
      .status(200)
      .json({
        message: "Contact added successfully and relationship is mutual",
      });
  } catch (error) {
    console.log("Error adding contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/message", authenticateJWT, async (req, res) => {
  const { content } = req.body;
  try {
    const senderId = req.user.id; 
    console.log("senderIdsenderId",senderId)
    console.log("receiverIdreceiverId",content.receiverId)

    const message = await Message.create({
      senderId: senderId,
      receiverId: content.receiverId,
      content: content.content,
    });

    res.status(201).json(message);
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ error: "Error sending message" });
  }
});

router.get("/messages/:contactId", authenticateJWT, async (req, res) => {
  const { contactId } = req.params;
  console.log("contactIdcontactId", contactId);
  try {
    const userId = req.user.id; // Get user ID from the JWT payload
    console.log("userIduserId", userId);

    // Fetch messages between the authenticated user and the specified contact
    const messages = await Message.findAll({
      where: {
        senderId: [userId, contactId],
        receiverId: [userId, contactId],
      },
      order: [["createdAt", "ASC"]],
    });
    console.log("messages",messages)

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

module.exports = router;
