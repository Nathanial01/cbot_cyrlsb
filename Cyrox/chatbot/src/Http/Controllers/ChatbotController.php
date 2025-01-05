<?php
namespace Cyrox\Chatbot\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;
use Cyrox\Chatbot\Models\ChatHistory;

class ChatbotController extends BaseController
{
    /**
     * Display the chatbot interface.
     */
    public function index()
    {
        return view('chatbot::chatbot');
    }

    /**
     * Generate a chatbot response and save the conversation in the chat history.
     */
    public function generateResponse(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'prompt' => 'required|string|max:1000',
            ]);

            $prompt = $request->input('prompt');
            $userId = auth()->check() ? auth()->id() : null;

            // Load conversation context
            $context = ChatHistory::where('user_id', $userId)
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->pluck('message')
                ->toArray();

            // Define allowed e-commerce topics
            $allowedKeywords = [
                'order', 'track order', 'product', 'cart', 'checkout', 'refund',
                'return', 'help', 'support', 'shipping', 'payment', 'account issues'
            ];

            $store = config('chatbot.store_name', 'CyroX');
            $storeLink = config('chatbot.store_link', 'https://cyrox.org');

            // Check if input matches allowed topics
            $isRelevant = collect($allowedKeywords)->contains(function ($keyword) use ($prompt) {
                return str_contains(strtolower($prompt), $keyword);
            });

            if (!$isRelevant && !empty($context)) {
                $isRelevant = true; // Allow if there's an ongoing flow
            }

            if (str_contains(strtolower($prompt), 'store name') || str_contains(strtolower($prompt), 'store link')) {
                $responseText = "The store name is $store. Visit it at <a href='$storeLink' target='_blank'>$storeLink</a>.";
                return $this->saveAndRespond($userId, $prompt, $responseText);
            }

            if (!$isRelevant) {
                $restrictedResponse = "I can only assist with shopping-related tasks like tracking orders, searching for products, or managing your cart.";
                return $this->saveAndRespond($userId, $prompt, $restrictedResponse);
            }

            // General chat logic
            $messages = collect($context)->map(fn($msg) => ['role' => 'assistant', 'content' => $msg])->toArray();
            $messages[] = ['role' => 'user', 'content' => $prompt];
            $messages = array_merge([['role' => 'system', 'content' => 'You are an e-commerce assistant.']], $messages);

            $response = OpenAI::chat()->create([
                'model' => 'gpt-4-turbo',
                'messages' => $messages,
                'max_tokens' => 500,
            ]);

            $botResponse = $response['choices'][0]['message']['content'];
            return $this->saveAndRespond($userId, $prompt, $botResponse);

        } catch (\Exception $e) {
            \Log::error('Chatbot Error', ['message' => $e->getMessage()]);
            return response()->json(['error' => 'An internal error occurred. Please try again later.'], 500);
        }
    }

    /**
     * Save the user and bot messages and respond.
     */
    private function saveAndRespond($userId, $prompt, $responseText): JsonResponse
    {
        ChatHistory::create([
            'user_id' => $userId,
            'message' => $prompt,
            'sender' => 'user',
        ]);

        ChatHistory::create([
            'user_id' => $userId,
            'message' => $responseText,
            'sender' => 'bot',
        ]);

        return response()->json(['response' => $responseText]);
    }
}
