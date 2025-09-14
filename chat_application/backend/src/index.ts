import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
console.log("✅ Server started on port 8080");

let sharedCounter = 0;

wss.on("connection", (ws) => {
  console.log("👤 New client connected");

  ws.send(JSON.stringify({ type: "update", value: sharedCounter }));

  ws.on("message", (data) => {
    console.log("📩 Received:", data.toString());

    try {
      const parsedData = JSON.parse(data.toString());

      if (parsedData.type === "increment") sharedCounter++;
      if (parsedData.type === "decrement") sharedCounter--;

      console.log("🔢 Counter updated:", sharedCounter);

      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({ type: "update", value: sharedCounter }));
        }
      });
    } catch (e) {
      console.log("⚠️ Invalid data received", e);
    }
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });
});

