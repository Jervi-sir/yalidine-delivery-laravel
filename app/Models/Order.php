<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'product_id', 'quantity', 'amount', 'order_date',
        'status', 'tracking_number', 'wilaya_id', 'commune_id',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_items')
                    ->withPivot('quantity', 'price'); // Add pivot table fields
    }
}
