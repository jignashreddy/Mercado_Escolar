<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Mail\WelcomeMail;
use Illuminate\Support\Facades\Mail;
class AuthController extends Controller
{
    /**
     * Registration Req
     */
    public function register(Request $request)
    {

        $this->validate($request, [
            'first_name' => 'required|min:4',
            'last_name' => 'required|min:4',
            'email_address' => 'required|email',
            'password' => 'required|min:8',
            'confirm_password' => 'required|min:8',
            'user_type' => 'required|min:4',
        ]);

        $data = [
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email_address' => $request->email_address,
            'password' => bcrypt($request->password),
            'user_type' => $request->user_type,
        ];


        $user = User::create($data);

        $token = $user->createToken('LaravelAuthApp')->accessToken;
        $details = ['name' => $request->first_name];
        Mail::to($request->email_address)->send(new WelcomeMail($details));
        return response()->json(['accessToken' => $token, 'user' => $user], 200);
    }

    /**
     * Login Req
     */
    public function login(Request $request)
    {
        $this->validate($request, [
            'email_address' => 'required|email',
            'password' => 'required|min:8'
        ]);
        $data = [
            'email_address' => $request->get('email_address'),
            'password' => $request->get('password'),
        ];

        if (auth()->attempt($data)) {
            $user = Auth::user();
            $token = $user->createToken('LaravelAuthApp')-> accessToken;
            return response()->json(['accessToken' => $token, 'user' => $user], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials! Wrong email or password'], 401);
        }
    }
}
