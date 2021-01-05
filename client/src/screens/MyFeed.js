import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import { Avatar } from "@material-ui/core";

import { ThumbUpAltOutlined } from "@material-ui/icons";
import { ThumbUpAlt } from "@material-ui/icons";
import { Delete } from "@material-ui/icons";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { UserContext } from "../App";
import {Link} from 'react-router-dom';

toast.configure()
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [cmnt, setCmnt] = useState("")


  useEffect(() => {
    fetch("/api/v1/myfeed", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPosts(result.posts);
      });
  }, []);

  //like post route handling

  const likepost = (id) => {
    fetch("/api/v1/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        const newData = posts.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setPosts(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //unlike post route handling

  const unlikepost = (id) => {
    fetch("/api/v1/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        const newData = posts.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setPosts(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //UserContext for detecting User in likes array
  const { state, dispatch } = useContext(UserContext);

  //comment

  const makeComment = (text, postId) => {
    fetch("/api/v1/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: postId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setCmnt("")
        const newData = posts.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setPosts(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  //Delete Post

  const deletePost = (postID) => {
    fetch(`/api/v1/deletepost/${postID}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        toast.success(result.message, {position: toast.POSITION.TOP_CENTER})
        const newData = posts.filter((post) => {
          return post._id !== result.data._id;
        });
        setPosts(newData);
      });
  };




  //Delete Comment

  const deleteComment = (postid, commentid) => {
   
    fetch(`/api/v1/deletecomment/${postid}/${commentid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
             const newData = posts.map((item) => {

          if (item._id === result._id) {
                     return result;
          } else {
            return item;
          }
        });
        setPosts(newData);
      }).catch((err) => {
        console.log(err)
      })
  };





  return (
    <div className="container" id="post__container">
      {posts.map((post) => {
        return (
          <div className="post" key={post._id}>
            <div className="master__header">
              <div className="post__header">
                <Link to={post.postedBy._id !== state._id ? "/profile/"+post.postedBy._id : "/profile"} style={{textDecoration: "none", color: "inherit"}} >
                <Avatar src={post.postedBy.profilepic}>
                  {post.postedBy.name[0]}
                </Avatar>
                </Link>
                <div className="post__info">
                  <Link to={post.postedBy._id !== state._id ? "/profile/"+post.postedBy._id : "/profile"} style={{textDecoration: "none", color: "inherit", fontSize:"inherit"}} >
                  <h2 style={{ color: "#005cb8", fontWeight: "700", fontSize:"14px" }}>
                    {post.postedBy.name}
                  </h2>
                  </Link>
                  <p>{post.postedBy.email}</p>
                </div>

              </div>
              {post.postedBy._id === state._id && (
                <button
                  onClick={() => deletePost(post._id)}
                  className="deletepost__button"
                >
                  <Delete style={{ color: "red", fontSize:"32px" }} />
                </button>
              )}
            </div>

            <div className="post__body">
              <img src={post.photo} alt="" />
              <h5>{post.title}</h5>
              <p style={{ marginTop: "10px", fontWeight: "500" }}>
                {post.body}
              </p>
            </div>
            <hr />
            <div className="post__buttons">
              {post.likes.includes(state._id) ? (
                <button onClick={(e) => unlikepost(post._id)}>
                  <ThumbUpAlt />
                </button>
              ) : (
                <button onClick={(e) => likepost(post._id)}>
                  <ThumbUpAltOutlined />
                </button>
              )}

              <div className="post__likeCounts">
                <h3>Likes: {post.likes.length}</h3>
              </div>
            </div>

            <form
              className="post__comment"
              onSubmit={(e) => {
                e.preventDefault();
                makeComment(e.target[0].value, post._id);
              }}
            >
              <input value={cmnt} onChange={e=>setCmnt(e.target.value)} type="text" placeholder="Add comment" />
            </form>

            {post.comments.map((record) => {
              return (
                <div className="comment__functions" key={record._id} >
                  <h6
                    key={record._id}
                    style={{ marginTop: "10px", fontWeight: "400" }}
                  >
                    {record.postedBy._id === post.postedBy._id ? (
                      <span style={{ fontWeight: "700", color: "#005cb8" }}>
                        OP {record.postedBy.name}:{" "}
                      </span>
                    ) : (
                      <span style={{ fontWeight: "700" }}>
                        {record.postedBy.name}:{" "}
                      </span>
                    )}
                    {record.text}
                  </h6>

                  {record.postedBy._id === state._id && (
                    <button
                      onClick={() => deleteComment(post._id,record._id)}
                      className="deletepost__button"
                    >
                      <Delete style={{fontSize:"20px"}} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
