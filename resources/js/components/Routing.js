import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes,
} from "react-router-dom";
import Home from './Home/Home';
import About from './About/About'
import Service from './Service/Service';
import Contact from './Contact/Contact';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ForgotPassword from './Auth/ForgotPassword';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import StudentOrders from './StudentDashboard/StudentOrders';
import StudentPastOrders from './StudentDashboard/StudentPastOrders';
import BusinessDashboard from './BusinessDashboard/BusinessDashboard';
import BusinessChats from './BusinessDashboard/BusinessChats';
import BusinessPage from './BusinessDashboard/BusinessPage';
import ViewQuerie from './ManageQueries/ViewQuerie';
import RespondQueries from './ManageQueries/RespondQueries';
import DeleteQueries from './ManageQueries/DeleteQueries';
import ManageQueries from './ManageQueries/ManageQueries';

import SchoolAdminDashboard from './SchoolAdminDashboard/SchoolAdminDashboard';
import SuperAdminDashboard from './SuperAdminDashboard/SuperAdminDashboard';

import ManageStudents from './ManageUser/Students';
import ManageBusinessOwners from './ManageUser/BusinessOwners';
import ManageSchoolAdmins from './ManageUser/SchoolAdmins';
import AddUser from './ManageUser/AddUser';
import EditUser from './ManageUser/EditUser';

import Profile from './Auth/Profile';

import MyProducts from './ManageProduct/MyProducts';
import AddProduct from './ManageProduct/AddProduct';
import EditProduct from './ManageProduct/EditProduct';
import AllProducts from './ManageProduct/AllProducts';
import MyProductOrders from './ManageProduct/MyProductOrders';

import ManageClubs from './ManageClub/ManageClubs';
import MyClubs from './ManageClub/MyClubs';
import AddClub from './ManageClub/AddClub';
import EditClub from './ManageClub/EditClub';
import AllClubs from './ManageClub/AllClubs';
import JoinedClubs from './ManageClub/JoinedClubs';

import MyPosts from './ManagePost/MyPosts';
import ManagePosts from './ManagePost/ManagePosts';
import AddPost from './ManagePost/AddPost';
import EditPost from './ManagePost/EditPost';

import MyAdvertisements from './ManageAdvertisement/MyAdvertisement';
import AddAdvertisement from './ManageAdvertisement/AddAdvertisement';
import EditAdvertisement from './ManageAdvertisement/EditAdvertisement';

import Reports from "./reports/Reports";

const Routing = () => {

  return (
      <>
          <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/service" element={<Service />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/forgotpassword' element={<ForgotPassword />} />
          <Route exact path="/studentdashboard" element={<StudentDashboard />} />
          <Route exact path="/studentorders" element={<StudentOrders />} />
          <Route exact path="/my-past-orders" element={<StudentPastOrders />} />
          <Route exact path="/businessdashboard" element={<BusinessDashboard />} />
          <Route exact path="/businesschats/:type" element={<BusinessChats />} />
          <Route exact path="/businesspage" element={<BusinessPage />} />
          <Route exact path="/managequeries" element={<ManageQueries />} />
          <Route exact path="/viewquerie" element={<ViewQuerie />} />
          <Route exact path="/respondqueries" element={<RespondQueries />} />
          <Route exact path="/DeleteQueries" element={<DeleteQueries />} />

          <Route exact path="/school-admin-dashboard" element={<SchoolAdminDashboard />} />
          <Route exact path="/super-admin-dashboard" element={<SuperAdminDashboard />} />

          <Route exact path="/manage-students" element={<ManageStudents />} />
          <Route exact path="/manage-business-owners" element={<ManageBusinessOwners />} />
          <Route exact path="/manage-school-admins" element={<ManageSchoolAdmins />} />
          <Route exact path="/add-user/:type" element={<AddUser />} />
          <Route exact path="/edit-user/:id" element={<EditUser />} />

          <Route exact path="/profile" element={<Profile />} />

          <Route exact path="/all-products" element={<AllProducts />} />
          <Route exact path="/my-products" element={<MyProducts />} />
          <Route exact path="/add-product" element={<AddProduct />} />
          <Route exact path="/edit-product/:id" element={<EditProduct />} />
          <Route exact path="/my-product-orders" element={<MyProductOrders />} />

          <Route exact path="/all-clubs" element={<AllClubs />} />
          <Route exact path="/joined-clubs" element={<JoinedClubs />} />
          <Route exact path="/manage-clubs" element={<ManageClubs />} />
          <Route exact path="/my-clubs" element={<MyClubs />} />
          <Route exact path="/add-club" element={<AddClub />} />
          <Route exact path="/edit-club/:id" element={<EditClub />} />

          <Route exact path="/my-posts" element={<MyPosts />} />
          <Route exact path="/manage-posts" element={<ManagePosts />} />
          <Route exact path="/add-post" element={<AddPost />} />
          <Route exact path="/edit-post/:id" element={<EditPost />} />

          <Route exact path="/my-advertisements" element={<MyAdvertisements />} />
          <Route exact path="/add-advertisement" element={<AddAdvertisement />} />
          <Route exact path="/edit-advertisement/:id" element={<EditAdvertisement />} />
          <Route exact path="/reports" element={<Reports />} />

          </Routes>
        </>
    );
}

export default Routing;
