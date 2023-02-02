import React, { Component } from 'react';
import NaviBar1 from '../layout/NaviBar1';
import payemnt from '../../../Images/secured payment-min.jpg';

class BusinessPage extends Component {
    render() {
        return (
            <div className='businessDashboard'>
                <NaviBar1 />
                <div className="main" style={{marginLeft:'239px'}}>
                    <div className="row justify-content-center" >
                        <h1>Business Page</h1>
                    </div>
                    <div className="row justify-content-start" >
                        <label>Payment modes</label>
                    </div>
                    <div className="row justify-content-start" >
                        <div className="col" >
                            <label>Security measures</label>
                        </div>
                        <div className="col" >
                            <label>Discounts</label>
                        </div>
                    </div>
                    <div className="row justify-content-start" >
                        <div className="col" >
                            <p className="text-black-50"> My business specializes in providing high-quality, eco-friendly products that are designed to make your life easier.<br/> We offer a range of items from kitchenware and home decor to cleaning supplies and pet accessories.<br/> Our products are made with sustainable materials and energy efficient production processes,<br/> so you can be sure that you're doing your part for the environment when you shop with us.<br/> We strive to provide excellent customer service and always aim to exceed expectations. </p>
                        </div>
                        <div className="col" >
                            <p className="text-black-50"> Our business is proud to offer discounts on our products! We understand that times can be tough and we want to make sure everyone has access to the quality items they need. Our product discounts are designed to help customers save money while still enjoying top-notch merchandise. Whether you're shopping for yourself or someone else, take advantage of our discount options today! </p>
                        </div>
                    </div>
                    <div className="row justify-content-start" >
                        <div className="col" >
                            <button className="btn btn-primary">See More </button>
                        </div>
                        <div className="col" >
                            <button className="btn btn-primary">See More</button>
                        </div>
                    </div>
                    <div className="row justify-content-start" >
                        <div className="col" >
                            <img src={payemnt} width={90} height={90}   style={{ maxHeight: "500px",maxWidth:"500px" }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BusinessPage;
