<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'first_name' => 'Super',
                'last_name' => 'Admin',
                'email_address' => 'superadmin@jxy4223.uta.cloud',
                'password' => Hash::make('password'),
                'user_type' => 'Super Admin',
            ],
            [
                'first_name' => 'School',
                'last_name' => 'Admin',
                'email_address' => 'school@jxy4223.uta.cloud',
                'password' => Hash::make('password'),
                'user_type' => 'School Admin',
            ],
            [
                'first_name' => 'Business',
                'last_name' => 'Owner',
                'email_address' => 'business@jxy4223.uta.cloud',
                'password' => Hash::make('password'),
                'user_type' => 'Business Owner',
            ],
            [
                'first_name' => 'Student',
                'last_name' => 'One',
                'email_address' => 'student@jxy4223.uta.cloud',
                'password' => Hash::make('password'),
                'user_type' => 'Student',
            ],
        ]);
    }
}
