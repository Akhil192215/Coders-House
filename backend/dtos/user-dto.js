/* eslint-disable no-underscore-dangle */
/* eslint-disable lines-between-class-members */
class UserDto {
  id;
  phone;
  name;
  avatar;
  activated;
  createdAt;
  constructor(user) {
    this.id = user._id;
    this.phone = user.phone;
    this.name = user.name;
    this.avatar = user.avatar;
    this.isUser = user.isUser;
    this.activated = user.activated;
    this.createdAt = user.createdAt;
  }
}

module.exports = UserDto;
