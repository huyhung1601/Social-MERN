import {axiosInstance} from "../../config";
import {
  getPostsStart,
  getPostsSuccess,
  getPostsFailure,
  createPostStart,
  createPostFailure,
  createPostSuccess,
  updatePostStart,
  updatePostFailure,
  updatePostSuccess,
} from "./PostsActions";

export const createNewPost = async (newPost, user, dispatch) => {
  dispatch(createPostStart());
  try {
    const res = await axiosInstance.post("/posts/", newPost, {
      headers: { authorization: "Bearer " + user.accessToken },
    });
    dispatch(createPostSuccess(res.data));
  } catch (err) {
    dispatch(createPostFailure);
  }
};

export const updatePost = async (updatedPost, user, dispatch) => {
  dispatch(updatePostStart());
  try {
    const res = await axiosInstance.put(`/posts/${updatedPost._id}`, updatedPost, {
      headers: { authorization: "Bearer " + user.accessToken },
    });
    dispatch(updatePostSuccess(updatedPost));
  } catch (error) {
    dispatch(updatePostFailure());
  }
};
export const getPosts = async (user, pageNumber, dispatch) => {   
  await dispatch(getPostsStart());
  try {
    const res = await axiosInstance.get(
      `/posts/timeline/${user._id}?limit=5&page=${pageNumber}`
    );
    dispatch(getPostsSuccess(res.data));
  } catch (err) {
    dispatch(getPostsFailure());
  }
};

export const getUserPosts = async (username, pageNumber, dispatch) => {
  await dispatch(getPostsStart());
  try {
    const res = await axiosInstance.get(`/posts/find?username=${username}`, {
      params: { page: pageNumber, limit: "5" },
    });
    dispatch(getPostsSuccess(res.data));
  } catch (err) {
    dispatch(getPostsFailure());
  }
};

export const getRatedPosts = async (rated,currentUser,dispatch) =>{
  await dispatch(getPostsStart())
  try {
    const res =await axiosInstance.get(`/posts/top`,{
      params: {rated: rated},
      headers: {authorization: "Bearer " + currentUser.accessToken}
    })
    dispatch(getPostsSuccess(res.data))
  } catch (err) {
    dispatch(getPostsFailure());
  }
}
