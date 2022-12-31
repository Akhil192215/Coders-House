const crypto = require("crypto");
const hashService = require("./hash-service");
const e = require("express");
const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH;
const twilio = require("twilio")(smsSid, smsAuthToken, {
  lazyLoading: true,
});

class OtpService {
  async generateOtp() {
    const otp = await crypto.randomInt(1000, 9999);
    return otp;
  }

  async sendBySms(phone, otp) {
    return await twilio.messages.create({
      to: phone,
      from: process.env.SMS_FROM_NUMBER,
      body: `your codershouse otp is ${otp}.`,
    });
  }

  verifyOtpService(hashedOtp, data) {
    const computeHash = hashService.hashOtp(data);
    return computeHash === hashedOtp;
  }
}

module.exports = new OtpService();
