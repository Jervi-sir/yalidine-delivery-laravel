<?php

namespace App\Http\Controllers\Client;

use App\Helpers\ClientOrderHelpers;
use App\Http\Controllers\Controller;
use App\Models\Commune;
use App\Models\Order;
use App\Models\Product;
use App\Models\Wilaya;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function list(Request $request)
    {
        $perPage = $request->input('per_page', 10); // Default per page is 10
        $page = $request->input('page', 1); // Get the current page from the request
        $orders = Order::paginate($perPage, ['*'], 'page', $page);
        // Format the orders data
        $formattedOrders = $orders->getCollection()->map(function ($order) {
            return ClientOrderHelpers::format_order_lite($order);
        });
        return Inertia::render('Client/Orders/OrderList', [
            'orders' => $formattedOrders,
            'pagination' => [
                'current_page' => $orders->currentPage(),
                'per_page' => $orders->perPage(),
                'total' => $orders->total(),
                'last_page' => $orders->lastPage(),
                'from' => $orders->firstItem(),
                'to' => $orders->lastItem(),
            ]
        ]);
    }

    public function create(Request $request)
    {
        $products = Product::all(); // Fetch all products
        return Inertia::render('Client/Orders/Create/OrderCreate', [
            'products' => $products, // Pass products to the view
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'firstName' => 'required',
            'familyName' => 'required',
            'contactPhone' => 'required',
            'from_wilaya_id' => 'required|integer',
            'to_wilaya_id' => 'required|integer',
            'to_commune_id' => 'required|integer',
            'to_center_center_id' => 'required',   // turn it into integer
            'address' => 'nullable',
            'order_date' => 'nullable',
            'is_stopdesk' => 'required|bool',
            'do_insurance' => 'required|bool',
            'declared_value' => 'nullable',
            'freeshipping' => 'required|bool',
            'has_exchange' => 'required|bool',
            'product_id' => 'nullable',
            'quantity' => 'nullable',
            'amount' => 'nullable',
            'price' => 'nullable',
            'product_to_collect' => 'nullable',
            'more_then_5kg' => 'required|bool',
            'order_length' => 'nullable',
            'order_width' => 'nullable',
            'order_height' => 'nullable',
            'order_weight' => 'nullable',
        ]);

        $auth = Auth::user();
        $order = new Order();
        $order->user_id = $auth->id;
        $order->product_id = $request->product_id;
        // receiver
        $order->first_name = $request->firstName;
        $order->family_name = $request->familyName;
        $order->contact_phone = $request->contactPhone;
        // sender
        $order->from_wilaya_id = $request->from_wilaya_id;
        $order->from_wilaya_name = Wilaya::find((int)$request->from_wilaya_id);
        
        // location
        $order->address = $request->address;
        $order->to_commune_name = Commune::find((int)$request->to_commune_id);
        $order->to_wilaya_name = $request->to_wilaya_name; //Wiliaya::find((int)$request->to_wilaya_id);
        $order->wilaya_id = (int)$request->to_wilaya_id;
        $order->commune_id = (int)$request->to_commune_id;
        $order->stopdesk_id = (int)$request->to_center_center_id;

        // Order
        $order->freeshipping = $request->freeshipping;
        $order->is_stopdesk = $request->is_stopdesk;
        $order->has_exchange = $request->has_exchange;
        $order->product_to_collect = $request->product_to_collect;
        $order->quantity = $request->quantity;
        $order->amount = $request->amount;
        $order->order_date = $request->order_date;
        // $order->status = $request->;

        // product
        // $order->product_list = $request->;
        $order->price = $request->price;
        $order->do_insurance = $request->do_insurance;
        $order->declared_value = $request->declared_value;
        // product specs
        $is_more_then_5kg = $request->more_then_5kg || false;
        $order->height = $is_more_then_5kg ? $request-> $request->order_height : null;
        $order->width = $is_more_then_5kg ? $request->order_width : null;
        $order->length = $is_more_then_5kg ? $request->order_length : null;
        $order->weight = $is_more_then_5kg ? $request->order_weight : null;
        

        $order->order_date = $request->order_date;
        $order->wilaya_id = $request->wilaya_id;
        $order->commune_id = $request->commune_id;
        $order->save();

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
