<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{

    public function index() {
        return response()->json([
            "index"
        ]);
    }

    public function store() {
        return response()->json([
            "store"
        ]);
    }

}
