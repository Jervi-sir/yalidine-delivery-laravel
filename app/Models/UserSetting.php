<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSetting extends Model
{
    protected $fillable = ['user_id', 'notifications_enabled', 'language', 'bio']; // ... other settings

    public function user() {
        return $this->belongsTo(User::class);
    }
}
