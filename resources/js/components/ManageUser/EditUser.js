import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import UserService from '../../services/UserService';

function EditUser(){
    const { id } = useParams();
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
        "id": '',
        "first_name": '',
        "last_name": '',
        "email_address": '',
    });

    useEffect(() => {
        enableSpinner();

        UserService.user_details(id).then((res) => {
            let user = res.data.user ? res.data.user : formdata;

            formdata.id = user.id;
            formdata.first_name = user.first_name;
            formdata.last_name = user.last_name;
            formdata.email_address = user.email_address;

            setFormData(formdata) ;

            disableSpinner();
        })
            .catch((err) => {
                disableSpinner();
                NotificationManager.error('Error message', err.response.data.message);
            })
    }, []);

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
            default:
                console.log("invalid");
        }
        setFormData(formdata) ;
	};

    const submitForm = (e) =>{
        e.preventDefault();

        const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validatedEmail = emailValidation.test(String(formdata.email_address).toLowerCase());

        if(formdata.first_name && formdata.last_name && formdata.email_address){
            enableSpinner();
            const fd = new FormData();

            fd.append('first_name', formdata.first_name);
            fd.append('last_name', formdata.last_name);
            fd.append('email_address', formdata.email_address);
            fd.append('_method', 'PUT');
            UserService.update_user(fd, id).then((res) => {
                disableSpinner();
                NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                NotificationManager.success('Success message', 'User updated successfully');
                switch(type) {
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
                    NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                    NotificationManager.error('Error message', err.response.data.message);
                })
        }

        if(!formdata.first_name){
            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
            NotificationManager.error('Error message', 'First name can not be blank');
        }

        if(!formdata.last_name){
            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
            NotificationManager.error('Error message', 'Last name can not be blank');
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
                            <input className="" type="text" name="first_name" defaultValue={formdata.first_name} required onChange={handleInputChange}/>

                            <label htmlFor="last_name"><b>Last Name</b></label>
                            <input className="" type="text" name="last_name" defaultValue={formdata.last_name} required onChange={handleInputChange}/>

                            <label htmlFor="email_address"><b>Email Address</b></label>
                            <input className="" type="text" name="email_address" defaultValue={formdata.email_address} readOnly onChange={handleInputChange}/>

                            <button className="my-submit-button" type="button" onClick={submitForm}>Update</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>

            <NotificationContainer/>

        </div>
    );
}

export default EditUser;
