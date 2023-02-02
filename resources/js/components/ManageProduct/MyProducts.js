import React, { useState, useEffect } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import ProductService from '../../services/ProductService';
import {NavLink} from "react-router-dom";

function MyProducts() {
    var [loading, setLoading] = useState(false);
    var [datas, setDatas] = useState([]);

    var enableSpinner = () => {
        loading = true;
        setLoading(loading) ;
    }

    var disableSpinner = () => {
        loading = false;
        setLoading(loading) ;
    }
    function load_products() {
        enableSpinner();
        ProductService.my_products()
            .then((res) => {
                let _data = res.data.products ? res.data.products: [];
                setDatas(_data);
                disableSpinner();
            })
            .catch((err) => {
                disableSpinner();
                NotificationManager.error('Error message', err.response.data.message);
            });
    }
    useEffect(() => {
        load_products();
    }, []);

    const deleteData = (id) =>{
        enableSpinner();
        if(confirm("Are you sure you want to delete this product?")) {
            ProductService.delete_product(id)
                .then((res) => {
                    disableSpinner();
                    NotificationManager.success('Success', res.data.message);
                    // window.location.reload();
                    load_products();
                })
                .catch((err) => {
                    disableSpinner();
                    NotificationManager.error('Error message', err.response.data.message);
                });
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
                        <div className="dash-home-nav">
                            <NavLink exact="true" to="/my-products" className={'my-info-button-md'}>My Products</NavLink>
                            <NavLink exact="true" to="/my-product-orders" className={'my-warning-button-md'}>My Orders</NavLink>
                        </div>
                        <NavLink exact="true" to="/add-product" className={'my-add-button'}>Add New Product</NavLink>

                        <table id="myTable">
                            <thead>
                                <tr>
                                    <th>image</th>
                                    <th>Product name</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {datas.map(function(data, i){
                                    return (
                                        <tr key={i}>
                                            <td>
                                                <img src={ data.image } width={90} height={90} />
                                            </td>
                                            <td>{ data.name }</td>
                                            <td>${ data.price }</td>
                                            <td>{ data.description }</td>
                                            <td>
                                                <NavLink exact="true" to={'/edit-product/'+data.id} className={'my-edit-button'}>Edit</NavLink>
                                                <button type={'button'} className="my-delete-button" onClick={() => deleteData(data.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <NotificationContainer/>

            </div>
        </div>
    );
}

export default MyProducts;
