import './App.css'
import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  function sendMessage(e: React.FormEvent<HTMLFormElement>) {  
    e.preventDefault(); 
    if (socket && message) {
      socket.send(message);
      setMessage(""); 
    }
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    try {
      setSocket(ws);

      ws.onopen = () => {
        console.log("Connected to WebSocket server");
        ws.send("Hello from the client");
      }

      ws.onmessage = (e) => {
        console.log("Message from server: ", e.data);
        alert("Received: " + e.data);
      }

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      }

    } catch (e) {
      console.log("Error while connecting to server", e);
    }

    return () => {
      ws.close();
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={sendMessage} className="flex gap-4 p-6 bg-white rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Enter the message"
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          disabled={!socket || !message}
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}

export default App;
