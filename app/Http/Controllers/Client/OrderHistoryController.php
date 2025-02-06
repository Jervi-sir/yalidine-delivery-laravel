<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderHistoryController extends Controller
{
    public function history(Request $request)
    {
        return Inertia::render('Client/Order/OrderList');
    }
}
