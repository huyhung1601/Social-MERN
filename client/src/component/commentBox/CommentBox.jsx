import React, { useContext, useState,useEffect } from "react";
import { ThumbUp, Visibility } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import Comment from "../comment/Comment";
import "./commentBox.scss";
import { PostContext } from "../../context/postContext/PostContext";
import { PostsContext } from "../../context/postsContext/PostsContext";
import { likeComment, uploadComment } from "../../context/postContext/apicall";
const CommentBox = ({ currentUser }) => {
  const { dispatch, comments,post } = useContext(PostContext);
  const {dispatch:postsDispatch} = useContext(PostsContext)
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id, post.likes])
  /**HandleLike Post*/
  const handleLike = async()=>{
    const res = await likeComment(post._id, currentUser,postsDispatch)
    if (res) {
      setIsLiked(!isLiked)
      setLike(isLiked ? like -1 : like +1)
    }
  } 
  /**Upload Comment */
  const handleSubmitComment = () => {
    if (comment.split('').some(x=>x!== " ") ) {
      let newComment = {
        text: comment.trim(),
        userId: currentUser._id,
        username: currentUser.username,
        postId: post._id,
      };
      uploadComment(newComment, currentUser, dispatch);
      setComment("");
    }
  };
  return (
    <div className="commentBox">
      <div
        className={comments.count === 0 ? "commentLists empty" : "commentLists"}
      >
        {comments.count === 0 ? (
          <h5>What is in your mind</h5>
        ) : (
          comments.comments.map((c) => <Comment key={c._id} comment={c}/>)
        )}
      </div>
      <div className="postReactions">
        <div className="postReactWrapper">
          <div className="postReact">
            <ThumbUp className="postReactIcon" />
            <span>{like}</span>
          </div>
          <div className="postReact">
            <Visibility className="postReactIcon" />
            <span>{post.views.length || 0}</span>
          </div>
        </div>

        <div className="postComment">{`${comments.count} comments`}</div>
      </div>
      <hr className="devider" />
      <div className="postReactBtns">
        <button onClick={handleLike} className="postReactBtn">{isLiked ? "Dislike" : "Like"}</button>
        <button className="postReactBtn" onClick={handleSubmitComment}>
          Send
        </button>
      </div>
      <hr className="devider" />
      <div className="inputForm">
        <Avatar>{currentUser.username.toUpperCase().split('')[0]}</Avatar>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="commentInput"
          rows="2"
          type="text"
        />
      </div>
    </div>
  );
};

export default CommentBox;
