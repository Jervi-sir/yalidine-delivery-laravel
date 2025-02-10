<?php

namespace App\Helpers;

use App\Models\Product;

class ClientOrderHelpers
{
  public static function format_order_lite($order)
  {
    $product = Product::find($order->product_id);
    $category = $product->category;
    return [
      'id' => $order->id,
      'recipient' => [
        'first_name' => $order->first_name,
        'family_name' => $order->family_name,
        'contact_phone' => $order->contact_phone,
      ],
      'status' => $order->status,
      'price' => $order->price,
      'product' => [
        'name' => $product->name,
        'description' => $product->description,
        'price' => $product->price,
        'weight' => $product->weight,
        'images' => $product->images,
        'category' => $category ? [
          'id' => $category->id,
          'name' => $category->name,
        ] : null,
        'created_at' => $product->created_at,
        'updated_at' => $product->updated_at,
      ],
      'created_at' => $order->created_at,
    ];
  }

}