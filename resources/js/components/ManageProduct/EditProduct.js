import React, { useState, useEffect } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import ProductService from '../../services/ProductService';

function EditProduct(){
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
        "name": '',
        "price": '',
        "description": '',
        "image": '',
        "status": '',
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

    useEffect(() => {
        enableSpinner();
        ProductService.product_details(id).then((res) => {
            let product = res.data.product ? res.data.product : formdata;
            formdata.id = product.id;
            formdata.name = product.name;
            formdata.price = product.price;
            formdata.description = product.description;
            formdata.status = product.status;

            setFormData(formdata) ;

            disableSpinner();
        })
            .catch((err) => {
                disableSpinner();
                NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                NotificationManager.error('Error message', err.response.data.message);
            });
    }, []);

    const submitForm = (e) =>{
        e.preventDefault();

        if(formdata.name && formdata.price && formdata.description){
            enableSpinner();
            const fd = new FormData();

            fd.append('id', formdata.id);
            fd.append('name', formdata.name);
            fd.append('price', formdata.price);
            fd.append('description', formdata.description);
            fd.append('image', formdata.image);
            fd.append('_method', 'PUT');
            fd.append('status', formdata.status);

            ProductService.update_product(fd, formdata.id)
                .then((res) => {
                    disableSpinner();
                    NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                    NotificationManager.success('Success', res.data.message);
                    navigate('/my-products');
                })
                .catch((err) => {
                    disableSpinner();
                    NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                    NotificationManager.error('Error message', err.response.data.message);
                });
        }

        if(!formdata.name){
            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
            NotificationManager.error('Error message', 'Name can not be blank');
        }

        if(!formdata.price){
            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
            NotificationManager.error('Error message', 'Price can not be blank');
        }

        if(!formdata.description){
            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
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
                            <label htmlFor="name"><b>Name</b></label>
                            <input className="" type="text" name="name" defaultValue={formdata.name} required onChange={handleInputChange}/>

                            <label htmlFor="price"><b>Price</b></label>
                            <input className="" type="number" name="price" defaultValue={formdata.price} required onChange={handleInputChange}/>

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

export default EditProduct;
