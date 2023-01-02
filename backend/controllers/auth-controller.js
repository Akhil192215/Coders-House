const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dto");
class AuthController {
  async sendOtp(req, res) {
    //Logic
    const { phone } = req.body;
    console.log(phone);
    if (!phone) {
      res.status(400).json({ message: "phone number is required" });
    }
    // generate OTP
    const otp = await otpService.generateOtp();
    //hash OTP
    const ttl = 1000 * 60 * 3; //2min
    const expiry = Date.now() + ttl;
    const data = `${phone}.${otp}.${expiry}`;
    const hash = hashService.hashOtp(data);
    //send OTP

    try {
      // await otpService.sendBySms(phone, otp);
      res.json({
        hash: `${hash}.${expiry}`,
        phone,
        otp,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "otp sending faild" });
    }
  }

  async verifyOtp(req, res) {
    //Logic
    console.log(req.body);
    const { otp, hash, phone } = req.body;
    if (!otp || !hash || !phone) {
      res.status(400).json({ message: "some error occured" });
    }
    const [hashedOtp, expiry] = hash.split(".");
    if (Date.now() > expiry) {
      res.status(400).json({ message: "otp is expired" });
    }
    const data = `${phone}.${otp}.${expiry}`;
    const isValid = otpService.verifyOtpService(hashedOtp, data);
    if (!isValid) {
      res.status(400).json({ message: "OTP is invalid" });
    }
    let user;

    try {
      user = await userService.findUser({ phone });
      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "db error" });
    }

    //Token
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
    });
    await tokenService.storeRefreshToken(refreshToken, user._id);
    res.cookie("refreshtoken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    const userDto = new UserDto(user);
    res.json({ user: userDto, auth: true });
  }

  apiTest(req, res) {
    console.log(req.body);
    const { data } = req.body;
    if (data) {
      res.send("hiiiiiiiiiiiii");
    }
    res.status("biiiiiiiiiiiiiiiiii");
  }
  newApi(req, res) {
    const { new1 } = req.body;
    console.log(new1);
    if (!new1) {
      res.send("data not recived");
    }
    res.send("data recived");
  }
}

module.exports = new AuthController();
