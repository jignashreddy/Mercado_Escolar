import React, { useState, useEffect } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import ClubService from "../../services/ClubService";
import {NavLink} from "react-router-dom";

function AllClubs() {
    let club_path = global.config.url.web;
    var [loading, setLoading] = useState(false);
    var [datas, setDatas] = useState([]);

    var enableSpinner = () => {
        loading = true;
        setLoading(loading);
    }

    var disableSpinner = () => {
        loading = false;
        setLoading(loading);
    }

    useEffect(() => {
        enableSpinner();

        ClubService.all_clubs().then((res) => {
            datas = res.data.clubs ? res.data.clubs : [];
            datas.forEach((item, key) => {
                item.join_btn = <button type="button" key={key} className="my-edit-button" onClick={() => {joinClub(item.id)}}>Join</button>;
            });
            setDatas(datas);

            disableSpinner();
        })
        .catch((err) => {
            disableSpinner();
            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
            NotificationManager.error('Error message', err.response.data.message);
        })
    }, []);

    const joinClub = (id) =>{
        enableSpinner();

        ClubService.join_club(id).then((res) => {
            let index = datas.findIndex(row => row.id === id);
            datas.splice(index, 1);
            setDatas(datas);
            disableSpinner();
            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));

            NotificationManager.success('Success message', 'You have joined the club successfully.');
        })
        .catch((err) => {
            disableSpinner();
            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
            NotificationManager.error('Error message', err.response.data.message);
        })
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
                            <NavLink exact="true" to="/all-clubs" className="my-info-button-md">All Clubs</NavLink>
                            <NavLink exact="true" to="/joined-clubs" className="my-warning-button-md">Joined Clubs</NavLink>
                        </div>

                        <div className="products">
                            {datas.map(function(data, key){
                                return (
                                    <div className="product" key={key}>
                                        <img src={ club_path.slice(0, -1)+data.image } />
                                        <h6>{ data.name }</h6>
                                        <h5>1000 Member</h5>
                                        { data.join_btn }
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <NotificationContainer/>
            </div>
        </div>
    );
}

export default AllClubs;
