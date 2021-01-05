import React, {useState, useEffect} from "react";
import "./Login.css";
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure()
const Signup = () => {

  const history = useHistory()
  const[name, setName]= useState("")
  const[email, setEmail]= useState("")
  const[password,setPassword]= useState("")
  const[propic, setPropic]=useState("")
  const[propicurl, setPropicurl]=useState(undefined)


  useEffect(() => {
    if(propicurl){
      uploadFields()
    }
  }, [propicurl])


  const uploadprofilepic = () => {
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
        toast("Signing you up!!!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setPropicurl(data.url);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const uploadFields = () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      return toast.error("Invalid email", {position: toast.POSITION.TOP_CENTER})
    }

    fetch("/api/v1/signup", {
      method: "post",
      headers: {
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,
        password:password,
        email:email,
        profilepic:propicurl
      })
    }).then(res => res.json()).then(data => {
      if(data.error){
        toast.error(data.error, {position: toast.POSITION.TOP_CENTER})
      } else{
        toast.success(data.message, {position: toast.POSITION.TOP_CENTER})
        history.push('/login')
      }
    }).catch(err => {
      console.log(err)
    })
  }


  const signup = () => {

    if(propic) {
      uploadprofilepic()
    }else{
      uploadFields()
    }
  }






  return (

    <div className="login">
      <img
        src="https://cdn2.iconfinder.com/data/icons/business-dual-color-glyph-set-4/128/INTEGRATION-512.png"
        alt=""
      />

      <form>
        <h2>Registration Portal</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Full Name (required if registering)"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email (required if registering)"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password (required if registering)"
        />
        <div className="file-input">
        <input
          onChange={(e) => setPropic(e.target.files[0])}
          id="file" className="file"
          type="file"
        />
        <label htmlFor="file">
          Upload Profile Photo
          <p className="file-name"></p>
        </label>
        </div>
        {/*
        <input
          type="text"
          placeholder="Profile pic URL (optional)"
        />
        <input
          type="text"
          placeholder="Birthday (optional)"
        />
        <input
          type="text"
          placeholder="Small Description (optional)"
        />
        */}
      </form>
      <button className="register__button" onClick={signup} >
        Register
      </button>
      <p style={{fontWeight:"700"}}>
        Already a member?
        <Link to={"/login"} style={{ textDecoration: "none" }}>
          <span className="login__register"> Login here</span>
        </Link>
      </p>
      <p style={{fontWeight:"bold"}}>By CoderYoda</p>

        <alert />

    </div>


  )
};

export default Signup;
