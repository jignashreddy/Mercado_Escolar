import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import PostService from "../../services/PostService";

function AddPost(){
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
            default:
                console.log("invalid");
        }
        setFormData(formdata) ;
	};

    const submitForm = (e) =>{
        e.preventDefault();

        if(formdata.title && formdata.description){
            enableSpinner();
            const fd = new FormData();

            fd.append('created_by', formdata.created_by);
            fd.append('title', formdata.title);
            fd.append('description', formdata.description);
            fd.append('status', formdata.status);

            PostService.add_post(fd).then((res) => {
                NotificationManager.error('Success message', 'Post added successfully');
                if(user.user_type === 'Student')
                    navigate('/my-posts');
                else navigate('/manage-posts');
            })
                .catch((err) => {
                    disableSpinner();
                    NotificationManager.error('Error message', err.response.data.message);
                })
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
                            <input className="" type="text" name="title" required onChange={handleInputChange}/>

                            <label htmlFor="description"><b>Description</b></label>
                            <textarea name="description" rows="5" onChange={handleInputChange}></textarea>

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
 
export default AddPost;
