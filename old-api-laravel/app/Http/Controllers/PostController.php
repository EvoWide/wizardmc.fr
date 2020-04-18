<?php

namespace App\Http\Controllers;

use App\Post;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::where('hidden', 0)->orderBy('created_at', 'desc')->take(10)->get();
        return response()->json(['posts' => $posts]);
    }

    public function view(String $slug)
    {
        return response()->json(['post' => Post::where('slug', $slug)->where('hidden', 0)->firstOrFail()]);
    }
}
