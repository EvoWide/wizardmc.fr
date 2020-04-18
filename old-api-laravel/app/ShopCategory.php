<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use GeneaLabs\LaravelModelCaching\Traits\Cachable;

class ShopCategory extends Model
{
    // use Cachable;

    protected $table = 'shop_categories';
    protected $hidden = ['created_at', 'updated_at'];

    public function articles()
    {
        return $this->hasMany('App\ShopArticle', 'category_id', 'id');
    }
}
