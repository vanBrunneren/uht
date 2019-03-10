<?php

namespace App\Http\Controllers;

use App\Team;
use App\Category;

class GameboardController extends Controller
{

    public function index() {

        /*
        $categories = Category::all();
        $data = array();
        foreach ($categories as $category) {
            $teams = Team::where('category_id', '=', $category['id'])->get();
            $data[] = array('category' => $category, 'teams' => $teams);
        }
        */

        $category = Category::where('id', '=', '19')->first();
        $teams = Team::where('category_id', '=', '19')->get();

        if(count($teams) == 12) {

            $group1 = array();
            $group2 = array();

            $games = array();

            for($i = 0; $i < 6; $i++) {
                $group1[] = $teams[$i];
            }

            for(; $i < 12; $i++) {
                $group2[] = $teams[$i];
            }

            for($i = 0; $i < count($group1); $i++) {

                $games[] = array('team1' => $group1[$i]['name'], 'team2' => $group2[$i]['name']);

            }

        }

        return $games;

        return view('gameboard.gameboard', ['teams' => $teams, 'category' => $category]);

    }

}
