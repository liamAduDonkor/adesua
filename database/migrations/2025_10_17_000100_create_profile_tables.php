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
        Schema::create('schools', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('region')->nullable();
            $table->string('phone')->nullable();
            $table->timestamps();
        });

        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('school_id')->nullable()->constrained('schools')->nullOnDelete();
            $table->string('staff_number')->nullable();
            $table->string('subject_specialization')->nullable();
            $table->string('qualification')->nullable();
            $table->integer('years_experience')->nullable();
            $table->timestamps();
            $table->unique(['user_id']);
        });

        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('school_id')->nullable()->constrained('schools')->nullOnDelete();
            $table->string('student_number')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('class')->nullable();
            $table->string('guardian_phone')->nullable();
            $table->timestamps();
            $table->unique(['user_id']);
        });

        Schema::create('parents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('occupation')->nullable();
            $table->json('children')->nullable();
            $table->timestamps();
            $table->unique(['user_id']);
        });

        Schema::create('school_managers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('school_id')->nullable()->constrained('schools')->nullOnDelete();
            $table->string('position')->nullable();
            $table->string('qualification')->nullable();
            $table->integer('years_in_position')->nullable();
            $table->timestamps();
            $table->unique(['user_id']);
        });

        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('business_name')->nullable();
            $table->string('business_type')->nullable();
            $table->string('license_number')->nullable();
            $table->string('contact_person')->nullable();
            $table->string('phone')->nullable();
            $table->timestamps();
            $table->unique(['user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendors');
        Schema::dropIfExists('school_managers');
        Schema::dropIfExists('parents');
        Schema::dropIfExists('students');
        Schema::dropIfExists('teachers');
        Schema::dropIfExists('schools');
    }
};


