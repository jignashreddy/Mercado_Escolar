import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import AdvertisementService from "../../services/AdvertisementService";

function AddAdvertisement(){
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("SmloggedInUser"));

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
        "created_by": user.id,
        "title": '',
        "description": '',
        "image": '',
        "status": 'Active',
    });

    const handleInputChange = e => {
		const { name, value } = e.target;
        switch(name){
            case "title":
                formdata.title = value;
                break;
            case "description":
                formdata.description = value;
                break;
            case "image":
                formdata.image = e.target.files[0];
                break;
            default:
                console.log("invalid");
        }
        setFormData(formdata) ;
	};

    const submitForm = (e) =>{
        e.preventDefault();

        if(formdata.title && formdata.description && formdata.image){
            enableSpinner();
            const fd = new FormData();

            fd.append('created_by', formdata.created_by);
            fd.append('title', formdata.title);
            fd.append('description', formdata.description);
            fd.append('image', formdata.image);
            fd.append('status', formdata.status);

            AdvertisementService.add_advertisement(fd).then((res) => {
                disableSpinner();
                NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                NotificationManager.success('Success message', 'Advertisement created successfully');
                navigate('/my-advertisements');
            })
                .catch((err) => {
                    disableSpinner();
                    NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                    NotificationManager.error('Error message', err.response.data.message);
                });
        }

        if(!formdata.title){
            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
            NotificationManager.error('Error message', 'Title can not be blank');
        }

        if(!formdata.description){
            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
            NotificationManager.error('Error message', 'Description can not be blank');
        }

        if(!formdata.image){
            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
            NotificationManager.error('Error message', 'Image can not be blank');
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
                            <label htmlFor="title"><b>Title</b></label>
                            <input className="" type="text" name="title" required onChange={handleInputChange}/>

                            <label htmlFor="description"><b>Description</b></label>
                            <textarea name="description" rows="3" onChange={handleInputChange}></textarea>

                            <label htmlFor="image"><b>Image</b></label>
                            <input className="" type="file" name="image" required onChange={handleInputChange}/>

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

export default AddAdvertisement;
