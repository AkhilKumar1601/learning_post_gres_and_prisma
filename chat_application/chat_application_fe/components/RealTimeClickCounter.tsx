import { useState, useEffect } from "react";

type ServerMessage = {
  type: "update";
  value: number;
};

function RealTimeClickCounter() {
  const [count, setCount] = useState<number>(0);
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  function increaseHandler() {
    if (socket && connected) {
      console.log("⬆️ Sending increment");
      socket.send(JSON.stringify({ type: "increment" }));
    }
  }

  function decreaseHandler() {
    if (socket && connected) {
      console.log("⬇️ Sending decrement");
      socket.send(JSON.stringify({ type: "decrement" }));
    }
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket server");
      setConnected(true);
    };

    ws.onmessage = (e) => {
      try {
        const data: ServerMessage = JSON.parse(e.data);
        if (data.type === "update") {
          setCount(data.value);
        }
      } catch (err) {
        console.warn("⚠️ Invalid JSON from server", err);
      }
    };

    ws.onclose = () => {
      console.log("🔌 Disconnected from server");
      setConnected(false);
    };

    ws.onerror = (err) => console.error("❌ WebSocket error:", err);

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-200">
          Real-Time Shared Counter
        </h1>

        <div className="flex gap-4">
          <button
            onClick={increaseHandler}
            disabled={!connected}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Increase
          </button>
          <button
            onClick={decreaseHandler}
            disabled={!connected}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Decrease
          </button>
        </div>

        <div className="mt-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl text-center min-w-[250px]">
          <p className="text-xl text-gray-500 dark:text-gray-300 mb-2">
            Current Count
          </p>
          <p className="text-6xl font-extrabold text-gray-900 dark:text-white">
            {count}
          </p>
        </div>

        {!connected && (
          <p className="text-red-500 mt-4">Connecting to WebSocket server...</p>
        )}
      </div>
    </div>
  );
}

export default RealTimeClickCounter;

