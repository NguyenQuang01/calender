import { HOST } from '../../constants/host/host';

const axios = require('axios');
const LoginService = {
  postLogin(url, payload) {
     const res = axios.post(`${HOST}${url}`, payload)
     return res
  }
}

export default LoginService