<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuggestedProductController extends Controller
{
    public function suggest(Request $request)
    {
        return Inertia::render('Client/Products/SuggestedProducts');
    }
}
