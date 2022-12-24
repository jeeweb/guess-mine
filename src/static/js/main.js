(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleNewMessage=void 0;var _sockets=require("./sockets"),messages=document.getElementById("jsMessages"),sendMsg=document.getElementById("jsSendMsg"),appendMsg=function(e,s){var n=document.createElement("li");n.innerHTML='\n    <span class="author '.concat(s?"out":"self",'">').concat(s||"You",":</span> ").concat(e,"\n  "),messages.appendChild(n)},handleSendMsg=function(e){e.preventDefault();var s=sendMsg.querySelector("input"),n=s.value;(0,_sockets.getSocket)().emit(window.events.sendMsg,{message:n}),s.value="",appendMsg(n)},handleNewMessage=function(e){var s=e.message,n=e.nickname;return appendMsg(s,n)};exports.handleNewMessage=handleNewMessage,sendMsg&&sendMsg.addEventListener("submit",handleSendMsg);

},{"./sockets":7}],2:[function(require,module,exports){
"use strict";var _sockets=require("./sockets"),body=document.querySelector("body"),loginForm=document.getElementById("jsLogin"),NICKNAME="nickname",LOGGED_OUT="loggedOut",LOGGED_IN="loggedIn",nickname=localStorage.getItem(NICKNAME),logIn=function(e){var n=io("/");n.emit(window.events.setNickname,{nickname:e}),(0,_sockets.initSockets)(n)};null===nickname?body.className=LOGGED_OUT:(body.className=LOGGED_IN,logIn(nickname));var handleFormSubmit=function(e){e.preventDefault();var n=loginForm.querySelector("input"),o=n.value;n.value="",localStorage.setItem(NICKNAME,o),body.className=LOGGED_IN,logIn(o)};loginForm&&loginForm.addEventListener("submit",handleFormSubmit);

},{"./sockets":7}],3:[function(require,module,exports){
"use strict";require("./sockets"),require("./login"),require("./chat"),require("./paint");

},{"./chat":1,"./login":2,"./paint":5,"./sockets":7}],4:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleNewUser=exports.handleDisconnected=void 0;var body=document.querySelector("body"),fireNotification=function(e,n){var t=document.createElement("div");t.innerText=e,t.style.backgroundColor=n,t.className="notification",body.appendChild(t)},handleNewUser=function(e){var n=e.nickname;fireNotification("".concat(n," just joined!"),"rgb(0, 122, 255)")};exports.handleNewUser=handleNewUser;var handleDisconnected=function(e){var n=e.nickname;return fireNotification("".concat(n," just left!"),"rgb(255, 149, 0)")};exports.handleDisconnected=handleDisconnected;

},{}],5:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.showControls=exports.resetCanvas=exports.hideControls=exports.handleStrokedPath=exports.handleFilled=exports.handleBeganPath=exports.enableCanvas=exports.disableCanvas=void 0;var _sockets=require("./sockets"),saveBtn=document.getElementById("save"),textInput=document.getElementById("text"),fileInput=document.getElementById("file"),modeBtn=document.getElementById("mode-btn"),destroyBtn=document.getElementById("destroy-btn"),eraserBtn=document.getElementById("eraser-btn"),colorOptions=Array.from(document.getElementsByClassName("color-option")),color=document.getElementById("color"),lineWidth=document.getElementById("line-width"),canvas=document.querySelector("canvas"),controls=document.getElementById("jsControls"),ctx=canvas.getContext("2d"),CANVAS_WIDTH=700,CANVAS_HEIGHT=500;canvas.width=CANVAS_WIDTH,canvas.height=CANVAS_HEIGHT,ctx.lineWidth=lineWidth.value,ctx.lineCap="round";var isPainting=!1,isFilling=!1,beginPath=function(e,t){ctx.beginPath(),ctx.moveTo(e,t)},strokePath=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=ctx.strokeStyle;null!==n&&(ctx.strokeStyle=n),ctx.lineTo(e,t),ctx.stroke(),ctx.strokeStyle=o};function onMove(e){var t=e.offsetX,n=e.offsetY;if(isPainting)return strokePath(t,n),void(0,_sockets.getSocket)().emit(window.events.strokePath,{x:t,y:n,color:ctx.strokeStyle});beginPath(t,n),(0,_sockets.getSocket)().emit(window.events.beginPath,{x:t,y:n})}function startPainting(){isPainting=!0}function cancelPainting(){isPainting=!1}function onLineWidthChange(e){ctx.lineWidth=e.target.value}function onColorChange(e){ctx.strokeStyle=e.target.value,ctx.fillStyle=e.target.value}function onColorClick(e){var t=e.target.dataset.color;ctx.strokeStyle=t,ctx.fillStyle=t,color.value=t}function onModeClick(){isFilling?(isFilling=!1,modeBtn.innerText="Fill"):(isFilling=!0,modeBtn.innerText="Draw")}var fill=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=ctx.fillStyle;null!==e&&(ctx.fillStyle=e),ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT),ctx.fillStyle=t};function onCavasClick(){isFilling&&(fill(),(0,_sockets.getSocket)().emit(window.events.fill,{color:ctx.fillStyle}))}function onDestroyClick(){ctx.fillStyle="white",ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)}function onEraserClick(){ctx.strokeStyle="white",isFilling=!1,modeBtn.innerText="Fill"}function onFileChange(e){var t=e.target.files[0],n=URL.createObjectURL(t),o=new Image;o.src=n,o.onload=function(){ctx.drawImage(o,0,0,CANVAS_WIDTH,CANVAS_HEIGHT),fileInput.value=null}}function onDoubleClick(e){var t=textInput.value;""!==t&&(ctx.save(),ctx.lineWidth=1,ctx.font="48px serif",ctx.fillText(t,e.offsetX,e.offsetY),ctx.restore())}function onSaveClick(){var e=canvas.toDataURL(),t=document.createElement("a");t.href=e,t.download="myDrawing.png",t.click()}lineWidth.addEventListener("change",onLineWidthChange),color.addEventListener("change",onColorChange),colorOptions.forEach(function(e){return e.addEventListener("click",onColorClick)}),modeBtn.addEventListener("click",onModeClick),destroyBtn.addEventListener("click",onDestroyClick),eraserBtn.addEventListener("click",onEraserClick),fileInput.addEventListener("change",onFileChange),saveBtn.addEventListener("click",onSaveClick);var handleBeganPath=function(e){var t=e.x,n=e.y;return beginPath(t,n)};exports.handleBeganPath=handleBeganPath;var handleStrokedPath=function(e){var t=e.x,n=e.y,o=e.color;return strokePath(t,n,o)};exports.handleStrokedPath=handleStrokedPath;var handleFilled=function(e){var t=e.color;return fill(t)};exports.handleFilled=handleFilled;var disableCanvas=function(){canvas.removeEventListener("dblclick",onDoubleClick),canvas.removeEventListener("mousemove",onMove),canvas.removeEventListener("mousedown",startPainting),canvas.removeEventListener("mouseup",cancelPainting),canvas.removeEventListener("mouseleave",cancelPainting),canvas.removeEventListener("click",onCavasClick)};exports.disableCanvas=disableCanvas;var enableCanvas=function(){canvas.addEventListener("dblclick",onDoubleClick),canvas.addEventListener("mousemove",onMove),canvas.addEventListener("mousedown",startPainting),canvas.addEventListener("mouseup",cancelPainting),canvas.addEventListener("mouseleave",cancelPainting),canvas.addEventListener("click",onCavasClick)};exports.enableCanvas=enableCanvas;var hideControls=function(){return controls.style.opacity=0};exports.hideControls=hideControls;var showControls=function(){return controls.style.opacity=1};exports.showControls=showControls;var resetCanvas=function(){return fill("#fff")};exports.resetCanvas=resetCanvas,canvas&&(enableCanvas(),hideControls());

},{"./sockets":7}],6:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handlePlayerUpdate=exports.handleLeaderNotif=exports.handleGameStarted=exports.handleGameEnded=void 0;var _paint=require("./paint"),board=document.getElementById("jsPBoard"),notifs=document.getElementById("jsNotifs"),addPlayers=function(e){board.innerHTML="",e.forEach(function(e){var a=document.createElement("span");a.innerText="".concat(e.nickname,": ").concat(e.points),board.appendChild(a)})},setNotifs=function(e){notifs.innerText="",notifs.innerText=e},handlePlayerUpdate=function(e){var a=e.sockets;return addPlayers(a)};exports.handlePlayerUpdate=handlePlayerUpdate;var handleGameStarted=function(){setNotifs(""),(0,_paint.disableCanvas)(),(0,_paint.hideControls)()};exports.handleGameStarted=handleGameStarted;var handleLeaderNotif=function(e){var a=e.word;(0,_paint.enableCanvas)(),(0,_paint.showControls)(),notifs.innerText="You are the leader, paint: ".concat(a)};exports.handleLeaderNotif=handleLeaderNotif;var handleGameEnded=function(){setNotifs("Game ended."),(0,_paint.disableCanvas)(),(0,_paint.hideControls)(),(0,_paint.resetCanvas)()};exports.handleGameEnded=handleGameEnded;

},{"./paint":5}],7:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.updateSocket=exports.initSockets=exports.getSocket=void 0;var _notifications=require("./notifications.js"),_chat=require("./chat.js"),_paint=require("./paint.js"),_players=require("./players.js"),socket=null,getSocket=function(){return socket};exports.getSocket=getSocket;var updateSocket=function(e){return socket=e};exports.updateSocket=updateSocket;var initSockets=function(e){var t=window.events;updateSocket(socket=e),socket.on(t.newUser,_notifications.handleNewUser),socket.on(t.disconnected,_notifications.handleDisconnected),socket.on(t.newMsg,_chat.handleNewMessage),socket.on(t.beganPath,_paint.handleBeganPath),socket.on(t.strokedPath,_paint.handleStrokedPath),socket.on(t.filled,_paint.handleFilled),socket.on(t.playerUpdate,_players.handlePlayerUpdate),socket.on(t.gameStarted,_players.handleGameStarted),socket.on(t.leaderNotif,_players.handleLeaderNotif),socket.on(t.gameEnded,_players.handleGameEnded)};exports.initSockets=initSockets;

},{"./chat.js":1,"./notifications.js":4,"./paint.js":5,"./players.js":6}]},{},[3]);
