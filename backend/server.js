require("dotenv").config();
const express = require("express");
const router = require("./routes");
const app = express();



const server = require('http').createServer(app)


const dbConnect = require("./database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ACTIONS = require("./actions");
const liveChatService = require("./services/liveChat-service");
const io = require('socket.io')(server,{
  cors: {
    origin:"http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
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
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
};
app.use(cors(corsOption));

// Sockets
const socketUserMap = {};

io.on('connection', (socket) => {
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
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
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
                console.log('mute info');
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
            const clients = Array.from(
                io.sockets.adapter.rooms.get(roomId) || []
            );
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

    socket.on('disconnecting', leaveRoom);

    //chat 

    socket.on('chat',(payload)=>{
        // try {
        //   liveChatService.saveChat(payload)
        // } catch (error) {
            
        // }
    //  liveChatService.getChatData().then((data)=>{

        io.emit("chat", payload);
    //   })
      
   
       
    })
});

app.get("/", (req, res) => {
  res.send("hello from express ");
});
const PORT = process.env.PORT || 4000;

app.use(router);
server.listen(PORT, () => {
  console.log(`server connected on port ${PORT}`);
});
