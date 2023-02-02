import React, { Component } from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import '../../../css/app.css';
import aboutus from '../../../Images/Home/aboutus.png';

class About extends Component {

    render() {
        return (
            <div className='myapp1'>
                <section className="row1">
                    <div className="sideborder1">
                        <div className="side1" style={{ width: '500px' }}>
                            <h1 style={{ fontSize: '30px' }}> <strong > MERCADO ESCOLAR </strong></h1><br />
                            <p className="my-3"> Shopping on our website is a breeze! We provide an easy to use, intuitive interface that allows you to browse and purchase items with ease. Our user-friendly navigation makes it simple for customers to find exactly what they’re looking for without any hassle. We also offer lightning fast shipping so your orders arrive quickly—and we guarantee the lowest prices on all of our products. Plus, our customer service team is always available to answer questions or address concerns with friendly professionalism. Shop with us today for a truly unbeatable shopping experience!</p>
                            <p>Developed by : <strong>YADUGURI JIGNASH REDDY, VODDULA SHRAVANI REDDY,THOKALA NEHA </strong></p>
                            <div className="box1" style={{ padding: '20px' }}>
                                {/* <div id="login1" onClick={}><a href="/contact">Contact Now </a></div> */}
                            <NavLink exact="true" to="/contact">Contact Now </NavLink>

                            </div>
                        </div>
                    </div>
                    <div className="main1">
                        <img src={aboutus} alt="banner" style={{ width: '100%', height: '100vh', float: 'right' }} />
                    </div>
                </section>
            </div>
        );
    }
}

export default About;
