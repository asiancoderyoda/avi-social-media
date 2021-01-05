import "./Navbar.css";
import React, {useState,useContext} from "react";
import * as ReactBootstrap from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from "../App"
import SearchIcon from '@material-ui/icons/Search';

const Navbar = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  }
  const closeSearch = () => {
    setSearch("");
    handleClose();
  }
  const handleShow = () => setShow(true);

  const history = useHistory();
  const {state, dispatch} = useContext(UserContext);

  const [search, setSearch] = useState("");
  const [searchuserData, setSearchUserdata] = useState([])

  const renderList = () => {
    if(state){
      return [


        <ReactBootstrap.Nav.Link key="0" href="#" id="nav__link">

                  <ReactBootstrap.Button id="search__people" variant="primary" onClick={handleShow}>
                    <SearchIcon style={{fontSize:"16px"}} />Search People
                  </ReactBootstrap.Button>

                  <ReactBootstrap.Modal show={show} onHide={handleClose}>
                    <ReactBootstrap.Modal.Header closeButton>
                      <ReactBootstrap.Modal.Title>Search People</ReactBootstrap.Modal.Title>
                    </ReactBootstrap.Modal.Header>
                    <ReactBootstrap.Modal.Body>
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}} >

                    <ReactBootstrap.Form inline>
                      <ReactBootstrap.FormControl value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search" className="mr-sm-2" />
                      <ReactBootstrap.Button onClick={fetchUsers} variant="outline-success">Search</ReactBootstrap.Button>
                    </ReactBootstrap.Form>

                    </div>

                    <ReactBootstrap.ListGroup style={{marginTop:"15px"}}>
                      {searchuserData.map(item => {
                        return (
                          <ReactBootstrap.ListGroup.Item key={item._id} ><Link to={item._id===state._id ? "/profile" : "/profile/"+item._id} onClick={handleClose} >{item.name}</Link></ReactBootstrap.ListGroup.Item>
                        )
                      })}
                    </ReactBootstrap.ListGroup>


                    </ReactBootstrap.Modal.Body>
                    <ReactBootstrap.Modal.Footer>
                      <div style={{display:"flex",width:"100%", justifyContent:"center", alignItems:"center"}} >
                      <ReactBootstrap.Button variant="secondary" onClick={closeSearch}>
                        Close
                      </ReactBootstrap.Button>
                      </div>
                    </ReactBootstrap.Modal.Footer>
                  </ReactBootstrap.Modal>

          </ReactBootstrap.Nav.Link>,


          <ReactBootstrap.Nav.Link key="1" href="#" id="nav__link"><Link to="/create" style={{textDecoration: "none", color: "inherit"}}>Create Post</Link></ReactBootstrap.Nav.Link>,
          <ReactBootstrap.Nav.Link key="2" href="#" id="nav__link"><Link to="/myfeed" style={{textDecoration: "none", color: "inherit"}}>My Feed</Link></ReactBootstrap.Nav.Link>,
          <ReactBootstrap.Nav.Link key="3" href="#" id="nav__link"><Link to="/profile" style={{textDecoration: "none", color: "inherit"}}>My Profile</Link></ReactBootstrap.Nav.Link>,
          
        

          <ReactBootstrap.Nav.Link key="5" href="#" id="nav__link">
            <ReactBootstrap.Button className="logout__button" onClick={() =>{
              localStorage.clear()
              dispatch({type:"LOGOUT"})
              history.push('/login')
            }} >Logout</ReactBootstrap.Button>
          </ReactBootstrap.Nav.Link>
      ]
    }else {
      return [
          <ReactBootstrap.Nav.Link key="6" href="#" id="nav__link"><Link to="/login" style={{textDecoration: "none", color: "inherit"}}>Login</Link></ReactBootstrap.Nav.Link>,
          <ReactBootstrap.Nav.Link key="7" href="#" id="nav__link"><Link to="/signup" style={{textDecoration: "none", color: "inherit"}}>Sign Up</Link></ReactBootstrap.Nav.Link>
      ]
    }
  }


  const fetchUsers = () => {
    fetch("/api/v1/search-users", {
      method:"post",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        query:search
      })
    }).then(res=>res.json()).then(result => {
      //console.log(result)
      setSearchUserdata(result.user)
      setSearch("")
    })
  }


  return (
    <div className="header__main">
      <ReactBootstrap.Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" id="nav__bar">
        <ReactBootstrap.Navbar.Brand id="navbar__brand" href="#"><Link to={state?"/":"/login"} style={{textDecoration: "none", color: "inherit"}}>Avi's Media</Link></ReactBootstrap.Navbar.Brand>
        <ReactBootstrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootstrap.Navbar.Collapse id="responsive-navbar-nav">

            

            <ReactBootstrap.Nav className="mr-auto">
            </ReactBootstrap.Nav>

            <ReactBootstrap.Nav>
            {renderList()}
            </ReactBootstrap.Nav>

        </ReactBootstrap.Navbar.Collapse>
    </ReactBootstrap.Navbar>



    </div>
  );
};

export default Navbar;
