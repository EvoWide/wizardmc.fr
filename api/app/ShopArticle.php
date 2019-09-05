<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use GeneaLabs\LaravelModelCaching\Traits\Cachable;

class ShopArticle extends Model
{
    // use Cachable; CASSE LE HIDDEN

    protected $table = 'shop_articles';
    protected $hidden = ['category_id', 'hidden', 'created_at', 'updated_at', 'max'];


    public function category()
    {
        return $this->hasOne('App\ShopCategory', 'id', 'category_id');
    }
}
