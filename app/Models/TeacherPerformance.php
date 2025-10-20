<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeacherPerformance extends Model
{
    use HasFactory;

    protected $table = 'teacher_performance';

    protected $fillable = [
        'teacher_id',
        'school_id',
        'academic_year',
        'term',
        'subject',
        'classes_taught',
        'students_taught',
        'average_student_score',
        'attendance_rate',
        'punctuality_rate',
        'performance_notes',
        'assessment_scores',
        'performance_rating',
    ];

    protected $casts = [
        'assessment_scores' => 'array',
        'average_student_score' => 'decimal:2',
    ];

    /**
     * Get the teacher that owns the performance record.
     */
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class);
    }

    /**
     * Get the school that the performance belongs to.
     */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }
}