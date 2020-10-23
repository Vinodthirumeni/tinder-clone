import React, { useState, useEffect } from "react";
import "./Chat.css";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import db from "./firebase";
function Chat({ id, name, timestamp, profilePic }) {
  const [lastmessage, setLastMessage] = useState("");
  useEffect(() => {
    if (id) {
      db.collection("poeple")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setLastMessage(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);
  return (
    <Link to={`/chat/${id}`}>
      <div className="chat">
        <Avatar className="chat__image" src={profilePic} alt={name} />
        <div className="chat__details">
          <h2>{name}</h2>
          <p>{lastmessage[0]?.message}</p>
        </div>
        <p className="chat__timestamp">
          {new Date(lastmessage[0]?.timestamp?.toDate()).toUTCString()}
        </p>
      </div>
    </Link>
  );
}
export default Chat;
