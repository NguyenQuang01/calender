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


const PersonService = {
  get(url){
    const res =  apiConfig.get(url)
    return res
  },

  post(url, payload){
    const res = apiConfig.post(url, payload)
    return res
  },

  delete(url){
    const res = apiConfig.delete(url)
    return res
  },

  put(url, payload){
    const res = apiConfig.put(url, payload)
    return res
  }
}


export default PersonService
