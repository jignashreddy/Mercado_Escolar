import React, {useEffect, useState} from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import OrderService from "../../services/OrderService";
import {NavLink} from "react-router-dom";

function StudentOrders() {
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
    function load_orders2() {
        enableSpinner();
        OrderService.my_orders()
            .then((res) => {
                let _data = res.data.orders ? res.data.orders: [];
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
        load_orders2();
    }, []);

    const cancelOrder = (id) =>{
        enableSpinner();
        if(confirm("Are you sure you want to cancel this order?")) {
            enableSpinner();

            const fd = new FormData();
            fd.append('status', 'Canceled');
            OrderService.change_order_status(fd, id).then((res) => {
                disableSpinner();
                NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                NotificationManager.success('Success', res.data.message);
                // window.location.reload();
                load_orders2();
            })
                .catch((err) => {
                    disableSpinner();
                    NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
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
                            <NavLink exact="true" to="/studentorders" className={'my-info-button-md'}>My Current Orders</NavLink>
                            <NavLink exact="true" to="/my-past-orders" className={'my-warning-button-md'}>My Order History</NavLink>
                        </div>

                        <table id="myTable">
                            <thead>
                                <tr>
                                    <th>OrderId</th>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                            {datas.map(function(data, i){
                                return (
                                    <tr key={i}>
                                        <td>#{ data.id }</td>
                                        <td>
                                            <img src={ data.image } width={90} height={90} />
                                        </td>
                                        <td>{ data.name }</td>
                                        <td>${ data.price }</td>
                                        <td>{ data.status }</td>
                                        <td>
                                            { data.status === 'Pending' ? (
                                            <button  type={'button'} className="my-delete-button" onClick={() => cancelOrder(data.id)}>Cancel</button>
                                           ) : (
                                                <span></span>
                                            )}
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

export default StudentOrders;
