<?php

use App\Http\Controllers\Client\AuthController;
use App\Http\Controllers\Client\CourseController;
use App\Http\Controllers\Client\DashboardController;
use App\Http\Controllers\Client\NotificationController;
use App\Http\Controllers\Client\OrderController;
use App\Http\Controllers\Client\OrderHistoryController;
use App\Http\Controllers\Client\ProductController;
use App\Http\Controllers\Client\ProfileController;
use App\Http\Controllers\Client\SettingController;
use App\Http\Controllers\Client\SuggestedProductController;
use App\Http\Controllers\Client\WalletController;
use Illuminate\Support\Facades\Route;


// Authentication Routes (if not already present)
Route::prefix('client')->middleware('guest.client')->group(function () {
  Route::get('/login', [AuthController::class, 'showLoginForm'])->name('client.login');
  Route::post('/login', [AuthController::class, 'login'])->name('client.fetchLogin');
  Route::get('/register', [AuthController::class, 'showRegistrationForm'])->name('client.register');
  Route::post('/register', [AuthController::class, 'register'])->name('client.fetchRegister');
});
Route::prefix('client')->middleware(['auth.client'])->group(function () {
  Route::post('/logout', [AuthController::class, 'logout'])->name('client.logout');
  // Dashboard
  Route::get('dashboard', [DashboardController::class, 'index'])->name('client.dashboard');
  // Products
  Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'list'])->name('products.list');
    Route::post('/', [ProductController::class, 'store'])->name('products.store');
    Route::get('create', [ProductController::class, 'create'])->name('products.create');
    Route::get('{product}', [ProductController::class, 'show'])->name('products.show');
    Route::get('{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('{product}', [ProductController::class, 'update'])->name('products.update'); // or PATCH
    Route::delete('{product}', [ProductController::class, 'destroy'])->name('products.destroy');
  });
  // Suggested Products
  Route::get('/suggested_products', [SuggestedProductController::class, 'suggest'])->name('products.suggest');
  // Courses
  Route::prefix('courses')->group(function () {
    Route::get('/', [CourseController::class, 'index'])->name('courses.list');
    Route::get('{course}', [CourseController::class, 'show'])->name('courses.show'); // For Course Details
  });
  // Orders
  Route::prefix('orders')->group(function () {
    Route::get('/', [OrderController::class, 'list'])->name('orders.list'); // Order List
    Route::post('/', [OrderController::class, 'store'])->name('orders.store'); // Store new order
    Route::get('create', [OrderController::class, 'create'])->name('orders.create'); // Create Order Form
    Route::post('bulk-upload', [OrderController::class, 'bulkUpload'])->name('orders.bulk_upload'); // Bulk Order Upload
    Route::get('{order}', [OrderController::class, 'show'])->name('orders.show'); // Order Details
    Route::put('{order}', [OrderController::class, 'update'])->name('orders.update'); // Update tracking number or other order details (PATCH is also fine)
    Route::delete('{order}', [OrderController::class, 'destroy'])->name('orders.destroy'); // Cancel Order
  });
  // Order History
  Route::get('/order_history', [OrderHistoryController::class, 'index'])->name('order_history.index');
  // Wallet
  Route::prefix('wallet')->group(function () {
    Route::get('/', [WalletController::class, 'show'])->name('wallet.history');
    Route::post('withdraw', [WalletController::class, 'withdraw'])->name('wallet.requestWithdraw'); // For Withdraw Request
  });
  // Notifications
  Route::prefix('notifications')->group(function () {
    Route::get('/', [NotificationController::class, 'index'])->name('notifications.list');
    Route::put('{notification}/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.mark_as_read'); // Mark notification as read
  });
  // Settings
  Route::prefix('settings')->group(function () {
    Route::get('/', [SettingController::class, 'index'])->name('settings.index');
    Route::put('/', [SettingController::class, 'update'])->name('settings.update'); // or PATCH
  });
  // Profile
  Route::prefix('profile')->group(function () {
    Route::get('/', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('update', [ProfileController::class, 'update'])->name('profile.update'); // Or PATCH
  });
});
