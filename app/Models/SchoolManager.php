<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SchoolManager extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'school_id',
        'position',
        'qualification',
        'years_in_position',
    ];

    /**
     * Get the user that owns the school manager profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the school that the manager belongs to.
     */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }
}
