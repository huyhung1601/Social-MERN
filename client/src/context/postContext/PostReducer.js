const PostReducer = (state, action) => {
  let initialPost = {
    title: "",
    bold: false,
    italic: false,
    fontFamily: "Rorboto",
    textAlign: "center",
    items: [],
  };
  let items = state.post.items;
  switch (action.type) {
    case "MODIFY_TITLE":
      return {
        ...state,
        post: { ...state.post, [action.payload.name]: action.payload.value },
      };
    case "CREATE_ITEM":
      state.post.items.splice(action.payload.index, 0, action.payload.item);
      return {
        ...state,
      };
    case "DELETE_ITEM":
      return {
        ...state,
        post: {
          ...state.post,
          items: items.filter((x) => x.id !== action.payload),
        },
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        post: {
          ...state.post,
          items: items.map((x) =>
            x.id === action.payload.id ? action.payload : x
          ),
        },
      };
    case "ARRANGE_ITEMS":
      state.post.items.splice(
        action.payload.destination.index,
        0,
        items.splice(action.payload.source.index, 1)[0]
      );
      return {
        ...state,
      };
    case "RESET_POST_EDITOR":
      return {
        ...state,
        post: initialPost,
      };
    case "FETCH_POST_START":
      return {
        ...state,
        post: initialPost,        
        comments: {count: 0, comments:[]},
        isFetching: true,
        error: false
      };
    case "FETCH_POST_SUCCESS":
      return {
        ...state,
        isFetching: false,
        post: action.payload.post,
        comments: action.payload.comment,
        error: false
      };
    case "FETCH_POST_FAILURE":
      return {
        ...state,
        post: initialPost,
        isFetching: false,
        error: true,
      };

    case "CREATE_COMMENT_SUCCESS":
      return {
        ...state,
        comments: {count: state.comments.count + 1, comments: [action.payload,...state.comments.comments]},
        isFetching: false,
        error: false,
      };
    case "CREATE_COMMENT_FALURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default PostReducer;
