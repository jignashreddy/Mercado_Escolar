import http from "../http/http-common";
class UserService {
    users(){
        return http.get("users");
    }
    me() {
        return http.get("me");
    }
    users_by_type(data) {
        return http.post('users_by_type', data);
    }
    user_details(id) {
        return http.get("users/"+id);
    }
    add_user(data) {
        return http.post('users', data);
    }
    update_user(data, id) {
        return http.post('users/'+id, data);
    }

    delete_user(id) {
        return http.delete("users/"+id);
    }
}

export default new UserService();
