import React, {useEffect, useState} from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import UserService from '../../services/UserService';
import {NavLink} from "react-router-dom";

function BusinessOwners() {
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
    function load_business_owners() {
        enableSpinner();
        const fd = new FormData();

        fd.append('user_type', 'Business Owner');

        UserService.users_by_type(fd).then((res) => {
            datas = res.data.users ? res.data.users : [];
            setDatas(datas);

            disableSpinner();
        })
            .catch((err) => {
                disableSpinner();
                NotificationManager.error('Error message', err.response.data.message);
            })
    }
    useEffect(() => {
        load_business_owners();
    }, []);

    const deleteData = (id) =>{
        enableSpinner();
        if(confirm("Are you sure you want to delete this user?")){
            UserService.delete_user(id).then((res) => {
                disableSpinner();
                NotificationManager.success('Success message', res.data.message);
                // window.location.reload();
                load_business_owners();
            })
                .catch((err) => {
                    disableSpinner();
                    NotificationManager.error('Error message', err.response.data.message);
                })
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
                        <NavLink exact="true" to="/add-user/BusinessOwner" className="my-add-button">Add New Business Owner</NavLink>
                        <table id="myTable">
                            <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Address</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {datas.map(function(data, i){
                                return (
                                    <tr key={i}>
                                        <td>{ data.first_name }</td>
                                        <td>{ data.last_name }</td>
                                        <td>{ data.email_address }</td>
                                        <td>
                                            <NavLink exact="true" to={'/edit-user/'+data.id} className="my-edit-button">Edit</NavLink>
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

export default BusinessOwners;
