import {axiosInstance} from "../../config";
import { addMsgSuccess, fetchRoomSuccess } from "./RoomActions";

export const getRoom = async (currentRoom,currentUser,dispatch) =>{
    try {
        const msgRes = await axiosInstance.get(`/messages/${currentRoom._id}`)
        const roomRes = await axiosInstance.get(`/rooms/${currentRoom._id}`, {
            headers: { authorization: 'Bearer ' + currentUser.accessToken}
        })
        const messages = msgRes.data
        const room = roomRes.data
        dispatch(fetchRoomSuccess(room,messages))
    } catch (err) {
        console.log(err)
    }
}

export const addNewMsg = async (newMsg,dispatch) =>{
    try {
        const res = await axiosInstance.post('/messages/', newMsg)
        dispatch(addMsgSuccess(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const getRooms = async (currentUser) =>{
    try {
        const res = await axiosInstance.get(`/rooms/timeline/` + currentUser._id,
        {headers: { authorization: "Bearer " + currentUser.accessToken }})
        return res.data
    } catch (err) {
        console.log(err)
    }
}