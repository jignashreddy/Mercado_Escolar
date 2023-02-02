import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../../Images/Home/mercado_escolar.png';
import { NavLink } from 'react-router-dom';

function Navbar(){
	const navigate = useNavigate();

	const user = JSON.parse(localStorage.getItem("SmloggedInUser"));

	const goDashboard = e => {
		if(user){
			if(user.user_type === "Student"){
				navigate('/studentdashboard');
			}
			else if(user.user_type === "Business Owner"){
				navigate('/businessdashboard');
			}
			else if(user.user_type === "School Admin"){
				navigate('/school-admin-dashboard');
			}
			else if(user.user_type === "Super Admin"){
				navigate('/super-admin-dashboard');
			}
		}
	};

	return (
		<nav className="navbar1">
			<div className="logo1">
				<a href="/"><img src={logo} alt="logo" style={{ width: "222px", margin: "left" }} /></a>
			</div>
			<ul className="nav-links1">
				<div className="topbar1">
				<NavLink exact="true" to="/">Home</NavLink>
				<NavLink exact="true" to="/about">About</NavLink>
				<NavLink exact="true" to="/service">Services</NavLink>
				<label><a href="http://127.0.0.1:8000/blog/" target="_blank">Blog</a></label>
				<NavLink exact="true" to="/contact">Contact</NavLink>
				</div>
			</ul>
			{user ? (
                <p onClick={goDashboard} style={{cursor:"pointer"}}>{user.first_name} {user.last_name}</p>
            ) : (
				<div id="login"><NavLink exact="true" to="/login">Login/Signup</NavLink></div>
			)}
		</nav>
	);
}

export default Navbar;
