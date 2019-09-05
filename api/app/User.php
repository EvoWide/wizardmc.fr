<?php

namespace App;

use App\Services\Api\Exceptions\ShopBoughtException;
use App\Services\Api\Exceptions\TransactionException;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'logged', 'uuid'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    // Econ

    public function balance()
    {
        return $this->credits;
    }

    /**
     * Remove credits from user, throw an exception if an error occured.
     *
     * @param integer $amount
     * @return void
     */
    public function withdraw(int $amount): void
    {
        if ($amount <= 0) {
            throw new TransactionException("Le montant indiqué est invalide.");
        }

        if ($amount > $this->credits) {
            throw new TransactionException("Fonds insuffisant.");
        }

        $this->credits -= $amount;
        $this->save();
    }

    /**
     * Give credits from user, throw an exception if an error occured.
     *
     * @param integer $amount
     * @return void
     */
    public function deposit(int $amount): void
    {
        if ($amount <= 0) {
            throw new TransactionException('Le montant indiqué est invalide.');
        }

        $this->credits += $amount;
        $this->save();
    }
}
