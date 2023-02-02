<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index(){
        return response()->json([
            'posts' => Post::all()], 200);
    }

    public function show($id){
        return response()->json([
            'post' =>  Post::find($id)], 200);
    }

    /**
     * Get All posts by user id
     */
    public function my_posts(){
        $posts = Post::where('created_by',Auth::id())->where('status', 'Active')->get();

        return response()->json([
            'posts' =>  $posts], 200);
    }

    /**
     * Create new post
     */
    public function store(Request $request){
        $this->validate($request, [
            'title' => 'required',
            'description' => 'required',
        ]);

        $data = [
            'created_by' => Auth::id(),
            'title' => $request->get('title'),
            'description' => $request->get('description'),
            'status' => 'Active'
        ];
        $club = Post::create($data);

        return response()->json([
            'post' => $club, 'message' => 'Post created successfully'], 200);
    }

    /**
     * Update post by id
     */
    public function update(Request $request, $id){
        $post = Post::find($id);

        if($post){
            if($post->update($request->all())){
                return response()->json([
                    'post' => $post, 'message' => 'Post updated successfully'], 200);
            }else {
                return response()->json(['message' => 'Something went wrong!! Please try again later'], 500);
            }
        }else{
            return response()->json([
                'message' => 'Club not found'], 404);
        }
    }

    public function delete_post($id){
        $post = Post::find($id);

        if($post){
            if($post->delete()){
                return response()->json([
                    'club' => $post, 'message' => 'Post deleted successfully'], 200);
            }else{
                return response()->json(['message' => 'Something went wrong!! Please try again later'], 500);
            }
        }else{
            return response()->json([
                'message' => 'Post not found'], 404);
        }
    }
}
