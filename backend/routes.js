const router = require("express").Router();
const authController = require("./controllers/auth-controller");
const activateController = require("./controllers/activateController");
const authMiddleware = require("./middleware/authMiddleware");
const roomController = require("./controllers/roomController");
const chatController = require("./controllers/chatController");
const messageController = require("./controllers/messageController");
const adminDashboard = require("./controllers/adminDashboard");

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);
router.post("/api/activate-user", authMiddleware, activateController.activate);
router.get("/api/refresh",authController.refresh)
router.post("/api/logout",authMiddleware,authController.logout)
router.post("/api/rooms",authMiddleware,roomController.create)
router.get("/api/rooms",authMiddleware,roomController.index)

// search
router.route('/api/chat/search').get(authMiddleware,chatController.searchUser)
// chat
router.route('/api/chat').post(authMiddleware,chatController.accessChat).get(authMiddleware,chatController.fetchChat)
// Group Routes  
router.route('/api/group').post(authMiddleware,chatController.createGroupChat)
router.route('/api/chat/rename').post(authMiddleware,chatController.rename)
router.route('/api/chat/addtogroup').post(authMiddleware,chatController.addToGroup)
router.route('/api/chat/groupremove').post(authMiddleware,chatController.removeFromGroup)

// message 
router.route('/api/message').post(authMiddleware,messageController.sendMessage)
router.route('/api/message/:chatId').get(authMiddleware,messageController.allMessages)

// Admin
router.post('/api/admin-login',adminDashboard.adminLogin)
router.get("/api/allUsers",adminDashboard.getAllUsers)
router.post("/api/blockUnblock",adminDashboard.blockUnblockuser)
router.post("/api/logoutAdmin",adminDashboard.logout)
router.get("/api/totalusers",adminDashboard.totalUsers)
router.get("/api/totalAudio",adminDashboard.totalAudioRooms)
router.get("/api/totalCoding",adminDashboard.totalCodingRooms)
router.get("/api/newusers",adminDashboard.newUsers)
router.get("/api/admin-refresh",adminDashboard.adminRefresh)

// chart



module.exports = router;
