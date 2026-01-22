<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comic extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'description',
        'cover_path',
        'badge',
        'genre',
    ];

    protected function casts(): array
    {
        return [
            'genre' => 'array',
        ];
    }

    public function chapters()
    {
        return $this->hasMany(\App\Models\Chapter::class);
    }
}
