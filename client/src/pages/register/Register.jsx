import { Group } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { useForm } from "../../component/controls/useForm";
import { register } from "../../context/authContext/apicall";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./register.scss";


const initialValue = {
  username: "",
  email: "",
  password: "",
};
const Register = () => {
  const {error, dispatch} =useContext(AuthContext)
  const {values, handleChange} =useForm(initialValue)
  const handleRegister = e =>{
    e.preventDefault();
    register(values, dispatch)
  }
  console.log(error)
  return (
    <div className="container">
      <div className="register">
        <div className="top">
          <Group className="logo" />
          <h1>WeMet</h1>
        </div>
        <div className="center">
          <form className="registerForm" onSubmit={handleRegister}>
            <h3>Create a new account</h3>
            <div class="form-group">
              <label for="usernameInput">Username</label>
              <input
                type="text"
                class="form-control"
                id="usernameInput"
                name="username"
                value={values.username}
                onChange={(e)=>handleChange(e.target.name,e.target.value)}
              />
              {error && (
                <small>there is an error</small>
              )}
            </div>
            <div class="form-group">
              <label for="emailIput">Email address</label>
              <input
                type="email"
                class="form-control"
                id="emailIput"
                name="email"
                value={values.email}
                onChange={(e)=>handleChange(e.target.name,e.target.value)}
              />
            </div>
            <div class="form-group">
              <label for="passwordInput">Password</label>
              <input
                type="password"
                class="form-control"
                id="passwordInput"
                name="password"
                onChange={(e)=>handleChange(e.target.name,e.target.value)}
                value={values.password}
              />
            </div>
            <div className="formBottom">
              <Link to="/">
                <span>Already have account?</span>
              </Link>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
