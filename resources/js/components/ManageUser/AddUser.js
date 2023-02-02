import React, { useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import UserService from '../../services/UserService';

function AddUser(){
    const { type } = useParams();
    let userType = '';
    switch(type){
        case "SchoolAdmin":
            userType = 'School Admin';
            break;
        case "BusinessOwner":
            userType = 'Business Owner';
            break;
        case "Admin":
            userType = 'Admin';
            break;
        default:
            userType = 'Student';
    }

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
        "user_type": userType,
        "password": '',
        'confirm_password': ''
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
            default:
                console.log("invalid");
        }
        setFormData(formdata) ;
	};

    const submitForm = (e) =>{
        e.preventDefault();

        const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validatedEmail = emailValidation.test(String(formdata.email_address).toLowerCase());

        if(formdata.first_name && formdata.last_name && formdata.email_address && validatedEmail
            && formdata.password && formdata.confirm_password && formdata.password === formdata.confirm_password){
            enableSpinner();

            const fd = new FormData();

            fd.append('first_name', formdata.first_name);
            fd.append('last_name', formdata.last_name);
            fd.append('email_address', formdata.email_address);
            fd.append('password', formdata.password);
            fd.append('confirm_password', formdata.confirm_password);
            fd.append('user_type', formdata.user_type);
            UserService.add_user(fd).then((res) => {
                disableSpinner();
                NotificationManager.success('Success message', 'User added successfully');
                switch(type){
                    case "SchoolAdmin":
                        navigate('/manage-school-admins');
                        break;
                    case "BusinessOwner":
                        navigate('/manage-business-owners');
                        break;
                    case "Admin":
                        navigate('/manage-school-admins');
                        break;
                    default:
                        navigate('/manage-students');
                }
            })
                .catch((err) => {
                    disableSpinner();
                    NotificationManager.error('Error message', err.response.data.message);
                })
        }

        if(!formdata.first_name){
            NotificationManager.error('Error message', 'First name can not be blank');
        }

        if(!formdata.last_name){
            NotificationManager.error('Error message', 'First name can not be blank');
        }

        if(!formdata.email_address){
            NotificationManager.error('Error message', 'Email address can not be blank');
        }else{
            if(!validatedEmail){
                NotificationManager.error('Error message', 'Please enter a validate email address');
            }
        }

        if(!formdata.password){
            NotificationManager.error('Error message', 'Password can not be blank');
        }else{
            if(formdata.password.length < 6){
                NotificationManager.error('Error message', 'Password should contain minimum 6 characters');
            }
        }

        if(!formdata.confirm_password){
            NotificationManager.error('Error message', 'Confirm Password can not be blank');
        }else{
            if(formdata.confirm_password.length < 6){
                NotificationManager.error('Error message', 'Confirm Password should contain minimum 6 characters');
            }
        }

        if(formdata.password !== formdata.confirm_password){
            NotificationManager.error('Error message', 'Password and Confirm Password should be same');
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
            <div className='studentDashboard'>

                <SideNav />

                <div className="main3">
                    <div className="main4">
                    <form className="my-form" onSubmit={submitForm}>
                        <div className="container1">
                            <label htmlFor="first_name"><b>First Name</b></label>
                            <input className="" type="text" name="first_name" required onChange={handleInputChange}/>

                            <label htmlFor="last_name"><b>Last Name</b></label>
                            <input className="" type="text" name="last_name" required onChange={handleInputChange}/>

                            <label htmlFor="email_address"><b>Email Address</b></label>
                            <input className="" type="text" name="email_address" required onChange={handleInputChange}/>

                            <label htmlFor="password"><b>Password</b></label>
                            <input className="" type="password" name="password" required onChange={handleInputChange}/>

                            <label htmlFor="confirm_password"><b>Confirm Password</b></label>
                            <input className="" type="password" name="confirm_password" required onChange={handleInputChange}/>

                            <button className="my-submit-button" type="button" onClick={submitForm}>Create</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>

            <NotificationContainer/>

        </div>
    );
}

export default AddUser;
