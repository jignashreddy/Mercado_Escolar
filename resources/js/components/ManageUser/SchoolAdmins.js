import React, {useEffect, useState} from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import UserService from '../../services/UserService';
import {NavLink} from "react-router-dom";

function SchoolAdmins() {
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
    function load_school_admins() {
        enableSpinner();
        const fd = new FormData();

        fd.append('user_type', 'School Admin');

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
        load_school_admins();
    }, []);

    const deleteData = (id) =>{
        enableSpinner();
        if(confirm("Are you sure you want to delete this user?")){
            UserService.delete_user(id).then((res) => {
                disableSpinner();
                NotificationManager.success('Success message', res.data.message);
                // window.location.reload();
                load_school_admins();
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
                        <NavLink exact="true" to="/add-user/SchoolAdmin" className="my-add-button">Add New School Admin</NavLink>

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

export default SchoolAdmins;
