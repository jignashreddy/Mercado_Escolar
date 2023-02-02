<?php

namespace App\Http\Controllers;

use App\Models\StudentsClub;
use Illuminate\Http\Request;
use App\Models\Club;
use Illuminate\Support\Facades\Auth;

class ClubController extends Controller
{
    public function index(){
        return response()->json([
            'clubs' => Club::all()], 200);
    }

    public function show($id){
        return response()->json([
            'club' => Club::find($id)], 200);
    }

    public function my_clubs(){
        $clubs = Club::where('created_by', Auth::id())->get();

        return response()->json([
            'clubs' => $clubs], 200);
    }

    public function store(Request $request){
        $this->validate($request, [
            'name' => 'required',
            'description' => 'required',
            'image' => 'required|mimes:jpg,jpeg,png|max:2048',
        ]);

        $fileName = time().'.'.$request->image->extension();

        $request->image->move(public_path('/asset/img/club/'), $fileName);

        $data = [
            'created_by' => Auth::id(),
            'name' => $request->get('name'),
            'description' => $request->get('description'),
            'image' => '/asset/img/club/'.$fileName,
            'status' => 'Active'
        ];
        $club = Club::create($data);

        return response()->json([
            'club' => $club, 'message' => 'Club created successfully'], 200);
    }


    public function update(Request $request, $id){
        $club = Club::find($id);

        if($club){
            if($request->hasFile('image')){
                $fileName = time().'.'.$request->image->extension();

                $request->image->move(public_path('/asset/img/club/'), $fileName);
            }
            $data = [
                'name' => $request->get('name'),
                'description' => $request->get('description'),
                'image' => '/asset/img/club/'.$fileName,
                'status' => 'Active'
            ];
            if($club->update($data)){
                return response()->json([
                    'club' => $club, 'message' => 'Club updated successfully'], 200);
            }else {
                return response()->json(['message' => 'Something went wrong!! Please try again later'], 500);
            }
        }else{
            return response()->json([
                'message' => 'Club not found'], 404);
        }
    }

    public function delete_club($id){
        $club = Club::find($id);

        if($club){
            if($club->delete()){
                return response()->json([
                    'club' => $club, 'message' => 'Club deleted successfully'], 200);
            }else{
                return response()->json(['message' => 'Something went wrong!! Please try again later'], 500);
            }
        }else{
            return response()->json([
                'message' => 'Club not found'], 404);
        }
    }

    /**
     * Join to a club by user to a club by club id
     */
    public function join_club($club_id){
        $exist = StudentsClub::where('student_id', Auth::id())->where('club_id', $club_id)->first();
        if($exist){
            return response()->json([
                'message' => 'You already joined this club'], 200);
        }else {
            $data = [
                'club_id' => $club_id,
                'student_id' => Auth::id(),
                'status'	=> 'Joined',
                'joined_at'	=> '"'.date('Y-m-d H:i:s').'"',
            ];

            $created = StudentsClub::create($data);

            if ($created) {
                return response()->json(['message' => 'User joined to the club successfully'], 200);
            } else {
                return response()->json(['message' => 'Something went wrong!! Please try again later'], 500);
            }
        }
    }

    /**
     * Leave a club by user to a club by club id
     */
    public function leave_club($join_id){
        $club = StudentsClub::find($join_id);
        if(!$club){
            return response()->json([
                'message' => 'You are not following this club'], 200);
        }else {
            $club->status = 'Left';
            $club->left_at = date('Y-m-d H:i:s');

            if($club->save()){
                return response()->json([
                    'message' => 'You left this club successfully'], 200);
            }else{
                return response()->json(['message' => 'Something went wrong!! Please try again later'], 500);
            }
        }
    }

    /**
     * Get all joined clubs by user id
     */
    public function my_joined_clubs(){
        $joined_clubs = StudentsClub::where('student_id', Auth::id())->where('status', 'Joined')->get();

        $clubs = [];
        foreach($joined_clubs as $joined_club){
            $club = Club::find($joined_club["club_id"]);
            $club["join_id"] = $joined_club["id"];

            $clubs[] = $club;
        }

        return response()->json([
            'clubs' =>$clubs], 200);
    }
}
