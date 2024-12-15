<?php

use App\Http\Controllers\ApiDocsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('apiDocs.getCenters');
    // return Inertia::render('ApiDocs/ApiDocs');
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
});

Route::get('/api-docs/get-centers', [ApiDocsController::class, 'getCenters'])->name('apiDocs.getCenters');
Route::get('/api-docs/get-wilayas', [ApiDocsController::class, 'getWilayas'])->name('apiDocs.getWilayas');
Route::get('/api-docs/get-communes', [ApiDocsController::class, 'getCommunes'])->name('apiDocs.getCommunes');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
