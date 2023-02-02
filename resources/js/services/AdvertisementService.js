import http from "../http/http-common";

class ProductService {
    all_advertisements() {
        return http.get("advertisements");
    }
    my_advertisements() {
        return http.get("my-advertisements");
    }
    add_advertisement(data) {
        return http.post('advertisements', data);
    }
    update_advertisement(data, id) {
        return http.post('advertisements/'+id, data);
    }
    advertisement_details(id) {
        return http.get("advertisements/"+id);
    }
    delete_advertisement(id) {
        return http.delete("advertisements/"+id);
    }
}

export default new ProductService();
