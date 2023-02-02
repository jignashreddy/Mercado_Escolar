import React, { Component } from 'react';
import club from '../../../Images/Home/club.webp';
import books from '../../../Images/Home/books.jpg';
import excahnge from '../../../Images/excahnge.png';
import './Service.css';

class Service extends Component {
    render() {
        return (
            <div className='myapp1'>
                <h1 className="text-center" style={{textAlign:'center!important'}}> Our Services </h1>

                <div className="row">
                    <div className="col-10 mx-auto">
                        <div className="row gy-4">
                            <div className="col-md-4 col-10 mx-auto cardp">
                                <div className="card"><img src={excahnge} className="card-img-top"
                                    alt="Service-card-img" />
                                    <div className="card-body">
                                        <h5 className="card-title font-weight-bold"> Information Exchange </h5>
                                        <p className="card-text">information exchange typically involves users submitting various types of content such as posts, comments, images, videos, audio files and more. This type of interaction allows for the rapid sharing and dissemination of information among members in an efficient manner. Additionally, it enables both parties to receive feedback from one another regarding their shared content or opinions on topics discussed within the website's community.</p><a aria-current="page" className="btn btn-primary active"
                                                href="/service">Go</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-10 mx-auto cardp" >
                                <div className="card"><img src={club} className="card-img-top"
                                    alt="Service-card-img" />
                                    <div className="card-body">
                                        <h5 className="card-title font-weight-bold"> Checkout the Clubs </h5>
                                        <p className="card-text">Clubs are a great way to get involved in your community and meet new people who share similar interests. From sports teams to book clubs, there is something for everyone! Joining a club can be an incredibly rewarding experience - you'll make lifelong friends, gain valuable skills, and have lots of fun along the way. Whether you're looking for an opportunity to learn something new or just want to socialize with like-minded individuals, joining a club is sure to provide plenty of excitement. So don't wait any longer - explore all the amazing clubs available on our website today!</p><a aria-current="page" className="btn btn-primary active"
                                                href="/service">Go</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-10 mx-auto cardp">
                                <div className="card"><img src={books} className="card-img-top"
                                    alt="Service-card-img" />
                                    <div className="card-body">
                                        <h5 className="card-title font-weight-bold"> Trade Books </h5>
                                        <p className="card-text">This website offers a wide selection of trading products for all your needs. Whether you're looking to buy or sell, our platform provides a safe and secure environment for transactions. We offer competitive prices on commodities, stocks, bonds, futures contracts and other financial instruments. Our team is dedicated to helping customers find the best deals available in order to maximize their profits. With our easy-to-use interface, traders can quickly access real-time market data and make informed decisions when it comes to buying and selling investments.</p><a aria-current="page" className="btn btn-primary active"
                                                href="/service">Go</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Service;
