const { getUsers, updateBlockStatus } = require("../services/user-service");

const admin = {
  email: "admin@gmail.com",
  password: "a1234",
};
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
    res.json({ blockStatus: response.blockStatus ,userId:response._id});
  }
  adminLogin(req, res) {
    const { email, password } = req.body;
    console.log(email === admin.email , password === admin.password);
    if (email === admin.email && password === admin.password) {
      return res.status(200).json({ message: "verified" });
    } else {
      res.status(400).json({ message: " not verified" });
    }
  }
}

module.exports = new AdminDashBoard();
