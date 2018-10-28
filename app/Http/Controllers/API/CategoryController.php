<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Category;

class CategoryController extends Controller
{

    public function index()
    {
        $formattedCategories = array();
        $categories = Category::all();
        foreach($categories as $category) {
            $formattedCategories[] = array(
                'id' => $category->id,
                'name' => $category->name,
                'start_datetime' => date("d.m.Y H:i:s", strtotime($category->start_datetime))
            );
        }
        return $formattedCategories;
    }

    public function store(Request $request)
    {
        try {
            $category = new Category();
            $category->name = $request['name'];
            $category->start_datetime = $request['start'];
            $category->save();

            $categories = Category::all();
            return $categories;
        } catch (\Exception $e) {
            return 0;
        }

    }

    public function show($id)
    {
        $category = Category::find($id);
        return $category;
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        try {
            $category = Category::find($id);
            $category->delete();
            return 1;
        } catch (\Exception $e) {
            return 0;
        }
    }
}
