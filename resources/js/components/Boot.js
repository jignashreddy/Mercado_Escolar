import React from 'react';
import Routing from './Routing';
import Footer from './layout/Footer';
import 'react-notifications/lib/notifications.css';
import '../../css/boot.css';
import Navbar from './layout/Navbar';

const Boot = () => {
    return (
        <>
            <Navbar />
            <Routing />
            <Footer />
        </>
    );
};

export default Boot;
