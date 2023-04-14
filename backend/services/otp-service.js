const crypto = require("crypto");
const hashService = require("./hash-service");
const e = require("express");
const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH;
const client = require("twilio")(
  "AC416e4b7ea000062d9c0ae00186d7c505",
  "ee525a25125b27a3ce3a72993b6ddfb5",
  {
    lazyLoading: true,
  }
);

class OtpService {
  async generateOtp() {
    const otp = await crypto.randomInt(1000, 9999);
    return otp;
  }

  async sendBySms(phone, otp) {
    const toNumber = phone; // The phone number to send the OTP to

    client.messages
      .create({
        body: `Your OTP is: ${otp}`,
        from: "+1 507 666 5610", // Your Twilio phone number
        to: toNumber,
      })
      .then((message) => console.log(message.sid))
      .catch((error) => console.log(error));
  }

  verifyOtpService(hashedOtp, data) {
    const computeHash = hashService.hashOtp(data);
    return computeHash === hashedOtp;
  }
}

module.exports = new OtpService();
