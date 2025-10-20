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
        Schema::create('student_performance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->foreignId('school_id')->constrained()->onDelete('cascade');
            $table->string('academic_year');
            $table->string('term');
            $table->string('class');
            $table->json('subject_scores'); // {subject: score} pairs
            $table->decimal('overall_average', 5, 2)->nullable();
            $table->integer('attendance_rate')->default(0); // percentage
            $table->integer('punctuality_rate')->default(0); // percentage
            $table->string('behavior_rating')->default('good'); // excellent, good, satisfactory, needs_improvement
            $table->text('performance_notes')->nullable();
            $table->json('extracurricular_activities')->nullable();
            $table->string('performance_rating')->default('satisfactory'); // excellent, good, satisfactory, needs_improvement
            $table->timestamps();
            
            $table->index(['student_id', 'academic_year', 'term']);
            $table->index(['school_id', 'academic_year']);
            $table->index(['class', 'academic_year']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_performance');
    }
};