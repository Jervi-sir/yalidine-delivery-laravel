<?php

use App\Http\Controllers\ApiDocsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // return redirect()->route('apiDocs.getCenters');
    return Inertia::render('Client/Orders/OrderList');
    // return Inertia::render('Client/Dashboard/Dashboard');
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
});

Route::get('auth/login', fn() => Inertia::render('Client/Auth/Login'))->name('client.login');
Route::get('auth/register', fn() => Inertia::render('Client/Auth/Register'))->name('client.register');

Route::get('profile/show', fn() => Inertia::render('Client/Profile/ShowProfile'))->name('profile.show');
Route::get('profile/edit', fn() => Inertia::render('Client/Profile/EditProfile'))->name('profile.edit');

Route::get('dashboard', fn() => Inertia::render('Client/Dashboard/Dashboard'))->name('dashboard');
Route::get('orders/list', fn() => Inertia::render('Client/Orders/OrderList'))->name('orders.list');
Route::get('orders/create', fn() => Inertia::render('Client/Orders/OrderCreate'))->name('orders.create');

Route::get('products/list', fn() => Inertia::render('Client/Products/ProductList'))->name('products.list');
Route::get('products/create', fn() => Inertia::render('Client/Products/ProductCreate'))->name('products.create');
Route::get('products/suggest', fn() => Inertia::render('Client/Products/SuggestedProducts'))->name('products.suggest');

Route::get('courses/list', fn() => Inertia::render('Client/Courses/CourseList'))->name('courses.list');

Route::get('wallet/show', fn() => Inertia::render('Client/Wallet/ShowWallet'))->name('wallet.show');
Route::get('wallet/history', fn() => Inertia::render('Client/Wallet/WalletHistory'))->name('wallet.history');
Route::get('wallet/request-withdraw', fn() => Inertia::render('Client/Wallet/WithdrawRequest'))->name('wallet.requestWithdraw');

Route::get('notifications/list', fn() => Inertia::render('Client/Notifications/NotificationList'))->name('notifications.list');


Route::get('/api-docs/get-centers', [ApiDocsController::class, 'getCenters'])->name('apiDocs.getCenters');
Route::get('/api-docs/get-wilayas', [ApiDocsController::class, 'getWilayas'])->name('apiDocs.getWilayas');
Route::get('/api-docs/get-communes', [ApiDocsController::class, 'getCommunes'])->name('apiDocs.getCommunes');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
