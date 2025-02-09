<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commune extends Model
{
    protected $fillable = ['name', 'wilaya_id', 'wilaya_name', 'has_stop_desk', 'is_deliverable', 'delivery_time_parcel', 'delivery_time_payment'];

    public function wilaya() {
        return $this->belongsTo(Wilaya::class);
    }
}
