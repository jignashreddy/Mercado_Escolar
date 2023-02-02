<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Get all orders for logged-in user
     */
    public function my_orders(){
        $orders =  DB::select(DB::raw('SELECT `orders`.*, `products`.id as product_id, `products`.name, `products`.image FROM `orders`
    JOIN `products` ON orders.product_id = products.id WHERE orders.user_id = '.Auth::id().' AND orders.status IN ("Pending", "Processing", "Shipped")'));
        return response()->json([
            'orders' => $orders], 200);
    }

    /**
     * Get all previous orders for logged in user
     */
    public function my_previous_orders(){
        $orders =  DB::select(DB::raw('SELECT `orders`.*, `products`.id as product_id, `products`.name, `products`.image FROM `orders` JOIN `products` ON orders.product_id = products.id WHERE orders.user_id = '.Auth::id().' AND orders.status IN ("Delivered", "Canceled", "Returned")'));
        return response()->json([
            'orders' => $orders], 200);
    }

    public function my_canceled_orders(){
        $status = 'Canceled';
        $orders =  DB::select(DB::raw('SELECT `orders`.*, `products`.id as product_id, `products`.name, `products`.image FROM `orders` JOIN `products` ON orders.product_id = products.id WHERE orders.user_id = '.Auth::id().' AND orders.status IN ("Canceled")'));
        return response()->json([
            'orders' => $orders], 200);
    }

    public function my_returned_orders(){
        $status = 'Returned';
        $orders =  DB::select(DB::raw('SELECT `orders`.*, `products`.id as product_id, `products`.name, `products`.image FROM `orders` JOIN `products` ON orders.product_id = products.id WHERE orders.user_id = '.Auth::id().' AND orders.status IN ("Returned")'));
        return response()->json([
            'orders' => $orders], 200);
    }

    /**
     * Get all orders for logged in user to their store
     */
    public function my_store_orders(){
        $orders =  DB::select(DB::raw('SELECT `orders`.*, `products`.id as product_id, `products`.name, `products`.image FROM `orders` JOIN `products` ON orders.product_id = products.id JOIN `users` ON products.created_by = users.id WHERE products.created_by = '.Auth::id().' AND orders.status IN ("Pending", "Processing", "Shipped")'));
        return response()->json([
            'orders' => $orders], 200);
    }

    /**
     * Get all orders for logged in user to their store
     */
    public function my_store_latest_order(){
        $orders =  DB::select(DB::raw('SELECT `products`.name, `products`.image, `orders`.id as order_id, `orders`.status as order_status,
       `orders`.price as order_price, `orders`.created_at as order_date, `users`.first_name, `users`.last_name FROM `products`
           JOIN `orders` ON `orders`.product_id = `products`.id JOIN `users` ON `users`.id = `orders`.user_id WHERE `products`.created_by = '.Auth::id().'
           ORDER BY `orders`.created_at DESC LIMIT 10'));
        return response()->json([
            'orders' => $orders], 200);
    }

    public function store(Request $request){
        $products = $request->get('products');

        foreach($products as $Product){
            $productInfo = Product::find($Product);
            $data = array(
                'product_id'	=> $Product,
                'price' => $productInfo->price,
                'user_id'		=> Auth::id(),
                'status'	=> 'Pending'
            );
            Order::create($data);
        }

        return response()->json(['message' => 'Order submitted successfully'], 200);
    }

    /*
     * Update order status
     */
    public function status(Request $request, $id){
        $order = Order::find($id);

        if($order) {
            $status = $request->get('status');
            if ($order->update(['status'=>$status])) {
                return response()->json(['message' => 'Order status updated successfully'], 200);
            }else{
                return response()->json(['message' => 'Order status update failed'], 500);
            }
        }else{
            return response()->json([
                'message' => 'Order not found'], 404);
        }
    }

    /*
     * delete order by id
     */
    public function delete_order($id){
        $order = Order::find($id);

        if($order) {
            if ($order->delete()) {
                return response()->json(['message' => 'Order deleted successfully'], 200);
            }else{
                return response()->json(['message' => 'Something went wrong!! Please try again later'], 500);
            }
        }else{
            return response()->json([
                'message' => 'Order not found'], 404);
        }
    }
}
