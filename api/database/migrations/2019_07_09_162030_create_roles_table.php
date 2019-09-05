<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('slug');
            $table->tinyInteger('priority');
        });

        // Insert the roles
        DB::table('roles')->insert(
            [
                [
                    'name' => 'Visiteur',
                    'slug' => 'visiteur',
                    'priority' => 0
                ],
                [
                    'name' => 'Joueur',
                    'slug' => 'joueur',
                    'priority' => 1
                ],
                [
                    'name' => 'Administrateur',
                    'slug' => 'administrateur',
                    'priority' => 5
                ],
            ]
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roles');
    }
}
