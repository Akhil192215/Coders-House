const UserModel = require('../models/user-model')

class UserService{
  async  findUser(filter){
        const user = await UserModel.findOne(filter)
        return user
    }
    createUser(data){
        const user = UserModel.create(data)
        return user
    }
}

module.exports = new UserService()