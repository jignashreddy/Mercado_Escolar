import React, {useEffect, useState} from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import ProductService from "../../services/ProductService";
import {NavLink} from "react-router-dom";

function MyProducts() {
    let web_url = global.config.url.web;
    let product_path = web_url
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
    function load_orders() {
        enableSpinner();
        ProductService.my_store_orders()
        .then((res) => {
            let _data = res.data.orders;
            setDatas(_data);
            disableSpinner();
        })
        .catch((err) => {
            disableSpinner();
            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
            NotificationManager.error('Error message', err.response.data.message);
        });
    }
    useEffect(() => {
        load_orders();
    }, []);

    const handleInputChange = e => {
        const {name, value} = e.target;
        enableSpinner();

        const fd = new FormData();
        fd.append('status', value);
        fd.append('_method', 'PUT');
        ProductService.change_order_status(fd, name).then((res) => {
            disableSpinner();
            NotificationManager.success('Success', res.data.message);
            // window.location.reload();
            load_orders();
        })
        .catch((err) => {
            disableSpinner();
            NotificationManager.error('Error message', err.response.data.message);
        });
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

                        <table id="myTable">
                            <thead>
                                <tr>
                                    <th>OrderId</th>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Total</th>
                                    <th>Customer Name</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {datas.map(function(data, i){
                                return (
                                    <tr key={i}>
                                        <td>{data.id}</td>
                                        <td>
                                            <img src={ product_path.slice(0, -1)+data.image } width={90} height={90} />
                                        </td>
                                        <td>{ data.name }</td>
                                        <td>${ data.price }</td>
                                        <td>{ data.user_id }</td>
                                        <td>{ data.status }</td>
                                        <td>
                                            <select className="input1" name={data.id} defaultValue={data.status} required onChange={handleInputChange}>
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
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
