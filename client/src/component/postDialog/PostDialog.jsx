import React, { useContext, useEffect } from "react";
import { Avatar, Dialog } from "@material-ui/core";
import "./postDialog.scss";
import { Link, useParams, useRouteMatch, useHistory } from "react-router-dom";
import { fetchData } from "../../context/postContext/apicall";
import { PostContext } from "../../context/postContext/PostContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import { resetPostEditor } from "../../context/postContext/PostActions";
import CommentBox from "../commentBox/CommentBox";
const PostDialog = () => {
  const { isFetching, post, dispatch } = useContext(PostContext);
  const { user: currentUser } = useContext(AuthContext);
  const { url } = useRouteMatch();
  const { id } = useParams();
  const history = useHistory();

  const closePostDialog = () => {
    dispatch(resetPostEditor());
    history.push("/home/posts");
  };
  /**Fetch post */
  useEffect(() => {
    fetchData(id, currentUser, dispatch)
  }, [id]);

  return (
    <Dialog style={{textAlign: "center"}} fullWidth={true} maxWidth="lg" open={true}>
      {isFetching ? (
        <span>isLoading ...</span>
      ) : (
        <div className="postDialog">
          <div className="postDialogHeader">
            <div className="postDialogHeaderLeft">
              <Avatar className="userAvatar">{post.username?.toUpperCase().split('')[0]}</Avatar>
              <span className="createdAt">
                Created at{" "}
                {post.createdAt?.slice(0, 10).split("-").reverse().join("/")}
              </span>
            </div>
            <div className="postDialogHeaderRight">
              {currentUser._id === post.userId && (
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to={`${url}/edit`}
                >
                  <button className="linkBtn">Edit</button>
                </Link>
              )}
              <button onClick={closePostDialog} className="linkBtn">
                Close
              </button>
            </div>
          </div>
          <div className="postWrapper">
            <div className="postWrapperLeft">
              <div
                className="postTitle"
                style={{
                  fontWeight: post.bold ? "bold" : "normal",
                  fontStyle: post.italic ? "italic" : "normal",
                  fontSize: "35px",
                  textAlign: post.textAlign,
                }}
              >
                <span style={{ fontFamily: post.fontFamily }}>
                  {post.title}
                </span>
              </div>
              <div className="postItems">
                {post.items.map((i) => (
                  <>
                    {i.type === "text" && (
                      <div
                        key={i.id}
                        className="textItem"
                        style={{
                          fontWeight: i.bold ? "bold" : "normal",
                          fontStyle: i.italic ? "italic" : "normal",
                          fontSize: "15px",
                          textAlign: i.textAlign,
                        }}
                      >
                        <p style={{ fontFamily: i.fontFamily }}>{i.text}</p>
                      </div>
                    )}
                    {i.type === "img" && (
                      <div className="imgItem" key={i.id}>
                        <img src={i.src} alt="" />
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
            <div className="postWrapperRight">
              <CommentBox currentUser={currentUser} />
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default PostDialog;
