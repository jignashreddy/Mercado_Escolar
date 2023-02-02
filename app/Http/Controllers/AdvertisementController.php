<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdvertisementController extends Controller
{
    public function index(){
        return response()->json([
            'advertisements' => Advertisement::all()], 200);
    }

    public function show($id){
        return response()->json([
            'advertisement' => Advertisement::find($id)], 200);
    }

    /**
     * Get Advertisements details by logged in user
     */
    public function my_advertisements(){
        return response()->json([
            'advertisements' => Advertisement::where('created_by', Auth::id())->get()], 200);
    }

    public function store(Request $request){
        $this->validate($request, [
            'title' => 'required',
            'description' => 'required',
            'image' => 'required|mimes:jpg,jpeg,png|max:2048',
        ]);

        $fileName = time().'.'.$request->image->extension();

        $request->image->move(public_path('/asset/img/advertisements/'), $fileName);

        $data = [
            'created_by' => Auth::id(),
            'title' => $request->get('title'),
            'description' => $request->get('description'),
            'image' => '/asset/img/advertisements/'.$fileName,
            'status' => 'Active'
        ];

        $adv = Advertisement::create($data);

        return response()->json([
            'advertisement' => $adv, 'message' => 'Advertisement created successfully'], 200);
    }

    public function update(Request $request, $id){
        $adv = Advertisement::find($id);

        if($adv){
            if($adv->update($request->all())){
                return response()->json([
                    'advertisement' => $adv, 'message' => 'Advertisement updated successfully'], 200);
            }else {
                return response()->json(['message' => 'Something went wrong!! Please try again later'], 500);
            }
        }else{
            return response()->json([
                'message' => 'Advertisement not found'], 404);
        }
    }

    public function delete($id) {
        $adv = Advertisement::find($id);

        if($adv){
            if($adv->delete()){
                return response()->json([
                    'advertisement' => $adv, 'message' => 'Advertisement deleted successfully'], 200);
            }else {
                return response()->json(['message' => 'Something went wrong!! Please try again later'], 500);
            }
        }else{
            return response()->json([
                'message' => 'Advertisement not found'], 404);
        }
    }
}
