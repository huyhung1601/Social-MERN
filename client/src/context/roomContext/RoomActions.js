export const addMsgSuccess = (newMsg) =>({
    type: "ADD_MSG_SUCCESS",
    payload: newMsg
})

export const fetchRoomSuccess = (room,messages)=>({
    type: "FETCH_ROOM_SUCCESS",
    payload: {room,messages}
})