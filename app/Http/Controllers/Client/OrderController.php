<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function list(Request $request)
    {
        return Inertia::render('Client/Orders/OrderList');
    }

    public function create(Request $request)
    {
        return Inertia::render('Client/Orders/OrderCreate');
    }

    public function store(Request $request)
    {
        
    }

    public function bulkUpload(Request $request)
    {
        
    }

    public function show(Request $request)
    {
        
    }

    public function update(Request $request)
    {
        
    }
    
    public function destroy(Request $request)
    {
        
    }
}
