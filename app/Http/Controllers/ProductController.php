<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index(){
        return response()->json([
            'products' => Product::all()], 200);
    }

    public function show($id){
        return response()->json([
            'product' => Product::find($id)], 200);
    }

    /**
     * Get product by user id
     */
    public function my_products(){
        return response()->json([
            'products' => Product::where('created_by', Auth::id())->get()], 200);
    }

    public function store(Request $request){
        $this->validate($request, [
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'image' => 'required|mimes:jpg,jpeg,png|max:2048',
        ]);

        $fileName = time().'.'.$request->image->extension();

        $request->image->move(public_path('/asset/img/product/'), $fileName);

        $data = [
            'created_by' => Auth::id(),
            'name' => $request->get('name'),
            'price' => $request->get('price'),
            'description' => $request->get('description'),
            'image' => '/asset/img/product/'.$fileName,
            'status' => 'Active'
        ];

        $product = Product::create($data);

        return response()->json([
            'product' => $product, 'message' => 'Product created successfully'], 200);
    }

    public function update(Request $request, $id){
        $product = Product::find($id);

        if($product){
            $this->validate($request, [
                'name' => 'required',
                'description' => 'required',
                'price' => 'required',
            ]);

            $data = [
                'name' => $request->get('name'),
                'price' => $request->get('price'),
                'description' => $request->get('description')
            ];

            if($request->hasFile('image')) {
                $fileName = time() . '.' . $request->image->extension();

                $request->image->move(public_path('/asset/img/product/'), $fileName);

                $data['image'] = '/asset/img/product/'.$fileName;
            }

            if($product->update($data)){
                return response()->json([
                    'product' => $product, 'message' => 'Product updated successfully'], 200);
            }else {
                return response()->json(['message' => 'Something went wrong!! Please try again later'], 500);
            }
        }else{
            return response()->json([
                'message' => 'Product not found'], 404);
        }
    }

    public function delete($id) {
        $product = Product::find($id);

        if($product){
            if($product->delete()){
                return response()->json([
                    'product' => $product, 'message' => 'Product deleted successfully'], 200);
            }else {
                return response()->json(['message' => 'Something went wrong!! Please try again later'], 500);
            }
        }else{
            return response()->json([
                'message' => 'Product not found'], 404);
        }
    }
}
