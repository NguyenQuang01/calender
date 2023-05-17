import { HOST } from "../constants/host/host";
import request from "./AxiosConnector";
//acc
export const signInAPI = async (param) => {
  try {
    const response = await request.postLogin(`${HOST}/login`, {
      email: param.email,
      password: param.password,
    });
    return response.data;
  } catch (error) {
    return { status: 500 };
  }
};
// export const signUpAPI = async (username, email, password) => {
//   const response = await request.post(`${HOST}/v1/auth/sign-up`, {
//     username,
//     email,
//     password,
//   });
//   return response.data;
// };
