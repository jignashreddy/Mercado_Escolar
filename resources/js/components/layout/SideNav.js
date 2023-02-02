import React, { useState, useEffect } from "react";
import {NavLink, useNavigate} from "react-router-dom";

function NaviBar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("SmloggedInUser"));

    useEffect(() => {
        if(user){
            const first_login = localStorage.getItem("first_login");
            if(first_login === 'true'){
                localStorage.setItem('first_login','false');
                window.location.reload();
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
            {user.user_type === "Student" ? (
                <div className="leftnav">
                    <div className="logo">
                        <a href={global.config.url.web}>Mercado Escolar</a>
                    </div>
                    <label><NavLink exact="true" to="/studentdashboard">Dashboard</NavLink></label>
                    <label><NavLink exact="true" to="/all-products">All Products</NavLink></label>
                    <label><NavLink exact="true" to="/my-products">My Products</NavLink></label>
                    <label><NavLink exact="true" to="/my-clubs">My Clubs</NavLink></label>
                    <label><NavLink exact="true" to="/all-clubs">Clubs</NavLink></label>
                    <label><NavLink exact="true" to="/studentorders">Orders</NavLink></label>
                    <label><NavLink exact="true" to="/my-posts">My Posts</NavLink></label>
                    <label><NavLink exact="true" to="/profile">Profile</NavLink></label>
                    <label><NavLink exact="true" to="/businesschats/student">Chats</NavLink></label>
                    <label><p onClick={logOut}>Log Out</p></label>
                </div>
            ) : user.user_type === "Business Owner" ? (
                <div className="leftnav">
                    <div className="logo">
                        <a href="./">Mercado Escolar</a>
                    </div>
                    <label><NavLink exact="true" to="/businessdashboard">Dashboard</NavLink></label>
                    <label><NavLink exact="true" to="/my-products">Products</NavLink></label>
                    <label><NavLink exact="true" to="/businesspage">Business Page</NavLink></label>
                    <label><NavLink exact="true" to="/my-advertisements">Advertisements</NavLink></label>
                    <label><NavLink exact="true" to="/businesschats/student">Chats</NavLink></label>
                    <label><NavLink exact="true" to="/profile">Profile</NavLink></label>
                    <label><p onClick={logOut}>Log Out</p></label>
                </div>
            ) : user.user_type === "School Admin" ? (
                <div className="leftnav">
                    <div className="logo">
                        <a href="./">Mercado Escolar</a>
                    </div>
                    <label><NavLink exact="true" to="/school-admin-dashboard">Dashboard</NavLink></label>
                    <label><NavLink exact="true" to="/manage-students">Students</NavLink></label>
                    <label><NavLink exact="true" to="/manage-business-owners">Business Owners</NavLink></label>
                    <label><NavLink exact="true" to="/manage-clubs">Clubs</NavLink></label>
                    <label><NavLink exact="true" to="/manage-posts">Posts</NavLink></label>
                    <label><NavLink exact="true" to="/reports">Reports</NavLink></label>
                    <label><p onClick={logOut}>Log Out</p></label>
                </div>
            ) : (
                <div className="leftnav">
                    <div className="logo">
                        <a href="./">Mercado Escolar</a>
                    </div>
                    <label><NavLink exact="true" to="/super-admin-dashboard">Dashboard</NavLink></label>
                    <label><NavLink exact="true" to="/manage-school-admins">School Admin</NavLink></label>
                    <label><NavLink exact="true" to="/manage-students">Students</NavLink></label>
                    <label><NavLink exact="true" to="/manage-business-owners">Business Owners</NavLink></label>
                    <label><NavLink exact="true" to="/manage-clubs">Clubs</NavLink></label>
                    <label><NavLink exact="true" to="/manage-posts">Posts</NavLink></label>
                    <label><NavLink exact="true" to="/managequeries">Queries</NavLink></label>
                    <label><NavLink exact="true" to="/reports">Reports</NavLink></label>
                    <label><p onClick={logOut}>Log Out</p></label>
                </div>
            )}
        </div>
    );
}

export default NaviBar;
