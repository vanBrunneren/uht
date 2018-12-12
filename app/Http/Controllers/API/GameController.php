<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Game;
use DB;

class GameController extends Controller
{

    public function index()
    {
        $games = DB::table('games')
            ->select(DB::raw('games.*, t1.name as team_1, t2.name as team_2'))
            ->join('teams as t1', 'team_1_id', 't1.id')
            ->join('teams as t2', 'team_2_id', 't2.id')
            ->whereNull('games.deleted_at')
            ->get();
        return $games;
    }

    public function store(Request $request)
    {
        try {

            $game = new Game();
            $game->team_1_id = $request['team_1_id'];
            $game->team_2_id = $request['team_2_id'];
            $game->team_1_goals = 0;
            $game->team_2_goals = 0;
            $game->length = $request['length'];
            $game->start_datetime = $request['start_datetime'];
            $game->save();

            $games = DB::table('games')
                ->select(DB::raw('games.*, t1.name as team_1, t2.name as team_2'))
                ->join('teams as t1', 'team_1_id', 't1.id')
                ->join('teams as t2', 'team_2_id', 't2.id')
                ->whereNull('games.deleted_at')
                ->get();

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
        try {
            $game = Game::find($id);
            $game->length = $request['length'];
            $game->start_datetime = $request['start_datetime'];
            $game->save();

            $games = DB::table('games')
                ->select(DB::raw('games.*, t1.name as team_1, t2.name as team_2'))
                ->join('teams as t1', 'team_1_id', 't1.id')
                ->join('teams as t2', 'team_2_id', 't2.id')
                ->whereNull('games.deleted_at')
                ->get();

            return $games;

        } catch (\Exception $e) {
            return $e;
        }
    }

    public function destroy($id)
    {
        try {
            $game = Game::find($id);
            $game->delete();
            return 1;
        } catch (\Exception $e) {
            return 0;
        }
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