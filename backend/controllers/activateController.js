const jimp = require("jimp");
const path = require("path");
const UserDto = require("../dtos/user-dto");
const userService = require("../services/user-service");
class ActivateController {
  async activate(req, res) {
    //logic
    const { name, avatar } = req.body;
    try{
      if (!name || !avatar) {
    throw new Error()
      }
    }catch (err){
      console.log(err);
      res.status(400).json({ message: "some fileds are missing" });
    }
  

    //Image Base64

    const buffer = Buffer.from(
      avatar.replace(/^data:image\/(png||jpg||jpeg);base64,/, ""),
      "base64"
    );
    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
    try {
      const jimpResp = await jimp.read(buffer);
      jimpResp
        .resize(150, jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`));
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "somthing went wrong..." });
    }
    const userId = req.user._id;

    try {
      const user = await userService.findUser({ _id: userId });
      if (!user) {
      return  res.status(404).json({ message: "User is not found!" });
      }
      user.activated = true;
      user.name = name;
      user.avatar = `/storage/${imagePath}`;
      user.save();
     return res.json({ user: new UserDto(user), auth: true });
    } catch (err) {
      console.log(err);
      // res.status(500).json({ message: "Somthing went wrong" });
    }
  }
}

module.exports = new ActivateController();
