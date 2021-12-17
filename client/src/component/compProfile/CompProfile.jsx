import React, { useState } from "react";
import "./compProfile.scss";
import { Link, useRouteMatch } from "react-router-dom";
import { Eject, GetApp, Publish } from "@material-ui/icons";
const CompProfile = ({scroll, setScroll}) => {
  const { path } = useRouteMatch();
  return (
    <div className="compProfile">
      <div className={scroll ? "compInf hide" : "compInf"}>
        <div className="left">
          <Link to="/home">
            <img src="/assets/project.jpg" alt="" />
          </Link>
        </div>
        <div className="right">
          <h3 className="compName">My Project</h3>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum
            porro, debitis magni aliquid magnam molestiae commodi et odit
            dolores. Nobis, corrupti necessitatibus! Possimus quia consequuntur
            iste. Molestiae iusto vel ea.
          </span>
        </div>
      </div>
      <div className="tabs">
        <Link to={`/home/posts`} className="tab">
          <span>Post</span>
        </Link>
        <Link to={`${path}/rooms`} className="tab">
          <span>MetRoom</span>
        </Link>
        <Link to={`${path}/community`} className="tab">
          <span>Community</span>
        </Link>
      </div>
      <div className={scroll ? "scrolling hide" : "scrolling"} onClick={()=>setScroll(!scroll)}>
          <span>{scroll ? <GetApp/> :<Publish/>  }</span>
        </div>
    </div>
  );
};

export default CompProfile;
