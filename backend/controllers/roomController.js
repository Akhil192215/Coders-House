const RoomDto = require("../dtos/room-dto");
const roomService = require("../services/roomService");

class roomController {
  async create(req, res) {
    const { topic, roomType } = req.body;
    if (!topic || !roomType) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    try {
      const room = await roomService.create({
        topic,
        roomType,
        ownerId: req.user._id,
      });
      console.log(
        room,
        "////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////"
      );
      return res.json(new RoomDto(room));
    } catch (error) {}
  }
  async index(req, res) {
    const rooms = await roomService.getAllRooms(["open"]);
    const allRooms = rooms.map((room) => new RoomDto(room));
    return res.json(allRooms);
  }
}

module.exports = new roomController();
