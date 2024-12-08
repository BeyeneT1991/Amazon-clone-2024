import axios from "axios";

const axiosInstance = axios.create({

    // local instance of firebase function
    // baseURL: "http://127.0.0.1:5001/clone-2024-c5db0/us-central1/api",

    //deployed version of amazon server on render.com
    baseURL: "https://amazon-clone-2024-qap0.onrender.com"
});



export {axiosInstance}