/* eslint-disable no-underscore-dangle */
const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dto");
const admin = require("firebase-admin");

admin.initializeApp({
  apiKey: "AIzaSyCKrNkrv5EGmBuMHdzv5VHb5WlTchyFZhw",
  authDomain: "codershouse-a818a.firebaseapp.com",
  projectId: "codershouse-a818a",
  storageBucket: "codershouse-a818a.appspot.com",
  messagingSenderId: "459500052133",
  appId: "1:459500052133:web:16fe35bee157c585c8f74c",
  measurementId: "G-4G8XYWYJ64",
});

class AuthController {
  async sendOtp(req, res) {
    // Logic
    let { phoneNumber } = req.body;
    console.log(phoneNumber, "...................");
    phoneNumber = `+91${phoneNumber}`;
    if (!phoneNumber) {
      res.status(400).json({ message: "phone number is required" });
    }
    // generate OTP
    const otp = await otpService.generateOtp();
    // hash OTP
    const ttl = 1000 * 60 * 3; // 2min
    const expiry = Date.now() + ttl;
    const data = `${phoneNumber}.${otp}.${expiry}`;
    const hash = hashService.hashOtp(data);
    // send OTP

    try {
      await otpService.sendBySms(phoneNumber, otp);

      res.json({
        hash: `${hash}.${expiry}`,
        phoneNumber,
        otp,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "otp sending faild" });
    }
  }

  async verifyOtp(req, res) {
    // Logic
    const { otp, hash, phone } = req.body;

    if (!otp || !hash || !phone) {
      res.status(400).json({ message: "some error occured" });
    }
    const [hashedOtp, expiry] = hash.split(".");
    if (Date.now() > expiry) {
      return res.json({ message: "otp is expired" });
    }
    const data = `${phone}.${otp}.${expiry}`;

    try {
      const isValid = otpService.verifyOtpService(hashedOtp, data);
      if (!isValid) {
        throw new Error();
      }
    } catch (err) {
      return res.json({ message: "OTP is invalid" });
    }

    let user;

    try {
      user = await userService.findUser({ phone });
      console.log(user);
      if (user) {
        if (user.blockStatus) {
          return res.status(400).json({ message: "user is blocked" });
        }
      } else {
        user = await userService.createUser({
          phone,
          blockStatus: false,
          isUser: "user",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "db error" });
    }

    // Token
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
    });
    await tokenService.storeRefreshToken(refreshToken, user._id);
    res.cookie("refreshToken", refreshToken, {
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

  async refresh(req, res) {
    // Get refresh token from cookie
    const { refreshToken: refreshTokenFromCookie } = req.cookies;
    if (!refreshTokenFromCookie) {
      return res.status(401).json({ message: "invalid token" });
    }
    // Check if token is valid
    let userData;

    userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);

    // check if token is in db
    try {
      const token = await tokenService.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );
      if (!token) {
        res.status(401).json({ message: "invalid token" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Error" });
    }
    // check if valid user
    let user;
    try {
      user = await userService.findUser({ _id: userData._id });
      if (!user) {
        return res.status(404).json({ message: "user is not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal Error" });
    }
    // Generate new tokens
    const { refreshToken, accessToken } = tokenService.generateTokens({
      _id: userData._id,
    });
    // Update token in db
    try {
      await tokenService.updateRfreshToken(userData._id, refreshToken);
    } catch (error) {
      res.status(500).json({ message: "Internal Error" });
    }
    // Put token in cookie
    await tokenService.storeRefreshToken(refreshToken, user._id);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    // Send response
    const userDto = new UserDto(user);
    res.json({ user: userDto, auth: true });
  }

  async logout(req, res) {
    const { refreshToken } = req.cookies;
    // Remove refreshToken from db
    try {
      await tokenService.removeRefreshToken(refreshToken);
      res.clearCookie("accessToekn");
      res.clearCookie("refreshToken");

      res.json({ user: null, auth: false });
    } catch (error) {
      res.status(500).json({ message: "Internal Error" });
    }
  }
}
module.exports = new AuthController();
