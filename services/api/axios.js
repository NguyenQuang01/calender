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
apiConfig.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { status } = error.response
    if (status === 401) {
      return
    }
    return error.response
  }
)

const apiServices = {
  post(urlApi, params) {
    return apiConfig
      .post(urlApi, params)
      .then(response => response)
      .catch(error => error)
  },
  put(urlApi, params) {
    return apiConfig
      .put(urlApi, params)
      .then(response => response)
      .catch(error => error)
  },
  patch(urlApi, params) {
    return apiConfig
      .patch(urlApi, params)
      .then(response => response)
      .catch(error => error)
  },
  get(urlApi) {
    return apiConfig
      .get(urlApi)
      .then(response => response)
      .catch(error => error)
  },
  delete(urlApi) {
    return apiConfig
      .delete(urlApi)
      .then(response => response)
      .catch(error => error)
  }
}
export default apiServices
