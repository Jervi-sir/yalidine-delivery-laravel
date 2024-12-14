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
        Schema::create('communes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('wilaya_id')->constrained();
            $table->string('wilaya_name');
            $table->boolean('has_stop_desk')->default(0);
            $table->boolean('is_deliverable')->default(0);
            $table->integer('delivery_time_parcel');
            $table->integer('delivery_time_payment');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('communes');
    }
};
