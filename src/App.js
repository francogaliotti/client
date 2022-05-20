import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'
import './App.css';
import Chat from './Chat'

const socket = io("localhost:8080/")


function App() {

  const [showChat, setShowChat] = useState(false)
  const [room, setRoom] = useState("")
  const [username, setUsername] = useState("")

  useEffect(() => {

  }, [])

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : <Chat socket={socket} username={username} room={room} /> 
      }
    </div>
  );
}

export default App;
