import React, { useState, useEffect } from "react";
import "./ChatScreen.css";
import Avatar from "@material-ui/core/Avatar";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
function ChatScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [fetchImage, setFetchImage] = useState([]);
  const { id } = useParams("");
  useEffect(() => {
    if (id) {
      db.collection("poeple")
        .doc(id)
        .onSnapshot((snapshot) => setFetchImage(snapshot.data().url));
      db.collection("poeple")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);
  const handleInput = (e) => {
    e.preventDefault();
    db.collection("poeple").doc(id).collection("messages").add({
      url: fetchImage,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="chatScreen">
      <p className="chatScreen__timestamp">
        You matched with ellen on 14th feb 2020
      </p>
      {messages.map((message) =>
        message.name ? (
          <div className="chatScreen__message">
            <Avatar
              className="chatScreen__image"
              src={message.image}
              alt={message.name}
            />
            <p className="chatScreen__text">{message.message}</p>
          </div>
        ) : (
          <div className="chatScreen__message">
            <Avatar
              className="chatScreen__image"
              src={message.url}
              alt={message.name}
            />
            <p className="chatScreen__text">{message.message}</p>
          </div>
        )
      )}
      <form className="chatScreen__Input">
        <input
          className="chatScreen__InputField"
          placeholder="Type a message"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleInput}
          className="chatScreen__InputButton"
        >
          SEND
        </button>
      </form>
    </div>
  );
}
export default ChatScreen;
