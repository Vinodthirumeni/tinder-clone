import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import db from "./firebase";
function Chats() {
  const [chatHeads, setChatHeads] = useState([]);
  useEffect(() => {
    db.collection("poeple").onSnapshot((snapshot) =>
      setChatHeads(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);
  return (
    <div className="chats">
      {chatHeads.map((chatHead) => (
        <Chat
          id={chatHead.id}
          name={chatHead.data?.name}
          profilePic={chatHead.data?.url}
        />
      ))}
    </div>
  );
}
export default Chats;
