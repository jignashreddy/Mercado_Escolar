import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import ProductService from '../../services/ProductService';

function AddProduct(){
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
        "name": '',
        "price": '',
        "description": '',
        "image": '',
        "status": 'Active',
    });

    const handleInputChange = e => {
		const { name, value } = e.target;
        switch(name){
            case "name":
                formdata.name = value;
                break;
            case "price":
                formdata.price = value;
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

        if(formdata.name && formdata.price && formdata.description && formdata.image){
            enableSpinner();
            const fd = new FormData();

            fd.append('created_by', formdata.created_by);
            fd.append('name', formdata.name);
            fd.append('price', formdata.price);
            fd.append('description', formdata.description);
            fd.append('image', formdata.image);
            fd.append('status', formdata.status);
            ProductService.add_product(fd).then((res) => {
                disableSpinner();
                NotificationManager.error('Success message', 'product created successfully');
                navigate('/my-products');
            })
                .catch((err) => {
                    disableSpinner();
                    NotificationManager.error('Error message', err.response.data.message);
                });
        }

        if(!formdata.name){
            NotificationManager.error('Error message', 'Name can not be blank');
        }
        
        if(!formdata.price){
            NotificationManager.error('Error message', 'Price can not be blank');
        }
        
        if(!formdata.description){
            NotificationManager.error('Error message', 'Description can not be blank');
        }
        
        if(!formdata.image){
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
                            <label htmlFor="name"><b>Name</b></label>
                            <input className="" type="text" name="name" required onChange={handleInputChange}/>
                            
                            <label htmlFor="price"><b>Price</b></label>
                            <input className="" type="number" name="price" required onChange={handleInputChange}/>
                            
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
 
export default AddProduct;
