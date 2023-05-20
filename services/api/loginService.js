const axios = require('axios');
const LoginService = {
  postLogin(url, payload) {
     const res = axios.post(`https://7e01-2401-d800-2e10-40ae-8500-f668-b4e4-3f1e.ngrok-free.app/api/${url}`, payload)
     return res
  }
}

export default LoginService