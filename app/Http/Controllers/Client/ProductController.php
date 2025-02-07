<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function list(Request $request)
    {
        $perPage = $request->input('per_page', 10); // Default per page is 10
        $page = $request->input('page', 1);

        $products = Product::with('category') // Eager load category
            ->paginate($perPage, ['*'], 'page', $page); // Use paginate() for pagination

        // Transform the data for the table (including category name)
        $transformedProducts = $products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'weight' => $product->weight,
                'category_id' => $product->category_id,
                'category_name' => $product->category ? $product->category->name : null, // Access category name
                'images' => json_decode($product->images), // Decode JSON images
            ];
        });

        return Inertia::render('Client/Products/ProductList', [
            'products' => $transformedProducts, // Pass the transformed data
            'categories' => \App\Models\Category::all(), // For ProductCreate
            'pagination' => [
                'currentPage' => $products->currentPage(),
                'totalPages' => $products->lastPage(),
                'perPage' => $products->perPage(),
                'total' => $products->total(),
            ],
        ]);
    }

    public function create(Request $request)
    {
        $categories = Category::all();
        $data['categories'] = [];
        foreach ($categories as $key => $category) {
            $data['categories'][$key] = [
                'id' => $category->id,
                'name' => $category->name,
            ];
        }
        return Inertia::render('Client/Products/ProductCreate', [
            'categories' => $data['categories']
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'price' => 'required|numeric',
            'weight' => 'nullable|numeric',
            'category_id' => 'nullable|exists:categories,id', // Make sure category exists
            'images' => 'nullable|array|max:7', // Validate images (max 7)
            // 'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Validate each image
        ]);

        $product = new Product();
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->weight = $request->weight;
        $product->category_id = $request->category_id;

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('product_images', 'public'); // Store in storage/app/public/product_images
                $imagePaths[] = $path; // Store the path
            }
        }
        if ($request->has('existing_images')) {
            foreach ($request->existing_images as $image) {
                $imagePaths[] = $image; // Store the path
            }
        }

        $product->images = json_encode($imagePaths); // Store as JSON string
        $product->save();

        return redirect()->route('products.list'); // Redirect after successful creation
    }

    public function show(Request $request) {}

    public function edit(Request $request) {}

    public function update(Request $request) {}

    public function destroy(Request $request) {}
}
