import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import '../../style/style.css';
import '../Auth/login.css';
import QueryService from "../../services/QueryService";

function Contact() {
    const navigate = useNavigate();
    var [loading, setLoading] = useState(false);

    var enableSpinner = () => {
        loading = true;
        setLoading(loading) ;
    }

    var disableSpinner = () => {
        loading = false;
        setLoading(loading) ;
    }

    var [formdata, setFormData] = useState({
        "name": '',
        "email": '',
        "phone_no": '',
        "address": '',
        "query": '',
    });

    const handleInputChange = e => {
        const { name, value } = e.target;
        switch(name){
            case "name":
                formdata.name = value;
                break;
            case "email":
                formdata.email = value;
                break;
            case "phone_no":
                formdata.phone_no = value;
                break;
            case "address":
                formdata.address = value;
                break;
            case "query":
                formdata.query = value;
                break;
            default:
                console.log("invalid");
        }
        setFormData(formdata) ;
    };

    const submitForm = (e) =>{console.log("Form submitted");
        e.preventDefault();
        const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validatedEmail = emailValidation.test(String(formdata.email).toLowerCase());
        if(formdata.email && validatedEmail && formdata.name && formdata.phone_no && formdata.address && formdata.query){
            enableSpinner();
            const fd = new FormData();

            fd.append('name', formdata.name);
            fd.append('email', formdata.email);
            fd.append('phone_no', formdata.phone_no);
            fd.append('address', formdata.address);
            fd.append('query', formdata.query);
            console.log(formdata);
            QueryService.add_query(fd).then((res) => {
                disableSpinner();
                NotificationManager.success('Success message', 'Querie submitted successfully');
                navigate('/contact');
                document.getElementsByClassName("lrform1")[0].reset();
                
            })
                .catch((err) => {
                    disableSpinner();
                    NotificationManager.error('Error message', err.response.data.message);
                });
        }

        if(!formdata.name){
            NotificationManager.error('Error message', 'Full Name can not be blank');
        }

        if(!formdata.email){
            NotificationManager.error('Error message', 'Email Address can not be blank');
        }

        if(!formdata.phone_no){
            NotificationManager.error('Error message', 'Phone No can not be blank');
        }

        if(!formdata.query){
            NotificationManager.error('Error message', 'Query can not be blank');
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
            <div className='myapp1'>
                <div className="container1" >
                    <form className="lrform1"  onSubmit={submitForm}>
                        <div className="container1">
                            <h3 style={{ fontWeight: 'bold' }}>Contact Us</h3>
                            <label htmlFor="fname"><b>Name</b></label>
                            <input type="text" className="input1"  placeholder="Enter Fullname" name="name" required onChange={handleInputChange} />

                            <label htmlFor="email"><b>Email</b></label>
                            <input type="email" className="input1"  placeholder="Enter Email" name="email" required  onChange={handleInputChange}/>

                            <label htmlFor="phone_no"><b>Phone Number</b></label>
                            <input type="tel" className="input1"  placeholder="Enter Phone number" name="phone_no" pattern="[0-9]{10}" required  onChange={handleInputChange}/>

                            <label htmlFor="address"><b>Address</b></label>
                            <input type="text" className="input1"  placeholder="Address" name="address" required  onChange={handleInputChange}/>

                            <label htmlFor="query"><b>Query</b></label>
                            <textarea name="query" rows="3" placeholder="Type your Querie Here" onChange={handleInputChange}></textarea>

                            <button  type="button" onClick={submitForm} className="register_btn2">Submit</button>
                        </div>
                    </form>
                </div>

            </div>

            <NotificationContainer/>
        </div>
    );
}

export default Contact;
