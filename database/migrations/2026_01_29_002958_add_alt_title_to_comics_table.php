<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('comics', function (Blueprint $table) {
            Schema::table('comics', function (Blueprint $table) {
            // Adds the column. 'nullable' is usually recommended for new columns 
            // on existing tables to avoid errors with old records.
            $table->string('alt_title')->nullable()->after('title');
        });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comics', function (Blueprint $table) {
            $table->dropColumn('alt_title');
        });
    }
};
