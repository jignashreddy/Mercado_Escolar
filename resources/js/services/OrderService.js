import http from "../http/http-common";

class OrderService {
    my_orders() {
        return http.get("my-orders");
    }
    my_previous_orders() {
        return http.get("my-previous-orders");
    }
    change_order_status(fd, id) {
        return http.post('order-status/'+id, fd);
    }
    place_order(fd){
        return http.post('order-place', fd);
    }
    my_store_latest_order(){
        return http.get("my-store-latest-order");
    }
}

export default new OrderService();
