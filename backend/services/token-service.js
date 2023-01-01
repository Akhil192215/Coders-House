const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1hr",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1yr",
    });
    return { accessToken, refreshToken };
  }
}

module.exports = new TokenService()
