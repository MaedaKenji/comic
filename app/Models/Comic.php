<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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

    protected static function booted()
    {
        static::creating(function ($comic) {
            $comic->slug = Str::slug($comic->title);
        });
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function bookmarks(): BelongsToMany
    {
        // This assumes you have a pivot table named 'bookmark_comic' or similar
        return $this->belongsToMany(User::class, 'bookmarks');
    }
}
