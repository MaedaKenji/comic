<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::updateOrCreate(
        ['email' => 'admin@example.com'], // Find by this
        [
            'username' => 'Admin User',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]
    );
    }
}
