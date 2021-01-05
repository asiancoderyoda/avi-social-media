import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import {UserContext} from '../App'
import { Avatar } from "@material-ui/core";
import { useParams } from "react-router-dom";

const UserProfile = () => {

  const {state, dispatch} = useContext(UserContext)

  const [posts, setPosts] = useState([]);
  const { userid } = useParams();

  //console.log(userid)
  //console.log(posts)

  const [showfollow, setShowfollow] = useState(state ? !state.following.includes(userid) : false)

  

  useEffect(() => {
    fetch(`/api/v1/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPosts(result);
        //console.log(result)
      });
  }, []);


  const followUser = () => {
    fetch("/api/v1/follow", {
      method:"put",
      headers:{
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId:userid,
      })
    }).then(res => res.json()).then(data =>{
      //console.log(data)
      setShowfollow(!showfollow)
      dispatch({type:"UPDATE",payload:{following:data.following, followers:data.followers}})
      localStorage.setItem("user", JSON.stringify(data))
      setPosts((prevState) => {
        return {
          ...prevState,
          user:{
            ...prevState.user,
            followers:[...prevState.user.followers,data._id]
          }
        }
      })
    })
  }


  const unfollowUser = () => {
    fetch("/api/v1/unfollow", {
      method:"put",
      headers:{
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId:userid,
      })
    }).then(res => res.json()).then(data =>{
      console.log(data)
      setShowfollow(!showfollow)
      dispatch({type:"UPDATE",payload:{following:data.following, followers:data.followers}})
      localStorage.setItem("user", JSON.stringify(data))
      
      setPosts((prevState) => {
        const newFollower = prevState.user.followers.filter(item => item !== data._id)
        return {
          ...prevState,
          user:{
            ...prevState.user,
            followers:newFollower
          }
        }
      })
    })
  }
  

  return (
      
        <div className="container" id="profile">
          <div className="sidebar">
            <div className="sidebar__top">
              <img
                src="https://1stwebdesigner.com/wp-content/uploads/2019/07/css-background-effects-thumb.jpg"
                alt=""
              />
              <Avatar
                className="sidebar__avatar"
                src={(posts.length === 0) ? "Loading" : posts.user.profilepic}
              >
                {
                    (posts.length === 0) ? "Loading" : posts.user.name[0]
                }
              </Avatar>
              <h2>{(posts.length === 0) ? "Loading" : posts.user.name}</h2>
              <h4>{(posts.length === 0) ? "Loading" : posts.user.email}</h4>
            </div>
            <div className="sidebar__stats">
              <div className="sidebar__stat">
                <p>Posts</p>
                <p className="sidebar__statNumber">
                  {(posts.length === 0) ? "Loading" : posts.posts.length}
                </p>
              </div>
              <div className="sidebar__stat">
                <p>Followers</p>
                <p className="sidebar__statNumber">{(posts.length === 0) ? "Loading" : posts.user.followers.length}</p>
              </div>
              <div className="sidebar__stat">
                <p>Following</p>
                <p className="sidebar__statNumber">{(posts.length === 0) ? "Loading" : posts.user.following.length}</p>
              </div>

                {showfollow?
                <button onClick={()=> followUser()} className="follow__button">Follow</button>
                :
                <button onClick={()=> unfollowUser()} className="follow__button">Unfollow</button>
                }
              
            </div>
          </div>

          <div className="user__posts">
            <div className="user__uploads">
              {
                  (posts.length === 0) ? "Loading" : 
              posts.posts.map((post) => {
                return <img key={post._id} src={post.photo} alt={post.title} />;
              })}
            </div>
          </div>
        </div>
  );
};

export default UserProfile;
