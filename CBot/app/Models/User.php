<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    // Constants for user types
    const ADMIN = 'admin';
    const CLIENT = 'client';

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'user_type',
        'profile_picture',
        'location',
        'password',
        'gender',
        'date_of_birth',
        'role_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'date_of_birth' => 'date',
    ];

    // Relationships
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    // Helper Methods
    public function isAdmin()
    {
        return $this->user_type === self::ADMIN;
    }

    public function isClient()
    {
        return $this->user_type === self::CLIENT;
    }
}