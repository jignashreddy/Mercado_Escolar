import React, { useState, useEffect } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import ClubService from "../../services/ClubService";
import {NavLink} from "react-router-dom";

function JoinedClubs() {
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
        ClubService.joined_clubs().then((res) => {
            datas = res.data.clubs ? res.data.clubs : [];
            datas.forEach((item) => {
                item.leave_btn = <button type="button" className="my-delete-button" onClick={() => {leaveClub(item.join_id)}}>Leave</button>;
            });
            setDatas(datas);

            disableSpinner();
        })
        .catch((err) => {
            disableSpinner();
            NotificationManager.error('Error message', err.response.data.message);
        })
    }, []);

    const leaveClub = (id) =>{
        enableSpinner();

        ClubService.leave_club(id).then((res) => {
            let index = datas.findIndex(row => row.id === id);
			datas.splice(index, 1);
            setDatas(datas);

            disableSpinner();

            NotificationManager.success('Success message', res.data.message);
        })
        .catch((err) => {
            disableSpinner();
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
                            <NavLink exact="true" to="/all-clubs" className="my-add-button">All Clubs</NavLink>
                            <NavLink exact="true" to="/joined-clubs" className="my-warning-button-md">Joined Clubs</NavLink>
                        </div>

                        <div className="products">
                            {datas.map(function(data, i){
                                return (
                                    <div className="product">
                                        <img src={ club_path.slice(0, -1)+data.image } height={200} width={200}/>
                                        <h6>{ data.name }</h6>
                                        <h5>1000 Member</h5>
                                        { data.leave_btn }
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

export default JoinedClubs;
