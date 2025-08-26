import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // change if backend runs on different port
  withCredentials: true, // if using cookies/sessions
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
