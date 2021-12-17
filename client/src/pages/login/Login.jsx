import "./login.scss";
import { Link } from "react-router-dom";
import { Group } from "@material-ui/icons";
import { useForm } from "../../component/controls/useForm";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { login, refreshToken } from "../../context/authContext/apicall";
import axios from "axios";
import jwt_decode from "jwt-decode";

const initialValue = {
  email: "henry@gmail.com",
  password: "123456",
};
const Login = () => {
  const { values, handleChange, resetForm } = useForm(initialValue);
  const { error, user, dispatch } = useContext(AuthContext); 
  
  //handle login
  const handleLogin = (e) => {
    e.preventDefault();
    login(values, dispatch);
    resetForm();
  };
  //Refresh token
  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(async (config) => {
    let currentDate = new Date();
    const decodedToken = jwt_decode(user?.accessToken);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken(user.refreshToken, dispatch);
      config.headers["authorization"] = "Bearer " + data.accessToken;
      console.log(data)
    }
    return config
  }, (err)=>{
    return Promise.reject(err)
  });

  
  return (
    <div className="container">
      <div className="loginContainer">
        <div className="loginContainerLeft">
          <div className="top">
            <Group className="logo" />
            <h3>WeMet</h3>
          </div>
          <div className="center">
            <h1>Welcome to ...</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Laudantium voluptatibus quas ratione repellat! Ipsum iste tempora
              commodi praesentium excepturi numquam voluptates ullam? Maiores
              quod facere a eveniet sequi accusantium! Non.
            </p>
          </div>
          <div className="bottom">
            <span>My MERN Stack Project</span>
          </div>
        </div>
        <div className="loginContainerRight">
          <form className="loginForm" onSubmit={handleLogin}>
            <h3>Login</h3>
            <p>
              Welcome! Login to get an exciting experience with our websites
            </p>
            <div className="form-group">
              <label for="emailInput">Email address</label>
              <input
                type="email"
                class="form-control"
                id="emailInput"
                name="email"
                value={values.email}
                onChange={(e) => handleChange(e.target.name,e.target.value)}
              />
              {error && <small>Wrong email or password!</small>}
            </div>
            <div className="form-group">
              <label for="passwordInput">Password</label>
              <input
                type="password"
                class="form-control"
                id="passwordInput"
                name="password"
                value={values.password}
                onChange={(e) => handleChange(e.target.name,e.target.value)}
              />
            </div>
            <div class="form-group form-check ">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                Remember me
              </label>
            </div>
            <button type="submit" class="large btn btn-primary">
              Login
            </button>
            <div className="bottom">
              <div className="left">
                <span>New User?</span>
                <Link to="/register">
                  <span>Signup</span>
                </Link>
              </div>
              <div className="right">
                <span>Forgot your password?</span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="circle one"></div>
    </div>
  );
};

export default Login;
