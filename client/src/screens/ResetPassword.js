import React, {useState} from 'react';
import './Login.css';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ResetPassword = () => {

    const history = useHistory()
    const[email,setEmail]= useState("")



    const resetpassword = () => {

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return toast.error("Invalid email", {position: toast.POSITION.TOP_CENTER})
        }
  
        fetch("/api/v1/reset-password", {
          method: "post",
          headers: {
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email
          })
        }).then(res => res.json()).then(data => {
          //console.log(data)
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




  return (
    <div>
      <div className="login">
        <img
          src="https://cdn2.iconfinder.com/data/icons/business-dual-color-glyph-set-4/128/INTEGRATION-512.png"
          alt=""
        />

        <form>
          <h2>Provide your email</h2>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
        </form>
        <button className="register__button" onClick={resetpassword}>
          Reset Password
        </button>
        <p>By CoderYoda</p>
      </div>
    </div>
  );
};

export default ResetPassword;
