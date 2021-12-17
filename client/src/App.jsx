import React, { useContext } from "react";
import "./app.scss";
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { AuthContext } from "./context/authContext/AuthContext";
function App() {
  const {user} = useContext(AuthContext)
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/home">
            {user ? <Home/> : <Redirect to="/"/>}
          </Route>
          <Route exact path="/">
            {user ? <Redirect to="/home"/> :<Login />}
          </Route>
          <Route path="/register">
          {user ? <Redirect to="/home"/> :<Register />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
