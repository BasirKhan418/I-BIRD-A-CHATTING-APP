// const socket = io('http://localhost:8000');
const socket = io("http://localhost:8000", { transports: ["websocket"] });
var audio = new Audio("chatTone.mp3");
const form = document.getElementById("formaction");
const messageinp = document.getElementById("messageinp");
const msgcontainer = document.getElementById("chatarea");
do {
  var nam = prompt("Enter Your name to join");
  if (nam == 0) {
    alert("Please enter your name to chat!");
  }
} while (nam == 0 || nam==null ||nam==undefined);
socket.emit("new-user-joined", nam);
var audio = new Audio("chatTone.mp3");
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  msgcontainer.append(messageElement);
  if (position == "left") {
    audio.play();
  }
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = messageinp.value;
  if (msg != 0) {
    append(`You: ${msg}`, "right");
  } else {
    alert("ERROR:PLEASE ADD SOME  TEXT TO CHAT");
  }
  messageinp.value = "";
  if (msg != 0) {
    socket.emit("send", msg);
  }
});
socket.on("user-joined", (name) => {
  append(`${name} Joined the chat`, "left");
});

socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});
socket.on("online", (data) => {
  append(`${data.name}: You are Now Online `, "right");
});
socket.on("left", (name) => {
  append(`Oops ${name}: Left the chat`, "left");
});
