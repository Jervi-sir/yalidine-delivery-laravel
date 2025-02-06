<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function list(Request $request)
    {
        return Inertia::render('Client/Notifications/NotificationList');
    }

    public function markAsRead(Request $request)
    {
        
    }
}
