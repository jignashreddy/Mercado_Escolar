import React, {useEffect, useState} from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import AdvertisementService from "../../services/AdvertisementService";
import {NavLink} from "react-router-dom";

function MyAdvertisements() {
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
    function load_ads() {
        enableSpinner();
        AdvertisementService.my_advertisements()
            .then((res) => {
                let _data = res.data.advertisements ? res.data.advertisements : [];
                setDatas(_data);
                disableSpinner();
            })
            .catch((err) => {
                disableSpinner();
                NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                NotificationManager.error('Error message', err.data.message);
            });
    }
    useEffect(() => {
        load_ads();
    }, []);

    const deleteData = (id) =>{
        enableSpinner();
        if(confirm("Are you sure you want to delete this advertisement?")) {
            AdvertisementService.delete_advertisement(id)
                .then((res) => {
                    disableSpinner();
                    NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                    NotificationManager.success('Success', res.data.message);
                    // window.location.reload();
                    load_ads();
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
                        <NavLink exact="true" to="/add-advertisement" className={'my-add-button'}>Add New Advertisement</NavLink>

                        <table id="myTable">
                            <thead>
                            <tr>
                                <th>image</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                            </thead>

                            <tbody>
                            {datas.map(function(data, i){
                                return (
                                    <tr key={i}>
                                        <td>
                                            <img src={ data.image } width={90} height={90} alt={data.title}/>
                                        </td>
                                        <td>{ data.title }</td>
                                        <td>{ data.description }</td>
                                        <td>
                                            <NavLink exact="true" to={'/edit-advertisement/'+data.id} className={'my-edit-button'}>Edit</NavLink>
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

export default MyAdvertisements;
