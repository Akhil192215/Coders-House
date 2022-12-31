class AuthController {
  sendOtp(req, res) {
    //Logic
    const {phone} = req.body
    console.log(phone);
    if(!phone) {
        res.status(400).json({message:'phone number is required'})
    }

    res.send("otp send ok");
  }
}

module.exports = new AuthController();
