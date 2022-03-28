import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3002");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
     localStorage.setItem("isLogined",true)
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  const logoutRoom = () => {
    //  localStorage.removeItem("isLogined")
      socket.on("disconnect");
      setShowChat(false);
  };

  return (
    <>    
    {showChat ?
    <h4 id="Logineduser">welcome {username}</h4>:""}
    {showChat ? <button className="logutButton" onClick={logoutRoom}><i className="fa fa-sign-in"></i>&nbsp;Logout</button>:""}
    <div className="App">
      
      {!showChat ? (
        <div className="joinChatContainer">
          <h4>Join A Chat to login</h4>
          <input
            type="text"
            placeholder="Enter UserName..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter RoomID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Login</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
    </>

  );
}

export default App;
