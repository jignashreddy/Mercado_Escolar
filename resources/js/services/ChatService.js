import http from "../http/http-common";
class ChatService {
    my_messages(id) {
        return http.get("my-messages/"+id);
    }
    send_message(data) {
        return http.post('messages', data);
    }
}

export default new ChatService();
