<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Game;

class GameController extends Controller
{

    public function index()
    {
        $games = Game::all();
        return $games;
    }

    public function store(Request $request)
    {
        try {
            $game = new Game();
            $game->team_1_id = $request['team_1_id'];
            $game->team_2_id = $request['team_1_id'];
            $game->team_1_goals = 0;
            $game->team_2_goals = 0;
            $game->length = $request['length'];
            $game->start_datetime = $request['start_datetime'];
            $game->save();

            $games = Games::all();
            return $games;
        } catch (\Exception $e) {
            return 0;
        }
    }

    public function show($id)
    {
        $game = Game::get($id);
        return $game;
    }

    public function update(Request $request, $id)
    {

    }

    public function destroy($id)
    {

    }

    public function goal(Request $request, $id)
    {
        try {
            $game = Game::get($request['game_id']);

        } catch (\Exception $e) {
            return 0;
        }
    }

}
