import { Dialog, Avatar } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PostContext } from "../../context/postContext/PostContext";
import { PostsContext } from "../../context/postsContext/PostsContext";
import AddItem from "../addItem/AddItem";
import PostTitle from "../postTitle/PostTitle";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./postEditor.scss";
import { arrangeItems, resetPostEditor } from "../../context/postContext/PostActions";
import { createNewPost, updatePost } from "../../context/postsContext/apiCall";
import { Link, useRouteMatch } from "react-router-dom";
const PostEditor = ({ user }) => {
  const history = useHistory();
  const { post, dispatch } = useContext(PostContext);
  const { dispatch: postsDispatch } = useContext(PostsContext);
  const { url } = useRouteMatch();
  console.log(user);
  /**Drag&Drop */
  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    dispatch(arrangeItems(destination, source));
  };
  /**Save Post */
  const savePost = () => {
    const newPost = {
      ...post,
      userId: user._id,
      username: user.username,
    };
    if (!newPost._id) {
      createNewPost(newPost, user, postsDispatch);
    } else updatePost(newPost, user, postsDispatch)
    history.push("/home/posts")
    dispatch(resetPostEditor())
  };

  const closeEditor = ()=>{
    dispatch(resetPostEditor())
    history.push("/home/posts")
  }
  return (
    <Dialog  fullWidth={true} maxWidth="lg" open={true} >
      <div className="postEditor">
        <div className="header">
          <div className="left ">
            <Avatar className="userAvatar">{user.username.toUpperCase().split("")[0]}</Avatar>
          </div>
          <div className="right">
            <button className="postEditorBtn" onClick={savePost}>Save</button>
            <button className="postEditorBtn" onClick={closeEditor}>Exit</button>
          </div>
        </div>
        <div className="content">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="left ">
              <PostTitle />
              <AddItem index={0} />
              <Droppable droppableId="droppableId">
                {(provided) => {
                  return (
                    <div
                      className="droppable"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {post &&
                        post.items.map((item, index) => (
                          <Draggable
                            key={item.id}
                            index={index}
                            draggableId={item.id}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  className="draggable"
                                  ref={provided.innerRef}
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                    boxShadow: snapshot.isDragging
                                      ? "0 0 .4rem #666"
                                      : "none",
                                    height: "fitContent",
                                  }}
                                >
                                  <AddItem
                                    snapshot={snapshot}
                                    item={item}
                                    key={item.id}
                                    index={index + 1}
                                  />
                                </div>
                              );
                            }}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </DragDropContext>

          <div className="right"></div>
        </div>
      </div>
    </Dialog>
  );
};

export default PostEditor;
