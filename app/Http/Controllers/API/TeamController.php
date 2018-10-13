<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Team;

class TeamController extends Controller
{

    public function index()
    {
        $teams = Team::all();
        return $teams;
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        $team = Team::find($id);
        return $team;
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
