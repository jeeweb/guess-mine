import events from "./events.js";
import { chooseWord } from "./words.js";

let sockets = [];
let inProgress = false;
let word = null;

const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  const sendPlayerUpdate = () => superBroadcast(events.playerUpdate, { sockets });
  const startGame = () => {
    if(inProgress === false) {
      inProgress = true;
      const leader = chooseLeader();
      word = chooseWord();
    }
  }
  socket.on(events.setNickname, ({nickname}) => {
    socket.nickname = nickname;
    sockets.push({ id: socket.id, points: 0, nickname: nickname })
    broadcast(events.newUser, { nickname });
    //console.log(nickname);
    sendPlayerUpdate();
    startGame();
  });
  socket.on(events.disconnect, () => {
    sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
    broadcast(events.disconnected, { nickname: socket.nickname });
    sendPlayerUpdate();
  })
  socket.on(events.sendMsg, ({message}) => {
    // message를 받아서 모두에게 broadcast
		broadcast(events.newMsg, { message, nickname: socket.nickname });
  })
  socket.on(events.beginPath, ({x, y}) => 
    broadcast(events.beganPath, {x, y})
  );
  socket.on(events.strokePath, ({x, y, color}) => 
    broadcast(events.strokedPath, {x, y, color})
  );
  socket.on(events.fill, ({color}) => {
    broadcast(events.filled, {color})
  })
}

// setInterval(() => console.log(sockets), 3000)

export default socketController;