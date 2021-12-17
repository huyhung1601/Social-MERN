import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  refreshTokenSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./AuthActions";
import {axiosInstance} from "../../config";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (user, dispatch) => {
  dispatch(logoutStart());
  try {
    const res = await axiosInstance.post(
      "/auth/logout",
      { token: user.refreshToken },
      {
        headers: { authorization: "Bearer " + user.accessToken },
      }
    );
    dispatch(logoutSuccess());
    console.log(res);
  } catch (err) {
    dispatch(logoutFailure());
  }
};

export const register = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    const res = await axiosInstance.post("/auth/register", user);
    dispatch(registerSuccess());
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const refreshToken = async (refreshToken, dispatch) => {
  try {
    const res = await axiosInstance.post("/auth/refresh", { token: refreshToken });
    dispatch(refreshTokenSuccess(res.data));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
