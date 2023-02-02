import React, { Component } from 'react';
import NavbarAdmin from '../layout/NavbarAdmin';
import {NavLink} from "react-router-dom";

class ManageQueries extends Component {
    render() {
        return (
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
                </div>
            </div>
        );
    }
}

export default ManageQueries;
