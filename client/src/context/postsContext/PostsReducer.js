const PostsReducer = (state, action) => {
  switch (action.type) {
    case "RESET_POSTS":
      return {
        ...state,
        posts: { posts: [], count: "" },
        isFetching: false,
        error: false,
      };
    case "EDIT_LIKE":
      return {
        ...state,
        posts: {
          ...state.posts,
          posts: state.posts.posts.map((p) =>
            p._id !== action.payload.postId
              ? p
              : {
                  ...p,
                  likes: !p.likes.includes(action.payload.userId)
                    ? p.likes.concat(action.payload.userId)
                    : p.likes.filter((like) => like !== action.payload.userId),
                }
          ),
        },
      };
    case "GET_POSTS_START":
      return {
        ...state,
        posts: { ...state.posts },
        isFetching: true,
        error: false,
      };
    case "GET_POSTS_SUCCESS":
      return {
        posts: {
          posts: [...state.posts.posts.concat(action.payload.posts.data)],
          count: action.payload.posts.count,
        },
        isFetching: false,
        error: false,
      };
    case "GET_POSTS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "CREATE_POST_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_POST_SUCCESS":
      return {
        ...state,
        posts: {
          posts: [action.payload, ...state.posts.posts],
          count: state.posts.count + 1,
        },
        isFetching: false,
      };
    case "CREATE_POST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATE_POST_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_POST_SUCCESS":
      return {
        ...state,
        posts: {
          ...state.posts,
          posts: state.posts.posts.map((p) =>
            p._id === action.payload._id ? action.payload : p
          ),
        },
        isFetching: false,
      };
    case "UPDATE_POST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default PostsReducer;
