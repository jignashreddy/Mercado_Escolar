import React, {useEffect, useState} from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import {useParams} from "react-router-dom";
import ChatService from "../../services/ChatService";
import UserService from "../../services/UserService";

function BusinessChats() {
    const { type } = useParams();
    const user = JSON.parse(localStorage.getItem("SmloggedInUser"));
    let userType = ';'
    switch (type) {
        case "student":
            userType = 'Business Owner';
            break;
        case "busines":
            userType = 'Student';
            break;
        default:
            console.log("invalid");
    }
    var [loading, setLoading] = useState(false);
    var [datas, setDatas] = useState([]);
    var [selectedUser, setSelectedUser] = useState([]);
    var [messages, setMessages] = useState([]);
    var [message, setMessage] = useState({
        "sender_id": user.id,
        "message": '',
        "status": 'Active',
    });

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

        const fd = new FormData();

        fd.append('user_type', userType);

        UserService.users_by_type(fd).then((res) => {
            datas = res.data.users ? res.data.users : [];
            setDatas(datas);

            disableSpinner();
        })
            .catch((err) => {
                disableSpinner();
                NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                NotificationManager.error('Error message', err.response.data.message);
            })
    }, []);

    const chatWithUser = (user) => {
        setSelectedUser(user);
        enableSpinner();


        ChatService.my_messages(user.id).then((res) => {
            messages = res.data.messages ? res.data.messages : [];
            setMessages(messages);

            disableSpinner();
        })
            .catch((err) => {
                disableSpinner();
                NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                NotificationManager.error('Error message', err.response.data.message);
            })
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        switch(name){
            case "message":
                message.message = value;
                break;
            default:
                console.log("invalid");
        }
        setMessage(message) ;
    };

    const sendMessage = () => {
        if(message.message){
            enableSpinner();
            const fd = new FormData();
            fd.append('sender_id', message.sender_id);
            fd.append('send_to', selectedUser.id);
            fd.append('message', message.message);

            ChatService.send_message(fd).then((res) => {
                messages.push(res.data.message);
                setMessages(messages);

                disableSpinner();
            })
                .catch((err) => {
                    disableSpinner();
                    NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                    NotificationManager.error('Error message', err.response.data.message);
                })
        }
        if(!message.message){
            NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
            NotificationManager.error('Error message', 'Message can not be blank');
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
            <div className='businessDashboard'>
                <SideNav />
                <div className="main" style={{"marginLeft":"239px"}}>
                    <div id="container" style={{"boxSizing":"border-box"}}>
                        <aside style={{"boxSizing":"border-box","width":"260px","height":"800px","backgroundColor":"#3b3e49","display":"inline-block","fontSize":"15px","verticalAlign":"top"}}>
                            <ul style={{"boxSizing":"border-box"}} >
                                {datas.map(function(data, i){
                                    return (
                                        <li key={i} style={{"boxSizing":"border-box","listStyleType":"none","padding":"10px","color":"white","cursor":"pointer"}} onClick={() => chatWithUser(data)}>
                                            <div style={{"boxSizing":"border-box","display":"inline-block","verticalAlign":"top","marginTop":"12px"}}>
                                                <h2 style={{"boxSizing":"border-box","fontSize":"14px","color":"#fff","fontWeight":"400","marginBottom":"5px"}}>{data.first_name}</h2>
                                                <h3 style={{"boxSizing":"border-box","fontSize":"12px","color":"#7e818a","fontWeight":"400"}}> <span className="status online" style={{"boxSizing":"border-box"}}></span> online </h3>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </aside>

                        {selectedUser.id ? (
                            <main style={{boxSizing: "border-box", width: "490px", height: "800px", display: "inline-block", fontSize: "15px", verticalAlign: "top"}}>
                                <header style={{boxSizing: "border-box", height: "110px", padding: "30px 20px 30px 40px"}}>
                                    <div style={{boxSizing: "border-box", display: "inline-block", verticalAlign: "top", marginLeft: "10px", marginRight: "145px"}}>
                                        <h2 style={{boxSizing: "border-box", fontSize: "16px", marginBottom: "5px"}}>Chat with {selectedUser.first_name}</h2>
                                        <h3 style={{boxSizing: "border-box", fontSize: "14px", fontWeight: "400", color: "#7e818a"}}>{selectedUser.email_address}</h3>
                                    </div>
                                </header>
                                <ul id="chat" style={{"boxSizing":"border-box"}}>
                                    {messages.map((data, i) => (
                                        data.sender_id === user.id ? (
                                                <li className="me" style={{boxSizing: "border-box", textAlign: "right"}}>
                                                    <div className="entity" style={{boxSizing: "border-box", marginBottom: "5px"}}>
                                                        <h3 style={{boxSizing: "border-box", display: "inline-block", fontSize: "13px", fontWeight: "400", color: "#bbb"}}>{data.created_at}</h3>
                                                        <h2 style={{"boxSizing":"border-box"}}>{user.first_name}</h2> <span className="status blue" style={{"boxSizing":"border-box"}}></span>
                                                    </div>
                                                    <div className="triangle" style={{boxSizing: "border-box", borderColor: "transparent transparent #6fbced transparent", marginLeft: "375px"}}></div>
                                                    <div className="message" style={{boxSizing: "border-box", backgroundColor: "#6fbced"}}> {data.message} </div>
                                                </li>
                                    ) : (
                                        <li className="you" style={{"boxSizing":"border-box"}}>
                                        <div className="entity" style={{boxSizing: "border-box", marginBottom: "5px"}}> <span className="status online" style={{"boxSizing":"border-box"}}></span>
                                        <h2 style={{"boxSizing":"border-box"}}>{selectedUser.first_name}</h2>
                                        <h3 style={{boxSizing: "border-box", display: "inline-block", fontSize: "13px", fontWeight: "400", color: "#bbb"}}>{data.created_at}</h3>
                                        </div>
                                        <div className="triangle" style={{"boxSizing":"border-box"}}></div>
                                        <div className="message" style={{boxSizing: "border-box", backgroundColor: "#58b666"}}> {data.message} </div>
                                        </li>
                                    )))}
                                </ul>
                                <footer style={{boxSizing: "border-box", height: "155px", padding: "20px"}}>
                                    <textarea placeholder="Type your message" style={{"boxSizing":"border-box"}} name="message" required onChange={handleInputChange}></textarea>
                                    <button type={'button'} className="my-add-button"  onClick={sendMessage}>Send</button>
                                </footer>
                            </main>
                        ):(
                            <span></span>
                        )}
                    </div>
                </div>
            </div>
            <NotificationContainer/>

        </div>
    );
}

export default BusinessChats;
