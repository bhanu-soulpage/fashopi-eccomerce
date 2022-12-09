import axios from "axios";
import APIService from "./api.service";
import { USER_DETAILS } from "lib/endpoints";

class UserService extends APIService {
  userDetails(): Promise<any> {
    return this.get(`${USER_DETAILS}`)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }
}

export default UserService;
