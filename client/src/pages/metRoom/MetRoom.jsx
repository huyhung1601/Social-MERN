import React, { useContext,useEffect, useState } from "react";
import ChatBox from "../../component/chatBox/ChatBox";
import RoomBoard from "../../component/roomBoard/RoomBoard";
import RoomBox from "../../component/roomBox/RoomBox";
import { AuthContext } from "../../context/authContext/AuthContext";
import { RoomContext } from "../../context/roomContext/RoomContext";
import { getRooms, getRoom } from "../../context/roomContext/apiCall";
import { Switch, Route } from "react-router-dom";
import "./metRoom.scss";
const MetRoom = () => {
  const { user: currentUser } = useContext(AuthContext);
  const {dispatch: roomDispatch} = useContext(RoomContext)
  const [currentRoom, setCurrentRoom] = useState(null)
  const [rooms, setRooms] = useState([]);
  /**Get rooms */
  useEffect(() => {
    const fetchData = async () => {
      const res = await getRooms(currentUser);
      setRooms(res);
      setCurrentRoom(res[0]);
    };
    fetchData();
  }, [currentUser]);

  /**Fetch room */
  useEffect(() => {
    if (currentRoom !== null)  getRoom(currentRoom,currentUser,roomDispatch) 
  }, [currentRoom])
  return (
    <div className="metRoom">
      <div className="metRoomContainer">
          <div className="metRoomContainerLeft">
            <RoomBox setCurrentRoom={setCurrentRoom} rooms={rooms} currentUser={currentUser} />
            <ChatBox currentUser={currentUser} />
          </div>
          <div className="metRoomContainerRight">
            <RoomBoard />
          </div>
      </div>
    </div>
  );
};

export default MetRoom;
