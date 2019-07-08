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
            $table->bigIncrements('id');
            $table->string('username', 32)->unique();
            $table->string('email', 255)->unique();
            $table->integer('credits')->default(0);
            $table->integer('votes')->default(0);
            $table->string('password', 255);
            $table->uuid('uuid');
            $table->string('logged', 16)->nullable();
            $table->tinyInteger('role');

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
