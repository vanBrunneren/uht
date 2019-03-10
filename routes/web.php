<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('gameboard/view', 'GameboardController@index');

//Route::view('/{path?}', 'app');
Route::get( '{any}', function () {
    return view('app'); // or wherever your React app is bootstrapped.
})->where('any', '.*');