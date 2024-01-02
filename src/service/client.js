import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

client.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  (error) => {
    console.log(error);
    //return Promise.reject(error);
  }
);

export default client;