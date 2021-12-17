import React, { useContext, useEffect, useRef, useState } from "react";
import Post from "../../component/post/Post";
import { PostsContext } from "../../context/postsContext/PostsContext";
import "./posts.scss";
import { getPosts, getUserPosts } from "../../context/postsContext/apiCall";
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext";
import { Search } from "@material-ui/icons";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import PostEditor from "../../component/postEditor/PostEditor";
import PostDialog from "../../component/postDialog/PostDialog";
import { resetPosts } from "../../context/postsContext/PostsActions";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosInstance } from "../../config";
const Posts = () => {
  const { user } = useContext(AuthContext);
  const { posts, dispatch, isFetching,} = useContext(PostsContext);
  const [userPosts, setUserPosts] = useState("all");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const searchRef = useRef();
  const [open, setOpen] = useState(false);
  const { path, url } = useRouteMatch();
  const [pageNumber, setPageNumber] = useState(1);

  
  /**handle search */
  const handleSearch = async (e) => {
    setSearch(e.target.value);
    searchRef.current.value.length >= 3 &&
      (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(searchRef.current.value)
        ? searchByUser()
        : searchByEmail());
  };

  const searchByUser = async () => {
    let cancel;
    try {
      const res = await axiosInstance.get(
        `/users/find?username=${searchRef.current.value}`,
        { cancelToken: new axios.CancelToken((c) => (cancel = c)) }
      );
      setUsers(res.data);
    } catch (err) {
      if (axiosInstance.isCancel(err)) return;
    }

    return () => cancel();
  };
  const searchByEmail = async () => {
    const res = await axiosInstance.get(`/users/find?email=${searchRef.current.value}`);
    setUsers(res.data);
  };
  /**fetch posts */
  useEffect(() => {
    dispatch(resetPosts())
    setPageNumber(1)
    userPosts === "all"
      ? getPosts(user, 1, dispatch)
      : getUserPosts(userPosts, 1, dispatch);
  }, [userPosts]);
   /**infinite scroll */
   useEffect(() => {
    if (pageNumber > 1) {userPosts === "all"
      ? getPosts(user, pageNumber, dispatch)
      : getUserPosts(userPosts, pageNumber, dispatch);}
  }, [pageNumber]);
  return (
    <div className="posts">
      <div className="topbar">
        <button onClick={() => setUserPosts("all")}>All</button>
        <button onClick={() => setUserPosts(user.username)}>My Posts</button>
        <div className="input-group">
          <span className="input-group-text" id="basic-addon1">
            <Search onClick={() => setUserPosts(searchRef.current.value)} />
          </span>
          <input
            className="form-control"
            list="datalistOptions"
            id="exampleDataList"
            placeholder="Search by username ..."
            value={search}
            onChange={handleSearch}
            ref={searchRef}
            onKeyDown={(e) =>
              e.key === "Enter" && setUserPosts(searchRef.current.value)
            }
          />
          <datalist id="datalistOptions">
            {users &&
              users.map((u) => (
                <option key={u._id} value={u.username}></option>
              ))}
          </datalist>
        </div>
      </div>

      <InfiniteScroll
        className="postsContainer"
        dataLength={posts.posts.length}
        next={() => setPageNumber((prev) => prev + 1)}
        hasMore={posts.posts.length < posts.count}
      >
        <Link style={{ textDecoration: "none" }} to={`${url}/create`}>
          <div className="createPost" onClick={() => setOpen(true)}>
            <h5>Create new post</h5>
          </div>
        </Link>
        {posts.posts &&
          posts.posts.map((p) => {
            return (
              <Link
                key={p._id}
                style={{ color: "inherit", textDecoration: "none" }}
                to={`${url}/${p._id}`}
              >
                <Post onClick={() => setOpen(true)} post={p} />
              </Link>
            );
          })}
        {isFetching && <span>isLoading....</span>}
      </InfiniteScroll>

      <Switch>
        <Route exact path={path}></Route>
        <Route path={`${path}/create`}>
          <PostEditor user={user} />
        </Route>
        <Route path={`${path}/:id/edit`}>
          <PostEditor user={user} />
        </Route>
        <Route path={`${path}/:id`}>
          <PostDialog />
        </Route>
      </Switch>
    </div>
  );
};

export default Posts;
