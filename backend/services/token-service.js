const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
const RefreshModel = require("../models/refresh-model");
class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1yr",
    });
    return { accessToken, refreshToken };
  }
  async storeRefreshToken(token, userId) {
    await RefreshModel.create({ token, userId });
  }
  async verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSecret);
  }
  async verifyRefreshToken(token) {
    return jwt.verify(token, refreshTokenSecret);
  }
  async findRefreshToken(_id, token) {
    return await RefreshModel.findOne({ userId: _id, token: token });
  }
  async updateRfreshToken(id, token) {
    await RefreshModel.updateOne({ userId: id, token: token });
  }
}

module.exports = new TokenService();
