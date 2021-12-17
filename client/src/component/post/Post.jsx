import React from "react";
import {  ThumbUp } from "@material-ui/icons";
import { format } from "timeago.js";
import "./post.scss";

const Post = ({post}) => {
  
  const textItem = post.items?.filter(x=> x.type === "text")
  const imgItem = post.items?.filter(x=>x.type==="img")

  return (
    <div className="post">
      <div className="postTop">
        <img src={imgItem && imgItem[0].src} alt="" />
      </div>
      <div className="postCenter">
        <h3 style={{fontFamily: post.fontFamily}}>{post.title}</h3>
        <p>
          {textItem && textItem[0].text}
        </p>
      </div>
      <div className="postBottom">
        <div className="left">
          <div className="avatar">{post.username.split("")[0].toUpperCase()}</div>
          <div className="postInf">
            <span>
              Shared by <span>{post.username}</span>
            </span>
            <span>{format(post.createdAt)}</span>
          </div>
        </div>
        <div className="right">
          <div className="like">
            <ThumbUp className="likeIcon"/>
            <span>{post.likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
