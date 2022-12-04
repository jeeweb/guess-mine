import { handleNewUser, handleDisconnected } from "./notifications.js";
import { handleNewMessage } from "./chat.js";
import { handleBeganPath, handleStrokedPath } from "./paint.js";

let socket = null;

export const getSocket = () => socket;

export const updateSocket = (aSocket) => (socket = aSocket);

export const initSockets = (aSocket) => {
  const {events} = window;
  console.log(aSocket)
  updateSocket(aSocket);
  aSocket.on(events.newUser, handleNewUser);
  aSocket.on(events.disconnected, handleDisconnected);
  aSocket.on(events.newMsg, handleNewMessage);
  aSocket.on(events.beganPath, handleBeganPath);
  aSocket.on(events.strokedPath, handleStrokedPath);
};
