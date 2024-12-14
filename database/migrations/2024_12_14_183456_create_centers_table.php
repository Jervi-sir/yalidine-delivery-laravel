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
        Schema::create('centers', function (Blueprint $table) {
            $table->id('center_id');
            $table->string('name');
            $table->string('address');
            $table->string('gps');
            $table->unsignedBigInteger('commune_id');
            $table->string('commune_name');
            $table->foreignId('wilaya_id')->constrained();
            $table->string('wilaya_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('centers');
    }
};
