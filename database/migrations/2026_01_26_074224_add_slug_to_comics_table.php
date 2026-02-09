<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration {
    /**
     * Run the migrations.
     */
   public function up(): void
{
    // 1. Add the column as nullable first
    Schema::table('comics', function (Blueprint $table) {
        $table->string('slug')->nullable();
    });

    // 2. Loop through and create clean slugs
    $comics = DB::table('comics')->get();
    foreach ($comics as $comic) {
        $slug = Str::slug($comic->title);
        
        // Check if this slug already exists in the table (for duplicates)
        $count = DB::table('comics')->where('slug', $slug)->count();
        if ($count > 0) {
            $slug = "{$slug}-{$count}";
        }

        DB::table('comics')->where('id', $comic->id)->update(['slug' => $slug]);
    }

    // 3. Now make it Not Null and Unique
    Schema::table('comics', function (Blueprint $table) {
        $table->string('slug')->nullable(false)->unique()->change();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comics', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
