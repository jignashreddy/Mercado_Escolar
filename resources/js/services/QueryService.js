import http from "../http/http-common";
class QueryService {
    add_query(data) {
        return http.post('queries', data);
    }
    queries() {
        return http.get('queries');
    }
    delete_query(id) {
        return http.delete('queries/'+id);
    }
    respond_query(data) {
        return http.post('queries', data);
    }
}

export default new QueryService();
