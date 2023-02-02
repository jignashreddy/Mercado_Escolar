import React, {useEffect, useState} from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import PostService from "../../services/PostService";
import {NavLink} from "react-router-dom";

function MyPosts() {
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

    function load_posts() {
        enableSpinner();

        PostService.my_posts().then((res) => {
            datas = res.data.posts ? res.data.posts : [];
            datas.forEach((item) => {
                item.delete_btn = <button type="button" className="my-delete-button" onClick={() => {deleteData(item.id)}}>Delete</button>;
            });
            setDatas(datas);

            disableSpinner();
        })
            .catch((err) => {
                disableSpinner();
                NotificationManager.error('Error message', err.response.data.message);
            })
    }

    useEffect(() => {
        load_posts();
    }, []);

    const deleteData = (id) =>{
        enableSpinner();
        if(confirm("Are you sure you want to delete this post?")){
            PostService.delete_post(id).then((res) => {
                disableSpinner();
                NotificationManager.success('Success message', res.data.message);
                // window.location.reload();
                load_posts();
            })
                .catch((err) => {
                    disableSpinner();
                    NotificationManager.error('Error message', err.response.data.message);
                })
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
            <div className='studentDashboard'>

                <SideNav />

                <div className="main3">
                    <div className="main4">
                        <NavLink exact="true" to="/add-post" className="my-add-button">Add New Post</NavLink>

                        <table id="myTable">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {datas.map(function(data, i){
                                return (
                                    <tr key={i}>
                                        <td>{ data.title }</td>
                                        <td>{ data.description }</td>
                                        <td>
                                            <NavLink exact="true" to={'/edit-post/'+data.id} className="my-edit-button">Edit</NavLink>
                                            { data.delete_btn }
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <NotificationContainer/>
            </div>
        </div>
    );
}

export default MyPosts;
