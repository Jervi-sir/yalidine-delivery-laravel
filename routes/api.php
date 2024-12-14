<?php

use App\Http\Controllers\GeneralDataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('get-centers', [GeneralDataController::class, 'getCenters']);
Route::get('get-wilayas', [GeneralDataController::class, 'getWilaya']);
Route::get('get-communes', [GeneralDataController::class, 'getCommunes']);
