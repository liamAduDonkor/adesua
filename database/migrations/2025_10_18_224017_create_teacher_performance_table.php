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
        Schema::create('teacher_performance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id')->constrained()->onDelete('cascade');
            $table->foreignId('school_id')->constrained()->onDelete('cascade');
            $table->string('academic_year');
            $table->string('term');
            $table->string('subject');
            $table->integer('classes_taught')->default(0);
            $table->integer('students_taught')->default(0);
            $table->decimal('average_student_score', 5, 2)->nullable();
            $table->integer('attendance_rate')->default(0); // percentage
            $table->integer('punctuality_rate')->default(0); // percentage
            $table->text('performance_notes')->nullable();
            $table->json('assessment_scores')->nullable(); // detailed scores
            $table->string('performance_rating')->default('satisfactory'); // excellent, good, satisfactory, needs_improvement
            $table->timestamps();
            
            $table->index(['teacher_id', 'academic_year', 'term']);
            $table->index(['school_id', 'academic_year']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_performance');
    }
};