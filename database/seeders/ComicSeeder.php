<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Comic;

class ComicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $comics = [
            [
                'title' => 'Solo Leveling',
                'genre' => ['Action', 'Adventure', 'Fantasy'],
                'badge' => '🔥 Hot',
                'cover_path' => 'covers/seed.jpg',
                'description' => 'In a world where hunters with magical abilities fight monsters, weak hunter Sung Jin-Woo embarks on a journey to become the strongest.',
            ],
            [
                'title' => 'Tower of God',
                'genre' => ['Action', 'Adventure', 'Mystery'],
                'badge' => '⭐ Popular',
                'cover_path' => 'covers/seed.jpg',
                'description' => 'Bam enters the mysterious Tower to find his friend Rachel, facing challenges and making allies along the way.',
            ],
            [
                'title' => 'The God of High School',
                'genre' => ['Action', 'Martial Arts', 'Supernatural'],
                'badge' => null,
                'cover_path' => 'covers/seed.jpg',
                'description' => 'High school students compete in a martial arts tournament, uncovering a conspiracy that threatens the world.',
            ],
            

        ];

        foreach ($comics as $comic) {
            Comic::create($comic);
        }
    }
}
