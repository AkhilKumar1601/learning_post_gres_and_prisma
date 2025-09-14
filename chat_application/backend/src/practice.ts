import { WebSocketServer } from "ws";
const wss = new WebSocketServer({port:8080});
console.log("Connected to Web Socker Server listening on port : 8080.");

wss.on("connection",(ws) => {
  ws.send("Welcome to server");

  let counter = 0;

  ws.on("message",(message) => {
     wss.clients.forEach((client) => {
       if(client !== ws) {   
           client.send(message.toString());
       }
     })
  })

  ws.on("close",() => {
    console.log("Server disconnected");
  })
})