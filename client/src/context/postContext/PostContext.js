import { createContext, useReducer,useEffect } from "react";
import PostReducer from "./PostReducer";
const initialState = {
  post: JSON.parse(localStorage.getItem("post")) || {
    title: "",
    bold: false,
    italic: false,
    fontFamily: "Rorboto",
    textAlign: "center",
    items: [      
    ],
    likes: [],
    views: [],
  },
  comments:{count: 0, comments: []},
  isFetching: false,
  error: false,
};

export const PostContext = createContext(initialState);

export const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostReducer, initialState);
  useEffect(()=>{
    localStorage.setItem("post", JSON.stringify(state.post))
  },[state.post])
  return (
    <PostContext.Provider
      value={{
        post: state.post,
        isFetching: state.isFetching,
        error: state.error,
        comments: state.comments,
        dispatch,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
