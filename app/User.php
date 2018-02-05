<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    //
    protected $table = 'users';

    protected $primaryKey = 'openid';
    public $incrementing = false;
    protected $keyType = 'string';

}
