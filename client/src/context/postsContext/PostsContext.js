import { createContext, useReducer } from "react";
import PostsReducer from "./PostsReducer";

const initialState = {
  posts: {posts:[],count: 0 },
  isFetching: false,
  error: false,
};

export const PostsContext = createContext(initialState);

export const PostsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostsReducer, initialState);

  return(
      <PostsContext.Provider value={{
          posts: state.posts,
          isFetching: state.isFetching,
          error: state.error,
          hasMore: state.hasMore,
          dispatch
      }}>
          {children}
      </PostsContext.Provider>
  )
};
