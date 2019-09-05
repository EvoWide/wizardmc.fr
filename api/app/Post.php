<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use GeneaLabs\LaravelModelCaching\Traits\Cachable;

class Post extends Model
{
    use Cachable;

    /**
     * Retourne l'utilisateur à l'origine de cet article
     *
     * @return App\User
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
