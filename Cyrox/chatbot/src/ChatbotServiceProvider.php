<?php

namespace Cyrox\Chatbot;

use Illuminate\Support\ServiceProvider;

class ChatbotServiceProvider extends ServiceProvider
{
    public function boot()
        {
        // Automatically load migrations
       $this->loadMigrationsFrom(__DIR__ . '/Database/migrations');

             // Publish migrations
      $this->publishes([
         __DIR__ . '/Database/migrations' => database_path('migrations'),
         ], 'chatbot-migrations');

        // Publish assets (public-facing files)
        $this->publishes([
            __DIR__ . '/../public' => public_path('vendor/cyrox/chatbot'),
        ], 'cyrox-chatbot-assets');

        // Load and publish views
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'chatbot');
        $this->publishes([
            __DIR__.'/../resources/views' => resource_path('views/vendor/cyrox/chatbot'),
        ], 'chatbot-views');

        // Publish config file
        $this->publishes([
            __DIR__.'/../config/chatbot.php' => config_path('chatbot.php'),
        ], 'chatbot-config');

        // Load package routes
        $this->loadRoutesFrom(__DIR__.'/../routes/web.php');
    }

    public function register()
    {
        // Merge package configuration with the application's config
        $this->mergeConfigFrom(
            __DIR__.'/../config/chatbot.php', 'chatbot'
        );
    }
}
