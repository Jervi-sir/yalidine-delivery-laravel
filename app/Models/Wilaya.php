<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wilaya extends Model
{
    protected $fillable = ['name', 'zone', 'is_deliverable'];

    public function communes() {
        return $this->hasMany(Commune::class);
    }

    public function centers() {
        return $this->hasMany(Center::class);
    }
}
