<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('teams/list/{list}', 'API\TeamController@list')->where('list', 'all|[0-9]+');
Route::apiResource('teams', 'API\TeamController')->except(['store', 'update']);
Route::apiResource('categories', 'API\CategoryController');
Route::apiResource('games', 'API\GameController');

Route::post('games/goal', 'API\GameController@goal');
Route::get('games/getgamesbyteamid/{id}', 'API\GameController@showGamesByTeam');
Route::get('games/getscore/{id}', 'API\GameController@getScore');
Route::get('games/getgamesbycategory/{id}', 'API\GameController@getGamesByCategory');