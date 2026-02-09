<?php

namespace Database\Factories;

use App\Models\Comic;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comic>
 */
class ComicFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Comic::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'cover_path' => null,
            'description' => $this->faker->paragraph(), 
        ];
    }
}
