import http from "../http/http-common";

class AuthService {
    login(data) {
        return http.post("login", data);
    }

    Register(data) {
        return http.post("register", data);
    }
}

export default new AuthService();
