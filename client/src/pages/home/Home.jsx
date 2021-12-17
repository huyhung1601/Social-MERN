import React, { useContext, useState } from "react";
import {
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import CompProfile from "../../component/compProfile/CompProfile";
import Navbar from "../../component/navbar/Navbar";
import Posts from "../posts/Posts";
import MetRoom from "../metRoom/MetRoom";
import "./home.scss";
import Dashboard from "../dashboard/Dashboard";
import { AuthContext } from "../../context/authContext/AuthContext";

const Home = () => {
  const { path } = useRouteMatch();
  const {user: currentUser} = useContext(AuthContext)
  const [scroll, setScroll] = useState(false)
  return (
    <div className="home">
        <Navbar />
        <CompProfile scroll={scroll} setScroll={setScroll} />
        <div className={scroll ? "tabWrapper scrolled" : "tabWrapper"}>        
        <Switch>
          <Route exact path={path}>
            <Dashboard currentUser={currentUser}/>
          </Route>
          <Route path={`${path}/posts`} >
            <Posts/>
          </Route>
          <Route path={`${path}/rooms`}> <MetRoom/></Route>

          <Route path={`${path}/community`}>Community</Route>
        </Switch>
        </div>     
    </div>
  );
};

export default Home;
