import React, { useEffect, useState } from "react";
import "../styles/Chat.css";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
export const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessage] = useState([]);
  const messagesRef = collection(db, "messages");
  useEffect(() => {
    const queryMessage = query(messagesRef, where("room", "==", room), orderBy("createdAt"));
    const unscribe = onSnapshot(queryMessage, (snapshot) => {
      snapshot.forEach((doc) => {
        let messages = [];
        snapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        setMessage(messages);
      });
    });
    return () => unscribe();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(newMessage)
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setNewMessage("");
  };
  return (
    <div className="chat-app">
    <div className="header">
       <h1>Welcome to:{room.toUpperCase()}</h1>
    </div>
    <div className="messages">{messages.map((message) => (
        <div className="message" key={message.id}>
        <span className="user">{message.user}</span>
        <p>{message.text}</p>
        </div>
    ))} </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          placeholder="type your message here ..."
        />
        <button className="send-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};
