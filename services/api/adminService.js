import { HOST } from '../../constants/host/host';

const axios = require('axios');


const apiConfig = axios.create({
  baseURL: HOST,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 10000
})

apiConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = "Bearer " + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const AdminService = {
  getUserSchedule(url) {
    const res = apiConfig.get(url)
    return res
  }
}

const PersonService = {
  getAllUser(){
    const res =  apiConfig.get(url)
  }
}


export default AdminService
