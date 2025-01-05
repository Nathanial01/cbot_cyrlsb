<?php
return [

    /*
    |--------------------------------------------------------------------------
    | OpenAI API Configuration
    |--------------------------------------------------------------------------
    |
    | The configuration for connecting to OpenAI services. This includes API keys,
    | model selection, token limits, temperature, and other related settings.
    |
    */

    'openai' => [
        'api_key' => env('OPENAI_API_KEY', 'your-default-api-key'),
        'model' => env('OPENAI_MODEL', 'gpt-3.5-turbo'),
        'max_tokens' => env('OPENAI_MAX_TOKENS', 150),
        'temperature' => env('OPENAI_TEMPERATURE', 0.7),
        'top_p' => env('OPENAI_TOP_P', 1.0),
        'presence_penalty' => env('OPENAI_PRESENCE_PENALTY', 0),
        'frequency_penalty' => env('OPENAI_FREQUENCY_PENALTY', 0),
        'context_length' => env('OPENAI_CONTEXT_LENGTH', 5),
    ],

    /*
    |--------------------------------------------------------------------------
    | Chatbot Specific Configuration
    |--------------------------------------------------------------------------
    |
    | These settings are for chatbot-specific logic, including greeting, fallback messages,
    | and context length for conversation.
    |
    */

    'chatbot' => [
        'greeting' => env('CHATBOT_GREETING', 'Hello! How can I assist you today?'),
        'fallback_message' => env('CHATBOT_FALLBACK_MESSAGE', 'I’m sorry, I didn’t understand that.'),
    ],

];
