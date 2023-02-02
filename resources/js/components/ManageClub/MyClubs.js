import React, { useState, useEffect } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import ClubService from "../../services/ClubService";
import {NavLink, useNavigate} from "react-router-dom";
function MyClubs() {
    const navigate = useNavigate();
    let club_path = global.config.url.web;
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
    function load_clubs() {
        enableSpinner();

        ClubService.my_clubs().then((res) => {
            datas = res.data.clubs ? res.data.clubs : [];
            datas.forEach((item) => {
                item.delete_btn = <button type="button" className="my-delete-button" onClick={() => {deleteData(item.id)}}>Delete</button>;
            });
            setDatas(datas);

            disableSpinner();
        })
            .catch((err) => {
                disableSpinner();
                NotificationManager.error('Error message', err.response.data.message);
            })
    }
    useEffect(() => {
        load_clubs();
    }, []);

    const deleteData = (id) =>{
        enableSpinner();
        if(confirm("Are you sure you want to delete this club?")){
            ClubService.delete_club(id).then((res) => {
                disableSpinner();
                NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                NotificationManager.success('Success message', res.data.message);
                // window.location.reload();
                load_clubs();
                navigate('/my-clubs');
            })
                .catch((err) => {
                    disableSpinner();
                    NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
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
                        <NavLink exact="true" to="/add-club" className="my-add-button">Add New Club</NavLink>
                        <table id="myTable">
                            <thead>
                                <tr>
                                    <th>Cover</th>
                                    <th>Club name</th>
                                    <th>Members</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.map(function(data, i){
                                    return (
                                        <tr key={i}>
                                            <td>
                                                <img src={ club_path.slice(0, -1)+data.image } width={90} height={90} />
                                            </td>
                                            <td>{ data.name }</td>
                                            <td>100</td>
                                            <td>{ data.description }</td>
                                            <td>
                                                <NavLink exact="true" to={'/edit-club/'+data.id} className="my-edit-button">Edit</NavLink>
                                                { data.delete_btn }
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

export default MyClubs;
