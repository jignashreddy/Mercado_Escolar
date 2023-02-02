import React, { useState, useEffect } from "react";
import {NavLink, useNavigate} from "react-router-dom";

function NaviBar() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("SmloggedInUser"));
    if(user){
      if(user.user_type === "Student"){
        const first_login = localStorage.getItem("first_login");
        if(first_login === 'true'){
          localStorage.setItem('first_login','false');
          window.location.reload();
        }else{
          console.log(first_login);
        }
      }else{
        navigate('/');
      }
    }else{
      navigate('/');
    }
  }, []);

  const logOut = e => {
		localStorage.removeItem('SmaccessToken');
    localStorage.removeItem('SmloggedInUser');
    localStorage.setItem('first_login','true');
      navigate('/');
      window.location.reload();
	};

  return (
    <div>
      <div className="leftnav">
        <div className="logo">
          <a href="./">Mercado Escolar</a>
        </div>
        <label><NavLink exact="true" to="/studentdashboards">Dashboard</NavLink></label>
        <label><NavLink exact="true" to="/all-products">All Products</NavLink></label>
        <label><NavLink exact="true" to="/my-clubs">My Clubs</NavLink></label>
        <label><NavLink exact="true" to="/all-clubs">Clubs</NavLink></label>
        <label><NavLink exact="true" to="/studentorders">Orders</NavLink></label>
        <label><NavLink exact="true" to="/my-posts">My Posts</NavLink></label>
        <label><NavLink exact="true" to="/businesschats/student">Chats</NavLink></label>
        <label><NavLink exact="true" to="/profile">Profile</NavLink></label>
        <label><p onClick={logOut}>Log Out</p></label>
      </div>
    </div>
  );
}

export default NaviBar;
