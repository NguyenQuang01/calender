const axios = require('axios');
const LoginService = {
  postLogin(url, payload) {
     const res = axios.post(`http://192.168.0.222:8286/api/${url}`, payload)
     return res
  }
}

export default LoginService