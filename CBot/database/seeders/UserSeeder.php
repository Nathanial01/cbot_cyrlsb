<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure roles exist
        $adminRole = Role::firstOrCreate(['name' => 'admin'], ['description' => 'Admin User']);
        $clientRole = Role::firstOrCreate(['name' => 'client'], ['description' => 'Client User']);

        // Seed users
        User::factory(5)->create(['user_type' => User::ADMIN, 'role_id' => $adminRole->id]); // 5 admins
        User::factory(10)->create(['user_type' => User::CLIENT, 'role_id' => $clientRole->id]); // 10 clients
    }
}