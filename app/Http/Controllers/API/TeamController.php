<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Team;
use App\Category;

class TeamController extends Controller
{

    public function index()
    {
        $teams = Team::all();
        return $teams;
    }

    public function show($id)
    {
        $team = Team::find($id);
        return $team;
    }

    public function destroy($id)
    {
        try {
            $team = Team::find($id);
            $team->delete();
            return 1;
        } catch (\Exception $e) {
            return 0;
        }
    }

    public function list($list)
    {
        if($list == "all") {
            $categories = Category::all();
            $data = array();
            foreach ($categories as $category) {
                $teams = Team::where('category_id', '=', $category['id'])->get();
                $data[] = array('category' => $category, 'teams' => $teams);
            }
            return $data;

        } else {
            $categories = Category::find($list);

            $teams = Team::where('category_id', '=', $categories['id'])->get();
            return array('category' => $categories, 'teams' => $teams);
        }

    }

}

























