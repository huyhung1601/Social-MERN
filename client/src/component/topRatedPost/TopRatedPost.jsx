import { Create, ThumbUp, Visibility } from "@material-ui/icons";
import React from "react";
import { getUserInf } from "../../context/userContext/apiCall";
import "./topRatedPost.scss";
const TopRatedPost = ({ post }) => {
  const img = post.items.filter((i) => i.type === "img")[0];

  return (
    <div className="topRatedPost">
      <div className="postImg">
        <img src={img.src} alt="" />
      </div>
      <div className="postContent">
        <div className="postTitle">{post.title}</div>
        <div className="postReactions">
          <div className="postReaction Like">
            <ThumbUp className="reactionIcon" />
            <span> {post.likes.length} </span>
          </div>
          <div className="postReaction View">
            <Visibility className="reactionIcon" />
            <span> {post.views.length || 0} </span>
          </div>
          <div className="postReaction Create">
            <span>{post.username}</span>

            <Create className="reactionIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRatedPost;
