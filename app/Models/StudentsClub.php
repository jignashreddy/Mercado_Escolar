<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentsClub extends Model
{
    use HasFactory;
    protected $table = 'students_clubs';
    public $timestamps = false;
    protected $searchable = ['id', 'club_id', 'student_id', 'status', 'joined_at', 'left_at'];
    protected $fillable = [
        'club_id',
        'student_id',
        'status',
    ];
}
