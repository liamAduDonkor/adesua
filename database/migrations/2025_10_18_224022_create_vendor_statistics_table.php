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
        Schema::create('vendor_statistics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->constrained()->onDelete('cascade');
            $table->string('academic_year');
            $table->string('service_category'); // supplies, maintenance, transportation, etc.
            $table->integer('contracts_awarded')->default(0);
            $table->decimal('total_contract_value', 15, 2)->default(0);
            $table->decimal('amount_paid', 15, 2)->default(0);
            $table->integer('delivery_performance')->default(0); // percentage
            $table->integer('quality_rating')->default(0); // 1-5 scale
            $table->integer('timeliness_rating')->default(0); // 1-5 scale
            $table->text('performance_notes')->nullable();
            $table->json('contract_details')->nullable(); // detailed contract info
            $table->string('compliance_status')->default('compliant'); // compliant, non_compliant, under_review
            $table->timestamps();
            
            $table->index(['vendor_id', 'academic_year']);
            $table->index(['service_category', 'academic_year']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendor_statistics');
    }
};