const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("Connected to Server ✅");
})

socket.addEventListener("message", (event) => {
  console.log("New message:", event.data, " from Server");
});

socket.addEventListener("close", (message) => {
    console.log("Disconnected to Server ❌");
});

setTimeout(() => {
    socket.send("hello from browser!");
},1000);