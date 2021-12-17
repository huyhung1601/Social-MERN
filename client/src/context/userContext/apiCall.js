import {axiosInstance} from "../../config"

export const getUserInf = async(userId)=>{
    try {
        const res = await axiosInstance.get(`/users?userId=${userId}`)
        return res.data
    } catch (err) {
        console.log(err)
    }
} 