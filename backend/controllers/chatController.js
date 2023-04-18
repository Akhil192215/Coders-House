/* eslint-disable no-underscore-dangle */
const Chat = require("../models/chat-modal");
const UserModel = require("../models/user-model");
class ChatController {
  async searchUser(req, res) {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { phone: { $regex: req.query.search } },
          ],
        }
      : {};

    const users = await UserModel.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  }

  // eslint-disable-next-line class-methods-use-this
  async accessChat(req, res) {
    const {userId}  = req.body;
    if (!userId) {
      return res.sendStatus(400);
    }
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        // eslint-disable-next-line no-underscore-dangle
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await UserModel.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        // eslint-disable-next-line no-underscore-dangle
        users: [req.user._id, userId],
      };
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  }
  async fetchChat(req, res) {
    try {
      Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await UserModel.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
  async createGroupChat(req, res) {
   
    if (!req.body.data.users || !req.body.data.name) {
      return res.status(400).send({ message: "Please Fill all the feilds" });
    }
    var users = req.body.data.users

    if (users.length < 2) {
      return res
        .status(400)
        .send("More than 2 users are required to form a group chat");
    }

    users.push(req.user);

    try {
      const groupChat = await Chat.create({
        chatName: req.body.data.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
      });

      const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      res.status(200).json(fullGroupChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
  async rename(req, res) {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(updatedChat);
    }
  }
  // eslint-disable-next-line lines-between-class-members
  async addToGroup(req, res) {
    console.log(req.body);
    const { chatId, userId } = req.body;
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(added);
    }
  }

async removeFromGroup(req,res){
  const { chatId, userId } = req.body;
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
}
}
module.exports = new ChatController();
