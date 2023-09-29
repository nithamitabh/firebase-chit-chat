import React, { useState, useRef } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };
  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <>
      <div>
        {room ? (
          <Chat room={room} />
        ) : (
          <div className="room">
            <label>Enter Room name:</label>
            <input ref={roomInputRef} />
            <button onClick={() => setRoom(roomInputRef.current.value)}>
              Enter Chat
            </button>
          </div>
        )}
      </div>
      <div className="sign-out">
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  );
}

export default App;
