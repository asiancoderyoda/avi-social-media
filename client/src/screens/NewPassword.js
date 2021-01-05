import React, {useState} from 'react';
import './Login.css';
import {useHistory,useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
const NewPassword = () => {

    const history = useHistory()
    const[password,setPassword]= useState("")

    const {token} = useParams()
    console.log(token);


    const signin = () => {

      fetch("/api/v1/new-password", {
        method: "post",
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          password:password,
          token:token
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

       <div className="login">
       <img
         src="https://cdn2.iconfinder.com/data/icons/business-dual-color-glyph-set-4/128/INTEGRATION-512.png"
         alt=""
       />
 
       <form>
         <h2>Reset Portal</h2>
         
         <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
           type="password"
           placeholder="New password"
         />
       </form>
       <button className="register__button" onClick={signin} >
            Confirm
        </button>
      
       <p>By CoderYoda</p>
     </div>
    
    )
}

export default NewPassword
