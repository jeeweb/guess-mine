import events from "./events.js";

const socketController = (socket) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  socket.on(events.setNickname, ({nickname}) => {
    socket.nickname = nickname;
    broadcast(events.newUser, { nickname });
    console.log(nickname);
  });
  socket.on(events.disconnect, () => {
    broadcast(events.disconnected, { nickname: socket.nickname })
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
}

export default socketController;