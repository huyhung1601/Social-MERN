import {axiosInstance} from "../../config";
import { editLike } from "../postsContext/PostsActions";
import { createCommentFailure, createCommentStart, createCommentSuccess, fetchPostFailure, fetchPostStart, fetchPostSuccess } from "./PostActions"

export const fetchData = async (postId,user,dispatch)=>{
    dispatch(fetchPostStart())
    try {
        const postRes = await axiosInstance.get(`/posts?postId=${postId}`,{
            headers:  { authorization: "Bearer " + user.accessToken }
        })
        const commentRes = await axiosInstance.get(`/comments?postId=${postId}`,{
            headers:  { authorization: "Bearer " + user.accessToken }
        })
        const post = postRes.data
        const comment = commentRes.data
        dispatch(fetchPostSuccess(post,comment))
    } catch (err) {
      dispatch(fetchPostFailure(err))  
    }
}

export const uploadComment = async (newComment, currentUser, dispatch) =>{
    try {
        const res = await axiosInstance.post("/comments/",newComment,{
            headers:  { authorization: "Bearer " + currentUser.accessToken }
        })
        dispatch(createCommentSuccess(res.data))
    } catch (err) {
        dispatch(createCommentFailure())
    }
}

export const likeComment = async (postId,currentUser,dispatch) => {
    const userId = currentUser._id
    try {
        const res = await axiosInstance.put(`/posts/${postId}/like`, {userId: currentUser._id},{
            headers:  { authorization: "Bearer " + currentUser.accessToken }
        })
        dispatch(editLike(postId,userId))
        return true
    } catch (err) {
        return false
    }
}

