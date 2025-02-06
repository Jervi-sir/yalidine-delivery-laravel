<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLoginForm(Request $request)
    {
        return Inertia::render('Client/Auth/Login');
    }

    public function login(Request $request)
    {
        
    }

    public function logout(Request $request)
    {
        
    }

    public function showRegistrationForm(Request $request)
    {
        return Inertia::render('Client/Auth/Register');
    }

    public function register(Request $request)
    {
        
    }
}
