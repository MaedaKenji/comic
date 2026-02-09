<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComicResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'alt_title' => $this->alt_title, // Added
            'slug' => $this->slug,
            'author' => $this->author,
            'artist' => $this->artist, // Added
            'description' => $this->description,
            'status' => $this->status, // Added
            'type' => $this->type, // Added
            'cover' => $this->cover_path ? asset('storage/' . $this->cover_path) : null,

            // Stats
            'total_chapters' => $this->chapters_count ?? $this->chapters()->count(),
            'rating' => $this->rating ?? 0,
            'total_ratings' => $this->total_ratings ?? 0,
            'total_favorites' => $this->total_favorites ?? 0,
            'last_update' => $this->updated_at->diffForHumans(),

            // Nested Chapters (using a separate ChapterResource is cleaner, but this works)
            'chapters' => $this->whenLoaded('chapters', function () {
                return $this->chapters->map(fn($chapter) => [
                    'id' => $chapter->id,
                    'number' => $chapter->number,
                    'title' => $chapter->title,
                    'published_at' => $chapter->created_at->toDateTimeString(),
                    'likes' => $chapter->likes_count ?? 0,
                ]);
            }),
        ];
    }
}
