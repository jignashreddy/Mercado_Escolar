import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import PostService from "../../services/PostService";

function EditPost(){
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("SmloggedInUser"));
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
        "status": '',
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
            default:
                console.log("invalid");
        }
        setFormData(formdata) ;
	};

    useEffect(() => {
        enableSpinner();

        PostService.post_details(id).then((res) => {
            let post = res.data.post ? res.data.post : formdata;

            formdata.id = post.id;
            formdata.title = post.title;
            formdata.description = post.description;
            formdata.status = post.status;

            setFormData(formdata) ;

            disableSpinner();
        })
            .catch((err) => {
                disableSpinner();
                NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                NotificationManager.error('Error message', err.response.data.message);
            })
    }, []);

    const submitForm = (e) =>{
        e.preventDefault();

        if(formdata.title && formdata.description){
            enableSpinner();
            const fd = new FormData();

            fd.append('id', formdata.id);
            fd.append('title', formdata.title);
            fd.append('description', formdata.description);
            fd.append('_method', 'PUT');
            fd.append('status', formdata.status);

            PostService.update_post(fd, id).then((res) => {
                NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                NotificationManager.error('Success message', res.data.message);
                if(user.user_type === 'Student')
                    navigate('/my-posts');
                else navigate('/manage-posts');
            })
                .catch((err) => {
                    disableSpinner();
                    NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                    NotificationManager.error('Error message', err.response.data.message);
                })
        }

        if(!formdata.title){
            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
            NotificationManager.error('Error message', 'Title can not be blank');
        }

        if(!formdata.description){
            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
            NotificationManager.error('Error message', 'Description can not be blank');
        }

        if(!formdata.status){
            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
            NotificationManager.error('Error message', 'Status can not be blank');
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
                            <input className="" type="text" name="title" defaultValue={formdata.title}  required onChange={handleInputChange}/>

                            <label htmlFor="description"><b>Description</b></label>
                            <textarea name="description" rows="5" defaultValue={formdata.description}  onChange={handleInputChange}></textarea>

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

export default EditPost;
