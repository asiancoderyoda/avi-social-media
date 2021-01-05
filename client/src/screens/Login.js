import React, {useState, useContext} from 'react';
import './Login.css';
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {UserContext} from '../App'


toast.configure()
const Login = () => {

  const {state, dispatch} = useContext(UserContext)

  const history = useHistory()
  const[email, setEmail]= useState("")
  const[password,setPassword]= useState("")


    const signin = () => {

      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        return toast.error("Invalid email", {position: toast.POSITION.TOP_CENTER})
      }

      fetch("/api/v1/signin", {
        method: "post",
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          password:password,
          email:email
        })
      }).then(res => res.json()).then(data => {
        //console.log(data)
        if(data.error){
          toast.error(data.error, {position: toast.POSITION.TOP_CENTER})
        } else{
          /////////
          localStorage.setItem('jwt', data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          /////////
          dispatch({type: "USER", payload:data.user})

          toast.success("Signed in successfully", {position: toast.POSITION.TOP_CENTER})
          history.push('/')
        }
      }).catch(err => {
        console.log(err)
      })
    }


    return (

       <div className="login">
       <img
         src="https://cdn2.iconfinder.com/data/icons/business-dual-color-glyph-set-4/128/INTEGRATION-512.png"
         alt=""
       />
 
       <form>
         <h2>Login Portal</h2>
         <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
           type="email"
           placeholder="Email"
         />
         <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
           type="password"
           placeholder="Password"
         />
       </form>
       <button className="register__button" onClick={signin} >
           Sign In
        </button>

        <div className="login__links">
        <p>
         Forgot Password?
         <Link to={"/reset"} style={{textDecoration: 'none'}} >
         <span className="login__register">
           {" "}Click for support
         </span>
         </Link>
       </p>
       <p style={{marginTop:0}}>
         Not a member?
         <Link to={"/signup"} style={{textDecoration: 'none'}} >
         <span className="login__register">
           {" "}Register here
         </span>
         </Link>
       </p>
       </div>

       <p style={{fontWeight:"bold"}}>By CoderYoda</p>
     </div>



    )
}

export default Login
