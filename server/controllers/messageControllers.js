const messageModel = require("../model/messageModel");
module.exports.addMessages = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      senders: from,
    });
    if (data) return res.json({ msg: "Message added successfully" });
    return res.json({ msg: "Message fail to add" });
  } catch (ex) {
    next(ex);
  }
};
module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({ users: { $all: [from, to] } })
      .sort({ updatedAt: 1 });
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.senders.toString() === from,
        message: msg.message.text,
      };
    });
    return res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};
