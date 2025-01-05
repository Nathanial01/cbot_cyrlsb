<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Users Table
        if (!Schema::hasTable('users')) {
            Schema::create('users', function (Blueprint $table) {
                $table->id();
                $table->string('first_name');
                $table->string('last_name');
                $table->string('email')->unique();
                $table->string('phone')->nullable()->unique();
                $table->enum('gender', ['Male', 'Female', 'Other'])->nullable();
                $table->date('date_of_birth')->nullable();
                $table->enum('user_type', ['admin', 'client']);
                $table->string('profile_picture')->nullable();
                $table->string('location')->nullable();
                $table->string('password');
                $table->timestamp('email_verified_at')->nullable();
                $table->foreignId('role_id')->nullable()->constrained('roles')->onDelete('set null');
                $table->rememberToken();
                $table->softDeletes(); // Add the deleted_at column for soft deletes
                $table->timestamps();
            });
        }

        // Password Reset Tokens Table
        if (!Schema::hasTable('password_reset_tokens')) {
            Schema::create('password_reset_tokens', function (Blueprint $table) {
                $table->string('email')->primary();
                $table->string('token');
                $table->timestamp('created_at')->nullable();
            });
        }

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
