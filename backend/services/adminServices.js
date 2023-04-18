/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
const jwt = require("jsonwebtoken");
const AdminModal = require("../models/adminModal");
const AdminRefreshModel = require("../models/adminRefresh-model");
const { adminRefresh } = require("../controllers/adminDashboard");
const adminModal = require("../models/adminModal");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET_ADMIN;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET_ADMIN;
class AdminServices {
  async findAndVerifyAdmin(payload) {
    const admin = await AdminModal.findOne({ email: payload.email })
    if (admin && admin.password === payload.password) {
      return admin;
    }
    return null;
  }

  generateTokens(payload) {
    const accessTokenAdmin = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1m",
    });
    const refreshTokenAdmin = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1yr",
    });
    return { accessTokenAdmin, refreshTokenAdmin };
  }

 async storeAdminRefreshToken(token, userId) {
    await AdminRefreshModel.create({ token, userId });
  }

  async verifyAdminRefreshToken(token) {
    return jwt.verify(token, refreshTokenSecret);
  }

  async findAdminRefreshToken(_id, token) {
    // eslint-disable-next-line no-return-await
    return await adminRefresh.findOne({ userId: _id, token });
  }

  async findAdmin(filter) {
    const user = await adminModal.findOne(filter);
    return user;
  }

  async updateRfreshTokenAdmin(id, token) {
    console.log(token);
    await adminRefresh.findOneAndUpdate({ userId: id,  token });
  }

    async removeAdminRefreshToken(token) {
      await adminRefresh.deleteOne({ token });
    
  }
}

module.exports = new AdminServices()