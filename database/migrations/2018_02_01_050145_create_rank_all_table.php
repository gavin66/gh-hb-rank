<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRankAllTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rank_all', function (Blueprint $table) {
            $table->integer('score');
            $table->string('openid',128);
            $table->string('name',150);
            $table->string('nickname',150);
            $table->string('avatar',1000);
            $table->string('city',100);
            $table->string('province',100);
            $table->string('country',100);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rank_all');
    }
}
