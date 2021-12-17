import React from 'react'
import './roomCard.scss'
const RoomCard = ({room,setCurrentRoom}) => {
    return (
        <div className="roomCard" onClick={()=>setCurrentRoom(room)}>
            <div className="roomCardHeader">
                <span className="roomTitle">{room.title}</span>
            </div>
            <div className="roomCardContent">
                <span className="roomMembs">{`Members: ${room.members.length}`}</span>
            </div>
        </div>
    )
}

export default RoomCard
