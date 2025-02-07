<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function list(Request $request)
    {
        $perPage = $request->input('per_page', 10); // Default per page is 10
        $page = $request->input('page', 1); // Get the current page from the request

        $orders = Order::paginate($perPage, ['*'], 'page', $page); // Paginate the orders

        return Inertia::render('Client/Orders/OrderList', [
            'orders' => $orders, // Pass the paginated orders to the view
        ]);
    }

    public function create(Request $request)
    {
        $products = Product::all(); // Fetch all products
        return Inertia::render('Client/Orders/OrderCreate', [
            'products' => $products, // Pass products to the view
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'recipient' => 'required|string|max:255',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'amount' => 'required|numeric|min:0',
            'order_date' => 'required|date_format:Y-m-d', // Validate date format
        ]);

        Order::create($request->all());

        return redirect()->route('orders.list');
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
