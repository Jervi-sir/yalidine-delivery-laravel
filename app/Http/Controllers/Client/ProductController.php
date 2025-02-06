<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function list(Request $request)
    {
        return Inertia::render('Client/Products/ProductList');
    }

    public function create(Request $request)
    {
        return Inertia::render('Client/Products/ProductCreate');
    }

    public function store(Request $request)
    {
        
    }

    public function show(Request $request)
    {
    }

    public function edit(Request $request)
    {
        
    }

    public function update(Request $request)
    {
        
    }

    public function destroy(Request $request)
    {
        
    }
}
