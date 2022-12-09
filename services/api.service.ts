import axios, { AxiosPromise } from "axios";
// cookie
import cookie from "js-cookie";

abstract class APIService {
  // verify user
  authenticateUser(access: string): void {
    this.setAccessToken(access);
    axios.defaults.headers.common.Authorization = `Bearer ${access}`;
  }

  //Passing bearer for all api calls
  getAxiosHeaders(): any {
    const token = cookie.get("accessToken");
    return {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
  }
  getToken(token: any): any {
    return {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "X-PINGOTHER, Content-Type",
      "Content-Type": "application/json; charset=utf-8",
      "x-token": `${token}`,
    };
  }

  // Setting access token in a cookie
  setAccessToken(token: string): void {
    cookie.set("accessToken", token);
  }

  purgeAuth(): void {
    cookie.remove("accessToken");
    axios.defaults.headers.common.Authorization = `Bearer `;
  }

  // Axios get method
  get(url: string): AxiosPromise<any> {
    return axios({ method: "GET", url, headers: this.getAxiosHeaders() });
  }
  // Axios post method
  post(url: string, data = {}, headers?: any): AxiosPromise<any> {
    return axios({
      method: "POST",
      url,
      data,
      headers: headers ? headers : this.getAxiosHeaders(),
    });
  }
  // Axios put method
  put(url: string, data = {}): AxiosPromise<any> {
    return axios({
      method: "PUT",
      url,
      data,
      headers: this.getAxiosHeaders(),
    });
  }
  // Axios delete method
  delete(url: string): AxiosPromise<any> {
    return axios({
      method: "DELETE",
      url,
      headers: this.getAxiosHeaders(),
    });
  }
}

export default APIService;
