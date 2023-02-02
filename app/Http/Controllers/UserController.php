<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class UserController extends Controller
{
    /**
     * Get All users
     */
    public function index(){
        $users = User::all();
        return response()->json([
            'users' => $users], 200);
    }

    /**
     * Get All users by user id
     */
    public function user_details($id){
        $user = User::find($id);

        return response()->json(['user' => $user], 200);
    }

    /**
     * Get All users by user id
     */
    public function users_by_type(Request $request){
        $type = $request->get('user_type');
        $users = User::where('user_type', $type)->get();

        return response()->json(['users' => $users], 200);
    }

    /**
     * Add new user
     */
    public function add(Request $request){
        $this->validate($request, [
            'first_name' => 'required|min:4',
            'last_name' => 'required|min:4',
            'email_address' => 'required|email',
            'password' => 'required|min:8',
            'confirm_password' => 'required|min:8',
            'user_type' => 'required|min:4',
        ]);

        $user =  User::where('email_address', $request->get('email_address'))->first();
        if($user){
            return response()->json([
                'success' => false,
                'message' => 'User already exists!'], 401);
        }

        $data = [
            'first_name' => $request->get('first_name'),
            'last_name' => $request->get('last_name'),
            'email_address' => $request->get('email_address'),
            'password' => bcrypt($request->get('password')),
            'user_type' => $request->get('user_type'),
        ];


        $user = User::create($data);
        return response()->json(['user' => $user, 'message' => 'User created successfully'], 200);
    }

    /**
     * Update user
     */
    public function update_user(Request $request, $id){
        $user = User::find($id);
        if($user) {
            if (!empty($request->get('first_name'))) {
                $user->first_name = $request->get('first_name');
            }

            if(!empty($request->get('last_name'))){
                $user->last_name = $request->get('last_name');
            }

            if(!empty($request->get('email_address'))){
                $user->email_address = $request->get('email_address');
            }
            if ($user->save()) {
                return response()->json(['user' => $user, 'message' => 'User updated successfully'], 200);
            } else {
                return response()->json(['message' => 'Something went wrong!! Please try again later'], 200);
            }
        }else{
            return response()->json(['message' => 'User not found'], 200);
        }
    }

    /**
     * Delete user
     */
    public function delete_user($id){
        $user = User::find($id);
        if($user->delete()){
            return response()->json(['user' => $user, 'message' => 'User deleted successfully'], 200);
        }else{
            return response()->json(['message' => 'Something went wrong!! Please try again later'], 200);
        }
    }

    /**
     * Change user password
     */
    public function change_password(Request $request, $id){
        $this->validate($request, [
            'current_password' => 'required|min:4',
            'new_password' => 'required|min:4',
            'confirm_password' => 'required|min:4'
        ]);
        $user =  User::find($id);

        if(empty($user)){
            $this->response(array("message" => "User not found"), 201);
        }

        if($request->get('new_password') == $request->get('confirm_password')) {
            $data = [
                'email_address' => $user->email_address,
                'password' => $request->get('current_password'),
            ];

            if (auth()->attempt($data)) {
                $user->password = bcrypt($request->get('new_password'));
                if ($user->save()) {
                    return response()->json(['user' => $user, 'message' => 'Password changed successfully'], 200);
                } else {
                    return response()->json(['message' => 'Something went wrong!! Please try again later'], 200);
                }
            } else {
                return response()->json(['message' => 'Current password is incorrect'], 200);
            }
        }else{
            return response()->json(['message' => 'New password and confirm password does not match'], 200);
        }
    }
}
