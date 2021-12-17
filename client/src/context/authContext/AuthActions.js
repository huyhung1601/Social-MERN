export const loginStart = () => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const logoutStart = () => ({
  type: "LOGOUT_START",
});

export const logoutSuccess = () => ({
  type: "LOGOUT_SUCCESS",  
});

export const logoutFailure = () => ({
  type: "LOGOUT_FAILURE",
});

export const registerStart = () => ({
  type: "REGISTER_START",
});

export const registerSuccess = (user) => ({
  type: "REGISTER_SUCCESS",
});
export const registerFailure = () => ({
  type: "REGISTER_FAILURE",
});

export const refreshTokenSuccess = (tokens) => ({
  type: "REFRESH_TOKEN",
  payload: tokens,
});
