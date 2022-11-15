import axios from "axios";
import APIService from "./api.service";
import { CREATE_USER, SIGN_IN } from "lib/endpoints";

class AuthenticationService extends APIService {
  userSignIN(data: any): Promise<any> {
    return this.post(`${SIGN_IN}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }

  createUser(data: any): Promise<any> {
    return this.post(`${CREATE_USER}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data?.message;
      });
  }
}

export default AuthenticationService;
