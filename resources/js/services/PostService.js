import http from "../http/http-common";
import axios from "axios";

class PostService {
    all_posts() {
        return http.get("posts");
    }
    my_posts() {
        return http.get("my-posts");
    }
    post_details(id) {
        return http.get("posts/"+id);
    }
    delete_post(id) {
        return http.delete("posts/"+id);
    }
    add_post(data) {
        return http.post('posts', data);
    }
    update_post(data, id) {
        return http.post('posts/'+id, data);
    }
}

export default new PostService();
