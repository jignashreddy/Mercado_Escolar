import axios from "axios";

import authHeader from '../helper/auth-header.js';

export default axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers:  authHeader()
});
