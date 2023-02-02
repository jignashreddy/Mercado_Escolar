import http from "../http/http-common";
import axios from "axios";

class ProductService {
    all_products() {
        return http.get("products");
    }
    my_products() {
        return http.get("my-products");
    }
    delete_product(id) {
        return http.delete("products/"+id);
    }
    product_details(id) {
        return http.get("products/"+id);
    }
    add_product(data) {
        return http.post('products', data);
    }
    update_product(data, id) {
        return http.post('products/'+id, data);
    }
    my_store_orders() {
        return http.get("my-store-orders");
    }
    change_order_status(fd, id) {
        return http.post('order-status/'+id, fd);
    }
}

export default new ProductService();
