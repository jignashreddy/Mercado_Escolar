import React, { useState, useEffect } from "react";
import {NavLink, useNavigate} from "react-router-dom";

function NavbarAdmin() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("SmloggedInUser"));
        if(user){
            if(user.user_type === "Super Admin"){
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
            <label><NavLink exact="true" to="/super-admin-dashboard">Dashboard</NavLink></label>
            <label><NavLink exact="true" to="/manage-school-admins">School Admins</NavLink></label>
            <label><NavLink exact="true" to="/manage-students">Students</NavLink></label>
            <label><NavLink exact="true" to="/manage-business-owners">Business Owners</NavLink></label>
            <label><NavLink exact="true" to="/manage-clubs">Clubs</NavLink></label>
            <label><NavLink exact="true" to="/manage-posts">Posts</NavLink></label>
            <label><NavLink exact="true" to="/managequeries">Queries</NavLink></label>
            <label><NavLink exact="true" to="/reports">Reports</NavLink></label>
            <label><p onClick={logOut}>Log Out</p></label>
        </div>
    );
}

export default NavbarAdmin;
