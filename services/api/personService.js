const axios = require('axios');


const apiConfig = axios.create({
  baseURL: "https://7e01-2401-d800-2e10-40ae-8500-f668-b4e4-3f1e.ngrok-free.app/api/",
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


const PersonService = {
  getUser(url){
    const res =  apiConfig.get(url)
    return res
  },

  postCreateUser(url, payload){
    const res = apiConfig.post(url, payload)
    return res
  },

  updateUser(url, payload){
    const res = apiConfig.post(url, payload)
    return res
  }
}


export default PersonService
