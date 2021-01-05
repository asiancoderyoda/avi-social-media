import React, { useState, useEffect, useContext } from "react";
import {UserContext} from '../App'
import "./Profile.css";
import { Avatar } from "@material-ui/core";
import FaceIcon from '@material-ui/icons/Face';
import * as ReactBootstrap from 'react-bootstrap';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const Profile = () => {

  const {state, dispatch} = useContext(UserContext)
  const [posts, setPosts] = useState([]);
  //console.log(posts)
  //console.log(state)
  const[propic, setPropic]=useState("")
  //const[propicurl, setPropicurl]=useState("")

  useEffect(() => {
    fetch("/api/v1/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPosts(result.myposts);
      });
  }, []);

  

//modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
//modal close




  useEffect(() => {
    if(propic) {
      const data = new FormData();
      data.append("file", propic);
      data.append("upload_preset", "avi-social-media");
      data.append("cloud_name", "prochesta-eis");

      fetch("https://api.cloudinary.com/v1_1/prochesta-eis/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          toast("Uploading new profile picture", {
            position: toast.POSITION.TOP_CENTER,
          });
          //console.log(data)
          //localStorage.setItem("user",JSON.stringify({...state,profilepic:data.url}))
          //dispatch({type:"UPDATEPROPIC", payload:data.url})
          fetch("/api/v1/updateprofilepic",{
            method:"put",
            headers:{
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              profilepic:data.url
            })
          }).then(res=>res.json()).then(result => {
            //console.log(result)
            localStorage.setItem("user",JSON.stringify({...state,profilepic:result.profilepic}))
            dispatch({type:"UPDATEPROPIC", payload:result.profilepic})
          })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [propic])

  const change_profilepic = (file) => {
    setPropic(file)
    handleClose()
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
            src={state ? state.profilepic : "Loading"}
          >{state ? state.name[0] : "Loading"}</Avatar>
          
          <button className="update_profilepic" onClick={handleShow}>
            <FaceIcon/>
          </button>

          <ReactBootstrap.Modal show={show} onHide={handleClose}>
            <ReactBootstrap.Modal.Header closeButton>
              <ReactBootstrap.Modal.Title>Update Profile picture</ReactBootstrap.Modal.Title>
            </ReactBootstrap.Modal.Header>
            <div style={{display:"flex",justifyContent:"center", width:"100%", marginTop:"10px", marginBottom:"10px"}}>
            <div className="file-input" style={{width:"70%"}} >
            <input
              onChange={(e) => change_profilepic(e.target.files[0])}
              id="file" className="file"
              type="file"
            />
            <label htmlFor="file">
              Select Profile Photo
              <p className="file-name"></p>
            </label>
            </div>
            </div>
            <ReactBootstrap.Modal.Footer>
              <div style={{width:"100%", display:"flex", justifyContent:"space-evenly"}} >
              <ReactBootstrap.Button variant="secondary" onClick={handleClose}>
                Close
              </ReactBootstrap.Button>
              {/*<ReactBootstrap.Button variant="primary" onClick={change_profilepic}>
                Upload
              </ReactBootstrap.Button>*/}
              </div>
            </ReactBootstrap.Modal.Footer>
          </ReactBootstrap.Modal>



          <h2>{state ? state.name : "Loading"}</h2>
          <h4>{state ? state.email : "Loading"}</h4>
        </div>
        <div className="sidebar__stats">
          <div className="sidebar__stat">
            <p>Posts</p>
            <p className="sidebar__statNumber">{posts.length}</p>
          </div>
          <div className="sidebar__stat">
            <p>Followers</p>
            <p className="sidebar__statNumber">{state ? state.followers.length : "Loading"}</p>
          </div>
          <div className="sidebar__stat">
            <p>Following</p>
            <p className="sidebar__statNumber">{state ? state.following.length : "Loading"}</p>
          </div>
        </div>
      </div>

        <div className="user__posts">
            <div className="user__uploads">
              {
                posts.map((post) => {
                    return(
                      <img
                          key={post._id}
                          src={post.photo}
                          alt={post.title}
                      />
                    )
                })

              }
            </div>
        </div>

    </div>
  );
};

export default Profile;
