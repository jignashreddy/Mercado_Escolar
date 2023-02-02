import React, { useEffect, useState} from 'react';
import NavbarAdmin from '../layout/NavbarAdmin';
import QueryService from "../../services/QueryService";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {NavLink} from "react-router-dom";

function ViewQuerie() {
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

    useEffect(() => {
        enableSpinner();
        QueryService.queries()
            .then((res) => {
                let _data = res.data.queries ? res.data.queries : [];
                setDatas(_data);
                disableSpinner();
            })
            .catch((err) => {
                disableSpinner();
                NotificationManager.error('Error message', err.data.message);
            });
    }, []);

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
            <div className='admin'>
                <NavbarAdmin />
                <div className="mainadmin">

                    <div className="mainadmin">
                    <span className="D1">
                            <NavLink exact="true" to="/viewquerie" className="solid3"><h2 className="colourwhite">View Query</h2></NavLink>
                        </span>

                        <span className="D1">
                            <NavLink exact="true" to="/respondqueries" className="solid3"><h2 className="colourwhite">Respond TO Queries</h2></NavLink>
                        </span>

                        <span className="D1">
                            <NavLink exact="true" to="/deletequeries" className="solid3"><h2 className="colourwhite">Delete Query</h2></NavLink>
                        </span>
                        <h1 className="solidadmin">View Queries</h1>

                        <table id="customers">
                            <thead>
                            <tr>
                                <th>Query ID</th>
                                <th>Full Name</th>
                                <th>Phone number </th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Query</th>
                            </tr>
                            </thead>
                            <tbody>
                            {datas.map(function(data, i){
                                return (
                                    <tr key={i}>
                                        <td>{data.id}</td>
                                        <td>
                                            {data.name}
                                        </td>
                                        <td>{ data.phonenumber }</td>
                                        <td>{ data.email }</td>
                                        <td>{ data.address }</td>
                                        <td>{ data.querie }</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <NotificationContainer/>
        </div>
    );
}

export default ViewQuerie;
