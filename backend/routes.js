const router = require("express").Router();
const authController = require("./controllers/auth-controller");
const activateController = require("./controllers/activateController");
const authMiddleware = require("./middleware/authMiddleware");

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);
router.post("/api/activate-user", authMiddleware, activateController.activate);
router.get("/api/refresh",authController.refresh)

module.exports = router;
