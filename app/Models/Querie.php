<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Querie extends Model
{
    use HasFactory;
    protected $table = 'queries';
    protected $fillable = ['name', 'email', 'phonenumber', 'address', 'querie', 'responded_by'];
}
