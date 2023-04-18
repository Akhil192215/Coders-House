/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const userModel = require("../models/user-model");
const roomsModal = require("../models/room-modal");
const adminId = "643947cc3a9c717485b2a4dd";
const {
  findAndVerifyAdmin,
  generateTokens,
} = require("../services/adminServices");
const { getUsers, updateBlockStatus } = require("../services/user-service");
const adminServices = require("../services/adminServices");

class AdminDashBoard {
  async getAllUsers(req, res) {
    try {
      const users = await getUsers();
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  }

  async blockUnblockuser(req, res) {
    console.log(req.body);
    const { blockStatus, userId } = req.body;
    const response = await updateBlockStatus({ blockStatus, userId });
    console.log(response);
    res.json({ blockStatus: response.blockStatus, userId: response._id });
  }

  async adminLogin(req, res) {
    const { email, password } = req.body;
    // console.log(email === admin.email, password === admin.password);

    let admin;
    admin = await findAndVerifyAdmin({ email, password });

    if (!admin) {
      res.status(400).json({ message: " not verified" });
    } else {
      const { accessTokenAdmin, refreshTokenAdmin } = generateTokens({
        id: admin._id,
      });
      await adminServices.storeAdminRefreshToken(refreshTokenAdmin, admin._id);

      res.cookie("refreshTokenAdmin", refreshTokenAdmin, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });
      res.cookie("accessTokenAdmin", accessTokenAdmin, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });
      return res
        .status(200)
        .json({ isUser: "admin", message: "verified", auth: true });
    }
  }

  async adminRefresh(req, res) {
    return res.json({ isUser: "admin", message: "verified", auth: true });
  }

  async logout(req, res) {
    const { refreshTokenAdmin } = req.cookies;
    // Remove refreshToken from db
    await adminServices.removeAdminRefreshToken(refreshTokenAdmin);
    try {
      res.clearCookie("accessToeknAdmin");
      res.clearCookie("refreshTokenAdmin");
      res.json({ message: null, auth: false });
    } catch (error) {
      res.status(500).json({ message: "Internal Error" });
    }
  }

  totalUsers(req, res) {
    userModel
      .countDocuments({ isActive: true })
      .then((count) => res.json({ count }))
      .catch((err) => console.log(err));
  }

  totalAudioRooms(req, res) {
    roomsModal
      .countDocuments({ roomType: "open" })
      .then((count) => res.json({ count }))
      .catch((err) => console.log(err));
  }

  totalCodingRooms(req, res) {
    roomsModal
      .countDocuments({ roomType: "private" })
      .then((count) => res.json({ count }))
      .catch((err) => console.log(err));
  }

  activeUsers(req, res) {
    const startOfWeek = moment().startOf("week");
    const endOfWeek = moment().endOf("week");

    userModel
      .distinct("userId", {
        lastActivity: { $gte: startOfWeek, $lte: endOfWeek },
      })
      .then((count) => console.log(`Number of weekly active users: ${count}`))
      .catch((err) => console.log(err));
  }

  async newUsers(req, res) {
    const users = await getUsers();
    // Calculate the start and end dates based on the time period
    let timePeriod = 10;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - timePeriod);

    const endDate = new Date();

    // Filter the users array to only include those that were created between the start and end dates
    const newUsers = users.filter((user) => {
      const userCreatedDate = new Date(user.createdAt);
      return userCreatedDate >= startDate && userCreatedDate <= endDate;
    });

    // Group the new users by week
    const weeks = {};
    newUsers.forEach((user) => {
      const weekStart = new Date(user.createdAt);
      weekStart.setHours(0, 0, 0, 0);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const week = `${
        weekStart.getMonth() + 1
      }/${weekStart.getDate()}/${weekStart.getFullYear()} - ${
        weekEnd.getMonth() + 1
      }/${weekEnd.getDate()}/${weekEnd.getFullYear()}`;
      if (weeks[week]) {
        weeks[week]++;
      } else {
        weeks[week] = 1;
      }
    });

    // Return an array of objects containing the week and the number of new users for that week
    const data = Object.keys(weeks).map((week) => {
      console.log({ week, new_users: weeks[week] });
      return { week, new_users: weeks[week] };
    });

    return res.json({ data });
  }
}

module.exports = new AdminDashBoard();
