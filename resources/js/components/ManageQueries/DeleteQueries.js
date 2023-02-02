import React, {Component, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import NavbarAdmin from '../layout/NavbarAdmin';
import {NotificationContainer, NotificationManager} from "react-notifications";
import QueryService from "../../services/QueryService";

function DeleteQueries () {
    const navigate = useNavigate();
    var [loading, setLoading] = useState(false);
    var [queryId, setQueryId] = useState('');
    var enableSpinner = () => {
        loading = true;
        setLoading(loading) ;
    }

    var disableSpinner = () => {
        loading = false;
        setLoading(loading) ;
    }
    const handleInputChange = e => {
        const { value } = e.target;
        setQueryId(value) ;
    };

    const deleteData = () =>{
        if(queryId !== '') {
            enableSpinner();
            if (confirm("Are you sure you want to delete this query?")) {
                QueryService.delete_query(queryId)
                    .then((res) => {
                        disableSpinner();
                        NotificationManager.success('Success', res.data.message);
                        navigate('/viewquerie');
                    })
                    .catch((err) => {
                        disableSpinner();
                        NotificationManager.error('Error message', err.response.data.message);
                    });
            }
        }else{
            NotificationManager.error('Error message', 'Please enter query id');
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
                    </div>
                    <div> <span className="solid3">
                    <div>
                            <h2 className="D2">search for Query ID you want to delete</h2>

                    </div>
                </span>
                        <div>

                            <input type="text"  placeholder="Query ID" name="Query_ID" required onChange={handleInputChange}/>
                        </div>
                        <div>
                            <button className="button4"  type={'button'}  onClick={() => deleteData()}>
                                Search and Delete </button>
                        </div>
                    </div>
                </div>

                <NotificationContainer/>
            </div>

            <NotificationContainer/>
        </div>
    );
}

export default DeleteQueries;
