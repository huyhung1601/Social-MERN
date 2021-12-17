import React, { useContext } from "react";
import "./navbar.scss";
import { Group, Add, Search, Settings } from "@material-ui/icons";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/apicall";
import { PostsContext } from "../../context/postsContext/PostsContext";
import { resetPosts } from "../../context/postsContext/PostsActions";
import {Link} from "react-router-dom"
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const {dispatch: postsDispatch} = useContext(PostsContext)

  const handleLogout = () => {
    postsDispatch(resetPosts())
    logout(user, dispatch);
  };
  return (
    <div className="navbar">
      <div className="left">Menu</div>
      <div className="center">
        <Link style={{color: "inherit", textDecoration: 'none'}} to="/home">
        <Group className="logo" />
        <span>WeMet</span>
        </Link>
      </div>
      <div className="right">
        <Search />
        <span>Search</span>
        <Add />
        <span>Create</span>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Settings />
          </button>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenu2"
          >
            <button class="dropdown-item" type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
