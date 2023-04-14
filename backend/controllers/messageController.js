const Chat = require("../models/chat-modal");
const Message = require("../models/message-modal");
const UserModel = require("../models/user-model");

class messageController {
  async allMessages(req, res) {
    if (req.params.chatId === undefined)
      return res.status(404).json({ message: "no params received" });

    try {
      const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender", "name avatar email")
        .populate("chat");
      res.json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
  async sendMessage(req, res) {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }

    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
    try {
      var message = await Message.create(newMessage);

      message = await message.populate("sender", "name pic");
      message = await message.populate("chat");
      message = await UserModel.populate(message, {
        path: "chat.users",
        select: "name avatar",
      });
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

      res.json(message);
    } catch (error) {
      res.status(400);
      console.log(error);
    }
  }
}

module.exports = new messageController();
