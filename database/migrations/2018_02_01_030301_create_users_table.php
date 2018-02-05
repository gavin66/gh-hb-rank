<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
//            $table->string('id',128)->primary();
//            $table->increments('id');
            $table->string('openid',128)->primary();
            $table->string('name',150);
            $table->string('nickname',150);
            $table->string('avatar',1000);
            $table->string('city',100);
            $table->string('province',100);
            $table->string('country',100);
            $table->json('original');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
