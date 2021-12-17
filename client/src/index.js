import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { PostContextProvider } from "./context/postContext/PostContext";
import { PostsContextProvider } from "./context/postsContext/PostsContext";
import {RoomContextProvider} from './context/roomContext/RoomContext'
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostsContextProvider>
        <RoomContextProvider>
          <PostContextProvider>
            <App />
          </PostContextProvider>
        </RoomContextProvider>
      </PostsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
