const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };

    case "REGISTER_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };

    case "REGISTER_SUCCESS":
      return {
        user: null,
        isFetching: false,
        error: false,
      };

    case "REGISTER_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "LOGOUT_START":
      return {
        ...state,
        isFetching: true,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        user: null,
        isFetching: false,
        error: false
      };
    case "LOGOUT_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true
      };
    case "REFRESH_TOKEN":
      return {
        ...state,
        user: {
          ...state.user,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        },
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;
