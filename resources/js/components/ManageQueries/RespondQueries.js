import React, { useEffect, useState} from 'react';
import NavbarAdmin from '../layout/NavbarAdmin';
import QueryService from "../../services/QueryService";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {NavLink, useNavigate} from "react-router-dom";

function RespondQueries () {
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
        "query_id": '',
        "RespondTo": '',
        "answer": '',
    });

    const handleInputChange = e => {
        const { name, value } = e.target;
        switch(name){
            case "query_id":
                formdata.query_id = value;
                break;
            case "RespondTo":
                formdata.RespondTo = value;
                break;
            case "answer":
                formdata.answer = value;
                break;
            default:
                console.log("invalid");
        }
        setFormData(formdata) ;
    };

    const submitForm = (e) =>{
        e.preventDefault();
        const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // let validatedEmail = emailValidation.test(String(formdata.RespondTo).toLowerCase());
        // if(formdata.RespondTo && validatedEmail && formdata.query_id && formdata.answer){
        if(formdata.query_id && formdata.answer){
            enableSpinner();
            const fd = new FormData();

            fd.append('query_id', formdata.query_id);
            // fd.append('RespondTo', formdata.RespondTo);
            fd.append('answer', formdata.answer);
            fd.append('_method', 'PUT');
            QueryService.respond_query(fd).then((res) => {
                disableSpinner();
                NotificationManager.success('Success message', res.data.message);
                navigate('/viewquerie');
            })
                .catch((err) => {
                    disableSpinner();
                    NotificationManager.error('Error message', err.response.data.message);
                });
        }

        if(!formdata.query_id){
            NotificationManager.error('Error message', 'Query ID can not be blank');
        }

        // if(!formdata.RespondTo){
        //     NotificationManager.error('Error message', 'Respond To can not be blank');
        // }
    }

    const cancelForm = (e) =>{
        e.preventDefault();
        navigate('/viewquerie');
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
                    <form style={{border:'1px solid #ccc'}} onSubmit={submitForm}>
                        <div className="containeradmin">
                            <div>
                                <h1 className="colourwhite">Respond To A Query</h1>
                                <p className="colourwhite">Please fill in this form to Respond To A Query.</p>
                                <hr />
                            </div>
                            <div>
                                <label htmlFor="query_id"><b className="colourwhite">Query ID</b></label>
                                <input type="text" placeholder="Query ID" name="query_id" required onChange={handleInputChange}/>
                            </div>
                            {/* <div>

                                <label htmlFor="RespondTo"><b className="colourwhite">Respond To</b></label>
                                <input type="text" placeholder="Enter Email to whom you want to respond" name="RespondTo" required onChange={handleInputChange}/>
                            </div> */}
                            <div>

                                <label htmlFor="Answer"><b className="colourwhite">Answer</b></label>
                                <input type="text" placeholder="Answer" name="answer" required onChange={handleInputChange}/>
                            </div>
                            <div className="clearfix">
                                <button type="button" onClick={cancelForm} className="cancelbtn">Cancel</button>
                                <button type="button" onClick={submitForm} className="signupbtn">Respond</button>
                            </div>
                        </div>
                    </form>
                </div >
            </div >

            <NotificationContainer/>
        </div>
    );
}

export default RespondQueries;
