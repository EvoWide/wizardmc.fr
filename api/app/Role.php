<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $guarded = [];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
