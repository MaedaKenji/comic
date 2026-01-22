<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comics', function (Blueprint $table) {
            $table->id(); // Always include an ID
            $table->string('title');
            $table->string('author')->nullable();
            $table->timestamps(); // Adds created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comics', function (Blueprint $table) {
            if (Schema::hasColumn('comics', 'title')) {
                $table->dropColumn('title');
            }

            if (Schema::hasColumn('comics', 'author')) {
                $table->dropColumn('author');
            }
        });
    }
};
