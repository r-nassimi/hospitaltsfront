import axios from "axios";
import AuthService from "src/services/AuthorizationService";
import { API_URL } from "src/constants";

export default class Store {
  user = {};
  authorizated = false;
  loading = false;
  errors = "";

  setUser(user: {}) {
    this.user = user;
  };

  setAuthorizated(boolean: boolean) {
    this.authorizated = boolean;
  };

  setLoading(boolean: boolean) {
    this.loading = boolean;
  };

  setErrors(error: string) {
    this.errors = error;
  };

  async registration(
    login: string, 
    password: string
    ) {
    try {
      const response = await AuthService.registration(
        login,
        password
      );
      localStorage.setItem("token", response.data.accessToken);
      this.setAuthorizated(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      this.setErrors(
        `Произошла трагедия во время регистрации пользователя ${login}!`
      );
    };
  };

  async login(
    login: string, 
    password: string
    ) {
    try {
      const response = await AuthService.login(login, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuthorizated(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      this.setErrors(
        `Произошла трагедия во время авторизации пользователя ${login}!`
        );
    };
  };

  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuthorizated(false);
      this.setUser({});
    } catch (e: any) {
      this.setErrors(e.response.data.message);
    };
  };

  async checkAuthorization() {
    this.setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuthorizated(true);
      this.setUser(response.data.user);
    } catch (e) {
      this.setErrors(e.response.data.message);
    } finally {
      this.setLoading(false);
    };
  };

  async refresh() {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.accessToken);
    } catch (e: any) {
      this.setErrors('Не авторизован!')
      localStorage.clear();
      this.setUser({});
    };
  };
};