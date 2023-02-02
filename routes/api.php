<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function (Request $request) {
    return response()->json(['message'=>'Welcome to the API routes.']);
});

Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@login');
Route::post('queries', 'QuerieController@store');
//Okay
Route::middleware('auth:api')->get('/me', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->group(function () {
    Route::get('/users', 'UserController@index')->name('users');
    Route::get('/users/{id}', 'UserController@user_details')->name('user_details');
    Route::post('users_by_type', 'UserController@users_by_type')->name('users_by_type');
    Route::post('users/', 'UserController@add')->name('add_user');
    Route::put('users/{id}', 'UserController@update_user')->name('update_user');
    Route::delete('users/{id}', 'UserController@delete_user')->name('delete_user');
    Route::post('change_password/{id}', 'UserController@change_password')->name('change_password');

    Route::get('clubs', 'ClubController@index')->name('clubs');
    Route::get('clubs/{id}', 'ClubController@show')->name('club_details');
    Route::get('my_clubs', 'ClubController@my_clubs')->name('my_clubs');
    Route::post('clubs', 'ClubController@store')->name('store_club');
    Route::put('clubs/{id}', 'ClubController@update')->name('update_club');
    Route::delete('clubs/{id}', 'ClubController@delete_club')->name('delete_club');
    Route::post('join-club/{club_id}', 'ClubController@join_club')->name('join_club');
    Route::post('leave-club/{club_id}', 'ClubController@leave_club')->name('leave_club');
    Route::get('my-joined-clubs/', 'ClubController@my_joined_clubs')->name('leave_club');

    Route::get('posts', 'PostController@index')->name('posts');
    Route::get('posts/{id}', 'PostController@show')->name('club_details');
    Route::post('posts', 'PostController@store')->name('store_post');
    Route::put('posts/{id}', 'PostController@update')->name('update_post');
    Route::delete('posts/{id}', 'PostController@delete_post')->name('delete_post');
    Route::get('my-posts', 'PostController@my_posts')->name('my_posts');

    Route::get('advertisements', 'AdvertisementController@index')->name('advertisements');
    Route::get('advertisements/{id}', 'AdvertisementController@show')->name('advertisement_details');
    Route::post('advertisements', 'AdvertisementController@store')->name('store_advertisement');
    Route::put('advertisements/{id}', 'AdvertisementController@update')->name('update_advertisement');
    Route::delete('advertisements/{id}', 'AdvertisementController@delete')->name('delete_advertisement');
    Route::get('my-advertisements', 'AdvertisementController@my_advertisements')->name('my_advertisements');

    Route::get('products', 'ProductController@index')->name('products');
    Route::get('my-products', 'ProductController@my_products')->name('my_products');
    Route::get('products/{id}', 'ProductController@show')->name('product_details');
    Route::post('products', 'ProductController@store')->name('store_product');
    Route::put('products/{id}', 'ProductController@update')->name('update_product');
    Route::delete('products/{id}', 'ProductController@delete')->name('delete_product');

    Route::get('my-orders', 'OrderController@my_orders')->name('my_orders');
    Route::get('my-previous-orders', 'OrderController@my_previous_orders')->name('my_previous_orders');
    Route::get('my-canceled-orders', 'OrderController@my_canceled_orders')->name('my_canceled_orders');
    Route::get('my-returned-orders', 'OrderController@my_returned_orders')->name('my_returned_orders');
    Route::get('my-store-orders', 'OrderController@my_store_orders')->name('my_store_orders');
    Route::get('my-store-latest-order', 'OrderController@my_store_latest_order')->name('my_store_latest_order');
    Route::post('order-place', 'OrderController@store')->name('order-place');
    Route::put('order-status/{id}', 'OrderController@status')->name('order-status');
    Route::put('order-delete/{id}', 'OrderController@delete_order')->name('delete_order');

    Route::post('messages', 'MessageController@store')->name('send-message');
    Route::get('my-messages/{id}', 'MessageController@my_messages')->name('my_messages');


    Route::get('queries', 'QuerieController@index')->name('queries');
    Route::delete('queries/{id}', 'QuerieController@destroy')->name('delete_query');
    Route::put('queries', 'QuerieController@update')->name('update_query');
});

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/
