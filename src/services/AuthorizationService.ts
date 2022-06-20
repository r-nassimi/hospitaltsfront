import api from "src/http/api";

export default class AuthService {
  
  //Static properties are properties of a class, not of an instance of a class.
  static registration(login: string, password: string) {
    return api.post("/registration", { login, password });
  }

  static login(login: string, password: string) {
    return api.post("/login", { login, password });
  }

  static logout() {
    return api.get("/logout");
  }
}