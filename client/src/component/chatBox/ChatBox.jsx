import React, { useContext, useState, useEffect, useRef } from "react";
import { TextareaAutosize } from "@material-ui/core";
import Comment from "../comment/Comment";
import { Send } from "@material-ui/icons";
import { RoomContext } from "../../context/roomContext/RoomContext";
import "./chatBox.scss";
import { addNewMsg } from "../../context/roomContext/apiCall";
import { io } from "socket.io-client";
const ChatRoom = ({ currentUser }) => {
  const { messages, room, dispatch } = useContext(RoomContext);
  const [msg, setMsg] = useState("");
  const [arrivalMsg, setArrivalMsg] = useState()
  const socket = useRef();
  
  useEffect(() => {
    const changeRoom = () =>{
      socket.current = io("http://localhost:8900");
      socket.current.emit('joinRoom',{username: currentUser.username,room: room._id})
      socket.current.on("message", msg=>{
        console.log(msg)
      })
      socket.current.on("roomUsers", data=>{
        console.log(data)
      })
    }
    changeRoom()
    return () => socket.current.disconnect()
  }, [])
  useEffect(() => {
    socket.current?.on('chatMsg',chatMsg=>{
      console.log(chatMsg)
    })
  }, [msg]);
 
  /**handle Message */
  const handleMsg = () => {
    if (msg.split(" ").some((x) => x !== "")) {
      const newMsg = {
        text: msg.trim(),
        senderId: currentUser._id,
        username: currentUser.username,
        roomId: room._id,
      };
      // addNewMsg(newMsg, dispatch);
      setMsg("");
      // Emit Msg to server
      socket.current.emit('chatMsg', newMsg)
    }
  };
  return (
    <div className="chatRoom">
      <div className="msgBox">
        {messages && messages.map((m) => <Comment key={m._id} comment={m} />)}
      </div>
      <div className="msgInputForm ">
        <TextareaAutosize
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="msgInput"
          type="text"
          minRows={1}
          maxRows={2}
        />
        <button className="msgBtn">
          <Send className="msgBtnIcon" onClick={handleMsg} />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
