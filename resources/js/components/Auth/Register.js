import React, { useState } from "react";
import {NavLink, useNavigate} from "react-router-dom";

NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from "axios";
import authHeader from "../../helper/auth-header";
import AuthService from "../../services/AuthService";

function Register(){
    const app_url = global.config.url.web;
    const navigate = useNavigate();

    var [loading, setLoading] = useState(false);

    var enableSpinner = () => {
        loading = true;
        setLoading(loading) ;
    }

    var disableSpinner = () => {
        loading = false;
        setLoading(loading) ;
    }

    var [formdata, setFormData] = useState({
        "first_name": '',
        "last_name": '',
        "email_address": '',
        "password": '',
        "confirm_password": '',
        "user_type": 'Student',
    });

    const handleInputChange = e => {
		const { name, value } = e.target;
        switch(name){
            case "first_name":
                formdata.first_name = value;
                break;
            case "last_name":
                formdata.last_name = value;
                break;
            case "email_address":
                formdata.email_address = value;
                break;
            case "password":
                formdata.password = value;
                break;
            case "confirm_password":
                formdata.confirm_password = value;
                break;
            case "user_type":
                formdata.user_type = value;
                break;
            default:
                console.log("invalid");
        }
        setFormData(formdata) ;
	};

    const submitRegisterForm = (e) =>{
        e.preventDefault();

        const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validatedEmail = emailValidation.test(String(formdata.email_address).toLowerCase());

        if(formdata.first_name && formdata.last_name && formdata.email_address && validatedEmail && formdata.password &&
            formdata.password.length >= 6 && formdata.password === formdata.confirm_password){
            enableSpinner();

            const fd = new FormData();
            fd.append('first_name', formdata.first_name);
            fd.append('last_name', formdata.last_name);
            fd.append('email_address', formdata.email_address);
            fd.append('password', formdata.password);
            fd.append('confirm_password', formdata.confirm_password);
            fd.append('user_type', formdata.user_type);

            AuthService.Register(fd ).then((res) => {
                localStorage.setItem('SmaccessToken', res.data.accessToken);
                localStorage.setItem('SmloggedInUser',JSON.stringify(res.data.user));
                localStorage.setItem('first_login','true');
                disableSpinner();
                if(res.data.user.user_type === 'Business Owner'){
                    navigate('/businessdashboard');
                }else if(res.data.user.user_type === 'School Admin'){
                    navigate('/school-admin-dashboard');
                }else if(res.data.user.user_type === 'Super Admin'){
                    navigate('/super-admin-dashboard');
                }else{
                    navigate('/studentdashboard');
                }

                window.location.reload();
            })
                .catch((err) => {
                    disableSpinner();

                    NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                    NotificationManager.error('Error message', err.response.data.message);
                })
        }

        if(!formdata.first_name){

            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
            NotificationManager.error('Error message', 'First name can not be blank');
        }

        if(!formdata.last_name){
            NotificationManager.error('Error message', 'First name can not be blank');
        }

        if(!formdata.email_address){

            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
            NotificationManager.error('Error message', 'Email address can not be blank');
        }else{
            if(!validatedEmail){

                NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                NotificationManager.error('Error message', 'Please enter a validate email address');
            }
        }

        if(!formdata.password){

            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
            NotificationManager.error('Error message', 'Password can not be blank');
        }else{
            if(formdata.password.length < 6){

                NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                NotificationManager.error('Error message', 'Password should contain minimum 6 characters');
            }
        }

        if(formdata.password !== formdata.confirm_password){

            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
            NotificationManager.error('Error message', 'The password and confirmation password do not match');
        }
    }

    return (
        <div>
            {loading ? (
                <div id="overlay">
                    <div className="cv-spinner">
                        <span className="spinner"></span>
                    </div>
                </div>
            ) : (
                <span></span>
            )}
            <div className='myapp1'>
                <div className="container1" >
                    <form className="lrform1" onSubmit={submitRegisterForm}>
                        <div className="container1">
                            <label htmlFor="first_name"><b>First name</b></label>
                            <input className="input1" type="text" placeholder="Enter First Name" name="first_name" required onChange={handleInputChange} />

                            <label htmlFor="last_name"><b>Last name</b></label>
                            <input className="input1" type="text" placeholder="Enter Last Name" name="last_name" required onChange={handleInputChange} />

                            <label htmlFor="email_address"><b>Email Address</b></label>
                            <input className="input1" type="email" placeholder="Enter email" name="email_address" required onChange={handleInputChange} />

                            <label htmlFor="password"><b>Password</b></label>
                            <input className="input1" type="password" placeholder="Enter Password" name="password" required onChange={handleInputChange} />

                            <label htmlFor="confirm_password"><b>Confirm Password</b></label>
                            <input className="input1" type="password" placeholder="Enter Password" name="confirm_password" required onChange={handleInputChange} />

                            <label htmlFor="user_type"><b>User Type</b></label>
                            <select className="input1" name="user_type" required onChange={handleInputChange}>
                                <option value="Student">Student</option>
                                <option value="Business Owner">Business Owner</option>
                            </select>

                            <button className="register_btn2" type="button" onClick={submitRegisterForm}>Sign Up</button>

                            <div className="container2">
                                <NavLink exact="true" to="/login">Login</NavLink>
                                <NavLink exact="true" to="/forgotpassword" >Forgot password?</NavLink>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <NotificationContainer/>

        </div>
    );
}

export default Register;
