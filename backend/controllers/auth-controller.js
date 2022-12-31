const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
class AuthController {
  async sendOtp(req, res) {
    //Logic
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ message: "phone number is required" });
    }
    //generate OTP
    const otp = await otpService.generateOtp();
    //hash OTP
    const ttl = 1000 * 60 * 3; //2min
    const expiry = Date.now() + ttl;
    const data = `${phone}.${otp}.${expiry}`;
    const hash = hashService.hashOtp(data);
    //send OTP

    try {
      await otpService.sendBySms(phone, otp);
      res.json({
        hash: `${hash}.${expiry}`,
        phone,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "otp sending faild" });
    }

    // res.json({ hash: hash });
  }

  verifyOtp(req, res) {
    //Logic
    const [otp, hash, phone] = req.body;
    if (!otp || !hash || !phone) {
      res.status(400).json({ message: "some error occured" });
    }
    const [hashedOtp,expiry] = hash.split('.')
    const data = `${phone}.${otp}.${expiry}`;
    const isValid = otpService.verifyOtpService(hashedOtp,data)
    if(!isValid) {
      res.status(400).json({message:"OTP is invalid"})
    }
    let user;
    let accessToken;
    let refreshToken
  }
}

module.exports = new AuthController();
