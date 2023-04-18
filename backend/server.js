require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const cookieParser = require("cookie-parser");
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONT_URL,
    methods: ["GET", "POST", "PUT"],
  },
});
const router = require("./routes");


const dbConnect = require("./database");
const ACTIONS = require("./actions");
// const liveChatService = require("./services/liveChat-service");
// const server = require("http").createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

app.use(express.json({ strict: false, limit: "8mb" }));
app.use(express.urlencoded());
app.use(cookieParser());
app.use("/storage", express.static("storage"));
dbConnect();
const corsOption = {
  credentials: true,
  origin: [process.env.FRONT_URL],
  methods: ["GET", "POST"],
};
app.use(cors(corsOption));

// Sockets
const socketUserMap = {};

io.on("connection", (socket) => {
  // console.log('New connection', socket.id);
  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    socketUserMap[socket.id] = user;
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {
        peerId: socket.id,
        createOffer: false,
        user,
      });
      socket.emit(ACTIONS.ADD_PEER, {
        peerId: clientId,
        createOffer: true,
        user: socketUserMap[clientId],
      });
    });
    socket.join(roomId);
  });

  socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
    io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
      peerId: socket.id,
      icecandidate,
    });
  });

  socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
    io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription,
    });
  });

  socket.on(ACTIONS.MUTE, ({ roomId, userId }) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.MUTE, {
        peerId: socket.id,
        userId,
      });
    });
  });

  socket.on(ACTIONS.UNMUTE, ({ roomId, userId }) => {
    // console.log(userId);
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    console.log(clients);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.UNMUTE, {
        peerId: socket.id,
        userId,
      });
    });
  });

  socket.on(ACTIONS.MUTE_INFO, ({ userId, roomId, isMute }) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      if (clientId !== socket.id) {
        // console.log(userId);
        io.to(clientId).emit(ACTIONS.MUTE_INFO, {
          userId,
          isMute,
        });
      }
    });
  });

  const leaveRoom = () => {
    const { rooms } = socket;
    Array.from(rooms).forEach((roomId) => {
      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
      clients.forEach((clientId) => {
        io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
          peerId: socket.id,
          userId: socketUserMap[socket.id]?.id,
        });

        // socket.emit(ACTIONS.REMOVE_PEER, {
        //     peerId: clientId,
        //     userId: socketUserMap[clientId]?.id,
        // });
      });
      socket.leave(roomId);
    });
    delete socketUserMap[socket.id];
  };

  socket.on(ACTIONS.LEAVE, leaveRoom);

  socket.on("disconnecting", leaveRoom);

  // chat


  
  // Code
  socket.on('code change', (data) => {
    io.emit('code change', data);
  });
});
// CHAT
io.on("connection", (socket) => {
socket.on("setup", (userData) => {
  socket.join(userData.id);
  socket.emit("connected");
  console.log("setup",userData.id);
});
socket.on("join chat", (room) => {
  socket.join(room);
  console.log("join chat",room);
});
socket.on("typing", (room) => socket.in(room).emit("typing"));
socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
socket.on("new message", (newMessageRecived) => {
  const {chat} = newMessageRecived;
  console.log(newMessageRecived);
  if (!chat.users) return console.log("chat.users is not defined");
  chat.users.forEach((user) => {
    console.log(newMessageRecived.content);
    if (user._id === newMessageRecived.sender._id) return;
    socket.in(user._id).emit("message received", newMessageRecived);
  });
});
socket.off("setup", () => {
  console.log("USER DISCONNECTED");
  socket.leave(userData.id);
});
});

app.get("/", (req, res) => {
  res.send("hello from express ");
});
const PORT = process.env.PORT || 4000;

app.use(router);
server.listen(PORT, () => {
  console.log(`server connected on port ${PORT}`);
});
