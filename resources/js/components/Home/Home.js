import React from 'react';
import '../../../css/app.css';
import ecommerce from '../../../Images/Home/ecommerce.png';
import {NavLink} from "react-router-dom";

const Home = () => {

    return (
            <div className="myapp1">
                <div className="row1">
                    <div className="sideborder1">
                        <div className="side1" >
                            <h3>Grow Your Business and Connect with Others</h3>
                            <p>Join the Mercado Escolar community to connect with others, share your ideas, and grow your business. </p>
                            <div className="box1" style={{ padding: '20px' }}>
                                <div id="login1"><NavLink exact="true" to="/login">Join Now</NavLink></div>
                            </div>
                        </div>
                    </div>
                    <div className="main1">
                        <img src={ecommerce} alt="banner" style={{ width: '100%', height: '100vh', float: 'right' }} />
                    </div>
                </div>
            </div>
    );
}
export default Home;
