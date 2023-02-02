import React, { useState } from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import AuthService from "../../services/AuthService";

function LogIn(){
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

    var error = '';
    var [formdata, setFormData] = useState({
        "email_address": '',
        "password": ''
    });

    const handleInputChange = e => {
		const { name, value } = e.target;
        switch(name){
            case "email_address":
                formdata.email_address = value;
                break;
            case "password":
                formdata.password = value;
                break;
            default:
                console.log("invalid");
        }
        setFormData(formdata) ;
	};

    const submitLoginForm = (e) =>{
        e.preventDefault();

        const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validatedEmail = emailValidation.test(String(formdata.email_address).toLowerCase());

        if(formdata.email_address && validatedEmail && formdata.password){
            enableSpinner();
            const fd = new FormData();

            fd.append('email_address', formdata.email_address);
            fd.append('password', formdata.password);

            AuthService.login(fd).then((res) => {
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
                }else if(res.data.user.user_type === 'Student'){
                    navigate('/studentdashboard');
                }else{
                    navigate('/', { replace: true });
                }
            })
                .catch((err) => {
                    disableSpinner();
                    NotificationManager.error('Error message', err.response.data.message);
                })
        }
        error = '';

        if(!formdata.email_address){
            error = "Email address can not be blank";
            NotificationManager.error('Error message', 'Email address can not be blank');
        }else{
            if(!validatedEmail){
                NotificationManager.error('Error message', 'Please enter a validate email address');
            }
        }

        if(!formdata.password){
            error = "Password can not be blank";
            NotificationManager.error('Error message', 'Password can not be blank');
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
                    <form className="lrform1" onSubmit={submitLoginForm}>
                        <div className="container1">
                            <label htmlFor="email_address"><b>Email Address</b></label>
                            <input className="input1" type="email" placeholder="Enter Email" name="email_address" required onChange={handleInputChange}/>

                            <label htmlFor="password"><b>Password</b></label>
                            <input className="input1" type="password" placeholder="Enter Password" name="password" required onChange={handleInputChange}/>

                            <button className="register_btn1" type="button" onClick={submitLoginForm}>Login</button>
                        </div>
                        <div className="container2">
                            <NavLink exact="true" to="/register">Register</NavLink>
                            <NavLink exact="true" to="/forgotpassword" >Forgot password?</NavLink>
                        </div>
                    </form>
                </div>
            </div>

            <NotificationContainer/>

        </div>
    );
}

export default LogIn;
