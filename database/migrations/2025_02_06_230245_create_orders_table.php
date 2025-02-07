<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            // $table->unsignedBigInteger('user_id'); // Foreign key to users table
            $table->unsignedBigInteger('product_id'); // Foreign key to users table
            $table->string('recipient');
            $table->string('status')->default('pending'); // pending, shipped, delivered, canceled
            $table->decimal('amount', 10, 2);
            $table->string('tracking_number')->nullable();
            $table->timestamps();
        
            // $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('product_id')->references('id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
