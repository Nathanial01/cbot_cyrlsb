<?php

use Illuminate\Support\Facades\Route;
use Cyrox\Chatbot\Http\Controllers\ChatbotController;

// Define the routes for the chatbot
Route::group(['prefix' => 'chatbot', 'as' => 'chatbot.'], function () {
    // Render the chatbot view
    Route::get('/', [ChatbotController::class, 'index'])->name('index');

    // Handle chatbot response generation via POST
    Route::post('/generate-response', [ChatbotController::class, 'generateResponse'])->name('generate');
});
