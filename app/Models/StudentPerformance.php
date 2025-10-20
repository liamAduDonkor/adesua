<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentPerformance extends Model
{
    use HasFactory;

    protected $table = 'student_performance';

    protected $fillable = [
        'student_id',
        'school_id',
        'academic_year',
        'term',
        'class',
        'subject_scores',
        'overall_average',
        'attendance_rate',
        'punctuality_rate',
        'behavior_rating',
        'performance_notes',
        'extracurricular_activities',
        'performance_rating',
    ];

    protected $casts = [
        'subject_scores' => 'array',
        'extracurricular_activities' => 'array',
        'overall_average' => 'decimal:2',
    ];

    /**
     * Get the student that owns the performance record.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Get the school that the performance belongs to.
     */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }
}