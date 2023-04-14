const tokenService = require("../services/token-service");
const { findUser } = require("../services/user-service");

module.exports = async function (req, res, next) {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      throw new Error();
    }
    const userData = await tokenService.verifyAccessToken(accessToken);
    if (userData) {
      const user = await findUser({ _id: userData._id });
      if (user) {
        if (user.blockStatus) {
          throw new Error("user is blocked");
        }
      } else {
        throw new Error();
      }
    } else {
      throw new Error();
    }
    req.user = userData;
 
    next();
  } catch (err) {
    console.log(err);
    if (err.message === "user is blocked") {
      return res.status(400).json({ message: "user id blocked" });
    }
    return res.status(401).json({ message: "invalid token" });
  }
};
