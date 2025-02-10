<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Center extends Model
{
    protected $fillable = ['center_id', 'name', 'address', 'gps', 'commune_id', 'commune_name', 'wilaya_id', 'wilaya_name'];

    public function commune() {
        return $this->belongsTo(Commune::class);
    }

    public function wilaya() {
        return $this->belongsTo(Wilaya::class);
    }
}
