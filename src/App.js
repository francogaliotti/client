import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'
import './App.css';

let socket
const CONNECTION_PORT = "localhost:8080/";

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [room, setRoom] = useState("")
  const [username, setUsername] = useState("")

  useEffect(() => {
    socket = io(CONNECTION_PORT,  { transports : ['websocket'] })
  }, [CONNECTION_PORT])

  const connectToRoom = () => {
    socket.emit('join_room', room)
  }

  return (
    <div className="App">
      {!loggedIn ? (
        <div className='logIn'>
          <div className='inputs'>
            <input type='text' placeholder='Name...' onChange={(e)=>{setUsername(e.target.value)}}></input>
            <input type='text' placeholder='Room...' onChange={(e)=>{setRoom(e.target.value)}}></input>
          </div>
          <button onClick={connectToRoom}>Enter Chat</button>
        </div>
      ) : (
        <div className='loggedIn'></div>
      )}
    </div>
  );
}

export default App;
