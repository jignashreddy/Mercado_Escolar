<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    /**
     * Get All messages
     */
    public function messages(){
        return response()->json([
            'messages' => Message::all()], 200);
    }

    /**
     * Get All messages by user id
     */
    public function my_messages($id){
        $orders =  DB::select(DB::raw('SELECT * FROM `messages` where `messages`.send_to = '.$id.' AND `messages`.sender_id = '.Auth::id().' OR `messages`.send_to = '.Auth::id().' AND `messages`.sender_id = '.$id.' ORDER BY `messages`.created_at ASC'));
        return response()->json([
            'messages' => $orders], 200);
    }

    /**
     * Add Message
     */
    public function store(Request $request){
        $data = array(
            'sender_id'	=> $request->get('sender_id'),
            'send_to'	=> $request->get('send_to'),
            'message'	=> $request->get('message'),
            'status'	=> 'Active'
        );

        Message::create($data);

        return response()->json(['message' => 'Message sent successfully'], 200);
    }
}
