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
            $table->foreignId('user_id')->constrained();
            $table->foreignId('product_id')->nullable()->constrained();
            /*
            |--------------------------------------------------------------------------
            | Post saving
            |--------------------------------------------------------------------------
            */
            $table->string('delivery_order_id')->nullable()->unique(); // Unique order identifier
            // sender
            $table->integer('from_wilaya_id')->nullable();
            $table->string('from_wilaya_name');
            // receiver
            $table->string('first_name');
            $table->string('family_name');
            $table->string('contact_phone');
            // product
            $table->text('product_list')->nullable(); // Use text for potentially long lists
            $table->decimal('price', 10, 2); // Store price as a decimal
            $table->boolean('do_insurance')->default(false);
            $table->decimal('declared_value', 10, 2)->nullable(); // Allow null for declared value
            // product specs
            $table->integer('height')->nullable(); // Dimensions can be nullable
            $table->integer('width')->nullable();
            $table->integer('length')->nullable();
            $table->decimal('weight', 10,2)->nullable(); // Weight in kg/g
            // location
            $table->string('address')->nullable();
            $table->string('to_commune_name');
            $table->string('to_wilaya_name');
            $table->foreignId('wilaya_id')->nullable()->constrained();
            $table->foreignId('commune_id')->nullable()->constrained();
            $table->string('stopdesk_id')->nullable(); // Store stopdesk ID, make it nullable
            // order
            $table->boolean('freeshipping')->default(false);
            $table->boolean('is_stopdesk')->default(false);
            $table->boolean('has_exchange')->default(false);
            $table->string('product_to_collect')->nullable(); // Can be nullable
            $table->integer('quantity')->nullable(); //If you want to track quantity, you can keep this
            $table->decimal('amount')->nullable(); //Keep this for total amount, if needed.
            $table->dateTime('order_date')->nullable(); //Keep this if you want to track order date.
            $table->string('status')->default('pending'); // pending, shipped, delivered, canceled

            /*
            |--------------------------------------------------------------------------
            | After fetching to delivery app
            |--------------------------------------------------------------------------
            */
            $table->string('tracking_number')->nullable();
            $table->string('tracking')->nullable(); // Tracking number

            $table->unsignedBigInteger('import_id')->nullable(); // Import ID
            $table->dateTime('pracel_date_creation')->nullable();
            $table->dateTime('pracel_date_expedition')->nullable();
            $table->dateTime('pracel_date_last_status')->nullable();
            $table->dateTime('pracel_last_status')->nullable();

            $table->decimal('taxe_percentage', 5, 2)->nullable(); // Tax percentage
            $table->decimal('taxe_from', 10, 2)->nullable();
            $table->decimal('taxe_retour', 10, 2)->nullable();

            $table->string('parcel_type')->nullable();
            $table->string('parcel_sub_type')->nullable();
            $table->boolean('has_receipt')->nullable(); // Boolean or null

            $table->boolean('has_recouvrement')->default(false); // Has Recouvrement (COD)

            $table->string('payment_status')->default('not-ready');
            $table->string('payment_id')->nullable();

            $table->text('label')->nullable();  // URL, so text is appropriate
            $table->string('pin')->nullable();
            $table->text('qr_text')->nullable();

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
