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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('type', ['national', 'regional', 'school', 'compliance', 'performance', 'financial', 'enrollment']);
            $table->text('description');
            $table->json('filters')->nullable();
            $table->json('schedule')->nullable();
            $table->json('recipients')->nullable();
            $table->enum('status', ['completed', 'generating', 'failed', 'scheduled'])->default('generating');
            $table->string('file_path')->nullable();
            $table->string('file_format')->nullable();
            $table->integer('file_size')->nullable();
            $table->integer('download_count')->default(0);
            $table->unsignedBigInteger('author_id');
            $table->timestamps();
            
            $table->foreign('author_id')->references('id')->on('users')->onDelete('cascade');
            $table->index(['type', 'status']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};