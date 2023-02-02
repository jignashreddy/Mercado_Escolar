import React, { useState, useEffect } from "react";
import {NavLink, useNavigate} from "react-router-dom";

function NaviBar1() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("SmloggedInUser"));
    if(user){
      if(user.user_type === "Business Owner"){
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
    <div className="leftnav">
      <div className="logo">
          <a href="./">Mercado Escolar</a>
      </div>
        <label><NavLink exact="true" to="/businessdashboard">Dashboard</NavLink></label>
        <label><NavLink exact="true" to="/my-products">Products</NavLink></label>
        <label><NavLink exact="true" to="/businesspage">Business Page</NavLink></label>
        <label><NavLink exact="true" to="/businesschats/busines">Chats</NavLink></label>
        <label><NavLink exact="true" to="/my-advertisements">Advertisements</NavLink></label>
        <label><NavLink exact="true" to="/profile">Profile</NavLink></label>
      <label><p onClick={logOut}>Log Out</p></label>
    </div>
  );
}

export default NaviBar1;
