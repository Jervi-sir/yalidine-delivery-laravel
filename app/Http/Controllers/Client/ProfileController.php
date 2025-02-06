<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        return Inertia::render('Client/Profile/ShowProfile');
    }

    public function edit(Request $request)
    {
        return Inertia::render('Client/Profile/EditProfile');
    }
}

