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
  Route::get('/login', [AuthController::class, 'showLoginForm'])->name('client.login');
  Route::post('/login', [AuthController::class, 'login']);
  Route::post('/logout', [AuthController::class, 'logout'])->name('client.logout');
  Route::get('/register', [AuthController::class, 'showRegistrationForm'])->name('client.register');
  Route::post('/register', [AuthController::class, 'register']);

  // Dashboard
  Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

  // Products
  Route::get('/products', [ProductController::class, 'list'])->name('products.list');
  Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
  Route::post('/products', [ProductController::class, 'store'])->name('products.store');
  Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');
  Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
  Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update'); // or PATCH
  Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

  // Suggested Products
  Route::get('/suggested_products', [SuggestedProductController::class, 'suggest'])->name('products.suggest');

  // Courses
  Route::get('/courses', [CourseController::class, 'index'])->name('courses.list');
  Route::get('/courses/{course}', [CourseController::class, 'show'])->name('courses.show'); // For Course Details

  // Orders
  Route::get('/orders', [OrderController::class, 'index'])->name('orders.index'); // Order List
  Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create'); // Create Order Form
  Route::post('/orders', [OrderController::class, 'store'])->name('orders.store'); // Store new order
  Route::post('/orders/bulk-upload', [OrderController::class, 'bulkUpload'])->name('orders.bulk_upload'); // Bulk Order Upload
  Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show'); // Order Details
  Route::put('/orders/{order}', [OrderController::class, 'update'])->name('orders.update'); // Update tracking number or other order details (PATCH is also fine)
  Route::delete('/orders/{order}', [OrderController::class, 'destroy'])->name('orders.destroy'); // Cancel Order

  // Order History
  Route::get('/order_history', [OrderHistoryController::class, 'index'])->name('order_history.index');

  // Wallet
  Route::get('/wallet', [WalletController::class, 'show'])->name('wallet.history');
  Route::post('/wallet/withdraw', [WalletController::class, 'withdraw'])->name('wallet.requestWithdraw'); // For Withdraw Request

  // Notifications
  Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.list');
  Route::put('/notifications/{notification}/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.mark_as_read'); // Mark notification as read

  // Settings
  Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
  Route::put('/settings', [SettingController::class, 'update'])->name('settings.update'); // or PATCH

  // Profile
  Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
  Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::put('/profile/update', [ProfileController::class, 'update'])->name('profile.update'); // Or PATCH
