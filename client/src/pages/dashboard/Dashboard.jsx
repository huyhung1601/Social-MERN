import React, { useEffect, useState, useContext } from "react";
import {
  ArrowDropDown,
  Create,
  People,
  SportsEsports,
} from "@material-ui/icons";
import "./dashboard.scss";
import ActiveBtn from "../../component/activeBtn/ActiveBtn";
import TopRatedPost from "../../component/topRatedPost/TopRatedPost";
import { resetPosts } from "../../context/postsContext/PostsActions";
import { PostsContext } from "../../context/postsContext/PostsContext";
import { getRatedPosts } from "../../context/postsContext/apiCall";
import {Link} from "react-router-dom"
const ratedBtns = [
  { btn: "All", id: "All" },
  { btn: "Year", id: "Year" },
  { btn: "Month", id: "Month" },
];
const Dashboard = ({ currentUser }) => {
  const { posts, dispatch, isFetching } = useContext(PostsContext);
  const [selected, setSelected] = useState("Month");
  const [rated, setRated] = useState("likes")
  /**Fetch Rated Posts */
  useEffect(() => {
    dispatch(resetPosts());
    getRatedPosts(rated,currentUser, dispatch);
  }, [selected,rated]);
  return (
    <div className="dashboard">
      <div className="dashboardWrapper Left">
        <div className="topRated Header">
          <div className="topRatedBy Posts">
            <span>Top Rated:</span>
            <div className="topRatedMenu">
              <select  className="selectInput" value={rated} onChange={e=>setRated(e.target.value)} id="rated">
                <option value="likes">Likes</option>
                <option value="views">Views</option>                
              </select>
              {/* <ArrowDropDown /> */}
            </div>
          </div>
          <div className="topRatedBy Time">
            {ratedBtns.map((item, index) => (
              <ActiveBtn
                setSelected={setSelected}
                item={item}
                key={index}
                active={selected === item.id}
              />
            ))}
          </div>
        </div>
        <div className="topRated List">
          {isFetching ? (
            <p>isloading...</p>
          ) : (
            posts.posts.map((p) => 
            <Link style={{textDecoration: 'none', color:"inherit"}} to={`/home/posts/${p._id}`}>
              <TopRatedPost post={p} key={p._id} />
            </Link>
            )
          )}
          <div className="morePosts">
            <span> ...</span>
          </div>
        </div>
      </div>
      <div className="dashboardWrapper Right">
        <div className="rightBoard Header">
          <div className="communityInfo">
            <div className="infoItem">
              <span>Master: Henry </span>
              <input className="searchInput" />
            </div>
            <div className="infoItem">
              <h6>Members</h6>
              <div className="infoItemContent">
                <People className="infoItemIcon" /> <span>200</span>
              </div>
            </div>
            <div className="infoItem">
              <h6>Posts</h6>
              <div className="infoItemContent">
                <Create className="infoItemIcon" /> <span>200</span>
              </div>
            </div>
            <div className="infoItem">
              <h6>Activities</h6>
              <div className="infoItemContent">
                <SportsEsports className="infoItemIcon" /> <span>200</span>
              </div>
            </div>
          </div>
        </div>
        <div className="rightBoard Content"></div>
      </div>
    </div>
  );
};

export default Dashboard;
