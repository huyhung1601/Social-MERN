import { Avatar } from "@material-ui/core";
import React, { useContext,useEffect,useState } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { getUserInf } from "../../context/userContext/apiCall";
import "./comment.scss";
const Comment = ({ comment }) => {
  const { user: currentUser } = useContext(AuthContext);

  return (
    <>
    {<div className={currentUser._id === comment.senderId ? "comment own" :"comment"}>
      {currentUser._id === comment.senderId ? null : (
        <Avatar className="userAvatar">{comment.username?.toUpperCase().split('')[0]}</Avatar>
      )}
      <p className={currentUser._id === comment.senderId ? "commentText own" :"commentText"}>{comment.text}</p>
    </div>}
    </>
  );
};

export default Comment;
