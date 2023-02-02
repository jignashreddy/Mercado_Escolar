import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import AdvertisementService from "../../services/AdvertisementService";

function EditAdvertisement(){
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
        "title": '',
        "description": '',
        "image": '',
        "status": '',
        '_method': 'PUT'
    });

    useEffect(() => {
        enableSpinner();
        AdvertisementService.advertisement_details(id).then((res) => {
            let advertisement = res.data.advertisement ? res.data.advertisement : formdata;
            formdata.id = advertisement.id;
            formdata.title = advertisement.title;
            formdata.description = advertisement.description;
            formdata.status = advertisement.status;
            formdata.image = advertisement.image;
            disableSpinner();
        }).catch((err) => {
            disableSpinner();
            NotificationManager.error(err.response.data.message);
        });
    }, []);

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

        if(formdata.title && formdata.description){
            enableSpinner();
            AdvertisementService.update_advertisement(formdata, id)
                .then((res) => {
                    disableSpinner();
                    NotificationManager.success('Success', res.data.message);
                    navigate('/my-advertisements');
                })
                .catch((err) => {
                    disableSpinner();
                    NotificationManager.error('Error message', err.response.data.message);
                });
        }

        if(!formdata.title){
            NotificationManager.error('Error message', 'Title can not be blank');
        }

        if(!formdata.description){
            NotificationManager.error('Error message', 'Description can not be blank');
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
                            <input className="" type="text" name="title" defaultValue={formdata.title} required onChange={handleInputChange}/>

                            <label htmlFor="description"><b>Description</b></label>
                            <textarea name="description" rows="3" defaultValue={formdata.description} onChange={handleInputChange}></textarea>

                            <label htmlFor="image"><b>Image</b></label>
                            <input className="" type="file" name="image" onChange={handleInputChange}/>

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

export default EditAdvertisement;
