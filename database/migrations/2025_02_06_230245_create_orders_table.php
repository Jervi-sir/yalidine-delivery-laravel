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
            $table->foreignId('user_id')->constrained();
            $table->foreignId('product_id')->nullable()->constrained();
            $table->integer('quantity')->default(1);
            $table->decimal('amount', 10, 2);
            $table->dateTime('order_date')->nullable();
            $table->string('status')->default('pending'); // pending, shipped, delivered, canceled
            $table->string('tracking_number')->nullable();

            $table->foreignId('wilaya_id')->nullable()->constrained();
            $table->foreignId('commune_id')->nullable()->constrained();

            $table->timestamps();
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
