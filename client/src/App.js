import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Profile from "./screens/Profile";
import CreatePost from "./screens/CreatePost";
import { reducer, initialState } from "./reducers/userReducer.js";
import UserProfile from "./screens/UserProfile";
import MyFeed from "./screens/MyFeed";
import ResetPassword from "./screens/ResetPassword";
import NewPassword from "./screens/NewPassword";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const {state, dispatch} = useContext(UserContext)
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if(user){
      dispatch({type:'USER',payload:user})
    }else{
      if(!history.location.pathname.startsWith("/reset")){
        history.push('/login')
      }
    }
  },[])


  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/create">
        <CreatePost />
      </Route>
      <Route exact path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route exact path="/myfeed">
        <MyFeed />
      </Route>
      <Route exact path="/reset">
        <ResetPassword />
      </Route>
      <Route exact path="/reset/:token">
        <NewPassword />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <UserContext.Provider value={{state:state, dispatch}}>
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
