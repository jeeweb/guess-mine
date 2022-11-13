const socket = io("/");

function sendMessage(message){
  socket.emit("newMessage", { message })
  console.log(`You: ${message}`)
}

function setNickname(nickname){
  socket.emit("setNickname", { nickname });
}

function handleMessageNotif(data){
  const { message, nickname } = data;
  console.log(`${nickname}: ${message}`)
}

socket.on("messageNotif", handleMessageNotif);
/*
socket.on("hello", () => console.log("Somebody joined"));
setTimeout(() => socket.emit("helloGuys"), 4000);
*/