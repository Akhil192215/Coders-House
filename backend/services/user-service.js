const UserModel = require("../models/user-model");

class UserService {
  async findUser(filter) {
    const user = await UserModel.findOne(filter);
    return user;
  }
  createUser(data) {
    const user = UserModel.create(data);
    return user;
  }
  async getUsers() {
    const users = await UserModel.find();
    return users;
  }
  async updateBlockStatus({ blockStatus, userId }) {
    const data = await UserModel.updateOne(
      { _id: userId },
      {
        $set: { blockStatus: blockStatus },
      }
    );
    const block = await UserModel.findOne({ _id: userId });
    return block;
  }
}

module.exports = new UserService();
