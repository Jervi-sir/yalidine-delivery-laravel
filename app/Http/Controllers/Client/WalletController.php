<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function show(Request $request)
    {
        return Inertia::render('Client/Wallet/ShowWallet');
    }

    public function withdraw(Request $request)
    {
        return Inertia::render('Client/Wallet/WithdrawRequest');
    }
}
