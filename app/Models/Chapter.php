<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
  protected $fillable = ['comic_id','title','number'];
  public function comic() { return $this->belongsTo(Comic::class); }
  public function pages() { return $this->hasMany(ChapterPage::class)->orderBy('page_number'); }


}
