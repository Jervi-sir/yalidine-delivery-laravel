<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Jeri sir',
            'email' => 'gacembekhira@gmail.com',
        ]);

        $categorySeeder = new CategorySeeder();
        $categorySeeder->run();
    
        $wilayaSeeder = new WilayaSeeder();
        $wilayaSeeder->run();

        $communeSeeder = new CommuneSeeder();
        $communeSeeder->run();

        $centerSeeder = new CenterSeeder();
        $centerSeeder->run();


    }
}
