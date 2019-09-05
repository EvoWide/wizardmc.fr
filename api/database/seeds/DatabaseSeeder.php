<?php

use App\ShopArticle;
use App\ShopCategory;
use App\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create(['username' => 'admin', 'password' => 'changeme', 'email' => 'john.doe@gmail.com', 'uuid' => Str::uuid()]);

        ShopCategory::insert(['title' => 'Kits']);
        ShopArticle::insert(['category_id' => 1, 'title' => 'Kit Yolo', 'content' => Str::random(36), 'image' => 'https://picsum.photos/200/300', 'price' => 100, 'commands' => json_encode(['say hello world', 'say Hello <player> !'])]);
    }
}
