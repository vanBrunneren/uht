<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Game;
use App\Team;
use DB;
use DateTime;
use DateInterval;

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
        //try {

            $game = new Game();
            $game->team_1_id = $request['team_1_id'];
            $game->team_2_id = $request['team_2_id'];
            $game->team_1_goals = 0;
            $game->team_2_goals = 0;
            $game->length = $request['length'];
            $game->start_datetime = $request['start_datetime'];
            $game->finished = 0;
            $game->save();

            $games = DB::table('games')
                ->select(DB::raw('games.*, t1.name as team_1, t2.name as team_2'))
                ->join('teams as t1', 'team_1_id', 't1.id')
                ->join('teams as t2', 'team_2_id', 't2.id')
                ->whereNull('games.deleted_at')
                ->get();

            return $games;
      //  } catch (\Exception $e) {
       //     return 0;
      //  }
    }

    public function show($id)
    {
        $game = DB::table('games')
            ->select(DB::raw('games.*, t1.name as team_1, t2.name as team_2'))
            ->join('teams as t1', 'team_1_id', 't1.id')
            ->join('teams as t2', 'team_2_id', 't2.id')
            ->where('games.id', '=', $id)
            ->whereNull('games.deleted_at')
            ->get();
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

    public function goal(Request $request)
    {
        $game = Game::find($request->game_id);
        if($request->team_id == 1) {
            $game->team_1_goals = $request->goals;
        } else {
            $game->team_2_goals = $request->goals;
        }
        $game->save();
        return 1;

    }

    public function showGamesByTeam(Request $request)
    {
        try {
            $teamId = $request->id;
            $games = DB::select( DB::raw('
                SELECT games.*, t1.name as t1Name, t2.name as t2Name from games 
                  JOIN teams t1 ON games.team_1_id = t1.id
                  JOIN teams t2 ON games.team_2_id = t2.id
                  WHERE (team_1_id = '.$teamId.' OR team_2_id = '.$teamId.') AND games.deleted_at IS NULL AND 
                  start_datetime > NOW()
                  ORDER BY start_datetime'));
            return $games;
        } catch(\Exception $e) {
            return 0;
        }
    }

    public function getGamesByCategory(Request $request)
    {

        $categoryId = $request->id;
        $game = DB::table('games')
            ->select(DB::raw('games.*, t1.name as t1Name, t2.name as t2Name'))
            ->join('teams as t1', 'team_1_id', 't1.id')
            ->join('teams as t2', 'team_2_id', 't2.id')
            ->where('t1.category_id', '=', $categoryId)
            ->whereNull('games.deleted_at')
            ->orderBy('start_datetime')
            ->get();
        return $game;
    }

    public function finish(Request $request) {

        $game = Game::find($request->id);

        if($game->finished == 1) {
            $game->finished = 0;
        } else {
            $game->finished = 1;
        }
        $game->save();
        return $game;


    }

    public function getScore(Request $request) {

        $score = array();

        $categoryId = $request->id;

        $teams = Team::where('category_id', '=', $categoryId)->get();

        foreach($teams as $team) {

            $games = DB::select( DB::raw('SELECT games.*, t1.name as t1Name, t2.name as t2Name from games JOIN teams t1 ON games.team_1_id = t1.id JOIN teams t2 ON games.team_2_id = t2.id
                  WHERE (team_1_id = '.$team->id.' OR team_2_id = '.$team->id.') AND games.deleted_at IS NULL 
                  ORDER BY start_datetime'));

            $points = 0;
            $shotGoals = 0;
            $receiveGoals = 0;
            $gameCount = 0;
            $wins = 0;
            $loos = 0;
            $eq = 0;
            $wonAgainst = array();
            foreach($games as $game) {

                $wonAgainst = array();

                //$d1 = new DateTime(date('Y-m-d H:i:s'));
                //$d1->add(new DateInterval('PT1H'));
                //$d1 = new DateTime("2019-03-22 19:34:00");
                //$d2 = new DateTime($game->start_datetime);

                if($game->finished) {

                    if ($game->team_1_id == $team->id) {
                        if ($game->team_1_goals > $game->team_2_goals) {
                            $points += 2;
                            $wins++;
                            $wonAgainst[] = $game->team_2_id;
                        } else if ($game->team_1_goals == $game->team_2_goals) {
                            $points += 1;
                            $eq++;
                        } else {
                            $loos++;
                        }
                        $shotGoals += $game->team_1_goals;
                        $receiveGoals += $game->team_2_goals;
                    } else {
                        if ($game->team_2_goals > $game->team_1_goals) {
                            $points += 2;
                            $wins++;
                            $wonAgainst[] = $game->team_1_id;
                        } else if ($game->team_1_goals == $game->team_2_goals) {
                            $points += 1;
                            $eq++;
                        } else {
                            $loos++;
                        }
                        $shotGoals += $game->team_2_goals;
                        $receiveGoals += $game->team_1_goals;
                    }

                    $gameCount++;

                }
            }

            // wonagainst
            $score[] = array('team_name' => $team->name, 'points' => $points, 'group' => $team->groupid, 'shotGoals' => $shotGoals, 'receiveGoals' => $receiveGoals, 'gameCount' => $gameCount,
                'wins' => $wins, 'eq' => $eq, 'loos' => $loos);

        }

        $group1 = array();
        $group2 = array();
        foreach($score as $s) {
            if($s['group'] == 1) {
                $group1[] = $s;
            } else {
                $group2[] = $s;
            }
        }

        usort($group1, function($a, $b) {
            if(($a['points'] <=> $b['points']) == 0) {
                if(($a['shotGoals'] <=> $b['shotGoals']) == 0) {
                    $receive = $a['receiveGoals'] <=> $b['receiveGoals'];
                    if($receive == 0) {
                        return $receive;
                    } elseif($receive == 1) {
                        return -1;
                    } else {
                        return 1;
                    }
                } else {
                    return $a['shotGoals'] <=> $b['shotGoals'];
                }
            } else {
                return $a['points'] <=> $b['points'];
            }
        });

        usort($group2, function($a, $b) {
            if(($a['points'] <=> $b['points']) == 0) {
                if(($a['shotGoals'] <=> $b['shotGoals']) == 0) {
                    $receive = $a['receiveGoals'] <=> $b['receiveGoals'];
                    if($receive == 0) {
                        return $receive;
                    } elseif($receive == 1) {
                        return -1;
                    } else {
                        return 1;
                    }
                } else {
                    return $a['shotGoals'] <=> $b['shotGoals'];
                }
            } else {
                return $a['points'] <=> $b['points'];
            }
        });

        if($group2) {
            return array('group1' => array_reverse($group1), 'group2' => array_reverse($group2));
        } else {
            return array('group1' => array_reverse($group1));
        }

    }

}
