import axios from "axios";

const client = axios.create({
  baseURL: 'http://localhost:3015/',
});

client.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    request.headers.Authorization =  `Bearer ${token}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;