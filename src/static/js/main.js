(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var _sockets=require("./sockets"),body=document.querySelector("body"),loginForm=document.getElementById("jsLogin"),NICKNAME="nickname",LOGGED_OUT="loggedOut",LOGGED_IN="loggedIn",nickname=localStorage.getItem(NICKNAME),logIn=function(e){var o=io("/");o.emit(window.EventSource.setNickname,{nickname:e}),(0,_sockets.initSockets)(o)};null===nickname?body.className=LOGGED_OUT:(body.className=LOGGED_IN,logIn(nickname));var handleFormSubmit=function(e){e.preventDefault();var o=loginForm.querySelector("input"),n=o.value;o.value="",localStorage.setItem(NICKNAME,n),body.className=LOGGED_IN,logIn(n)};loginForm&&loginForm.addEventListener("submit",handleFormSubmit);

},{"./sockets":4}],2:[function(require,module,exports){
"use strict";require("./sockets"),require("./login"),require("./notifications");

},{"./login":1,"./notifications":3,"./sockets":4}],3:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleNewUser=void 0;var notifications=document.getElementById("jsNotification"),handleNewUser=function(e){var n=e.nickname;console.log(n," just joined")};exports.handleNewUser=handleNewUser;

},{}],4:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.updateSocket=exports.initSockets=exports.getSocket=void 0;var _notifications=require("./notifications"),socket=null,getSocket=function(){return socket};exports.getSocket=getSocket;var updateSocket=function(t){return socket=t};exports.updateSocket=updateSocket;var initSockets=function(t){var e=window.events;updateSocket(t),t.on(e.newUser,_notifications.handleNewUser)};exports.initSockets=initSockets;

},{"./notifications":3}]},{},[2]);
