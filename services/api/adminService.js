const axios = require('axios');


const apiConfig = axios.create({
  baseURL: "http://192.168.0.222:8286/api",
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
    const res = apiConfig.get(`http://192.168.0.222:8286/api/${url}`)
    return res
  }
}


export default AdminService
