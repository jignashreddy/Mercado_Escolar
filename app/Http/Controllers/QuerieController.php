<?php

namespace App\Http\Controllers;

use App\Models\Querie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Mail\QuerieResponse;
use Illuminate\Support\Facades\Mail;

class QuerieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'queries' => Querie::all()], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'email' => 'required',
            'query' => 'required',
        ]);

        $data = [
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'phonenumber'=> $request->get('phone_no'),
            'address' => $request->get('address'),
            'querie' => $request->get('query'),
            'responded_by' => "Not Responded",
        ];
        $club = Querie::create($data);

        return response()->json([
            'post' => $club, 'message' => 'Querie created successfully'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json([
            'querie' => Querie::find($id)], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {   
        $id = $request->get('query_id');
        settype($id, "integer");
        $response = $request->get('answer');
        $qury = Querie::find($id);
        $details = [
            'title' => 'Query Response',
            'querie' => $qury->querie,
            'email' => $qury->email,
            'name' => $qury->name,
            'response' => $response,
        ];
        Mail::to($qury->email)->send(new QuerieResponse($details));
        if($qury){
            if($qury->update(['responded_by' => Auth::id()])){
                return response()->json([
                    'querie' => $qury, 'message' => 'Querie Response sent successfully'], 200);
            }else{
                return response()->json(['message' => 'Something went wrong!! Please try again later'], 500);
            }
        }else{
            return response()->json([
                'message' => 'Querie not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $qury = Querie::find($id);

        if($qury){
            if($qury->delete()){
                return response()->json([
                    'querie' => $qury, 'message' => 'Querie deleted successfully'], 200);
            }else{
                return response()->json(['message' => 'Something went wrong!! Please try again later'], 500);
            }
        }else{
            return response()->json([
                'message' => 'Querie not found'], 404);
        }
    }
}
