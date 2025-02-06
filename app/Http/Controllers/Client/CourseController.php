<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Client/Courses/CourseList');
    }

    public function show(Request $request)
    {

    }
}
