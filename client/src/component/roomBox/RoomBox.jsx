import { Add, Search } from "@material-ui/icons";
import React from "react";
import RoomCard from "../roomCard/RoomCard";
import "./roomBox.scss";
const RoomBox = ({rooms,setCurrentRoom}) => {
  
  return (
    <div className="roomBox">
      <div className="roomInputForm">
        <input type="text" className="roomInput" />
        <button className="roomBtn">
          <Search className="roomBtnIcon" />
        </button>
      </div>
      <div className="roomList">
        {rooms && rooms.map((r) => (
          <RoomCard key={r._id} room={r} setCurrentRoom={setCurrentRoom} />
        ))}
      </div>
      <div className="roomAdd">
        <button className="roomAddBtn">
          <Add /> Create New Room
        </button>
      </div>
    </div>
  );
};

export default RoomBox;
