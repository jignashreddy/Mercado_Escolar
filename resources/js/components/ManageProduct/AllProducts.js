import React, { useState, useEffect } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav from '../layout/SideNav';
import '../../style/style.css';
import ProductService from "../../services/ProductService";
import OrderService from "../../services/OrderService";
import AdvertisementService from "../../services/AdvertisementService";

function AllProducts() {
    var [loading, setLoading] = useState(false);
    var [datas, setDatas] = useState([]);
    var [advertisements, setAdvertisements] = useState([]);
    var itemsInCart = (JSON.parse(localStorage.getItem("SmloggedInUserCart"))) ? JSON.parse(localStorage.getItem("SmloggedInUserCart")) : [];
    var [cartItems, setCartItems] = useState(itemsInCart);

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

        ProductService.all_products().then((res) => {
            datas = res.data.products ? res.data.products : [];

            setDatas(datas);

            disableSpinner();
        })
        .catch((err) => {
            disableSpinner();
            NotificationManager.error('Error message', err.response.data.message);
        })


        AdvertisementService.all_advertisements().then((res) => {
            advertisements = res.data.advertisements ? res.data.advertisements : [];

            setAdvertisements(advertisements);
        })
        .catch((err) => {
            NotificationManager.error('Error message', err.response.data.message);
        })

    }, []);

    const addToCart = (id) =>{
        const cart = JSON.parse(localStorage.getItem("SmloggedInUserCart"));
        if(cart){
            if(cart.includes(id)){
                NotificationManager.error('Error message', 'Product already in cart');
            }else{
                cart.push(id);

                setCartItems(cart);
                localStorage.setItem("SmloggedInUserCart", JSON.stringify(cart));
                NotificationManager.success('Success', 'Product added to cart');
            }
        }else{
            const cart = [];
            cart.push(id);
            setCartItems(cart);
            localStorage.setItem("SmloggedInUserCart", JSON.stringify(cart));
            NotificationManager.success('Success', 'Product added to cart');
        }
    }

    const placeOrder = () =>{
        if(cartItems.length > 0) {
            enableSpinner();
            if (confirm("Are you sure you want to submit this order?")) {
                const fd = new FormData();
                let products = JSON.parse(localStorage.getItem("SmloggedInUserCart"));

                for (var i = 0; i < products.length; i++) {
                    fd.append('products[]', products[i]);
                }

                OrderService.place_order(fd)
                    .then((res) => {
                        disableSpinner();
                        NotificationManager.success('Success', res.data.message);
                        localStorage.setItem("SmloggedInUserCart", JSON.stringify([]));
                        setCartItems(JSON.parse(localStorage.getItem("SmloggedInUserCart")));
                    })
                    .catch((err) => {
                        disableSpinner();
                        NotificationManager.error('Error message', err.response.data.message);
                    });
            }
        }else{
            NotificationManager.error('Error message', 'Cart is empty');
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
                        <button type="button" onClick={placeOrder} className="my-add-button">Buy ({cartItems.length})</button>

                        <div className="products">
                            {datas.map(function(data, i){
                                return (
                                    <div className="product" key={i}>
                                        <img src={ data.image } width={200} height={200} />
                                        <h6>{ data.name }</h6>
                                        <h5>${ data.price }</h5>
                                        <button type="button" onClick={() => addToCart(data.id)} className="my-edit-button">Add To Cart</button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='studentDashboard'>

            <SideNav />

            <div className="main3">
                <div className="main4">
                    <h1>Sponsored</h1>
                    <div className="products">
                        {advertisements.map(function(data, i){
                            return (
                                <div className="product" key={i}>
                                    <img src={ data.image } width={200} height={200} />
                                    <h6>{ data.title }</h6>
                                    <h5>{ data.description }</h5>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            </div>


            


            <NotificationContainer/>

        </div>
    );
}

export default AllProducts;
