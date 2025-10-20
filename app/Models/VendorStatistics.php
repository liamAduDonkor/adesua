<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VendorStatistics extends Model
{
    use HasFactory;

    protected $table = 'vendor_statistics';

    protected $fillable = [
        'vendor_id',
        'academic_year',
        'service_category',
        'contracts_awarded',
        'total_contract_value',
        'amount_paid',
        'delivery_performance',
        'quality_rating',
        'timeliness_rating',
        'performance_notes',
        'contract_details',
        'compliance_status',
    ];

    protected $casts = [
        'contract_details' => 'array',
        'total_contract_value' => 'decimal:2',
        'amount_paid' => 'decimal:2',
    ];

    /**
     * Get the vendor that owns the statistics record.
     */
    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }
}